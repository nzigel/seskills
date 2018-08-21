var ds = require('../data/inputs');
var du = require('../data/update');

module.exports = [
    function (session) {
        var updateType = "updateForm";
        var includeGreeting = true;
        if (session.message && session.message.value && session.message.value.type==updateType) {
            // A Card's Submit Action obj was received
            return du.processSubmitAction(session, session.message.value);
        }

        var formData = [];
        formData.push(ds.getCountryCard(session));
        formData.push(ds.getAreaCard(session));
        formData.push(ds.getLanguageCard(session));
        formData.push(ds.getRoleCard(session));
        formData.push(ds.getDomainCard(session));
        formData.push(ds.getOpenHackCoachCard(session));
        formData.push(ds.getOpenHackAttendeeCard(session));
        //formData.push(ds.getExperienceCard(session));
        // call experience after setting main form data - the form is too long for teams to display if experience is included.
        var msg = ds.getCardMsg(session, formData, updateType, includeGreeting);
        session.send(msg);
    }
];

