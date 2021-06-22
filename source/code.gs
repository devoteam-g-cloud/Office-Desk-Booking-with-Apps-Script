function getOfficeData(){
  // Find colors : https://materializecss.com/color.html
  
  var DAY_JAUGE = 17; //Number of people per day on site or number of available places

  return {
    jauge:{
      "monday":{max:DAY_JAUGE,index:0},
      "tuesday":{max:DAY_JAUGE,index:1},
      "wednesday":{max:DAY_JAUGE,index:2},
      "thursday":{max:DAY_JAUGE, index:3},
      "friday":{max:DAY_JAUGE,index:4}
    },
    team:{
      "TEAM1":{count:5,color:"blue lighten-2"},
      "TEAM2":{count:2,color:"green lighten-2"},
      "TEAM3":{count:6,color:"lime lighten-2"},
      "PEOPLE1":{count:1,color:"teal lighten-2"},
      "TEAM5":{count:8,color:"orange lighten-2"},
      "TEAM6":{count:8,color:"pink lighten-2"},
      "PEOPLE2":{count:1,color:"red lighten-2"}

    },
    dayTeam:{
      "monday":['TEAM1','TEAM3','PEOPLE1'],
      "tuesday":['TEAM3','TEAM6','TEAM2'],
      "wednesday":['TEAM5','PEOPLE2','TEAM1'],
      "thursday":['PEOPLE1','TEAM6','TEAM2'],
      "friday":['TEAM5','PEOPLE2']
    }
  }
}

function getJauge() {
  var custom = getCustomBooking();
  var data = getOfficeData();
  data.custom = custom;
  data.email = Session.getActiveUser().getEmail();
  return data;
}

function getCustomBooking(){
  var data = PropertiesService.getScriptProperties().getProperty('custom_booking');
  console.log(data)
  if( data && data != ''){
    obj = JSON.parse(data)
    obj = cleanOldData(obj);
    return obj;
  }
  return {}
}

function cleanOldData(data){
  var today = new Date();
  var past = new Date(today.getTime() - (((today.getDay() - 1) + 14 ) *(24*60*60*1000)));
  var clean = false;
  for(var key in data){
    console.log(key + ' / ' + dateId(past))
    if(parseInt(key) < parseInt(dateId(past))){
      console.log('in delete old key')
      delete data[key];
      clean =true;
    }
  }
  // we do that to not push all the time.
  if(clean) { setCustomBooking(data);}
  return data;
}


function removeDesk(data){
  var custom = getCustomBooking();
  if(!custom[data.id]){
    throw 'Something strange ...'
  }
  var items = custom[data.id];
  for(var i = 0 ; i < items.length ; i++){
    if(items[i].email == data.email){
      items.splice(i,1)
      break;
    }
  }
  custom[data.id] = items;
  setCustomBooking(custom);
}

function setCustomBooking(custom){
  PropertiesService.getScriptProperties().setProperty('custom_booking',JSON.stringify(custom));
}

function doGet(e) {
  var t = HtmlService.createTemplateFromFile('page');
  return t.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle("Office Desk Booking");
}

function bookDesk(json){
  var obj = {
    day:json.day,
    id:json.key,
    email:Session.getActiveUser().getEmail()
  }
  var custom = getCustomBooking();
  if(!custom[obj.id]){
    custom[obj.id] = []
  }
  custom[obj.id].push(obj)
  setCustomBooking(custom)

  return obj;
}
