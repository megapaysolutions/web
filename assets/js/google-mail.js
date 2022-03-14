$(function() {
    // Get the form.
    var form = $("#contact-form");

    // Get the messages div.
    var formMessages = $(".form-message");

    // Set up an event listener for the contact form.
    $('#contact-form-google').submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfXiB86cWLtEFY-zbtJO4Mkr-e2j_4uv_WT1-4uvD5V8Y_AYA/formResponse", //The public Google Form url, but replace /view with /formResponse
            data: formData, //Nifty jquery function that gets all the input data
            type: "POST", //tells ajax to post the data to the url
            dataType: "json", //the standard data type for most ajax requests
            statusCode: {
                //the status code from the POST request
                0: function(data) {
                    //0 is when Google gives a CORS error, don't worry it went through
                    $(formMessages).removeClass("error");
                    $(formMessages).addClass("success");

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $("#contact-form input,#contact-form textarea").val("");
                },
                200: function(data) {
                    //200 is a success code. it went through!
                    //success
                    $(formMessages).removeClass("error");
                    $(formMessages).addClass("success");

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $("#contact-form input,#contact-form textarea").val("");
                },
                403: function(data) {
                    //403 is when something went wrong and the submission didn't go through
                    //error
                    $(formMessages).removeClass("success");
                    $(formMessages).addClass("error");

                    // Set the message text.
                    $(formMessages).text(
                        "Oh no! something went wrong. we should check our code to make sure everything matches with Google "
                    );

                    // Clear the form.
                    $("#contact-form input,#contact-form textarea").val("");
                },
            },
        });
    });
});
