import { fetchData } from './fetch.js';
import { getFormData } from './päiväkirjamerkintä.js';

const data = getFormData();
console.log(data);

// Fetch the diary entries from the server
const response = await fetch('http://127.0.0.1:3000/api/entries', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const entries = await response.json();

// Select the elements where you want to display the data
const entryDateElement = document.querySelector('.merkinnat input[name="entryDate"]');
const moodElement = document.querySelector('.merkinnat input[name="mood"]');
const notesElement = document.querySelector('.merkinnat input[name="notes"]');
const sleepHoursElement = document.querySelector('.merkinnat input[name="sleep_hours"]');
const weightElement = document.querySelector('.merkinnat input[name="weight"]');

// Display the data
// Assuming entries is an array and you want to display the last entry
const lastEntry = entries[entries.length - 1];
entryDateElement.value = lastEntry.entry_date;
moodElement.value = lastEntry.mood;
notesElement.value = lastEntry.notes;
sleepHoursElement.value = lastEntry.sleep_hours;
weightElement.value = lastEntry.weight;

