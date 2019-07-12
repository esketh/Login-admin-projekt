var User = {
  data: [],
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
    request.open('GET', '/data/users.json');
    request.send();
  },
  showAll() {
    console.log(this.data);
  }
};
User.getData();
console.log(User.data.length);

//console.log(tablaTomb);

/* function buildTable() {
  for (var i = 0; i < User.getData().length; i++) {

  }
} */
