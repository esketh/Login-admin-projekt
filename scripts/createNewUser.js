window.addEventListener('load', WindowLoadHandler, false);

function WindowLoadHandler() {
  var saveNewUserBtn = document.getElementById('saveNewUserBtn');
  saveNewUserBtn.addEventListener('click', userNameValidation);

  var addNewUserName = document.getElementById('addNewUserName');
  addNewUserName.addEventListener('mouseover', changeColorOfInputField, false);
  addNewUserName.addEventListener('mouseout', removeColorOfInputField, false);
  var addNewUserEmail = document.getElementById('addNewUserEmail');
  addNewUserEmail.addEventListener('mouseover', changeColorOfInputField, false);
  addNewUserEmail.addEventListener('mouseout', removeColorOfInputField, false);
  var addNewUserAddress = document.getElementById('addNewUserAddress');
  addNewUserAddress.addEventListener('mouseover', changeColorOfInputField, false);
  addNewUserAddress.addEventListener('mouseout', removeColorOfInputField, false);
}

function userNameValidation() {
  var nameToValidate = document.getElementById('addNewUserName').value;
  var fieldForMessages = document.getElementById('fieldForMessages');

  for (var i = 0; i < BiggestJuzerEver.length; i += 1) {
    if (nameToValidate === BiggestJuzerEver[i].name) {
      fieldForMessages.innerHTML = 'User already exists.';
      break;
    } else if (nameToValidate !== /^[a-zA-Z]/) {
      fieldForMessages.innerHTML = 'Please, write letters only!';
    } else {
      saveNewUser();
    }
  }
}


function saveNewUser() {
  var newUserToSaveObj = {};

  var addNewUserName = document.getElementById('addNewUserName').value;
  var addNewUserEmail = document.getElementById('addNewUserEmail').value;
  var addNewUserAddress = document.getElementById('addNewUserAddress').value;

  newUserToSaveObj.name = addNewUserName.innerHTML;
  newUserToSaveObj.emailAddress = addNewUserEmail.innerHTML;
  newUserToSaveObj.address = addNewUserAddress.innerHTML;

  BiggestJuzerEver.push(newUserToSaveObj);

  clearFields();
}

function changeColorOfInputField() {
  event.target.style.backgroundColor = 'blue';
}

function removeColorOfInputField() {
  event.target.style.backgroundColor = 'hsl(52,100%,55%)';
}

function clearFields() {
  var fieldForMessages = document.getElementById('fieldForMessages');
  fieldForMessages.innerHTML = '';
}
