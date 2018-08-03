var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var teams = require("botbuilder-teams");
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

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', [

    function (session) {
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

                    // we are in teams with a matched user start the survey

                    var cardTechSkills = new teams.O365ConnectorCardActionCard(session)
                    .id("cardSkills")
                    .name("techSkills")
                    .inputs([
                        
                        new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("countrylist")
                        .isRequired(true)
                        .title("What Country do you live in?")
                        .isMultiSelect(false)
                        .style('compact')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Afghanistan").value("AFG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Albania").value("ALB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Algeria").value("DZA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Andorra").value("AND"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Angola").value("AGO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Antigua and Barbuda").value("ATG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Argentina").value("ARG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Armenia").value("ARM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Australia").value("AUS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Austria").value("AUT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Azerbaijan").value("AZE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bahamas").value("BHS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bahrain").value("BHR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bangladesh").value("BGD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Barbados").value("BRB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Belarus").value("BLR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Belgium").value("BEL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Belize").value("BLZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Benin").value("BEN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bhutan").value("BTN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bolivia (Plurinational State of)").value("BOL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bosnia and Herzegovina").value("BIH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Botswana").value("BWA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Brazil").value("BRA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Brunei Darussalam").value("BRN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bulgaria").value("BGR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Burkina Faso").value("BFA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Burundi").value("BDI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cabo Verde").value("CPV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cambodia").value("KHM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cameroon").value("CMR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Canada").value("CAN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Central African Republic").value("CAF"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chad").value("TCD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chile").value("CHL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("China").value("CHN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Colombia").value("COL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Comoros").value("COM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Congo").value("COG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cook Islands").value("COK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Costa Rica").value("CRI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Croatia").value("HRV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cuba").value("CUB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cyprus").value("CYP"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Czechia").value("CZE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Côte d'Ivoire").value("CIV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Democratic People's Republic of Korea").value("PRK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Democratic Republic of the Congo").value("COD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Denmark").value("DNK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Djibouti").value("DJI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Dominica").value("DMA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Dominican Republic").value("DOM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ecuador").value("ECU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Egypt").value("EGY"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("El Salvador").value("SLV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Equatorial Guinea").value("GNQ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Eritrea").value("ERI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Estonia").value("EST"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Eswatini").value("SWZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ethiopia").value("ETH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Faroe Islands (Associate Member)").value("FRO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Fiji").value("FJI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Finland").value("FIN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("France").value("FRA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Gabon").value("GAB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Gambia").value("GMB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Georgia").value("GEO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Germany").value("DEU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ghana").value("GHA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Greece").value("GRC"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Grenada").value("GRD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Guatemala").value("GTM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Guinea").value("GIN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Guinea-Bissau").value("GNB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Guyana").value("GUY"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Haiti").value("HTI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Honduras").value("HND"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hungary").value("HUN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Iceland").value("ISL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("India").value("IND"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Indonesia").value("IDN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Iran (Islamic Republic of)").value("IRN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Iraq").value("IRQ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ireland").value("IRL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Israel").value("ISR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Italy").value("ITA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Jamaica").value("JAM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Japan").value("JPN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Jordan").value("JOR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kazakhstan").value("KAZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kenya").value("KEN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kiribati").value("KIR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kuwait").value("KWT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kyrgyzstan").value("KGZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lao People's Democratic Republic").value("LAO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Latvia").value("LVA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lebanon").value("LBN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lesotho").value("LSO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Liberia").value("LBR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Libya").value("LBY"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lithuania").value("LTU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Luxembourg").value("LUX"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Madagascar").value("MDG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malawi").value("MWI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malaysia").value("MYS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Maldives").value("MDV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mali").value("MLI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malta").value("MLT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Marshall Islands").value("MHL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mauritania").value("MRT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mauritius").value("MUS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mexico").value("MEX"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Micronesia (Federated States of)").value("FSM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Monaco").value("MCO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mongolia").value("MNG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Montenegro").value("MNE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Morocco").value("MAR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mozambique").value("MOZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Myanmar").value("MMR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Namibia").value("NAM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nauru").value("NRU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nepal").value("NPL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Netherlands").value("NLD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("New Zealand").value("NZL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nicaragua").value("NIC"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Niger").value("NER"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nigeria").value("NGA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Niue").value("NIU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Norway").value("NOR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Oman").value("OMN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Pakistan").value("PAK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Palau").value("PLW"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Panama").value("PAN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Papua New Guinea").value("PNG"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Paraguay").value("PRY"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Peru").value("PER"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Philippines").value("PHL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Poland").value("POL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Portugal").value("PRT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Qatar").value("QAT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Republic of Korea").value("KOR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Republic of Moldova").value("MDA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Romania").value("ROU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Russian Federation").value("RUS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Rwanda").value("RWA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Saint Kitts and Nevis").value("KNA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Saint Lucia").value("LCA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Saint Vincent and the Grenadines").value("VCT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Samoa").value("WSM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("San Marino").value("SMR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sao Tome and Principe").value("STP"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Saudi Arabia").value("SAU"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Senegal").value("SEN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Serbia").value("SRB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Seychelles").value("SYC"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sierra Leone").value("SLE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Singapore").value("SGP"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Slovakia").value("SVK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Slovenia").value("SVN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Solomon Islands").value("SLB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Somalia").value("SOM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("South Africa").value("ZAF"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("South Sudan").value("SSD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Spain").value("ESP"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sri Lanka").value("LKA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sudan").value("SDN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Suriname").value("SUR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sweden").value("SWE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Switzerland").value("CHE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Syrian Arab Republic").value("SYR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tajikistan").value("TJK"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Thailand").value("THA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("The former Yugoslav Republic of Macedonia").value("MKD"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Timor-Leste").value("TLS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Togo").value("TGO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tokelau (Associate Member)").value("TKL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tonga").value("TON"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Trinidad and Tobago").value("TTO"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tunisia").value("TUN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Turkey").value("TUR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Turkmenistan").value("TKM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tuvalu").value("TUV"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Uganda").value("UGA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ukraine").value("UKR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("United Arab Emirates").value("ARE"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("United Kingdom").value("GBR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("United Republic of Tanzania").value("TZA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("United States of America").value("USA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Uruguay").value("URY"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Uzbekistan").value("UZB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Vanuatu").value("VUT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Venezuela (Bolivarian Republic of)").value("VEN"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Viet Nam").value("VNM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Yemen").value("YEM"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Zambia").value("ZMB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Zimbabwe").value("ZWE")

                        ]),
                        new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("arealist")
                        .title("What area are you in?")
                        .isRequired(true)
                        .isMultiSelect(false)
                        .style('compact')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ASIA").value("ASIA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("AMERICAS").value("AMERICAS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("EMEA").value("EMEA")
                        ]),
                    new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("languagelist")
                        .title("What languages do you speak?")
                        .isRequired(true)
                        .isMultiSelect(true)
                        .style('compact')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("English").value("en"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Abkhazian").value("ab"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Afar").value("aa"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Afrikaans").value("af"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Albanian").value("sq"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Amharic").value("am"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Arabic").value("ar"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Aragonese").value("an"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Armenian").value("hy"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Assamese").value("as"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Avestan").value("ae"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Aymara").value("ay"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Azerbaijani").value("az"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bashkir").value("ba"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Basque").value("eu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Belarusian").value("be"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bengali").value("bn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bihari").value("bh"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bislama").value("bi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bosnian").value("bs"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Breton").value("br"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Bulgarian").value("bg"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Burmese").value("my"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Catalan").value("ca"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chamorro").value("ch"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chechen").value("ce"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chinese").value("zh"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Church Slavic; Slavonic; Old Bulgarian").value("cu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Chuvash").value("cv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Cornish").value("kw"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Corsican").value("co"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Croatian").value("hr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Czech").value("cs"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Danish").value("da"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Divehi; Dhivehi; Maldivian").value("dv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Dutch").value("nl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Dzongkha").value("dz"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Esperanto").value("eo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Estonian").value("et"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Faroese").value("fo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Fijian").value("fj"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Finnish").value("fi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("French").value("fr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Gaelic; Scottish Gaelic").value("gd"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Galician").value("gl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Georgian").value("ka"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("German").value("de"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Greek, Modern (1453-)").value("el"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Guarani").value("gn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Gujarati").value("gu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Haitian; Haitian Creole").value("ht"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hausa").value("ha"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hebrew").value("he"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Herero").value("hz"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hindi").value("hi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hiri Motu").value("ho"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Hungarian").value("hu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Icelandic").value("is"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ido").value("io"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Indonesian").value("id"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Interlingua (International Auxiliary Language Association)").value("ia"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Interlingue").value("ie"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Inuktitut").value("iu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Inupiaq").value("ik"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Irish").value("ga"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Italian").value("it"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Japanese").value("ja"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Javanese").value("jv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kalaallisut").value("kl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kannada").value("kn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kashmiri").value("ks"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kazakh").value("kk"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Khmer").value("km"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kikuyu; Gikuyu").value("ki"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kinyarwanda").value("rw"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kirghiz").value("ky"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Komi").value("kv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Korean").value("ko"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kuanyama; Kwanyama").value("kj"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Kurdish").value("ku"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lao").value("lo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Latin").value("la"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Latvian").value("lv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Limburgan; Limburger; Limburgish").value("li"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lingala").value("ln"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Lithuanian").value("lt"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Luxembourgish; Letzeburgesch").value("lb"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Macedonian").value("mk"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malagasy").value("mg"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malay").value("ms"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Malayalam").value("ml"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Maltese").value("mt"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Manx").value("gv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Maori").value("mi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Marathi").value("mr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Marshallese").value("mh"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Moldavian").value("mo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Mongolian").value("mn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nauru").value("na"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Navaho, Navajo").value("nv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ndebele, North").value("nd"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ndebele, South").value("nr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ndonga").value("ng"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nepali").value("ne"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Northern Sami").value("se"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Norwegian").value("no"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Norwegian Bokmal").value("nb"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Norwegian Nynorsk").value("nn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Nyanja; Chichewa; Chewa").value("ny"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Occitan (post 1500); Provencal").value("oc"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Oriya").value("or"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Oromo").value("om"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ossetian; Ossetic").value("os"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Pali").value("pi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Panjabi").value("pa"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Persian").value("fa"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Polish").value("pl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Portuguese").value("pt"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Pushto").value("ps"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Quechua").value("qu"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Raeto-Romance").value("rm"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Romanian").value("ro"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Rundi").value("rn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Russian").value("ru"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Samoan").value("sm"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sango").value("sg"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sanskrit").value("sa"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sardinian").value("sc"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Serbian").value("sr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Shona").value("sn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sichuan Yi").value("ii"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sindhi").value("sd"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sinhala; Sinhalese").value("si"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Slovak").value("sk"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Slovenian").value("sl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Somali").value("so"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sotho, Southern").value("st"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Spanish; Castilian").value("es"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Sundanese").value("su"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Swahili").value("sw"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Swati").value("ss"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Swedish").value("sv"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tagalog").value("tl"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tahitian").value("ty"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tajik").value("tg"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tamil").value("ta"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tatar").value("tt"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Telugu").value("te"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Thai").value("th"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tibetan").value("bo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tigrinya").value("ti"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tonga (Tonga Islands)").value("to"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tsonga").value("ts"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Tswana").value("tn"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Turkish").value("tr"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Turkmen").value("tk"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Twi").value("tw"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Uighur").value("ug"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Ukrainian").value("uk"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Urdu").value("ur"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Uzbek").value("uz"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Vietnamese").value("vi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Volapuk").value("vo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Walloon").value("wa"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Welsh").value("cy"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Western Frisian").value("fy"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Wolof").value("wo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Xhosa").value("xh"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Yiddish").value("yi"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Yoruba").value("yo"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Zhuang; Chuang").value("za"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Zulu").value("zu")
                        ]),
                    new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("role")
                        .title("What software engineering role are you in?")
                        .isMultiSelect(false)
                        .isRequired(true)
                        .style('expanded')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Technology Aligned").value("SET"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Industry Aligned").value("SEI"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("DevCrew").value("CREW")
                        ]),
                    new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("techlist")
                        .title("What is/are your priority technology area(s)?")
                        .isMultiSelect(true)
                        .isRequired(true)
                        .style('compact')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Container based cloud platforms (e.g. AKS, ACS Engine, ACI, Service Fabric)").value("APS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Storage, processing and analytic services and solutions (e.g. Spark, Cosmos DB, DataBricks)").value("DATA"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("IoT and Intelligent Edge - End to end IoT solutions, with focus on emerging edge solutions.").value("IOT"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Machine Learning - data scientist focused on building and productionizing ML solutions.").value("ML"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Conversational AI - End to end Conversational AI solutions + speech and NLP.").value("CAAP"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("API Platform - serverless technologies (e.g. Functions, Logic Apps and API services).").value("API"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("DevOps - Focused on customer solutions.").value("DEVOPS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Identity and Auth - Identity and Authentication/Authorization domain expertise.").value("AUTH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Business Apps - (Teams, Graph, Microsoft 365)").value("BIZ"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation (Mixed Reality)").value("INVMR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation (Blockchain)").value("INVBC"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation (Gaming)").value("INVGAME")
                        ]),
                        /*
                        new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("openhackcoach")
                        .title("Which OpenHacks have you coached at?")
                        .isMultiSelect(true)
                        .style('compact')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - Computer Vision").value("MLOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Serverless").value("APIOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Containers").value("AKSOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data").value("DATAOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("IoT").value("IOTOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("MR").value("MROH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("DevOps").value("DOOH"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Teams").value("TEAMSOH")
                        ]),*/
                        
                        new teams.O365ConnectorCardMultichoiceInput(session)
                        .id("deepexp")
                        .title("Please mark the technologies that you have hands-on customer experienced working with?")
                        .isMultiSelect(true)
                        .style('expanded')
                        .choices([
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Virtual Machines").value("Virtual Machines"),
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Cloud Services").value("Cloud Services"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Container Services").value("Container Services"),
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - SaaS Apps - Service Fabric and MicroServices").value("SaaS Apps - Service Fabric and MicroServices"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - AWS").value("AWS"),
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - CtrlS, Local DCs").value("CtrlS, Local DCs"),
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - IBM Cloud").value("IBM Cloud"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Google Cloud").value("Google Cloud"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Storage").value("Storage"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Enterprise Integration").value("Enterprise Integration"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Application Platform Services - Networking").value("Networking"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - MongoDB, MySQL").value("MongoDB, MySQL"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Neo4J, GraphDB").value("Neo4J, GraphDB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Apache Hadoop, Spark, Storm").value("Apache Hadoop, Spark, Storm"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Kafka").value("Kafka"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Power BI Embedded").value("Power BI Embedded"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Databases").value("Databases"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - SQL Datawarehouse").value("SQL Datawarehouse"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Data Lake").value("Data Lake"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Data Factory").value("Data Factory"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - HDInsights").value("HDInsights"),
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - Azure Databricks").value("Azure Databricks"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Data - CosmosDB").value("CosmosDB"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("IoT and Intelligent Edge - IoT Hub/Edge").value("IoT Hub/Edge"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("IoT and Intelligent Edge - Protocols (LoRaWAN, Zigbee, Z-Wave etc)").value("Protocols (LoRaWAN, Zigbee, Z-Wave etc)"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("IoT and Intelligent Edge - Time Series Insights").value("Time Series Insights"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - Machine Learning").value("Machine Learning"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - Python").value("Python"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - R").value("R"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - Deep Learning (CNTK/TF etc…)").value("Deep Learning (CNTK/TF etc…)"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("ML - SQL Server Machine Learning").value("SQL Server Machine Learning"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Conversational AI - Bot Framework").value("Bot Framework"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Conversational AI - Cortana Intelligence").value("Cortana Intelligence"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Conversational AI - Speech").value("Speech"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Conversational AI - Cognitive Services").value("Cognitive Services"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("API Platform - App Services").value("App Services"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("API Platform - Azure Functions").value("Azure Functions"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("API Platform - Logic Apps").value("Logic Apps"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("API Platform - AWS Lambda").value("AWS Lambda"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("DevOps - DevOps").value("DevOps"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("DevOps - Chef, Puppet, Mesos").value("Chef, Puppet, Mesos"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Idenity and Auth - Identity & Access Management").value("Identity & Access Management"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Business Apps - Microsoft Teams").value("Microsoft Teams"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Business Apps - Microsoft 365/ Graph").value("Microsoft 365/ Graph"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation - AR, VR").value("AR, VR"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation - Blockchain").value("Blockchain"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Innovation - Media Services").value("Media Services"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Languages/Tools - Python, Ruby, Java").value("Python, Ruby, Java"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Languages/Tools - Android, iOS Development").value("Android, iOS Development"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Languages/Tools - Linux Apps on Azure").value("Linux Apps on Azure"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Languages/Tools - JavaScript, PHP, NodeJS").value("JavaScript, PHP, NodeJS"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Client Apps - Universal Windows Apps").value("Universal Windows Apps"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Client Apps - Cross Platform Hybrid Solutions").value("Cross Platform Hybrid Solutions"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Client Apps - Xamarin").value("Xamarin"),
                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Client Apps - Web").value("Web")
                        //new teams.O365ConnectorCardMultichoiceInputChoice(session).display("Client Apps - Centennial").value("Centennial")
                        ])
                    ])
                    .actions([
                    new teams.O365ConnectorCardHttpPOST(session)
                        .id("cardActionBtn")
                        .name("submit")
                        .body(JSON.stringify({
                            role: '{{role.value}}',    
                            languagelist: '{{languagelist.value}}',
                            country: '{{countrylist.value}}',
                            area: '{{arealist.value}}',
                            techlist: '{{techlist.value}}',
                            //openhackcoach: '{{openhackcoach.value}}',
                            deepexp: '{{deepexp.value}}',
                            alias: session.userData.profile.user.userPrincipalName.split("@")[0].toUpperCase(),
                            name: session.userData.profile.user.name
                        })),
                    ]);
                    var card = new teams.O365ConnectorCard(session)
                        .summary("o365_card_summary")
                        .themeColor("#E67A9E")
                        .title("Hi "+session.userData.profile.user.name+" ("+session.userData.profile.user.userPrincipalName.split("@")[0].toUpperCase()+")")
                        .potentialAction([
                            cardTechSkills
                        ]); 
                    
                    var msg = new teams.TeamsMessage(session)
                        .attachments([card]);
            
                    session.send(msg);
                    session.endDialog();

                });
                
        }

    }
]);

var o365CardActionHandler = function (event, query, callback) {

    var body = JSON.parse(query.body);

    
    var docObj = {
        "name": body.name,
        "alias": body.alias,
        "role": body.role,
        "country": body.country,
        "area": body.area,
        "languages": body.languagelist.split("; "),
        "techdomains": body.techlist.split("; "),
        //"openhackcoach": body.openhackcoach.split("; "),
        "L3": body.deepexp.split("; ")
    }
    
    client.queryDocuments(collectionUrl, 'SELECT * FROM c where c.alias = "'+docObj.alias+'"').toArray((err, results) => {
        if (results) {
            if (results.length==0){
                // there isn't a document for this person review on this project so create it
                client.createDocument(collectionUrl, docObj, (err, created) => {});
            }
            else {
                for (var queryResult of results) {
                    replaceDocument(queryResult, docObj);
                }
            }
        }
    });
    
    var msg = new builder.Message() 
        .address(event.address) 
        .summary("Thanks for your input!") 
        .textFormat("xml") 
        .text("<h2>Thanks, " + docObj.name + " your answers have been saved.</h2><br/><h3>If you complete the survey again your previous responses will be overwritten.<br/></h3>"); 
    connector.send([msg.toMessage()], function (err, address) { 
    }); 

    callback(null, null, 200);
};
connector.onO365ConnectorCardAction(o365CardActionHandler);

function replaceDocument(document,docObj) {
    var documentUrl = `${collectionUrl}/docs/${document.id}`;

    docObj.id = document.id;
    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, docObj, (err, result) => {});
    });
};

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

