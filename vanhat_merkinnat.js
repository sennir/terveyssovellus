document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#entries-table tbody');
    tableBody.innerHTML = ''; // Clear any existing content
  
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id"); // Assuming you have user_id stored in localStorage
  
    // Fetch entries from the server
    fetch(`https://hyvinvointisovellus.northeurope.cloudapp.azure.com/api/entries/${user_id}`, {
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
      // Sort entries by date from newest to oldest
      entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
  
      // Add sorted entries to the table
      entries.forEach((entry) => {
        const row = document.createElement('tr');
  
        const dateCell = document.createElement('td');
        dateCell.className = 'date-cell';
        const dateLink = document.createElement('a');
        dateLink.href = '#';
        dateLink.textContent = new Date(entry.entry_date).toLocaleDateString("en-GB");
        dateLink.className = 'date-link'; // Class for the date link

        dateLink.addEventListener('click', function() {
          localStorage.setItem('selectedEntry', JSON.stringify(entry));
          window.location.href = 'paivakirjamerkinta.html';
        });
  
        dateCell.appendChild(dateLink);
        row.appendChild(dateCell);
        tableBody.appendChild(row); // Add the row to the table
      });
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  });
  

