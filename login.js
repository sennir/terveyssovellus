
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');
  alert('New user created');
  const url = 'http://localhost:3000/api/users';


  // # Create user
  // POST http://127.0.0.1:3000/api/users
  //content-type: application/json

  const form = document.querySelector('.create_user_form');
  const username = form.querySelector('input[name = username]').value;
  const password = form.querySelector('input[name = password]').value;
  const email = form.querySelector('input[name = email]').value;
  console.log(username, password, email);


  const data = {
    "username": username,
    "password": password,
    "email": email,
    // "password": form.querySelector('input[name = password]').value,
    // "email": form.querySelector('input[name = email]').value
  }
  

  const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
  fetchData(url, options).then((data) => {

    // käsitellään fetchdata funktiosta tullut JSON
    console.log(data);
  });
});


// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');
  
  
  const url = 'http://localhost:3000/api/auth/login';


  const form = document.querySelector('.login_form');


  const data = {
    "username": form.querySelector('input[name = username]').value,
    "password": form.querySelector('input[name = password]').value,
  };

  const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

  fetchData(url, options).then((data) => {
    // käsitellään fetchdata funktiosta tullut JSON
    console.log(data);
    console.log(data.token);
    console.log(data.user_id);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data.user_id);
    

    //fetch.js palauttaa BE puolen validointivirheen
    //joka käsitellään 

    if (data.token == undefined) {
      alert('Unauth user: käyttäjänimi tai salasana ei oikein!!');

    } else {
      alert('Auth toimii: ja saadaan tokeni');
      window.location.href = 'home.html';

    }

    logResponse('loginResponce', `localStorage set with token value: ${data.token}`);
    logResponse('loginResponce', `localStorage set with username value: ${data.user.username}`);

  })

});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  // # Get user info by token (requires token)
  // GET http://localhost:3000/api/auth/me
  // Authorization: Bearer (put-user-token-here)

  const url = 'http://localhost:3000/api/auth/me';
  const muntokeni = localStorage.getItem('token');
  console.log('Tämä on haettu LocalStoragesta', muntokeni);

  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: 'Bearer: ' + muntokeni,
    },
  };

  console.log(options);

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
  });
});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}