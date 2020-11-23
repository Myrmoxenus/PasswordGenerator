// Assignment Code
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  //Clears admissible character array for subsequent uses of button
    admissibleCharacters = []
    lengthPrompt()
    var password = passwordBuilder("");
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

// An empty array for storing functions that generate different types of random characters determined to be admissible by a series of prompts.
var admissibleCharacters = []

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
}

if (confirm("Include upper case letters?")){
  admissibleCharacters.push(characters[1])
}

if (confirm("Include special characters?")){
  admissibleCharacters.push(characters[2])
}

if (confirm("Include numbers?")){
  admissibleCharacters.push(characters[3])
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

//Recursive function concatenates random characters to the string, passes the new string to itself and continues until the generated string is of the desired length.
function passwordBuilder(currentString) {
if (currentString.length === passwordLength){
    return currentString
}
    return passwordBuilder (currentString.concat(randomCharacter()))
}
