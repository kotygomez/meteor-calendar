CalEvents = new Meteor.Collection('calevents');

CalEvents.allow({
    'update': function(userId) {
        return true;
    },
    'insert': function(userId) {
        return true;
    },
    'remove': function(userId) {
        return true;
    }
});