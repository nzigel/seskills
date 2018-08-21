var builder = require('botbuilder');

var listData = {"countries": [
{"title": "Afghanistan","value": "AFG"},
{"title": "Albania","value": "ALB"},
{"title": "Algeria","value": "DZA"},
{"title": "Andorra","value": "AND"},
{"title": "Angola","value": "AGO"},
{"title": "Antigua and Barbuda","value": "ATG"},
{"title": "Argentina","value": "ARG"},
{"title": "Armenia","value": "ARM"},
{"title": "Australia","value": "AUS"},
{"title": "Austria","value": "AUT"},
{"title": "Azerbaijan","value": "AZE"},
{"title": "Bahamas","value": "BHS"},
{"title": "Bahrain","value": "BHR"},
{"title": "Bangladesh","value": "BGD"},
{"title": "Barbados","value": "BRB"},
{"title": "Belarus","value": "BLR"},
{"title": "Belgium","value": "BEL"},
{"title": "Belize","value": "BLZ"},
{"title": "Benin","value": "BEN"},
{"title": "Bhutan","value": "BTN"},
{"title": "Bolivia (Plurinational State of)","value": "BOL"},
{"title": "Bosnia and Herzegovina","value": "BIH"},
{"title": "Botswana","value": "BWA"},
{"title": "Brazil","value": "BRA"},
{"title": "Brunei Darussalam","value": "BRN"},
{"title": "Bulgaria","value": "BGR"},
{"title": "Burkina Faso","value": "BFA"},
{"title": "Burundi","value": "BDI"},
{"title": "Cabo Verde","value": "CPV"},
{"title": "Cambodia","value": "KHM"},
{"title": "Cameroon","value": "CMR"},
{"title": "Canada","value": "CAN"},
{"title": "Central African Republic","value": "CAF"},
{"title": "Chad","value": "TCD"},
{"title": "Chile","value": "CHL"},
{"title": "China","value": "CHN"},
{"title": "Colombia","value": "COL"},
{"title": "Comoros","value": "COM"},
{"title": "Congo","value": "COG"},
{"title": "Cook Islands","value": "COK"},
{"title": "Costa Rica","value": "CRI"},
{"title": "Croatia","value": "HRV"},
{"title": "Cuba","value": "CUB"},
{"title": "Cyprus","value": "CYP"},
{"title": "Czechia","value": "CZE"},
{"title": "Côte d'Ivoire","value": "CIV"},
{"title": "Democratic People's Republic of Korea","value": "PRK"},
{"title": "Democratic Republic of the Congo","value": "COD"},
{"title": "Denmark","value": "DNK"},
{"title": "Djibouti","value": "DJI"},
{"title": "Dominica","value": "DMA"},
{"title": "Dominican Republic","value": "DOM"},
{"title": "Ecuador","value": "ECU"},
{"title": "Egypt","value": "EGY"},
{"title": "El Salvador","value": "SLV"},
{"title": "Equatorial Guinea","value": "GNQ"},
{"title": "Eritrea","value": "ERI"},
{"title": "Estonia","value": "EST"},
{"title": "Eswatini","value": "SWZ"},
{"title": "Ethiopia","value": "ETH"},
{"title": "Faroe Islands (Associate Member)","value": "FRO"},
{"title": "Fiji","value": "FJI"},
{"title": "Finland","value": "FIN"},
{"title": "France","value": "FRA"},
{"title": "Gabon","value": "GAB"},
{"title": "Gambia","value": "GMB"},
{"title": "Georgia","value": "GEO"},
{"title": "Germany","value": "DEU"},
{"title": "Ghana","value": "GHA"},
{"title": "Greece","value": "GRC"},
{"title": "Grenada","value": "GRD"},
{"title": "Guatemala","value": "GTM"},
{"title": "Guinea","value": "GIN"},
{"title": "Guinea-Bissau","value": "GNB"},
{"title": "Guyana","value": "GUY"},
{"title": "Haiti","value": "HTI"},
{"title": "Honduras","value": "HND"},
{"title": "Hong Kong","value": "HKG"},
{"title": "Hungary","value": "HUN"},
{"title": "Iceland","value": "ISL"},
{"title": "India","value": "IND"},
{"title": "Indonesia","value": "IDN"},
{"title": "Iran (Islamic Republic of)","value": "IRN"},
{"title": "Iraq","value": "IRQ"},
{"title": "Ireland","value": "IRL"},
{"title": "Israel","value": "ISR"},
{"title": "Italy","value": "ITA"},
{"title": "Jamaica","value": "JAM"},
{"title": "Japan","value": "JPN"},
{"title": "Jordan","value": "JOR"},
{"title": "Kazakhstan","value": "KAZ"},
{"title": "Kenya","value": "KEN"},
{"title": "Kiribati","value": "KIR"},
{"title": "Kuwait","value": "KWT"},
{"title": "Kyrgyzstan","value": "KGZ"},
{"title": "Lao People's Democratic Republic","value": "LAO"},
{"title": "Latvia","value": "LVA"},
{"title": "Lebanon","value": "LBN"},
{"title": "Lesotho","value": "LSO"},
{"title": "Liberia","value": "LBR"},
{"title": "Libya","value": "LBY"},
{"title": "Lithuania","value": "LTU"},
{"title": "Luxembourg","value": "LUX"},
{"title": "Madagascar","value": "MDG"},
{"title": "Malawi","value": "MWI"},
{"title": "Malaysia","value": "MYS"},
{"title": "Maldives","value": "MDV"},
{"title": "Mali","value": "MLI"},
{"title": "Malta","value": "MLT"},
{"title": "Marshall Islands","value": "MHL"},
{"title": "Mauritania","value": "MRT"},
{"title": "Mauritius","value": "MUS"},
{"title": "Mexico","value": "MEX"},
{"title": "Micronesia (Federated States of)","value": "FSM"},
{"title": "Monaco","value": "MCO"},
{"title": "Mongolia","value": "MNG"},
{"title": "Montenegro","value": "MNE"},
{"title": "Morocco","value": "MAR"},
{"title": "Mozambique","value": "MOZ"},
{"title": "Myanmar","value": "MMR"},
{"title": "Namibia","value": "NAM"},
{"title": "Nauru","value": "NRU"},
{"title": "Nepal","value": "NPL"},
{"title": "Netherlands","value": "NLD"},
{"title": "New Zealand","value": "NZL"},
{"title": "Nicaragua","value": "NIC"},
{"title": "Niger","value": "NER"},
{"title": "Nigeria","value": "NGA"},
{"title": "Niue","value": "NIU"},
{"title": "Norway","value": "NOR"},
{"title": "Oman","value": "OMN"},
{"title": "Pakistan","value": "PAK"},
{"title": "Palau","value": "PLW"},
{"title": "Panama","value": "PAN"},
{"title": "Papua New Guinea","value": "PNG"},
{"title": "Paraguay","value": "PRY"},
{"title": "Peru","value": "PER"},
{"title": "Philippines","value": "PHL"},
{"title": "Poland","value": "POL"},
{"title": "Portugal","value": "PRT"},
{"title": "Qatar","value": "QAT"},
{"title": "Republic of Korea","value": "KOR"},
{"title": "Republic of Moldova","value": "MDA"},
{"title": "Romania","value": "ROU"},
{"title": "Russian Federation","value": "RUS"},
{"title": "Rwanda","value": "RWA"},
{"title": "Saint Kitts and Nevis","value": "KNA"},
{"title": "Saint Lucia","value": "LCA"},
{"title": "Saint Vincent and the Grenadines","value": "VCT"},
{"title": "Samoa","value": "WSM"},
{"title": "San Marino","value": "SMR"},
{"title": "Sao Tome and Principe","value": "STP"},
{"title": "Saudi Arabia","value": "SAU"},
{"title": "Senegal","value": "SEN"},
{"title": "Serbia","value": "SRB"},
{"title": "Seychelles","value": "SYC"},
{"title": "Sierra Leone","value": "SLE"},
{"title": "Singapore","value": "SGP"},
{"title": "Slovakia","value": "SVK"},
{"title": "Slovenia","value": "SVN"},
{"title": "Solomon Islands","value": "SLB"},
{"title": "Somalia","value": "SOM"},
{"title": "South Africa","value": "ZAF"},
{"title": "South Sudan","value": "SSD"},
{"title": "Spain","value": "ESP"},
{"title": "Sri Lanka","value": "LKA"},
{"title": "Sudan","value": "SDN"},
{"title": "Suriname","value": "SUR"},
{"title": "Sweden","value": "SWE"},
{"title": "Switzerland","value": "CHE"},
{"title": "Syrian Arab Republic","value": "SYR"},
{"title": "Taiwan","value": "TWN"},
{"title": "Tajikistan","value": "TJK"},
{"title": "Thailand","value": "THA"},
{"title": "The former Yugoslav Republic of Macedonia","value": "MKD"},
{"title": "Timor-Leste","value": "TLS"},
{"title": "Togo","value": "TGO"},
{"title": "Tokelau (Associate Member)","value": "TKL"},
{"title": "Tonga","value": "TON"},
{"title": "Trinidad and Tobago","value": "TTO"},
{"title": "Tunisia","value": "TUN"},
{"title": "Turkey","value": "TUR"},
{"title": "Turkmenistan","value": "TKM"},
{"title": "Tuvalu","value": "TUV"},
{"title": "Uganda","value": "UGA"},
{"title": "Ukraine","value": "UKR"},
{"title": "United Arab Emirates","value": "ARE"},
{"title": "United Kingdom","value": "GBR"},
{"title": "United Republic of Tanzania","value": "TZA"},
{"title": "United States of America","value": "USA"},
{"title": "Uruguay","value": "URY"},
{"title": "Uzbekistan","value": "UZB"},
{"title": "Vanuatu","value": "VUT"},
{"title": "Venezuela (Bolivarian Republic of)","value": "VEN"},
{"title": "Viet Nam","value": "VNM"},
{"title": "Yemen","value": "YEM"},
{"title": "Zambia","value": "ZMB"},
{"title": "Zimbabwe","value": "ZWE"}],
"languages": [
{"title": "English","value": "en"},
{"title": "Abkhazian","value": "ab"},
{"title": "Afar","value": "aa"},
{"title": "Afrikaans","value": "af"},
{"title": "Albanian","value": "sq"},
{"title": "Amharic","value": "am"},
{"title": "Arabic","value": "ar"},
{"title": "Aragonese","value": "an"},
{"title": "Armenian","value": "hy"},
{"title": "Assamese","value": "as"},
{"title": "Avestan","value": "ae"},
{"title": "Aymara","value": "ay"},
{"title": "Azerbaijani","value": "az"},
{"title": "Bashkir","value": "ba"},
{"title": "Basque","value": "eu"},
{"title": "Belarusian","value": "be"},
{"title": "Bengali","value": "bn"},
{"title": "Bihari","value": "bh"},
{"title": "Bislama","value": "bi"},
{"title": "Bosnian","value": "bs"},
{"title": "Breton","value": "br"},
{"title": "Bulgarian","value": "bg"},
{"title": "Burmese","value": "my"},
{"title": "Catalan","value": "ca"},
{"title": "Chamorro","value": "ch"},
{"title": "Chechen","value": "ce"},
{"title": "Chinese","value": "zh"},
{"title": "Church Slavic; Slavonic; Old Bulgarian","value": "cu"},
{"title": "Chuvash","value": "cv"},
{"title": "Cornish","value": "kw"},
{"title": "Corsican","value": "co"},
{"title": "Croatian","value": "hr"},
{"title": "Czech","value": "cs"},
{"title": "Danish","value": "da"},
{"title": "Divehi; Dhivehi; Maldivian","value": "dv"},
{"title": "Dutch","value": "nl"},
{"title": "Dzongkha","value": "dz"},
{"title": "Esperanto","value": "eo"},
{"title": "Estonian","value": "et"},
{"title": "Faroese","value": "fo"},
{"title": "Fijian","value": "fj"},
{"title": "Finnish","value": "fi"},
{"title": "French","value": "fr"},
{"title": "Gaelic; Scottish Gaelic","value": "gd"},
{"title": "Galician","value": "gl"},
{"title": "Georgian","value": "ka"},
{"title": "German","value": "de"},
{"title": "Greek, Modern (1453-)","value": "el"},
{"title": "Guarani","value": "gn"},
{"title": "Gujarati","value": "gu"},
{"title": "Haitian; Haitian Creole","value": "ht"},
{"title": "Hausa","value": "ha"},
{"title": "Hebrew","value": "he"},
{"title": "Herero","value": "hz"},
{"title": "Hindi","value": "hi"},
{"title": "Hiri Motu","value": "ho"},
{"title": "Hungarian","value": "hu"},
{"title": "Icelandic","value": "is"},
{"title": "Ido","value": "io"},
{"title": "Indonesian","value": "id"},
{"title": "Interlingua (International Auxiliary Language Association)","value": "ia"},
{"title": "Interlingue","value": "ie"},
{"title": "Inuktitut","value": "iu"},
{"title": "Inupiaq","value": "ik"},
{"title": "Irish","value": "ga"},
{"title": "Italian","value": "it"},
{"title": "Japanese","value": "ja"},
{"title": "Javanese","value": "jv"},
{"title": "Kalaallisut","value": "kl"},
{"title": "Kannada","value": "kn"},
{"title": "Kashmiri","value": "ks"},
{"title": "Kazakh","value": "kk"},
{"title": "Khmer","value": "km"},
{"title": "Kikuyu; Gikuyu","value": "ki"},
{"title": "Kinyarwanda","value": "rw"},
{"title": "Kirghiz","value": "ky"},
{"title": "Komi","value": "kv"},
{"title": "Korean","value": "ko"},
{"title": "Kuanyama; Kwanyama","value": "kj"},
{"title": "Kurdish","value": "ku"},
{"title": "Lao","value": "lo"},
{"title": "Latin","value": "la"},
{"title": "Latvian","value": "lv"},
{"title": "Limburgan; Limburger; Limburgish","value": "li"},
{"title": "Lingala","value": "ln"},
{"title": "Lithuanian","value": "lt"},
{"title": "Luxembourgish; Letzeburgesch","value": "lb"},
{"title": "Macedonian","value": "mk"},
{"title": "Malagasy","value": "mg"},
{"title": "Malay","value": "ms"},
{"title": "Malayalam","value": "ml"},
{"title": "Maltese","value": "mt"},
{"title": "Manx","value": "gv"},
{"title": "Maori","value": "mi"},
{"title": "Marathi","value": "mr"},
{"title": "Marshallese","value": "mh"},
{"title": "Moldavian","value": "mo"},
{"title": "Mongolian","value": "mn"},
{"title": "Nauru","value": "na"},
{"title": "Navaho, Navajo","value": "nv"},
{"title": "Ndebele, North","value": "nd"},
{"title": "Ndebele, South","value": "nr"},
{"title": "Ndonga","value": "ng"},
{"title": "Nepali","value": "ne"},
{"title": "Northern Sami","value": "se"},
{"title": "Norwegian","value": "no"},
{"title": "Norwegian Bokmal","value": "nb"},
{"title": "Norwegian Nynorsk","value": "nn"},
{"title": "Nyanja; Chichewa; Chewa","value": "ny"},
{"title": "Occitan (post 1500); Provencal","value": "oc"},
{"title": "Oriya","value": "or"},
{"title": "Oromo","value": "om"},
{"title": "Ossetian; Ossetic","value": "os"},
{"title": "Pali","value": "pi"},
{"title": "Panjabi","value": "pa"},
{"title": "Persian","value": "fa"},
{"title": "Polish","value": "pl"},
{"title": "Portuguese","value": "pt"},
{"title": "Pushto","value": "ps"},
{"title": "Quechua","value": "qu"},
{"title": "Raeto-Romance","value": "rm"},
{"title": "Romanian","value": "ro"},
{"title": "Rundi","value": "rn"},
{"title": "Russian","value": "ru"},
{"title": "Samoan","value": "sm"},
{"title": "Sango","value": "sg"},
{"title": "Sanskrit","value": "sa"},
{"title": "Sardinian","value": "sc"},
{"title": "Serbian","value": "sr"},
{"title": "Shona","value": "sn"},
{"title": "Sichuan Yi","value": "ii"},
{"title": "Sindhi","value": "sd"},
{"title": "Sinhala; Sinhalese","value": "si"},
{"title": "Slovak","value": "sk"},
{"title": "Slovenian","value": "sl"},
{"title": "Somali","value": "so"},
{"title": "Sotho, Southern","value": "st"},
{"title": "Spanish; Castilian","value": "es"},
{"title": "Sundanese","value": "su"},
{"title": "Swahili","value": "sw"},
{"title": "Swati","value": "ss"},
{"title": "Swedish","value": "sv"},
{"title": "Tagalog","value": "tl"},
{"title": "Tahitian","value": "ty"},
{"title": "Tajik","value": "tg"},
{"title": "Tamil","value": "ta"},
{"title": "Tatar","value": "tt"},
{"title": "Telugu","value": "te"},
{"title": "Thai","value": "th"},
{"title": "Tibetan","value": "bo"},
{"title": "Tigrinya","value": "ti"},
{"title": "Tonga (Tonga Islands)","value": "to"},
{"title": "Tsonga","value": "ts"},
{"title": "Tswana","value": "tn"},
{"title": "Turkish","value": "tr"},
{"title": "Turkmen","value": "tk"},
{"title": "Twi","value": "tw"},
{"title": "Uighur","value": "ug"},
{"title": "Ukrainian","value": "uk"},
{"title": "Urdu","value": "ur"},
{"title": "Uzbek","value": "uz"},
{"title": "Vietnamese","value": "vi"},
{"title": "Volapuk","value": "vo"},
{"title": "Walloon","value": "wa"},
{"title": "Welsh","value": "cy"},
{"title": "Western Frisian","value": "fy"},
{"title": "Wolof","value": "wo"},
{"title": "Xhosa","value": "xh"},
{"title": "Yiddish","value": "yi"},
{"title": "Yoruba","value": "yo"},
{"title": "Zhuang; Chuang","value": "za"},
{"title": "Zulu","value": "zu"}
],
techdomains: [
    {"title": "Application Platform Services - Container based cloud platforms (e.g. AKS, ACS Engine, ACI, Service Fabric)","value": "APS"},
    {"title": "Data - Storage, processing and analytic services and solutions (e.g. Spark, Cosmos DB, DataBricks)","value": "DATA"},
    {"title": "IoT and Intelligent Edge - End to end IoT solutions, with focus on emerging edge solutions.","value": "IOT"},
    {"title": "Machine Learning - data scientist focused on building and productionizing ML solutions.","value": "ML"},
    {"title": "Conversational AI - End to end Conversational AI solutions + speech and NLP.","value": "CAAP"},
    {"title": "API Platform - serverless technologies (e.g. Functions, Logic Apps and API services).","value": "API"},
    {"title": "DevOps - Focused on customer solutions.","value": "DEVOPS"},
    {"title": "Identity and Auth - Identity and Authentication/Authorization domain expertise.","value": "AUTH"},
    {"title": "Business Apps - (Teams, Graph, Microsoft 365)","value": "BIZ"},
    {"title": "Incubation (Mixed Reality)","value": "INCMR"},
    {"title": "Incubation (Blockchain)","value": "INCBC"},
    {"title": "Incubation (Gaming)","value": "INCGAME"},
    {"title": "Incubation (Quantum)","value": "INCQUANT"}
],
area: [
{"title": "AMERICAS","value": "AMERICAS"},
{"title": "ASIA","value": "ASIA"},
{"title": "EMEA","value": "EMEA"}
],
role: [
{"title": "Technology Aligned","value": "SET"},
{"title": "Industry Aligned","value": "SEI"},
{"title": "DevCrew","value": "CREW"}
],
techskills: [
{"title": "Application Platform Services: Virtual Machines","value": "0"},
{"title": "Application Platform Services: Cloud Services","value": "1"},
{"title": "Application Platform Services: PaaS Offerings (e.g. Service Fabric)","value": "2"},
{"title": "Application Platform Services: AWS","value": "3"},
{"title": "Application Platform Services: CtrlS, Local DCs","value": "4"},
{"title": "Application Platform Services: IBM Cloud","value": "5"},
{"title": "Application Platform Services: Google Cloud","value": "6"},
{"title": "Application Platform Services: Storage","value": "7"},
{"title": "Application Platform Services: Enterprise Integration","value": "8"},
{"title": "Application Platform Services: Networking","value": "9"},
{"title": "Application Platform Services: Platform Level Security","value": "10"},
{"title": "Application Platform Services: Raw K8s","value": "11"},
{"title": "Application Platform Services: Unmanaged K8s as a service (ACS, ACS Engine Like Services)","value": "12"},
{"title": "Application Platform Services: Managed K8s Services (e.g. AKS, EKS, GKE)","value": "13"},
{"title": "Application Platform Services: Hybrid OnPrem/Cloud Architecture","value": "14"},
{"title": "Data: Consumption - Power BI (Service)","value": "15"},
{"title": "Data: Consumption - Power BI (Embedded)","value": "16"},
{"title": "Data: Relational - Azure SQL Database","value": "17"},
{"title": "Data: Relational - Azure SQL Data Warehouse","value": "18"},
{"title": "Data: Relational - Azure Database for MySQL","value": "19"},
{"title": "Data: Relational - Azure Database for PostgreSQL","value": "20"},
{"title": "Data: Azure Analytics Service","value": "21"},
{"title": "Data: CosmosDB - Service","value": "22"},
{"title": "Data: CosmosDB - APIs - SQL","value": "23"},
{"title": "Data: CosmosDB - APIs - Gremlin","value": "24"},
{"title": "Data: CosmosDB - APIs - MongoDB","value": "25"},
{"title": "Data: CosmosDB - APIs - Table","value": "26"},
{"title": "Data: CosmosDB - APIs - Cassandra","value": "27"},
{"title": "Data: NoSQL in IaaS - Cassandra","value": "28"},
{"title": "Data: NoSQL in IaaS - MongoDB","value": "29"},
{"title": "Data: NoSQL in IaaS - Neo4j","value": "30"},
{"title": "Data: NoSQL in IaaS - CouchDB","value": "31"},
{"title": "Data: Spark - Azure DataBricks","value": "32"},
{"title": "Data: Hadoop - HDInsight","value": "33"},
{"title": "Data: Buffered Ingestion Points - EventHubs","value": "34"},
{"title": "Data: Buffered Ingestion Points - IoT Hub","value": "35"},
{"title": "Data: Buffered Ingestion Points - Kafka (HDInsight/IaaS)","value": "36"},
{"title": "Data: Stream Processing - Azure Stream Analytics","value": "37"},
{"title": "Data: Stream Processing - Storm (HDInsight/IaaS)","value": "38"},
{"title": "Data: Stream Processing - Spark Structured Streaming (HDInsight/Azure Databricks/IaaS)","value": "39"},
{"title": "Data: Orchestration - Azure Data Factory Gen2","value": "40"},
{"title": "Data: Orchestration - Informatica","value": "41"},
{"title": "Data: Storage - Azure Data Lake Storage Gen1","value": "42"},
{"title": "Data: Storage - Azure Data Lake Storage Gen2","value": "43"},
{"title": "IoT and Intelligent Edge: IoT Hub","value": "44"},
{"title": "IoT and Intelligent Edge: IoT Edge","value": "45"},
{"title": "IoT and Intelligent Edge: Time Series Insights","value": "46"},
{"title": "IoT and Intelligent Edge: Device Provisioning Service","value": "47"},
{"title": "IoT and Intelligent Edge: Device Configuration Service","value": "48"},
{"title": "IoT and Intelligent Edge: Protocols (OPC-UA, OPC-DA, Modbus, BacNet, LoRaWAN, SigFox, CoAP, EEBus)","value": "49"},
{"title": "IoT and Intelligent Edge: Solution Accelerators / Pre-Configured Solutions","value": "50"},
{"title": "IoT and Intelligent Edge: IoT Security","value": "51"},
{"title": "Machine Learning: Python","value": "52"},
{"title": "Machine Learning: R","value": "53"},
{"title": "Machine Learning: Deep Learning (CNTK/TF etc)","value": "54"},
{"title": "Machine Learning: Data Preparation (using libraries like Numpy, Pandas, etc)","value": "55"},
{"title": "Machine Learning: Statistical ML (or Traditional ML)","value": "56"},
{"title": "Conversational AI: Bot Framework","value": "57"},
{"title": "Conversational AI: Speech","value": "58"},
{"title": "Conversational AI: LUIS","value": "59"},
{"title": "Conversational AI: Natural Language Processing","value": "60"},
{"title": "Developer Application Platform: App Services","value": "61"},
{"title": "Developer Application Platform: Azure Functions","value": "62"},
{"title": "Developer Application Platform: Logic Apps","value": "63"},
{"title": "Developer Application Platform: Event Grid","value": "64"},
{"title": "Developer Application Platform: AWS Lambda","value": "65"},
{"title": "DevOps: Chef, Puppet","value": "66"},
{"title": "DevOps: Mesos","value": "67"},
{"title": "DevOps: Jenkins","value": "68"},
{"title": "DevOps: Visual Studio Team Services","value": "69"},
{"title": "DevOps: Other CI / CD (i.e. Travis, Circle)","value": "70"},
{"title": "DevOps: Immutable Infrastructure (ARM, Terraform, Pulumi)","value": "71"},
{"title": "DevOps: Azure monitoring solutions (Azure Monitor, Application Insights, Log Analytics, etc)","value": "72"},
{"title": "Idenity and Auth: Configuring SSO for an App with AAD","value": "73"},
{"title": "Idenity and Auth: Calling AAD-secured APIs","value": "74"},
{"title": "Idenity and Auth: Securing an API with AAD","value": "75"},
{"title": "Idenity and Auth: Configuring auth / permission in an app using AAD structures such as Group Membership","value": "76"},
{"title": "Business Apps: Outlook Group Connectors","value": "77"},
{"title": "Business Apps: Microsoft Teams","value": "78"},
{"title": "Business Apps: Microsoft 365/ Graph","value": "79"},
{"title": "Incubation: VR","value": "80"},
{"title": "Incubation: Holographic","value": "81"},
{"title": "Incubation: Mobile AR","value": "82"},
{"title": "Incubation: Blockchain","value": "83"},
{"title": "Incubation: Gaming","value": "84"},
{"title": "Incubation: Media Services","value": "85"},
{"title": "Languages/Tools: Python","value": "86"},
{"title": "Languages/Tools: Java","value": "87"},
{"title": "Languages/Tools: Android, iOS Development","value": "88"},
{"title": "Languages/Tools: Linux Experience","value": "89"},
{"title": "Languages/Tools: JavaScript, PHP, NodeJS","value": "90"},
{"title": "Languages/Tools: C, C++","value": "91"},
{"title": "Client Apps: Universal Windows Apps","value": "92"},
{"title": "Client Apps: Cross Platform Hybrid Solutions","value": "93"},
{"title": "Client Apps: Xamarin","value": "94"},
{"title": "Client Apps: Centennial","value": "95"}
],
openhacks: [
{"title": "Business Apps - Multi-Workload Teams App","value": "Teams"},
{"title": "Developer Application Platform - Serverless Enterprise Integration","value": "Functions"},
{"title": "Application Platform Services - Lift and Shift, Modern Microservices Architecture","value": "Containers"},
{"title": "DevOps - Zero Downtime Deployment","value": "DevOps"},
{"title": "Machine Learning  - Computer Vision","value": "MLCV"},
{"title": "IoT and Intelligent Edge - Asset Management","value": "IoTData"}
]
};

function getCardMsg(session, formData, updateType, includeGreeting) {
    var card = {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            body: [
            ],
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Update",
                    'data': {
                        'type': updateType
                    }
                }
            ]
        }
    }

    if (includeGreeting) {
        card.content.body.push(
        {
            "type": "TextBlock",
            "text": "Hi, " + session.userData.doc.name + " please answer the following questions:",
            "size": "small"
        }
        );
    }

    for (x=0; x< formData.length; x++) {
        card.content.body.push(
            {
                "type": "TextBlock",
                "text": formData[x].title,
                "size": "small"
            }
        )
        card.content.body.push(
            {
                "type": "Input.ChoiceSet",
                "id": formData[x].listId,
                "style": formData[x].style,
                "isMultiSelect": formData[x].isMultiSelect,
                "value": "",
                "choices": []
            }
        )

        if (formData[x].listId=="techexperience") {
            // for tech experience we need to turn title to value
            var i;
            var j;
            var selectionStr = ""
            for (j=0; j< formData[x].value.length; j++) {
                for (i = 0; i < formData[x].choices.length; i++) { 
                    // needed as "," isn't allowed in value in selection card
                    if(formData[x].choices[i].title.split(":")[1].trim()==formData[x].value[j]) {
                        if (selectionStr=="") selectionStr+=i;
                        else selectionStr+=","+i;
                        break;
                    }
                }
            }
            // replace the value array with the string of index values
            formData[x].value = selectionStr;
        }

        card.content.body[card.content.body.length-1].choices = formData[x].choices;      
        card.content.body[card.content.body.length-1].value = formData[x].value;
    }

    var msg = new builder.Message(session)
        .addAttachment(card);

    return msg;
}

function getLanguages() {
    return listData.languages;
}

function getCountries() {
    return listData.countries;
}

function getSkills() {
    return listData.techskills;
}

function getDomains() {
    return listData.techdomains;
}

function getArea() {
    return listData.area;
}

function getOpenHacks() {
    return listData.openhacks;
}

function getCountryCard(session) {
    return {
        "title": "Please select the country that you live in:",
        "listId": "country",
        "style": "compact",
        "isMultiSelect": false,
        "choices": session.userData.countries,
        "value": session.userData.doc.country
    }
}

function getOpenHackCoachCard(session) {
    return {
        "title": "Please select the Open Hacks you are trained to coach:",
        "listId": "coachOH",
        "style": "expanded",
        "isMultiSelect": true,
        "choices": session.userData.openhacks,
        "value": (session.userData.doc.coachOH)?session.userData.doc.coachOH.toString():""
    }
}

function getOpenHackAttendeeCard(session) {
    return {
        "title": "Please select the Open Hacks that you have attended (not as a coach):",
        "listId": "attendOH",
        "style": "expanded",
        "isMultiSelect": true,
        "choices": session.userData.openhacks,
        "value": (session.userData.doc.attendOH)?session.userData.doc.attendOH.toString():""
    }
}

function getRoleCard(session) {
    return {
        "title": "Please select the role that you are in:",
        "listId": "role",
        "style": "compact",
        "isMultiSelect": false,
        "choices": session.userData.role,
        "value": session.userData.doc.role
    }
}

function getAreaCard(session) {
    return {
        "title": "Please select the area that you live in:",
        "listId": "area",
        "style": "compact",
        "isMultiSelect": false,
        "choices": session.userData.area,
        "value": session.userData.doc.area
    }
}

function getLanguageCard(session) {
    return {
        "title": "Please select the languages that you can speak:",
        "listId": "languages",
        "style": "compact",
        "isMultiSelect": true,
        "choices": session.userData.languages,
        "value": (session.userData.doc.languages)?session.userData.doc.languages.toString():""
    }
}

function getDomainCard(session) {
    return {
        "title": "Please select the technology domain(s) that you are focused on:",
        "listId": "techdomains",
        "style": "compact",
        "isMultiSelect": true,
        "choices": session.userData.techdomains,
        "value": (session.userData.doc.techdomains)?session.userData.doc.techdomains.toString():""
    }
}

function getExperienceCard(session) {
    return {
        "title": "Please mark the technologies where you have hands-on customer experience:",
        "listId": "techexperience",
        "style": "expanded",
        "isMultiSelect": true,
        "choices": session.userData.techskills,
        "value": session.userData.doc.L3
    }
}

function getRole() {
    return listData.role;
}

module.exports = {
    getCountries: function () {
        return getCountries();
    },
    getLanguages: function () {
        return getLanguages();
    },
    getSkills: function () {
        return getSkills();
    },
    getDomains: function () {
        return getDomains();
    },
    getArea: function () {
        return getArea();
    },
    getRole: function () {
        return getRole();
    },
    getOpenHacks: function () {
        return getOpenHacks();
    },
    getAreaCard: function(session) {
        return getAreaCard(session);
    },
    getCountryCard: function(session) {
        return getCountryCard(session);
    },
    getRoleCard: function(session) {
        return getRoleCard(session);
    },
    getLanguageCard: function(session) {
        return getLanguageCard(session);
    },
    getDomainCard: function(session) {
        return getDomainCard(session);
    },
    getExperienceCard: function(session) {
        return getExperienceCard(session);
    },
    getOpenHackAttendeeCard: function(session) {
        return getOpenHackAttendeeCard(session);
    },
    getOpenHackCoachCard: function(session) {
        return getOpenHackCoachCard(session);
    },
    getCardMsg: function (session, formData, updateType, includeGreeting) {
        return getCardMsg(session, formData, updateType, includeGreeting);
    }
};