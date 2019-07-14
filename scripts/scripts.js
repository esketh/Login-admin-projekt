var BiggestJuzerEver = {
  data: [],
  int() {
    this.getData();
  },
  callback(jsonContent) {
    this.data = JSON.parse(jsonContent).users;
    this.showAllDataWithTempleString();
  },
  getData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.callback(request.responseText);
      }
    };
    request.open('GET', '/Data/users.json');
    request.send();
  },
  addData(item) {
    // hozzáadja az új júzert a táblázat végére
    this.data.push(item);
  },

  showAllDataWithTempleString() {
    var userTemplate = '';
    this.data.forEach(element => {
      userTemplate += `<tr id="${element.id}">
              <td>${element.id}</td>
              <td class="editableName"><input id=${element.id + BiggestJuzerEver.data.length} value="${element.name}" disabled></td>
              <td class="editableEmail"><input id=${element.id + BiggestJuzerEver.data.length} value="${element.emailAddress}" disabled></td>
              <td class="editableAddress"><input id=${element.id + BiggestJuzerEver.data.length}  value="${element.address}"  disabled></td>
              <td><button class="btnEdit" onclick="editHandler();" name="${element.id + 1}" >${'Szerkesztés'}</button>
              <button class="btnSave"">Mentés</button>
              <td><button class="btnDelete" onclick="removeHandler()" name="${element.id}">Törlés</button></td>
    
               </tr>`;
      document.querySelector('.Users_data').innerHTML = userTemplate;
    });
  },
  remove(id) {
    // event.target the button lesz
    var nodeTrUser = document.querySelector(`[id="${id}"]`);
    var nodeTbody = document.querySelector('tbody');
    nodeTbody.removeChild(nodeTrUser);
  },
  mentesbtn() {
    document.querySelector('.saveQestion').classList.add('saveQuestionDisplayBlock');
    var nodeMentesQuestion = `<div>
    <p>Biztosan menteni akarod ${userSaveId - 1} sort ?</p>
    <button id="yesSave"  onclick="saveIfYes()">Igen</button>
    <button id="noSave" onclick="saveIfNo()">Nem</button>
    </div>`;
    document.querySelector('.saveQestion').innerHTML = nodeMentesQuestion;
  },
  edit(id) {
    var nodeInputUser = document.querySelector(`[id="${id}"]`);
    console.log(nodeInputUser);
    // itt kapjan meg az értéket, ha irtak bele

    nodeInputUser.setAttribute('value', targetValue || 'semmi');


    var nodeTD = nodeInputUser.parentNode.parentNode;
    var nodeInputs = nodeTD.querySelectorAll('input');
    console.log(nodeTD);
    for (var i = 0; i < nodeInputs.length; i++) {
      nodeInputs[i].setAttribute('disabled', 'disabled');
    }
    document.querySelector('.saveQestion').classList.remove('saveQuestionDisplayBlock');
    var btnSave = document.querySelectorAll('.btnSave');
    console.log(btnSave);
    var btnEdit = document.querySelectorAll('.btnEdit');
    for (var i = 0; i < btnSave; i++) {
      btnSave[i].classList.remove('btnSaveDisplayBlock');
      btnSave[i].classList.remove('btnSave');
    }
  },

  create() {

  },
  store() {

  },
  // a validátorokat a saveNewUser onclick indítja
  // hibaüzenetet ad, ha a júzernév nem az angol abc betűit tartalmazza minimum 7 karakter hosszan,
  // vagy nem használt szóközt(full name!), vagy a júzer már létezik
  validateUserName(userName) {
    if (userName === '') {
      return 'Username is required!';
    } else if (userName.length < 7) {
      return 'Username must contain at least 7 character!';
    }

    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(userName)) {
      // a test futtatja rá a stringet a username-re, true-t vagy false-t ad vissza
      return 'Full name is accepted only. Please, write only letters!';
    }

    for (var i = 0; i < this.data.length; i += 1) {
      if (userName === this.data[i].name) {
        return 'User already exists.';
      }
    }

    return '';
  },
  // e-mail validátor, hibát üres mező és nem megfelelő mailformátum esetén jelez
  validateUserEmail(userEmail) {
    if (userEmail === '') {
      return 'E-mail is required!';
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
      return 'Invalid e-mail address!';
    }
    return '';
  },
  // címvalidátor betűt és számot is vár minimum 7 karakter hosszan
  validateUserAddress(userAddress) {
    if (userAddress === '') {
      return 'Address is required!';
    }
    if (userAddress.length < 7) {
      return 'Address must contain at least 7 character!';
    }
    if (!/[a-zA-Z]/.test(userAddress) || !/[0-9]/.test(userAddress)) {
      return 'Address must contain letters and numbers!';
    }
    return '';
  },
  getNextId() {
    // az utolsó ID után következő ID-t adja vissza az új júzernek
    var maxID = this.data[0].id;
    for (var i = 0; i < this.data.length; i += 1) {
      if (this.data[i].id > maxID) {
        maxID = this.data[i].id;
      }
    }
    return maxID + 1;
  }


};

// Az adatok megjelenítéséhez

BiggestJuzerEver.int();
// BiggestJuzerEver.mentesbtn();

//  Esemény kezelések--Törlés

var userID;

function removeHandler() {
  userID = parseInt(event.target.name, 10);
  document.querySelector('.removeQuestion').classList.add('removeQuestionDisplayBlock');
  var questionRemove = `<div>
    <p>Biztos ki akarod törölni ${userID} sort?</p>
    <button id="yes" onclick="checkIfYes()" >Igen</button>
    <button id="no" onclick="checkIfNo()">Nem</button>
    </div>`;
  document.querySelector('.removeQuestion').innerHTML = questionRemove;
}

function checkIfYes() {
  BiggestJuzerEver.remove(userID);
  document.querySelector('.removeQuestion').classList.remove('removeQuestionDisplayBlock');
}

function checkIfNo() {
  document.querySelector('.removeQuestion').classList.remove('removeQuestionDisplayBlock');
}

// inputmezők megjelenítése a táblázat felett új júzer hozzáadására kattintva
function openAddForm() {
  // inputmezők törlése - a 'user already exist' hibaüzenetet ez tünteti el
  clearMessage();
  document.getElementById('divForNewUser').style.display = 'block';
  document.getElementById('hideAddFormBtn').style.display = 'block';
}

function saveNewUser() {
  var userName = document.getElementById('addNewUserName').value;
  var userEmail = document.getElementById('addNewUserEmail').value;
  var userAddress = document.getElementById('addNewUserAddress').value;

  // a validátorok hibaüzenetei ide futnak be
  var errorMessage = BiggestJuzerEver.validateUserName(userName) || BiggestJuzerEver.validateUserEmail(userEmail) || BiggestJuzerEver.validateUserAddress(userAddress);
  // ha nincs hibaüzenet, a júzeradatok bekerülnek egy objektumba és elmentődnek
  if (errorMessage === '') {
    var newUserToSaveObj = {};
    newUserToSaveObj.id = BiggestJuzerEver.getNextId();
    newUserToSaveObj.name = userName;
    newUserToSaveObj.emailAddress = userEmail;
    newUserToSaveObj.address = userAddress;
    // inputmezők törlése sikeres mentéskor
    clearMessage();
    // az objektumot pusholja a nagy tömbbe
    BiggestJuzerEver.addData(newUserToSaveObj);
    showMessage('User succesfully added.');

    BiggestJuzerEver.showAllDataWithTempleString();
  } else {
    showMessage(errorMessage);
  }
}


function hideAddForm() {
  document.getElementById('divForNewUser').style.display = 'none';
  document.getElementById('hideAddFormBtn').style.display = 'none';
  showMessage('');
}

// hibaüzenetek és sikeres mentés
function showMessage(message) {
  document.getElementById('fieldForMessages').innerHTML = message;
}

// inputmezők törlése sikeres mentés után
function clearMessage() {
  document.getElementById('addNewUserName').value = '';
  document.getElementById('addNewUserEmail').value = '';
  document.getElementById('addNewUserAddress').value = '';
}
// szerkesztés-másolás
var userSaveId;

function editHandler() {
  userSaveId = parseInt(event.target.name, 10);
  // event.target szerkesztés gomb
  event.target.classList.add('targetEditBtn');

  var nodeTr = event.target.parentNode.parentNode;

  // a mentés gomb megjelenítéséhez
  nodeTr.querySelector('.btnSave').classList.add('btnSaveDisplayBlock');

  // input mezők disabled tul. levétele
  var nodeEdittableTdName = nodeTr.querySelector('.editableName>input');
  nodeEdittableTdName.removeAttribute('disabled');
  nodeEdittableTdName.setAttribute('spellcheck', false);
  nodeEdittableTdName.addEventListener('change', getInputValue);

  var nodeEdittableTdEmail = nodeTr.querySelector('.editableEmail>input');
  nodeEdittableTdEmail.removeAttribute('disabled');
  nodeEdittableTdEmail.setAttribute('spellcheck', false);
  nodeEdittableTdEmail.addEventListener('change', getInputValue);

  var nodeEdittableTdAddress = nodeTr.querySelector('.editableAddress>input');
  nodeEdittableTdAddress.removeAttribute('disabled');
  nodeEdittableTdAddress.setAttribute('spellcheck', false);
  nodeEdittableTdAddress.addEventListener('change', getInputValue);

  // mentés gomb függvény hívása
  var nodeSaveBtn = nodeTr.querySelector('.btnSave');
  nodeSaveBtn.addEventListener('click', saveHandler);


  function saveHandler(userSaveId) {
    BiggestJuzerEver.mentesbtn();
  }
}

// mentés gomb kérdés kezelése
function saveIfNo() {
  BiggestJuzerEver.showAllDataWithTempleString();
  document.querySelector('.saveQestion').classList.remove('saveQuestionDisplayBlock');
}
function saveIfYes() {
  BiggestJuzerEver.edit(userInputId);
}

var userInputId;
var targetValue;

// azt az eseményt figyeli h lett e változás az input mezőben
function getInputValue() {
  userInputId = parseInt(event.target.id, 10);
  targetValue = event.target.value;
  console.log(userInputId);
  return targetValue;
}
/*
function saveIfYes() {
  var nodeTr = event.target.parentNode.parentNode;
  nodeTr.querySelector('.editableName>input').setAttribute('disabled');
  nodeTr.querySelector('.editableEmail>input').setAttribute('disabled');
  nodeTr.querySelector('.editableAddress>input').setAttribute('disabled');

  document.querySelector('.saveQestion').classList.remove('saveQuestionDisplayBlock');
}*/
