
/*
Name: Jinal Shah
SWE 642 : Homework 2
Javascript
*/


/* Cookie and Greetings Implementation */
function greeting() {
    var now = new Date();
    var hour = now.getHours();
    var name;
    var greet_msg;
    var greetings = document.getElementById("greetings");

    //Checks the time of the day
    if (hour < 12)
        greet_msg = '<h2>Good Morning ';
    else if (hour < 18)
        greet_msg = '<h2>Good Afternoon ';
    else
        greet_msg = '<h2>Good Evening ';

    // Check if there is a cookie
    if(document.cookie) {
        var cookievalue = unescape(document.cookie);
        var cookiepart = cookievalue.split("=");
        name = cookiepart[1];
    }
    else {
        // If no cookie then ask for name and set cookie
        name = window.prompt("Please enter your name", "John");
        // Set cookie expiry after 2 days
        var date = new Date();
        date.setDate(date.getDate + 2);
        document.cookie = "name=" + escape(name) + "; expires=" + date;
    }
    //Display Greeting Message
    greet_msg += name + ", Welcome to SWE 642 Survey</h2>";
    greet_msg += "Click " + "<a href = 'javascript:wrongname()'>here</a> " + " if you are not " + name + ". ";
    greetings.innerHTML = greet_msg;
}
//If name is incorrect : Asks user for name and resets the greeting with an updated name
function wrongname() {
    document.cookie = "name=null;" + " expires=Thu, 01-Jan-94 00:00:01 GMT";
    location.reload();
}


/* Survey Form Extension and Average & Maximum Computation */
function validate(){
      const arrayNumbers = document.getElementById("numbers").value.split(",");

      var numArray= [];
      var length = arrayNumbers.length;

        // Checks if user enters less then 10 entries
          if (length < 10){
            document.getElementById("errorMessage").innerHTML = " Error!! : Enter atleast 10 comma separated numbers" ;
            clearText();
            return;
          }
          var i;
          for (i = 0; i < length; i++){
            if (isNaN(arrayNumbers[i])){
                document.getElementById("errorMessage").innerHTML = " Error!! : Please enter a valid number" ;
              clearText();
              return;
            }
            // Checks if the user enters numbers less then 1 or greater then 100
            if (arrayNumbers[i] > 100 || arrayNumbers[i] < 1){
              document.getElementById("errorMessage").innerHTML = " Error!! :Please enter a valid number between 1 to 100" ;
              clearText();
              return ;
            }
          }
       //Display Error Message
      var max = Math.max(...arrayNumbers);
      document.getElementById("errorMessage").innerHTML = " "
      document.getElementById("outputmax").innerHTML = max;

      var avg= average(arrayNumbers);
      document.getElementById("errorMessage").innerHTML= " "
      document.getElementById("outputavg").innerHTML = avg;
  }
//Computes Average of the entered numbers
function average(arrayNumbers){
var sum = 0;
var length = arrayNumbers.length;

for(i=0 ; i<length ; i++){
  sum = sum + parseInt(arrayNumbers[i],10);
}
var average = sum/length;
return average;
}

//Incorrect entry is reset
function clearText() {
  var tb = document.getElementById('numbers');
  tb.value = '';
  }


/*
    Form Validation Event Handling
*/
$('form').on('submit', function(e) {
    // REGEX for validating user name
    var alphabets = /^[A-Za-z]+$/;
    // REGEX for validating email address
    var email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var errorMessage = "";
    // REGEX for validating mailing address
    var validMailingAddr = /^[A-Za-z0-9'\.\-\s\,]+$/;

    // The Name text box should contain only Alphabets.
    if (!($("#username").val().match(alphabets))) {
        errorMessage += "<ul><li>Please enter only the alphabets in the username.</li></ul>";
        $('#username').val("");
    }

    // The Address text boxes should contain only appropriate numeric, alphabet or alphanumeric characters.
    if (!($("#address").val().match(validMailingAddr))) {
        errorMessage += "<ul><li>Please enter appropriate numeric, alphabet, or alphanumeric characters in street Address.</li></ul>";
        $("#address").val("");
    }

    // The Email address format should be valid.
    if (!($("#mail").val().match(email))) {
        errorMessage += "<ul><li>Please enter a valid email id.</li></ul>";
        $("#mail").val("");
    }

    // Make sure at least two checkboxes are checked.
    var opinion = $("input[name='opinion']:checked");
    if (opinion.length < 2) {
        errorMessage += "<ul><li>Please check at least 2 things you like about the campus.</li></ul>";
    }

    // Make sure a radio button option is selected.
    var gettoknow = $("input[name='gettoknow']:checked");
    if (gettoknow.length < 1) {
        errorMessage += "<ul><li>Please select an option you are interested in the university.</li></ul>";
    }

    //Populates the form validation error messages for the display in an array
    if (errorMessage !== "") {
        e.preventDefault();
        $('<div></div>').html(errorMessage).dialog({
            modal: true,
            title: 'Alert!',
            buttons: [
            {
                text: "Close",
                click: function() {
                $( this ).dialog( "close" );
                }
            }],
            open : function(event, ui) {
                $('html').attr('data-scrollTop', $(document).scrollTop(0)).css('overflow', 'hidden');
                $(this).dialog('option','position',{ my: 'center', at: 'center', of: window });
            },
            close : function(event, ui) {
                var scrollTop = $('html').css('overflow', 'auto').attr('data-scrollTop') || 0;
                if( scrollTop ) $('html').scrollTop( scrollTop ).attr('data-scrollTop','');
            }
        });
        return false;
    } else {
        return true;
    }
});


/*
    When a user enters a zipcode,
    populate the city and state fields automatically based on the zip entered, using Ajax.
*/
function validateZip(zip) {
    try {
        var asyncRequest = new XMLHttpRequest();
        asyncRequest.onreadystatechange = function () {
            callback(zip, asyncRequest);
        };
        asyncRequest.open("GET", "http://mason.gmu.edu/~jshah21/testaccess/zipcodes.json", true);
        asyncRequest.withCredentials = true;
        asyncRequest.send();
    }
    catch (exception) {
        alert("Request failed.");
    }
}

//Checks and sets the City and State fields based on the zipcode from Json file
function callback(zip, asyncRequest) {
    document.getElementById("zip-error").innerHTML = "Checking zipcode..";
    document.getElementById("city").innerHTML = "";
    document.getElementById("state").innerHTML = "";
    if (asyncRequest.readyState == 4) {
        if (asyncRequest.status == 200) {
            // parse JSON data
            var result = JSON.parse(asyncRequest.responseText);
            data = checkZipCode(zip, result)
            if (data.valid) {
                document.getElementById("zip-error").innerHTML = "";
                document.getElementById("city").innerHTML = data.city;
                document.getElementById("state").innerHTML = data.state;
            } else {
                document.getElementById("zip-error").innerHTML="An invalid zip.";
            }
        }
    }
}

//Checks if the zip is present in the Json document
function checkZipCode(zip, result) {
    var zipcodes = result.zipcodes;
    for (var zipcode of zipcodes) {
        if(zipcode.zip === zip) {
            return {
                valid: true,
                city: zipcode.city,
                state: zipcode.state
            };
        }
    }
    return {
        valid: false
    };
}


/* Executes JQuery UI Tabs */
$('.tab-link').click( function() {
	var tabID = $(this).attr('data-tab');
	$(this).addClass('active').siblings().removeClass('active');
	$('#tab-'+tabID).addClass('active').siblings().removeClass('active');
});

$( function() {
    $("#tabs").tabs();
    // slider of the JQuery tab : Volgenau School
    $("#slider").slider({
            animate: "fast",
            disabled: true,
            min: 1,
            max: 40,
            step: 1,
            change: function(event, ui) {
              if (ui.value == 1) {
                $('#slides').attr('src', 'images/slider1.jpg');
              }
              if (ui.value == 2) {
                $('#slides').attr('src', 'images/slider2.jpg');
              };
              if (ui.value == 3) {
                $('#slides').attr('src', 'images/slider4.jpg');
              };
            }
          });
          $(function AutoSlider() {
        setTimeout(function () {
            $("#slider").slider("value", $('#slider').slider("value") + 1);
        }, 2000);
        setTimeout(AutoSlider, 2000);
    });
  } );
