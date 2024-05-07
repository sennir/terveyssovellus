// import { fetchData } from './fetch.js';
// import { getFormData } from './päiväkirjamerkintä.js';

// Fetching user data based on a stored token and user ID


// Mapping from mood numbers to emojis
// Mapping from mood numbers to emojis
const emojiMap = {
  1: "😭",
  2: "😢",
  3: "😐",
  4: "😊",
  5: "😁",
};

// Function to get the emoji based on mood value
function getMoodEmoji(mood) {
  return emojiMap[mood] || "🤔"; // Default emoji if not found
}

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#entries-table tbody');
  // tableBody.innerHTML = ''; // Clear any existing content
  
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id"); // Assuming you have user_id stored in localStorage

  // Fetch entries from the server and populate the table
  fetch(`http://localhost:3000/api/entries/${user_id}`, {
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
  .then((entries) => {
    entries.forEach((entry) => {
      const row = document.createElement('tr');

      const dateCell = document.createElement('td');
      const dateLink = document.createElement('a');
      dateLink.href = '#'; // No query string
      dateLink.textContent = new Date(entry.entry_date).toLocaleDateString("en-GB");

      // Click handler to set selected entry and navigate
      dateLink.addEventListener('click', () => {
        localStorage.setItem('selectedEntry', JSON.stringify(entry));
        window.location.href = 'paivakirjamerkinta.html';
      });

      dateCell.appendChild(dateLink);
      row.appendChild(dateCell);
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  // Retrieve and display selected entry in the form
  const selectedEntry = JSON.parse(localStorage.getItem('selectedEntry'));

  if (selectedEntry) {
    // Display the mood emoji
    const moodEmojiElement = document.querySelector('.mood-emoji');
    if (moodEmojiElement) {
      const moodEmoji = getMoodEmoji(selectedEntry.mood);
      moodEmojiElement.textContent = moodEmoji;
    }

    // Display the entry date in a readable format
    const entryDate = new Date(selectedEntry.entry_date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const entryDateElement = document.querySelector('.entry-date');
    if (entryDateElement) {
      entryDateElement.textContent = entryDate;
    }

    // Populate the "merkinnat" div with entry details
    document.querySelector('.input-merkinta').value = selectedEntry.notes || '';
    document.querySelector('.input-weight').value = selectedEntry.weight || '';
    document.querySelector('.input-sleep').value = selectedEntry.sleep_hours || '';
    document.querySelector('.input-exercise').value = selectedEntry.exercise_duration || '';
    document.querySelector('.input-feedback').value = selectedEntry.feedback || '';
  } else {
    console.error("No selected entry found in localStorage");
  }
});

// Get the textarea element
const textarea = document.querySelector('.input-merkinta');

// Function to adjust the height
function adjustHeight() {
  textarea.style.height = 'auto'; // Temporarily shrink the textarea to get the correct scrollHeight
  textarea.style.whiteSpace = 'pre-wrap'; // Allow the text to wrap to the next line
  textarea.style.wordWrap = 'break-word'; // Break words onto the next line if they are too long
  textarea.style.overflowWrap = 'break-word'; // Same as word-wrap, but for future browsers
  setTimeout(function() {
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
  }, 0);
}

// Listen for the input event
textarea.addEventListener('input', adjustHeight);

// Call the function initially to set the correct height
adjustHeight();