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

  }

};

// Az adatok megjelenítéséhez

BiggestJuzerEver.int();
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

