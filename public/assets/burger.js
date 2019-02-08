$(function() {

    $("#submit-btn").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#new-burger").val().trim()
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                location.reload();
            }
        )
    })

    $("#devour").on("click", function (event) {
        var id = $(this).data("id");
        var oldBurger = {
            devoured: true
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: oldBurger
        }).then(
            function() {
                location.reload();
            }
        );
    });
});