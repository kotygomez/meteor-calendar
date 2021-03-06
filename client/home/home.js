
// Session variables
Session.setDefault('editingCalEvent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('lastMod', null);

function setupCalendar() {
    // Create a new full calendar
    return calendar = $('#calendar').fullCalendar({
        
        header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
        
        dayClick:function(date, jsEvent, view) {
                        
            var startDateTime = date.local().toISOString();
            var endDateTime = moment(date.toISOString()).add(1, 'h').toISOString();
            
            startDateTime = new Date(startDateTime);
            endDateTime = new Date(endDateTime);
        
            CalEvents.insert({title: 'New Event', start: startDateTime, end: endDateTime });
            
            Session.set('lastMod',new Date());

        },
    
        eventClick:function(calEvent,jsEvent,view) {
            Session.set('editingCalEvent', calEvent.id);
            Session.set('showEditEvent', true);
        },
    
        eventDrop:function(calEvent) {
            
            var startDateTime = calEvent.start.toISOString();
            var endDateTime = calEvent.end.toISOString();
        
            CalEvents.update(calEvent.id, {$set: {start:startDateTime,end:endDateTime}});
            Session.set('lastMod',new Date());
        },
        
        eventResize: function(calEvent, dayDelta, minDelta, revertFunc) {

            var startDateTime = calEvent.start.toISOString();
            var endDateTime = calEvent.end.toISOString();

            CalEvents.update(calEvent.id, {$set: {start:startDateTime,end:endDateTime}});
            Session.set('lastMod',new Date());
        },
        
        eventAfterRender: function(event, element, view) {
            $(element).css('background-color', '#216d9a');
            $(element).css('padding-left', '5px');
        },
        
        loading: function(isLoading, view) {
            //console.log(isLoading);  
        },
            
        events: function(start, end, timezone, callback) {
            var events = [];
        
            calEvents = CalEvents.find();
            calEvents.forEach(function(evt) {
                events.push({
                    id: evt._id,
                    title: evt.title,
                    start: evt.start,
                    end: evt.end
                });
            });
            callback(events);
        },

        editable:true,
        selectable: true,
        allDayDefault: false,
        defaultView: 'agendaWeek',
        
    }).data().fullCalendar;

}

// Home - calendar view
Template.home.rendered = function() { 

    var calendar = setupCalendar();   

    Deps.autorun(function(){
        allReqsCursor = CalEvents.find().fetch();
        if(calendar)
            calendar.refetchEvents();
    });
}

Template.home.showEditEvent = function() {
    return Session.get('showEditEvent');
}

// Edit event 
Template.editEvent.evt = function() {
    return CalEvents.findOne({_id: Session.get('editingCalEvent')});
}

Template.editEvent.events({
    
    'click #updateEvent': function(evt, template) {
        var id = Session.get('editingCalEvent');

        var title = template.find('#title').value;
        var desc = template.find('#desc').value;         
        
        var start = new Date(template.find('#start').value);
        var end = new Date(template.find('#end').value);
        
        CalEvents.update({_id: id}, {$set: {title: title, desc: desc, start: start, end: end}});
        
        Session.set('editingCalEvent',null);
        Session.set('showEditEvent',false);
    },

    'click #closeEdit': function(evt) {
		evt.preventDefault();
		Session.set('editingCalEvent',null);
		Session.set('showEditEvent',false);
		Session.set('lastMod', new Date());
	},

    'click #deleteEvent': function(evt) {

        var id = Session.get('editingCalEvent');
        CalEvents.remove({_id: id});

		Session.set('editingCalEvent',null);
		Session.set('showEditEvent',false);
		Session.set('lastMod', new Date());
	},
	
})
