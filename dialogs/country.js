var ds = require('../data/inputs');
var du = require('../data/update');

module.exports = [
    function (session) {
        var updateType = "updateCountry";
        var includeGreeting = false;
        if (session.message && session.message.value && session.message.value.type==updateType) {
            // A Card's Submit Action obj was received
            return du.processSubmitAction(session, session.message.value);
        }

        var formData = [];
        formData.push(ds.getCountryCard(session));
        var msg = ds.getCardMsg(session, formData, updateType, includeGreeting);
        session.send(msg);
    }
];

