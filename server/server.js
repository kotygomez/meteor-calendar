Meteor.startup(function() {
 
  if(CalEvents.find().fetch().length === 0) {

    var startDateTime = new Date();
    var endDateTime = moment(new Date(startDateTime)).add(1, 'h').toISOString();
    endDateTime = new Date(endDateTime);

    
    console.log('Creating dummy requests: ');
 
    var events = [];

    for(var i = 0; i < 1000; i++) {    
        CalEvents.insert({title: 'New Event' + i, start: startDateTime, end: endDateTime });
        
        startDateTime = endDateTime;
        
        if(i % 5 == 0) {
            startDateTime = moment(new Date(startDateTime)).add(1, 'd').hour(0).toISOString();
            startDateTime = new Date(startDateTime);
        
            endDateTime = moment(new Date(startDateTime)).add(1, 'h').toISOString();
            endDateTime = new Date(endDateTime);
        } else {
            endDateTime = moment(endDateTime).add(1, 'h').toISOString();    
            endDateTime = new Date(endDateTime);
        }
    }

  } 

}); 