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

