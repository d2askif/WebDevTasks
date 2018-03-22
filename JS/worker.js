
$(document).ready(function(){

  //get local weather from darksky Api and set it to tempratur input
   getLocalWeather();

   /*Age calculator submit button click event handler*/
  $("#ageCalcSubmit").click (function(){
    var year = $("#ageCalcAgeInput").val();
    var date = new Date(); //creat a date object;
    var currentYear = date.getFullYear(); //grab the currnt year

    if((year > currentYear)|| year < 1880 || year ==="" ){ //validat the input
      alert("Warning:" + " enter birthday year correctlly");
      return false;
    }
    if(!isNaN(year)){
        $("#ageTextarea1").text(calculateAge(year, currentYear));
    } else {
        alert("Warning:" + " enter a year");
        $("#ageTextarea1").text("");
    }


    return false;
  });

  /*Supply calculator submit button click event handler*/
   $("#supplySubmit").click(function(){
     var currntAge   = $("#ageInput").val();
     var dailySupply = $("#supplyInput").val();

     if(currntAge ===""  || dailySupply ==="") {
       alert("Empty filed");
       return false;
     }
     if( currntAge < 0) {
       alert("age should be 0 or above");
       return false;
     }
     if( dailySupply  < 0) {
       alert("Supply should be 0 or above");
       return false;
     }

     if(!isNaN(currntAge) && !isNaN(dailySupply)){
         $("#supplyTextarea1").text(calculateSupply(currntAge, dailySupply));
     } else {
         alert("Warning:" + " missing age or supply ");
         $("#supplyTextarea1").text("");
     }
   return false;
   });

   /*Circle metrics calculator submit button click event handler*/
   $("#circlSubmit").click(function(){
     var radius = $("#radiusInput").val();
     var areaCheckBox = document.getElementById('areaCheckBox');
     var circumfranceCheckBox = document.getElementById("circumfranceCheckBox");
     //var circumfranceCheckBox = $("#circumfranceCheckBox").val();
     if(!circumfranceCheckBox.checked  && !areaCheckBox.checked){
       alert("Tick atleast one check box");
       return false;
     }
     if(radius ==="" || radius < 0 ){ //validat the input
       alert("Warning:" + " empty filed or negative number ");
       $("#circlAreaTextarea1").text("");
       return false;
     }
     if(!isNaN(radius)){

           var result = "";
           if(areaCheckBox.checked){
             result = calcArea(radius) + "\n";
           }
           if(circumfranceCheckBox.checked){
             result += calcCircumfrence(radius);
           }

         $("#circlAreaTextarea1").text(result);
     } else {
         alert("Warning:" + " enter radius correctlly");
         $("#circlAreaTextarea1").text("");
     }
     return false;
   });

/*Temprature change button click event handler*/
   $("#tempratureSubmit").click(function(){
     getLocalWeather();
     var fahrenheit = document.getElementById("fahrenheit");
     var celsius    = document.getElementById("celsius");
     var temprature = $("#tempratureInput").val();
     if(temprature ==="" ){ //validat the input
       alert("Warning:" + " empty filed");
       $("#tempratureTextarea1").text("");
       return false;
     }
     if(celsius.checked){
       $("#tempratureTextarea1").text(fahrenheitTocelsius(temprature));
     }
     if(fahrenheit.checked){
       $("#tempratureTextarea1").text(celsiusToFahrenheit(temprature));

     }
     return false;
   });



/* ################### functions bellow here##################### */

/* calculats age based on currntYear and birthYear*/
function calculateAge(birthYear,currentYear){
  if(birthYear == currentYear) { // to handle infants
    return " you are below 1 year";
  }
  // In one year our differs depending if it is befor or after the birthday month
  return "You are either "+ (currentYear - birthYear) +" or " + (currentYear - birthYear - 1 );

     }

//calculateAge(1985);
//calculateAge(1976);
//calculateAge(2015);

/*calculats life time supply with age and amountPerDay consumption*/
function calculateSupply(ageInput, amountPerDay){
  var age = Number(ageInput);
  var maxAge = 120;//assumed maxAge
  const daysInOneYear = 365;
  //// if someone is older than the maxAge,or is almost 120 update maxAge by 20 + 'age' years
  if(age > maxAge  || (maxAge - age) < 10) {
    maxAge = 20 + age;
  }
  // calculate lifeTimeSupply rounding amountPerDay to the nears whole number
  var lifeTimeSuply = (maxAge - age) * Math.round(amountPerDay) * daysInOneYear;


return  "You will need " + lifeTimeSuply + " to last you until the ripe old age of " + maxAge;
}

//calculateSupply(70,2);
//calculateSupply(120,2);
//calculateSupply(121,0.3);

/* calcCircumfrence calculates the Circumfrence of a circle in radians
   - takes the radius of a circle as an argument
*/
function calcCircumfrence(radius){
  // circumfrence = 2 * PI * r
  return "The circumference is  " + (2 * Math.PI * radius) + " cm";
}
//calcCircumfrence(1);

/* calcArea calculates the area of a circle in radians
   - takes the radius of a circle as an argument
*/
 function calcArea(radius) {
   // circleArea = PI * r * r
   return "The area is " + Math.PI * radius * radius + " cm^2";
  }

 //calcArea(2);


 /* celsius to fahrenheit converter function
    -  takes temp argument  in celsius
 */

 function celsiusToFahrenheit(temp){
  var tempInCelsius = temp;
  var tempInFahrenheit = (tempInCelsius * 9/5 + 32);
  return tempInCelsius + "°C is " + tempInFahrenheit+ "°F";
 }

//celsiusToFahrenheit(10);

 /* fahrenheit To celsius converter function
    - takes temp argument  in fahrenheit
 */

 function fahrenheitTocelsius(temp){
  var  tempInFahrenheit = temp;
  var tempInCelsius = (tempInFahrenheit - 32) * 5/9;
  return tempInFahrenheit + "°F is " + tempInCelsius+ "°C";
 }


 /*function to get the local weather for a given
  - latituid,longtuid
 */
 function getLocalWeather(){
/* featch api to load json data */
fetch('https://api.darksky.net/forecast/d9a28d72c0e0e34b3a8255e19bdeb590/55.653,12.2883').then(function(response) {
  if(response.ok) {
    return response.json();
  }
  throw new Error('Network response was not ok.');
}).then(function(myData) {
  // if the respons is ok and myData json format is returnd

  /* set the currnt temprature in in Temprature calc area*/
  let currTemp = myData.currently.temperature; //currnt temprature
  let currTempIndegrees =Math.round((currTemp -32) *5/9);
  let weatherType = myData.currently.precipType; // perception of weather
   var html = "<div class = 'text-right'>"; //openning  tag
   html += "<small>" + "Local weather" + "</small>";
   html += "<h5 style='margin:0;'>" +""+ currTempIndegrees+"°c" +"</h5>"
   html += "<small>" +""+ weatherType.toUpperCase() +"" +"</small>"
   html += "</div>";//closing tag
    $(".local-temprature").html(html); //insert the div in the temprature box
    if($("#tempratureInput").val()==""){
      $("#tempratureInput").val(currTempIndegrees);// sets fetchd temprature to tempratureInput
    }


}).catch(function(error) { //handle error

  console.log('There has been a problem with your fetch operation: ', error.message);
});
}
});
