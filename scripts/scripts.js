var BiggestJuzerEver = {
  data: [],
  init() {
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
              <td contenteditable="true" spellcheck="false">${element.id}</td>
              <td contenteditable="true" spellcheck="false">${element.name}</td>
              <td contenteditable="true" spellcheck="false">${element.emailAddress}</td>
              <td contenteditable="true" spellcheck="false">${element.address}</td>
              <td><button class="btnEdit" onclick="editHandler(this);" >${'Szerkesztés'}</button>
             <button class="btnSave" onclick="">${'Mentés'}</button></td>
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
    /* var nodebtnSave = document.querySelectorAll('.btnSave');
    nodebtnSave.style.display = 'none';*/
  },
  edit() {
    event.target.parentNodes.parentNodes.setAttribute('contenteditable', 'true');
  },

  create() {

  },
  store() {

  },
  // a validátorokat a saveNewUser onclick indítja
  validateUserName(userName) {
    if (userName === '') {
      return 'Username is required!';
    }
    if (!/^[a-zA-Z\ ]+$/.test(userName)) {
      // hibaüzenetet ad, ha a júzernév nem az angol abc betűit tartalmazza, vagy ha már létezik
      // a test futtatja rá a stringet a username-re, true-t vagy false-t ad vissza
      return 'Please, write letters only!';
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

  validateUserAddress(userAddress) {
    if (userAddress === '') {
      return 'Address is required!';
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

BiggestJuzerEver.init();
BiggestJuzerEver.mentesbtn();

//  Esemény kezelések--Törlés

var userID;

function removeHandler() {
  userID = parseInt(event.target.name, 10);
  var noderemoveQuestion = document.querySelector('.removeQuestion');
  noderemoveQuestion.style.display = 'block';
}

var nodeYes = document.querySelector('#yes');
nodeYes.addEventListener('click', checkIfYes);

var nodeNo = document.querySelector('#no');
nodeNo.addEventListener('click', checkIfNo);


function checkIfYes() {
  BiggestJuzerEver.remove(userID);
  var noderemoveQuestion = document.querySelector('.removeQuestion');
  noderemoveQuestion.style.display = 'none';
}

function checkIfNo() {
  var noderemoveQuestion = document.querySelector('.removeQuestion');
  noderemoveQuestion.style.display = 'none';
}

// inputmezők megjelenítése a táblázat felett új júzer hozzáadására kattintva
function openAddForm() {
  document.getElementById('divForNewUser').style.display = 'block';
}

function saveNewUser() {
  var userName = document.getElementById('addNewUserName').value;
  var userEmail = document.getElementById('addNewUserEmail').value;
  var userAddress = document.getElementById('addNewUserAddress').value;

  // a validátorok hibaüzenetei ide futnak be:
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

function showMessage(message) {
  document.getElementById('fieldForMessages').innerHTML = message;
}

function clearMessage() {
  document.getElementById('addNewUserName').value = '';
  document.getElementById('addNewUserEmail').value = '';
  document.getElementById('addNewUserAddress').value = '';
}
