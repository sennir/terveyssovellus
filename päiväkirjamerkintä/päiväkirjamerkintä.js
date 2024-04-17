// jQuery code for handling mood selection
$(document).ready(function() {
    $('.mood-option').click(function() {
        const selectedMood = $(this).data('value');
        $('#selectedMood').val(selectedMood);
    });
});
