// Assignment code here

// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters

var lengthGenerator = function() {
  var promptLength = window.prompt("Please select a password length between 8 and 128")
  promptLength = parseInt(promptLength);
  if (promptLength < 8 || promptLength > 128 || isNaN(promptLength)) {
  window.alert("You need provide a valid answer! Please try again");
  lengthGenerator ();
  }
  return promptLength;
};

var length = lengthGenerator ();

console.log(typeof length);
// test if length is retrievable as a number
console.log("Length is " + length);

// WHEN prompted for character types to include in the password THEN I choose lowercase THEN my input should be validated and at least one character type should be selected
var lowerCaseLetters = function () {
  var lowerCaseList = "";
  // Using regular expression to dictate that only lower case letters will be accepted
  while (!/[^a-z]/.test(lowerCaseList) === false || lowerCaseList === "" || lowerCaseList.length > length - 3){
      lowerCaseList = window.prompt("Which lowercase letters would you like included in your password? Please input ONLY lowercase letters. You may input up to " + (length - 3) + " characters. Repeats are allowed. At least 1 character required.");
  };
  console.log("The lower case string is " + lowerCaseList);
  return lowerCaseList;
}

var lowerCaseLetterString = lowerCaseLetters();
console.log("The lower case letter string is " + lowerCaseLetterString)

// Readjusting the number in the length prompt
var lengthPostLower = length - lowerCaseLetterString.length
// WHEN prompted for character types to include in the password THEN I choose uppercase THEN my input should be validated and at least one character type should be selected
var upperCaseLetters = function () {
  var upperCaseList = "";
  
  while (!/[^A-Z]/.test(upperCaseList) === false || upperCaseList === "" || upperCaseList.length > lengthPostLower - 2){
      upperCaseList = window.prompt("Which uppercase letters would you like included in your password? Please input ONLY uppercase letters. You may input up to " + (lengthPostLower - 2) + " characters. Repeats are allowed. At least 1 character required.");
  };
  console.log("The upper case string is " + upperCaseList);
  return upperCaseList;
}

var upperCaseLetterString = upperCaseLetters();
console.log("The upper case letter string is " + upperCaseLetterString)
// WHEN prompted for character types to include in the password THEN I choose numeric THEN my input should be validated and at least one character type should be selected

// Readjusting length for post uppercase letter
var lengthPostUpper = lengthPostLower - upperCaseLetterString.length;

var numbers = function () {
    var numberList = "";
    // Using regular expression to dictate that only numbers will be accepted
    while (!/[^0-9]/.test(numberList) === false || numberList === "" || numberList.length > lengthPostUpper -1){
        numberList = window.prompt("Which numbers would you like included in your password? Please input ONLY numbers. You may input up to " + (lengthPostUpper - 1) + " characters. Repeats are allowed. At least 1 number required.");
    };
    console.log("The lower case string is " + numberList);
    return numberList;
}
  
var numberString = numbers();
console.log("The lower case letter string is " + numberString)

// Readjusting length for post number string
var lengthPostNumber = lengthPostUpper - numberString.length;


// WHEN prompted for character types to include in the password THEN I choose special characters THEN my input should be validated and at least one character type should be selected
var specials = function () {
  var specialList = "";
  // Using regular expression to dictate that only certain special characters will be accepted
  while (/^[-!"#$%&'()*+,./:;<=>?@^_` {|}~]/.test(specialList) === false || specialList === "" || specialList.length != lengthPostNumber ){
      specialList = window.prompt("Which special characters would you like included in your password? Please input ONLY '-!#$%&'()*+,./:;<=>?@^_`{| }~'. Input exactly " + lengthPostNumber + " characters. Repeats are allowed.");
  };
  console.log("The specials string is " + specialList);
  return specialList;
}

var specialString = specials();
console.log("The specials string is " + specialString)

// Readjusting length for post number string
var lengthPostSpecials = lengthPostNumber - specialString.length;

// confirming zero
console.log(lengthPostSpecials);

// combining all of the above strings

var passwordCharacterList = lowerCaseLetterString.concat(upperCaseLetterString,numberString,specialString);
console.log(passwordCharacterList);

// WHEN all prompts are answered THEN a password is generated that matches the selected criteria
// Randomize selected characters to prevent the issue of a generic string of lowercase -> Uppercase -> Numbers -> special characters
function Randomizer(passwordLength) {
  return Math.floor(Math.random()*passwordLength);
}

function shuffler(passwordCharacterListInput) {
  var passwordArray = passwordCharacterListInput.split('');
  var passwordLength = passwordCharacterListInput.length;

  for(var i=0; i<passwordLength - 1 ; i++) {
    var newPosition = Randomizer(passwordLength);

    var temp = passwordArray[i];
    passwordArray[i] = passwordArray[newPosition];
    passwordArray[newPosition] = temp;
  }

  var shuffledPassword = passwordArray.join('')
  return shuffledPassword;
}

var finalPassword = shuffler(passwordCharacterList);
console.log(finalPassword);

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
