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
    request.onreadystatechange = () =>{
      if (request.readyState === 4 && request.status === 200) {
        this.callback(request.responseText);
      }
    };
    request.open('GET', '/Data/users.json');
    request.send();
  },
  showAllDataWithTempleString() {
    var  userTemplate = '';
    this.data.forEach(element => {
      userTemplate += `<tr id="${element.id}">
              <td>${element.id}</td>
              <td class="editableName"><input value="${element.name}" disabled></td>
              <td class="editableEmail"><input value="${element.emailAddress}" disabled></td>
              <td class="editableAddress"><input value="${element.address}"  disabled></td>
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
    <p>Biztosan menteni akarod ${userSaveId - 1 } sort ?</p>
    <button id="yesSave" onclick="saveIfYes()">Igen</button>
    <button id="noSave" onclick="saveIfNo()">Nem</button>
    </div>`;
    document.querySelector('.saveQestion').innerHTML = nodeMentesQuestion;
    this.edit();
  },
  edit() {

  },

  create() {

  },
  store() {

  }

};

// Az adatok megjelenítéséhez

BiggestJuzerEver.int();

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
  nodeEdittableTdName .removeAttribute('disabled');
  nodeEdittableTdName .setAttribute('spellcheck', false);

  var nodeEdittableTdEmail = nodeTr.querySelector('.editableEmail>input');
  nodeEdittableTdEmail.removeAttribute('disabled');
  nodeEdittableTdEmail.setAttribute('spellcheck', false);

  var nodeEdittableTdAddress = nodeTr.querySelector('.editableAddress>input');
  nodeEdittableTdAddress.removeAttribute('disabled');
  nodeEdittableTdAddress.setAttribute('spellcheck', false);

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
  var nodeTr = event.target.parentNode.parentNode;
  nodeTr.querySelector('.editableName>input').setAttribute('disabled');
  nodeTr.querySelector('.editableEmail>input').setAttribute('disabled');
  nodeTr.querySelector('.editableAddress>input').setAttribute('disabled');

  document.querySelector('.saveQestion').classList.remove('saveQuestionDisplayBlock');
}
