// jQuery code for handling mood selection
$(document).ready(function() {
    $('.mood-option').click(function() {
        const selectedMood = $(this).data('value');
        $('#selectedMood').val(selectedMood);
        $('.mood-option').removeClass('active'); // Remove active class from all mood options
        $(this).addClass('active'); // Add active class to the selected mood option
        console.log($('.mood-option.active').data('value'));
    });
});

  // Päiväkirjamerkinnän lisääminen
  document.addEventListener('DOMContentLoaded', () => {
    const diaryForm = document.getElementById('diaryForm');
  
    if (diaryForm) {
      diaryForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
  
        const formData = new FormData(diaryForm);
        const data = {
          entry_date: formData.get('entry_date'),
          mood: formData.get('mood'),
          notes: formData.get('notes'),
          sleep_hours: formData.get('sleep_hours'),
          weight: formData.get('weight'),
        };
  
        const token = localStorage.getItem('token');
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(data),
        };
  
        try {
          const response = await fetch('http://127.0.0.1:3000/api/entries', options);
          if (response.ok) {
            alert('Diary entry added successfully');
          } else {
            throw new Error('Failed to add diary entry');
          }
        } catch (error) {
          console.error('Error adding diary entry:', error);
          alert('Error adding diary entry');
        }
      });
    }

// Fetch and display existing diary entries
const fetchEntries = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/entries', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        });
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const entries = await response.json();
        // Display the last entry (as an example)
        const lastEntry = entries[entries.length - 1];
        document.querySelector('.merkinnat input[name="merkinta"]').value = lastEntry.notes;
        // Update other fields as needed
    } catch (error) {
        console.error('Error fetching diary entries:', error);
    }
    };

    fetchEntries(); // Fetch and display entries when the page loads
});