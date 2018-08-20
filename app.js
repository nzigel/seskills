var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var teams = require("botbuilder-teams");
var documentClient = require('documentdb').DocumentClient;
require('dotenv-extended').load();

//var adaptiveCards = require("adaptivecards");
var ds = require('./data/inputs');

// Setup DocumentDB Connection
var config = {}
config.endpoint = process.env.DOCUMENTDB_HOST;
config.primaryKey = process.env.DOCUMENTDB_KEY;

config.database = {
    "id": process.env.DOCUMENTDB_DATABASE
};

config.collection = {
    "id": process.env.DOCUMENTDB_COLLECTION
};

var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
//var connector = new builder.ChatConnector({
var connector = new teams.TeamsChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', [
    function (session) {

        session.userData.countries = ds.getCountries();
        session.userData.languages = ds.getLanguages();
        session.userData.techskills = ds.getSkills();
        session.userData.techdomains = ds.getDomains();
        session.userData.area = ds.getArea();
        session.userData.role = ds.getRole();

        var isChannelConversation = session.message.address.conversation.isGroup;
        if (isChannelConversation) {
            builder.Prompts.text("Hi "+session.message.address.user.name+" please talk to me in a private chat");
        }
        else if (session.message.address.user.id == "default-user") {
            // we are not in teams
            session.send("This bot is only supported within Microsoft Teams");
            session.endDialog();
        }
        else {
            setusers(session) 
                .then(function(good) {
                    session.userData.profile.users.forEach(function(element) {
                        if(session.message.address.user.id == element.id) {
                            // we have matched the user
                            session.userData.profile.user = element;
                        }
                    }, this);  

                    var alias = session.userData.profile.user.userPrincipalName.split("@")[0].toUpperCase();

                    checkUserDoc(session,alias,session.message.address.user.name) 
                        .then(function(good) {
                            session.beginDialog('updateinfo');
                        }, this);
                });
        } 

        /*
        var alias = "";
        var name = "";

        checkUserDoc(session,alias,name) 
            .then(function(good) {
                session.beginDialog('updateinfo');
            }, this);
        */
    }
]);

bot.dialog('updateinfo',[
    function (session, args, next) {
        doc = session.userData.doc;
        if(doc.name){
            if (doc.id) {
                //var firstNm = doc.name.split(" ")[0];
                if (doc.L3 && doc.L3.length==0){
                    // we haven't received any technology experience values yet launch the experience dialog
                    session.beginDialog('experience');
                }
                else {
                    var dl = {
                        Role: 'Role ('+doc.role+')',
                        Country: 'Country ('+doc.country+')',
                        Languages: 'Languages ('+doc.languages+')',
                        Area: 'Area ('+doc.area+')',
                        TechDomains: 'Technology Domains ('+doc.techdomains+')',
                        Experience: 'Technology Experience'
                    };

                    session.userData.dl = dl;

                    // prompt for update option
                    builder.Prompts.choice(
                        session,
                        'Hi '+doc.name+' what information would you like to update now?',
                        [dl.Role, dl.Country, dl.Languages, dl.Area, dl.TechDomains, dl.Experience],
                        {
                            maxRetries: 3,
                            retryPrompt: 'Not a valid option'
                        }
                    );
                }
            }
            else {
                // no exisiting results exist load the full form.
                session.beginDialog('fullform');
            }
        }
    },
    function (session, args, next) {
        if (!args.response) {
            // exhausted attemps and no selection, start over
            session.send('Too many attempts but don\'t worry, you can try again.');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = args.response.entity;
        var DialogLabels = session.userData.dl;
        switch (selection) {
            case DialogLabels.Country:
                return session.beginDialog('country');
            case DialogLabels.Languages:
                return session.beginDialog('language');
            case DialogLabels.Experience:
                return session.beginDialog('experience');
            case DialogLabels.Role:
                return session.beginDialog('role');
            case DialogLabels.Area:
                return session.beginDialog('area');
            case DialogLabels.TechDomains:
                return session.beginDialog('domain');
        }
    }]
);
bot.dialog('country', require('./dialogs/country'));
bot.dialog('language', require('./dialogs/language'));
bot.dialog('experience', require('./dialogs/experience'));
bot.dialog('role', require('./dialogs/role'));
bot.dialog('domain', require('./dialogs/domain'));
bot.dialog('area', require('./dialogs/area'));
bot.dialog('fullform', require('./dialogs/fullform'));


// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});

function checkUserDoc(session,alias,name) {
    return new Promise((good, bad)=>{
        
        client.queryDocuments(collectionUrl, 'SELECT * FROM c where c.alias = "'+alias+'"').toArray((err, results) => {
            if(results) {
                if (results.length>0) {
                    doc = results[0]; // take the first matched document for a given alias.
                    session.userData.doc = doc;
                    good(doc);
                    return;
                }
                else {
                    // we haven't matched a document for this user we need to create one
                    doc = {
                        "name": name,
                        "alias": alias,
                        "role": "",
                        "country": "",
                        "area": "",
                        "languages": [],
                        "techdomains": [],
                        "L3": []
                    };
                    session.userData.doc = doc;
                    good(doc);
                    return;
                }
            }
        });
    });
}

function setusers (session) {
    return new Promise((good, bad)=>{
        if (!session.userData.profile) session.userData.profile = {};
        if (!session.userData.profile.users) {
            connector.fetchMembers(session.message.address.serviceUrl, session.message.address.conversation.id, function (err, members) {
                if (err) {
                    bad(err);
                    return;
                }
                else {
                    // load the userlist into the profile as it wasn't already there
                    session.userData.profile.users = members;

                    good(members);
                    return;
                }
            });
        } 
        else {
            good(session.userData.profile.users);
            return;
        }
    });
}