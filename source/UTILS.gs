
function dateId(d){
  return d.getFullYear().toString()+zero(d.getMonth()+1)+zero(d.getDate());
}

function zero(num){
  return num < 10 ? '0'+num : num ;
}

/*
  Remove data in custom booking after testing
*/
function deleteCustomBooking(){
  setCustomBooking({})
}
