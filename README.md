# Office Desk Booking with Apps Script
Manage desk booking for your office. Made for the return to office with new Covid rules but can be used for any flex office booking needs.
<p align="center">
  <img src="https://github.com/devoteam-g-cloud/Office-Desk-Booking-with-Apps-Script/blob/main/img/screen_office_booking.png?raw=true" width="350" title="hover text">
</p>

Below print screen with "BOOK" button to allow booking of remaining slots.
<p align="center">
  <img src="https://github.com/devoteam-g-cloud/Office-Desk-Booking-with-Apps-Script/blob/main/img/screen_office_booking2.png?raw=true" width="350" title="hover text">
</p>

## Direct copy
You can get you direct copy there : https://script.google.com/home/projects/1o5tqSTLiUv82EuUlbCnoXWuHCO-tQ_Kq4u_IG6OqbXlV_2eq8XhVeYon/edit

## Context
We made this application in order to manage people at office with the new rules for after Covid. This application has been made in 1 day and has to full fill quickly the need to manage easily time presence and booking for our Office.

This application is not designed to manage the full Office it is designed to have 1 version per team, floor, service etc... For example we use one instance for our Paris Office and one for our Lyon Office.

With Office Desk Booking you can manageteam presence by assigning days to some teams and if there is remaining free place, each user can book a place.

## How it works
In the file code.gs you have a function getOfficeData() and you can set your Office data.

In "jauge" you define your daily number of people allowed to come to office. If the number is always the same define the quota in the "DAY_JAUGE" variable.
Example :
```javascript
jauge:{
      "monday":{max:DAY_JAUGE,index:0},
      "tuesday":{max:DAY_JAUGE,index:1},
      "wednesday":{max:DAY_JAUGE,index:2},
      "thursday":{max:DAY_JAUGE, index:3},
      "friday":{max:DAY_JAUGE,index:4}
    }
```
In this example each day the quota of person is the same and is define in the variable DAY_JAUGE.

! Don't change the index value !

Then you can define the team of your office with the number of people in it.

For each team you define number of people in 'count' and the color. The color must be one of the Materializecss colors, see : https://materializecss.com/color.html
```javascript
 team:{
      "TEAM1":{count:5,color:"blue lighten-2"},
      "TEAM2":{count:2,color:"green lighten-2"},
      "TEAM3":{count:6,color:"lime lighten-2"},
      "PEOPLE1":{count:1,color:"teal lighten-2"},
      "TEAM5":{count:8,color:"orange lighten-2"},
      "TEAM6":{count:8,color:"pink lighten-2"},
      "PEOPLE2":{count:1,color:"red lighten-2"}
    }
```

To finish define the scedule.
Schedule is just an array with the team define above.
```javascript
 dayTeam:{
      "monday":['TEAM1','TEAM3','PEOPLE1'],
      "tuesday":['TEAM3','TEAM6','TEAM2'],
      "wednesday":['TEAM5','PEOPLE2','TEAM1'],
      "thursday":['PEOPLE1','TEAM6','TEAM2'],
      "friday":['TEAM5','PEOPLE2']
    }
```
 
## Data management
The script don't use an external database, we use the Property service : PropertiesService.getScriptProperties()

Data is stored as JSON.

We made some test and we can store 500+ booking which is normally sufficient for the use case of the application. A specific function cleanOldData() is used to clean data older than 2 weeks. We retain oly the 2 weeks old data if tracking is needed to know who was at the office in case of Covid needs.

## Deploy the web app
Create a new deployment version and deploy the web app using the credential of the owner and accessible for anyone on the domain.
<p align="center">
  <img src="https://github.com/devoteam-g-cloud/Office-Desk-Booking-with-Apps-Script/blob/main/img/deploy-office-booking.png?raw=true" width="350" title="hover text">
</p>
