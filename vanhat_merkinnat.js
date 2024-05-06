document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#entries-table tbody');
    tableBody.innerHTML = ''; // Clear any existing content
  
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id"); // Assuming you have user_id stored in localStorage
  
    // Fetch entries from the server
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
    .then((entries) => {
      entries.forEach((entry) => {
        const row = document.createElement('tr');
  
        const dateCell = document.createElement('td');
        dateCell.className = 'date-cell'; // Set the class
        const dateLink = document.createElement('a');
        dateLink.href = '#'; // Remove the query string
        dateLink.textContent = new Date(entry.entry_date).toLocaleDateString("en-GB");
        dateLink.addEventListener('click', function() {
          // Store the entry in localStorage and navigate to the paivakirjamerkinta.html page
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