// import { fetchData } from './fetch.js';
// import { getFormData } from './päiväkirjamerkintä.js';

// Fetching user data based on a stored token and user ID


// Mapping from mood numbers to emojis
const emojiMap = {
  1: "😭",
  2: "😢",
  3: "😐",
  4: "😊",
  5: "😁",
};

// Fetching user data
// Fetching user data
// Fetching user data based on a stored token and user ID
var user_id = localStorage.getItem("user_id");
var token = localStorage.getItem("token");



fetch(`http://127.0.0.1:3000/api/entries/${user_id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
})
.then((fetchedData) => {
  console.log("Fetched Data:", fetchedData);

  fetchedData.sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date));
  const latestEntry = fetchedData[fetchedData.length - 1];

  // Convert the mood to emoji
  const moodEmoji = emojiMap[latestEntry.mood] || "🤔"; // Default emoji

  // Set the mood emoji in the larger text element
  const moodEmojiElement = document.querySelector('.mood-emoji');
  if (moodEmojiElement) {
    moodEmojiElement.textContent = moodEmoji; // Display the emoji
  }

  // Display entry date in a readable format
  const entryDate = new Date(latestEntry.entry_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  document.querySelector('.entry-date').textContent = entryDate;

  // Populate other fields in the "merkinnat" div
  document.querySelector('.input-merkinta').value = latestEntry.notes;
  document.querySelector('.input-weight').value = latestEntry.weight;
  document.querySelector('.input-sleep').value = latestEntry.sleep_hours;
  document.querySelector('.input-exercise').value = latestEntry.exercise_duration || '';
  document.querySelector('.input-feedback').value = latestEntry.feedback || '';
})
.catch((error) => {
  console.error("Error fetching data:", error);
});





