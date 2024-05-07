import { fetchData } from '/fetch.js';

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

// Diary entry submission
document.addEventListener('DOMContentLoaded', () => {
  const diaryForm = document.getElementById('diaryform');
  console.log(diaryForm); // This will log the form element to the console

  if (diaryForm) {
    diaryForm.addEventListener('submit', async (evt) => {
      console.log('Form submitted'); // This will log when the form is submitted
      evt.preventDefault();
      console.log('Nyt lisätään päiväkirjamerkintä');
    
      const formData = new FormData(diaryForm);
      const user_id = localStorage.getItem('user_id'); // Retrieve user ID from localStorage
      
      // Get the selected emoji and mood number
      var selectedEmoji = $('.mood-option.active').data('value'); // Get the selected emoji
      var selectedMood = $('.mood-option.active').data('value');
  // Check if selectedMood is a valid integer
  if (!Number.isInteger(parseInt(selectedMood))) {
    alert("Invalid mood value. Please select a valid mood.");
    return;
  } else {
    console.log('Selected Mood:', selectedMood); // Log the selected mood to the console
  }

  $('#selectedMood').val(selectedMood);
  // Include selectedMood in the form data
  formData.append('mood', selectedMood);

$('#selectedMood').val(selectedMood);
// Include selectedMood in the form data
formData.append('mood', selectedMood);
      
      $('#selectedMood').val(selectedMood);
      // Include selectedMood in the form data
      formData.append('mood', selectedMood);

      const mood = Number(formData.get('mood')); // Convert mood to a number

    if (!Number.isInteger(mood)) {
      alert('Invalid mood value. Please select a valid mood.');
      return;
    }
      
    console.log('Exercise Duration:', formData.get('exercise_duration'));


      const data = {
        user_id: user_id, 
        entry_date: formData.get('entry_date'),
        mood: mood,
        notes: formData.get('notes'),
        sleep_hours: formData.get('sleep_hours'),
        weight: formData.get('weight'),
        exercise_duration: formData.get('exercise_duration'),
      };
      console.log('Data:', data); // Log the data to the console
      
      console.log('User ID:', data.user_id); // Log the user ID to the console
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
        console.log('Data:', data);
        console.log('Options:', options);

        const response = await fetch('http://localhost:3000/api/entries', options);
        if (response.ok) {
          alert('Diary entry added successfully');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});