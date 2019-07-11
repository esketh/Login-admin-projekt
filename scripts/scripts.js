var User = {
  data: [],
  init() {
    this.getData();
  },
  callback(jsonContent) {
    this.data = JSON.parse(jsonContent).users;
    this.showAll();
  },
  getData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.callback(request.responseText);
      }
    };
    request.open('GET', '/scripts/users.json');
    request.send();
  },
  showAll() {
    console.log(this.data);
  },
  removeUser() {

  },
  createUser() {

  },
  StoreUsers() {

  }
};

User.init();


