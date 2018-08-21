var builder = require('botbuilder');
var documentClient = require('documentdb').DocumentClient;
require('dotenv-extended').load();

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

function processSubmitAction(session, value) {
    var responseMessage="Thanks, " + session.userData.doc.name + " your answers have been saved.";
    switch (value.type) {
        case 'updateCountry':
            session.userData.doc.country = value.country;
            replaceDocument(session);
            break;
        case 'updateRole':
            session.userData.doc.role = value.role;
            replaceDocument(session);
            break;
        case 'updateArea':
            session.userData.doc.area = value.area;
            replaceDocument(session);
            break;
        case 'updateLanguages':
            session.userData.doc.languages = value.languages.split(',');
            replaceDocument(session);
            break;
        case 'updateDomains':
            session.userData.doc.techdomains = value.techdomains.split(',');
            replaceDocument(session);
            break;
        case 'updateCoachOH':
            session.userData.doc.coachOH = value.coachOH.split(',');
            replaceDocument(session);
            break;
        case 'updateAttendOH':
            session.userData.doc.attendOH = value.attendOH.split(',');
            replaceDocument(session);
            break;
        case 'updateExperiences':
            //session.userData.doc.L3 = value.techexperience.replace(/, /g, "& ").replace(/,/g, ";").replace(/& /g, ", ").split(";");
            setTechSkills(session, value);
            replaceDocument(session);
            break;
        case 'updateForm':
            session.userData.doc.country = value.country;
            session.userData.doc.area = value.area;
            session.userData.doc.role = value.role;
            session.userData.doc.languages = value.languages.split(',');
            session.userData.doc.techdomains = value.techdomains.split(',');
            //setTechSkills(session, value);

            client.queryDocuments(collectionUrl, 'SELECT * FROM c where c.alias = "'+session.userData.doc.alias+'"').toArray((err, results) => {
                if (err) {
                    console.log(err);
                } else if (results) {
                    if (results.length==0){
                        // there isn't a document for this person review on this project so create it
                        client.createDocument(collectionUrl, session.userData.doc, function (err, document) {
                            if (err) {
                                console.log(err);
                            } else {
                                session.userData.doc = document; // get the id back from the created docObj and set to userdata
                                session.send(responseMessage);
                                // call experience after setting main form data - the form is too long for teams to display if experience is included.
                                return session.beginDialog('updateinfo');
                            }
                        });
                    }
                    else {
                        // we get here if the document is created after the bot is initalised and the dialog flow is interupted.
                        session.userData.doc.id = results[0].id;
                        replaceDocument(session);
                        session.send(responseMessage);
                        return session.beginDialog('updateinfo');
                    }
                }
            });
            break;
        default:
            // A form data was received, invalid or incomplete since the previous validation did not pass
            responseMessage="There was a problem updating your information please try again."
    }
    if (session.userData.doc.id) {
        session.send(responseMessage);
        return session.beginDialog('updateinfo');
    }
    
}

function setTechSkills(session, value) {
    if (value.techexperience && value.techexperience!="") {
        var expAry = value.techexperience.split(",");
        session.userData.doc.L3 = [];
        var i;
        for (i = 0; i < expAry.length; i++) { 
            session.userData.doc.L3.push(session.userData.techskills[parseInt(expAry[i])].title.split(":")[1].trim());
        }
    }
}

function replaceDocument(session) {
    if (session.userData.doc.id) {
        let documentUrl = `${collectionUrl}/docs/${session.userData.doc.id}`;

        return new Promise((resolve, reject) => {
            client.replaceDocument(documentUrl, session.userData.doc, (err, result) => {
                if (err) reject(err);
            });
        });
    }
};

module.exports = {
    processSubmitAction: function (session, value) {
        return processSubmitAction(session, value);
    }
};