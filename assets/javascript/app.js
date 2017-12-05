$(document).ready(function() {

    // Initial array of animals
    var animals = ["dog", "cat", "groundhog", "llama", "lion", "bear", "sheep", "cow"];

    // Function for displaying animal buttons
    function renderButtons() {
        // Deletes the buttons prior to adding new buttons (otherwise buttons will repeat)
        $("#button-container").empty();
        // Loops through the array of animals to dynamicaly generates buttons 
        // for each animal in the array and assign class, attributes and text
        for (var i = 0; i < animals.length; i++) {
            var b = $("<button>");
            b.addClass("animal");
            b.attr("data-name", animals[i]);
            b.text(animals[i]);
            $("#button-container").append(b);
        }
    }

    renderButtons();

    // Function adds new animals to the array when the submit button is clicked
    // and re-renders the animal buttons
    $("#add-button").on("click", function(e) {
        event.preventDefault();
        var newAnimal = $("#animal-add").val().trim();
        animals.push(newAnimal);
        renderButtons();
        $("input").val("");
    });


    // Function to render the HTML to display the chosen animal content
    function displayAnimalGif() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            var results = response.data;
            // Clear any prior gif contents in #gif-container
                $("#gif-container").empty();

            // Loop through the animal gif data response to display rating, image and related attributes
            for (var i = 0; i < results.length; i++) {
                var animalImage = $("<img>");
                animalImage.addClass("gif");
                animalImage.attr("src", results[i].images.fixed_width_still.url);
                animalImage.attr("data-still", results[i].images.fixed_width_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_width.url);
                animalImage.attr("data-state", "still");
                var animalRating = $("<figcaption>").text("Rating: " + results[i].rating);
                animalRating.addClass("gif");
                var animalItem = $("<figure>");
                animalItem.addClass("gif-item");
                animalItem.append(animalImage, animalRating);
                $("#gif-container").append(animalItem);

            }
        });
    }

    // Click event listener to all elements with a class of animal
    $(document).on("click", ".animal", displayAnimalGif);

    // Function to play/pause the animal gif when clicking on the image
    function playAnimalGif() {
        var stillSource = $(this).attr("data-still");
        var animateSource = $(this).attr("data-animate");
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", animateSource);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", stillSource);
            $(this).attr("data-state", "still");
        }
    }

    // Click event listener to all elements with a class of gif
    $(document).on("click", ".gif", playAnimalGif);


});