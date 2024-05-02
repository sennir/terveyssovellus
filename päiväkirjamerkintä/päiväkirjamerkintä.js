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
    console.log('DOMContentLoaded event triggered');
    const diaryForm = document.getElementById('diaryForm');
  
    if (diaryForm) {
      diaryForm.addEventListener('submit', async (evt) => {
        console.log('Form submit event triggered');
        evt.preventDefault();
        console.log('Form submitted');
  
        const formData = new FormData(diaryForm);
        const data = {
          entry_date: formData.get('entryDate'),
          mood: formData.get('mood'),
          notes: formData.get('notes'),
          sleep_hours: formData.get('sleep_hours'),
          weight: formData.get('weight'),
        };
  
        // Log the data object to the console
        console.log('Data:', data);
  
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(data),
        };
  
        // Fetch user ID dynamically
        const userId = await getUserId();
        const url = 'http://127.0.0.1:3000/api/entries';
  
        try {
          const responseData = await fetchData(url, options);
          console.log(responseData);
          alert('Diary entry added successfully');
        } catch (error) {
          console.error('Error adding diary entry:', error);
          alert('Error adding diary entry');
        }
      });
    }
  });