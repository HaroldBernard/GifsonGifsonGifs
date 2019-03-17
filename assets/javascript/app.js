// gif array to create buttons
var gifs = ["cats", "dogs", "bacon", "pies", "fun"]

// function to display gifs
function displayGif() {
    // clears inital screan set up and moves background image from left to the right column
    $("#gifs-here").empty()
    $(".clearText").empty()
    $("#gifs-here").css("background-image", "none")
    $("#form-here").css("background-image", "url(assets/images/wizard.gif)")

    // creating a variable for the data-name attribute value
    var gif = $(this).attr("data-name")
    // querying the giphy library using the API key created and link from the giphy developer site
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=iapuI8UCW4JJr1pl8FWFFekj28q5ms0G&limit=9"
    // getting the right data needed to display the gifs by using an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data
        for (let i = 0; i < results.length; i++) {
            // creating variables for the giphy data and jquery html references 
            var gifDiv = $("<div class='holder'>");
            var rating = results[i].rating
            var enterResults = $('<div class="rating">').text("Rating: " + rating)
            var createImage = $("<img class='gif'>").attr({ "src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animated": results[i].images.fixed_height.url, "data-state": "still" })
            // adds gifs and rating to the webpage
            $("#gifs-here").append(gifDiv)
            gifDiv.append(enterResults)
            gifDiv.append(createImage)
        }


    })
}

// creates and appends buttons
function renderButtons() {

    // Deletes all gifs prior to adding new giffs
    $("#user-buttons").empty();

    // Looping through the array of gif names and adding buttons for each
    for (var i = 0; i < gifs.length; i++) {


        var button = $("<button>");
        button.addClass("gif-button");
        button.attr("data-name", gifs[i]);
        button.text(gifs[i]);
        // Adding the button to the user-buttons div
        $("#user-buttons").append(button);
    }
}

// on click event that takes the user input and turns it into a button
$("#select-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#user-input").val().trim();

    // Adding user input from the textbox to gif array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of gif array
    renderButtons();
});

// on click event that runs display gif function that displays the gifs
$(document).on("click", ".gif-button", displayGif);
renderButtons()

// function that starts and stops the gif using the api data logged in the display gif function attributes
$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

