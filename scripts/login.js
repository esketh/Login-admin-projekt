var loginUsers = [{
        username: 'Timi',
        password: 'pw'
    },
    {
        username: 'Szilvi',
        password: 'pw'
    },
    {
        username: 'Evelin',
        password: 'pw'
    },
    {
        username: 'Gergely',
        password: 'pw'
    }
];

window.addEventListener('load', window_LoadHandler);

function window_LoadHandler() {
    var nodeLogInInput = document.querySelector('#inputLogIn');
    nodeLogInInput.addEventListener('click', logIn_ClickHandler)
}

function logIn_ClickHandler() {
    var nodeUserNameInput = document.querySelector('#inputUserName').value;
    var nodePasswordInput = document.querySelector('#inputPassword').value;
    for (var i = 0; i < loginUsers.length; i++) {
        if (loginUsers[i].username == nodeUserNameInput && loginUsers[i].password == nodePasswordInput) {
            window.open('admin.html', '_self');
            return;
        }
    }
    var nodeHibak = document.querySelector('#divFailedLogin');
    nodeHibak.style.display = 'block';
}