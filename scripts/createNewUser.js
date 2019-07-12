window.addEventListener('load', Window_LoadHandler, false);

function window_LoadHandler() {
  var fieldForMessages = document.getElementById('fieldForMessages');
  fieldForMessages.addEventListener('click', clearFields, false);
  var saveNewUserBtn = document.getElementById('saveNewUserBtn');
  saveNewUserBtn.addEventListener('click', userNameValidation, false);
  var addNewUserName = document.getElementById('addNewUserName');
  addNewUserName.addEventListener();
  var addNewUserEmail = document.getElementById('addNewUserEmail');
  addNewUserEmail.addEventListener();
  var addNewUserAddress = document.getElementById('addNewUserAddress');
  addNewUserAddress.addEventListener();

  //   addEventListeners - saveNewUserData, focusevents, errors;
}

function userNameValidation() {
  for (var i = 0; i < users.length; i += 1) {
    if (addNewUserName === users[i].name) {
      fieldForMessages.innerHTML = 'Username already exists.';
      break;
    } if (addNewUserName !== /^[a-zA-Z]/) {
      fieldForMessages.innerHTML = 'Please, write letters only!';
    } else {
      saveNewUserData();
    }
  }
}

function saveNewUserData() {
  var arrayForSavedUserObj = [];
  var saveNewUserDate = {};

  saveNewUserData.name = document.getElementById('addNewUserName').value;
  saveNewUserData.email = document.getElementById('addNewUserEmail').value;
  saveNewUserData.address = document.getElementById('addNewUserAddress').value;

  arrayForSavedUserObj.push(saveNewUserData);
  fieldForMessages.innerHTML =



  // üzi a sikeres mentésről
  // táblázatgeneráló meghívása
  clearFields();
}

function clearFields() {
  fieldForMessages.innerHTML = '';
}

// function setTimeout() {
//   return timeout;
// }

