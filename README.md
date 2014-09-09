meteor-calendar
===============

Meteor Calendar (meteor version 0.9.1)

Getting Started
===============

To install meteor on your system follow these instructions:

* OS X/Linux - http://docs.meteor.com/
* Windows - http://win.meteor.com/

#### Stopping Meteor server

From the command line just do a **"ctrl + c"**

#### Meteor Mongo DB (mini Mongo)

To view the data in Meteors MongoDB from the command line do **"meteor mongo"**


Requires
===============

Install the following using "meteor add \<package-name\>"

- Iron-router
- Bootstrap
- Full Calendar (should include jQuery UI)
- JQuery
- JQuery UI
- Moment.js

Notes
===============
- Server.js has (commented) code to add dummy events on startup
- Calendars print CSS overrides any styles applied to events. Add @media print to "fullcalendar.print.css" in package to solve this issue. 



