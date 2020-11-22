// Assignment Code
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  admissibleCharacters = []
  necessaryTests = []
  lengthPrompt()
  passwordBuilder("")
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Array containing letters a-z
var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

//Array containing all special characters in unicode according to the OWASP Foundation (https://www.owasp.org/index.php/Password_special_characters).
var specials = ["\u0020","\u0021","\u0022","\u0023","\u0024","\u0025","\u0026","\u0027","\u0028","\u0029","\u002A","\u002B","\u002C","\u002D","\u002E","\u002F","\u003A","\u003B","\u003C","\u003D","\u003E","\u003F","\u0040","\u005B","\u005C","\u005D","\u005E","\u005F","\u0060","\u007B","\u007C","\u007D","\u007E"]

//Array containing functions that generate random lowercaser letters, uppercase letters, special characters and numbers respectively. 
var characters = [randomLower, randomUpper, randomSpecial, randomNumber] 

// An array that contains functions that will test the final password for the presence of lowercase letters, uppercase letters, special characters, and numbers respectively.
var testers = [noLowerTest, noUpperTest, noNumbersTest, noSpecialsTest]

// An empty array for storing functions that generate different types of random characters determined to be admissible by a series of prompts.
var admissibleCharacters = []

// An empty array for storing functions that will test the final password for the presence of user selected characters
var necessaryTests = []

//Retrieves desired password length from user and stores it as an integer.  If password is too long, too short, or not an integer, the function alerts user and calls itself again to allow for correction. If password is an integer of appropriate size, it initiates the other prompts. 
function lengthPrompt(){
passwordLength = parseInt(prompt("Desired length of password?"))
if (!(Number.isInteger(passwordLength)) || passwordLength < 8 || passwordLength > 128) {
  alert("Password length must be input as an integer and must be between 8 and 128 characters in length.")
  return lengthPrompt()}
characterPrompts()}

//Function that presents user with a series of prompts to determine admissible characters and password length.
function characterPrompts(){

if (confirm("Include lower case letters?")){
  admissibleCharacters.push(characters[0])
  necessaryTests.push(testers[0])
}

if (confirm("Include upper case letters?")){
  admissibleCharacters.push(characters[1])
  necessaryTests.push(testers[1])
}

if (confirm("Include special characters?")){
  admissibleCharacters.push(characters[2])
  necessaryTests.push(testers[2])
}

if (confirm("Include numbers?")){
  admissibleCharacters.push(characters[3])
  necessaryTests.push(testers[3])
}

//If user declined all four character types, user is alerted of error and function calls itself again for correction.
if (admissibleCharacters.length === 0){
  alert("Passwords must be generated from at least one type of character.")
  characterPrompts()}
}

//Generates a random integer from 0 up to the value of randomMax.
function randomUpTo(randomMax) {
  return ((Math.floor(Math.random() * (randomMax + 1))))
}

//Returns a random lowercase letter.
function randomLower() {
  return letters[randomUpTo(letters.length - 1)]
}

//Returns a random uppercase letter.
function randomUpper() {
  return randomLower().toUpperCase()
}

//Returns a random special character.
function randomSpecial() {
  return specials[randomUpTo(specials.length - 1)]
}

//Returns a random integer 0-9 as a string.
function randomNumber() {
  return randomUpTo(9).toString()
}

//Returns a random character from user selected options.
function randomCharacter() {
  return admissibleCharacters[randomUpTo(admissibleCharacters.length - 1)]()
}

//Tests if lowercase characters are completely absent from a candidate password.
function noLowerTest(passwordCandidate){
  return passwordCandidate === passwordCandidate.toUpperCase()
}

//Tests if uppercase characters are completely absent from a candidate password.
function noUpperTest(passwordCandidate){
  return passwordCandidate === passwordCandidate.toLowerCase()
}

//Tests if numbers are completely absent from a candidate password.
function noNumbersTest(passwordCandidate){
  return passwordCandidate === passwordCandidate.replace(/[0-9]/g, '')
}

//Tests if special characters are completely absent from a candidate password.
function noSpecialsTest(passwordCandidate){
  return passwordCandidate === passwordCandidate.replace(/[^a-zA-Z0-9]/g, '')
}

//Recursive function concatenates random characters to the password one at a time, passes the incomplete password to itself and continues until the generated string is of the desired length.
function passwordBuilder(currentString) {
  if (currentString.length === passwordLength){
      failedTests = 0
      qualityControl(currentString)
  }
  else {
      return passwordBuilder (currentString.concat(randomCharacter()))
  }}

// Variable that stores the number of failed tests
var failedTests = 0

//Function that runs a loop that tests a candidate password against all tests in the necessary tests array, adding the results to the failedTests variable
function testall (passwordCandidate){
for (i = 0; i < necessaryTests.length; i++){
failedTests = failedTests + necessaryTests[i](passwordCandidate)
}}

// Function runs testall and checks if there were any failed tests. If so, it calls passwordBuilder to generate a new password candidate. Otherwise, it returns the successful candidate.
function qualityControl(passwordCandidate) {
testall(passwordCandidate)
if (failedTests == 0){
  password = passwordCandidate
}
else{
  passwordBuilder("")
}}