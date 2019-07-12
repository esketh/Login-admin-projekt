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
      userTemplate += `<tr>
              <td contenteditable="true" spellcheck="false">${element.id}</td>
              <td contenteditable="true" spellcheck="false">${element.name}</td>
              <td contenteditable="true" spellcheck="false">${element.emailAddress}</td>
              <td contenteditable="true" spellcheck="false">${element.address}</td>
              <td><button class="btnEdit" onclick="editHandler(this);" >${'Szerkesztés'}</button>
             <button class="btnSave" onclick="">${'Mentés'}</button></td>
              <td><button class="btnDelete" onclick=" kerdezTorol(this);" >${'Törlés'}</button></td>
    
               </tr>`;
      document.querySelector('.Users_data').innerHTML = userTemplate;
    });
  },
  remove(rowTarget) {
    console.log('teszt: ', rowTarget.parentNode);
    // event.target the button lesz
    var td = event.target.parentNode;
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
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

// az adatok megjelenítéséhez

BiggestJuzerEver.int();
BiggestJuzerEver.mentesbtn();

//  Esemény kezelések


function kerdezTorol() {
  console.log('?', event.target.parentNode.parentNode);
  var noderemoveQuestion = document.querySelector('.removeQuestion');
  noderemoveQuestion.style.display = 'block';
  var target = event.target.parentNode.parentNode;
  return target;
}
var rowTarget = kerdezTorol();

function removeHandler(rowTarget) {
  BiggestJuzerEver.remove(rowTarget);
}
function editHandler() {
  BiggestJuzerEver.edit();
}
