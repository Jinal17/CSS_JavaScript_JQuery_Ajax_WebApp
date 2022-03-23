# Student Survey Form using CSS, JavaScript, JQuery, Ajax

## Link : [website](http://mason.gmu.edu/~jshah21/testaccess/)

## HTML, CSS, jquery scripts, javascripts & zipcodes.json files are placed under:
/home/u6/jshah21/public_html/testaccess/

## Note:
The website works best on Mozilla FireFox or Safari browsers

##Description
Implemented Cookie and Greetings. The Student Survey Form used Cookie to store user’s information and displayed a greeting appropriate to the time of the day. The form has a field for the user to enter 10 comma separated numbers. By using JavaScript these numbers from the user are used to calculate average and maximum number that were entered in that field.  

The form is validated using JavaScript event handling function and an Ajax call to the server having JSON file with valid zip codes(The event handler made an Ajax call to the Server to fetch list of valid zip codes). After an Ajax call the a callback function was invoked  to parse a returned JSON file into a JavaScript Object. This was done using eval function / JSON parser and then retrieve city and state values for a zipcode. This made sure the data received from the user was entered as per the requirement. Errors were displayed using JQuery Modal Window. 
