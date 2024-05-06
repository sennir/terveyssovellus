import './style.css';
import { fetchData } from './fetch.js';

const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan profiili');

  const name = document.getElementById('name').value;
  const birthday = document.getElementById('birthday').value;
  const phonenumber = document.getElementById('phonenumber').value;
  const gender = document.getElementById('gender').value;
  const height = document.getElementById('height').value;
  const exerciseFrequency = document.getElementById('exerciseFrequency').value;
  const sleepQuality = document.getElementById('sleepQuality').value;
  const stressLevel = document.getElementById('stressLevel').value;
  const institution = document.getElementById('institution').value;

  const url = 'http://localhost:3000/api/user/tallenna-profiili';

  const data = {
    name: name,
    birthday: birthday,
    phonenumber: phonenumber,
    gender: gender,
    height: height,
    exerciseFrequency: exerciseFrequency,
    sleepQuality: sleepQuality,
    stressLevel: stressLevel,
    institution: institution
  };

  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };

  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
    alert('Profiili tallennettu onnistuneesti!');
  } catch (error) {
    console.error(error);
    alert('Profiilin tallentaminen epäonnistui. Yritä uudelleen.');
  }
});
