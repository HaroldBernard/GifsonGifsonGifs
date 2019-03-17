var gifs = ["cats", "dogs", "bacon", "chuck norris", "aliens"]

function displayGif() {
    $("#gifs-here").empty()
    $(".clearText").empty()
    $("#gifs-here").css("background-image", "none")
    $("#form-here").css("background-image", "url(assets/images/wizard.gif)")
    var gif = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=iapuI8UCW4JJr1pl8FWFFekj28q5ms0G&limit=9"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data
        for (let i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='holder'>");
            var rating = results[i].rating
            var enterResults = $('<div class="rating">').text("Rating: " + rating)
            var createImage = $("<img class='gif'>").attr({ "src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animated": results[i].images.fixed_height.url, "data-state": "still" })

            $("#gifs-here").append(gifDiv)
            gifDiv.append(enterResults)
            gifDiv.append(createImage)
        }


    })
}

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#user-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var button = $("<button>");
        // Adding a class of movie-btn to our button
        button.addClass("gif-button");
        // Adding a data-attribute
        button.attr("data-name", gifs[i]);
        // Providing the initial button text
        button.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#user-buttons").append(button);
    }
}
$("#select-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#user-input").val().trim();

    // Adding movie from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
$(document).on("click", ".gif-button", displayGif);
renderButtons()

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

