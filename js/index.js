$(document).ready(function () {

    $("html").mousemove(function (event) {

        $("#cursor").css("transform", "translate3d(" + (event.clientX - 25) + "px," + (event.clientY - 25) + "px,0px)"
        )
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("#cursor").css("display", "none");
    };


    var letterDropdown = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    letterDropdown.forEach(function (letter) {
        $("select").append("<option>" + letter + "</option>");
    });


    function updateScore() {

        var total = 0;
        var entry = $("#new-entry").val();
        var arrayOfLetters = entry.split("");
        var letterToValue = {
            a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
            d: 2, g: 2,
            b: 3, c: 3, m: 3, p: 3,
            f: 4, h: 4, v: 4, w: 4, y: 4,
            k: 5,
            j: 8, x: 8,
            q: 10, z: 10,
            "*": 0
        }

        arrayOfLetters.forEach(function (letter) {
            total = total + (letterToValue[letter])
        });

        if ($("#double-letter").is(":checked")) {
            var dblLetter = $("#double-letter-dropdown").val().toLowerCase()
            total = total + letterToValue[dblLetter]
        }

        if ($("#triple-letter").is(":checked")) {
            var tplLetter = $("#triple-letter-dropdown").val().toLowerCase()
            total = total + (2 * letterToValue[tplLetter])
        }

        if ($("#double-word").is(":checked")) {
            total = total * 2;
        }

        if ($("#triple-word").is(":checked")) {
            total = total * 3;
        }

        if (arrayOfLetters.length >= 7 && !isNaN(total)) {
            total = total + 50;
            $("#bingo-popup").slideDown();
        } else {
            $("#bingo").prop("checked", false)
            $("#score").css("transform", "scale(1)");
            $("#score").css("transition", ".5s")
            $("html").css("filter", "invert(0%)");
            $("#bingo-popup").slideUp();
        }

        if (isNaN(total)) {
            $("#score").html("—");
        } else {
            $("#score").html(total);
        }

    };

    $("#new-entry").on("input", updateScore);
    $("#double-word").click(updateScore);
    $("#triple-word").click(updateScore);

    $("#double-letter-dropdown").change(function () {
        $("#double-letter").prop("checked", true)
        updateScore();
    })

    $("#double-letter").click(function () {
        if ($("#double-letter").prop("checked", false)) {
            $("#double-letter-dropdown").prop("selectedIndex", 0);
            updateScore();
        }
    });

    $("#triple-letter-dropdown").change(function () {
        $("#triple-letter").prop("checked", true);
        updateScore();
    })

    $("#triple-letter").click(function () {
        if ($("#triple-letter").prop("checked", false)) {
            $("#triple-letter-dropdown").prop("selectedIndex", 0);
            updateScore();
        }
    });

    function addToHistory() {
        var entry = $("#new-entry").val();
        $("#history").prepend("<li>" + entry + "</li>");
    };

    function resetPage() {
        $("#new-entry").val("");
        $("#score").html(0);
        $("#double-letter").prop("checked", false);
        $("#double-letter-dropdown").prop("selectedIndex", 0);
        $("#triple-letter").prop("checked", false);
        $("#triple-letter-dropdown").prop("selectedIndex", 0)
        $("#double-word").prop("checked", false);
        $("#triple-word").prop("checked", false);
        $("#bingo-popup").hide();
    };

    $("#entry").submit(function (event) {
        event.preventDefault();
        addToHistory();
        resetPage();
    });

    $("#submit").click(function () {
        addToHistory();
        resetPage();
    });

    $("#reset,#reset-mobile").click(function () {
        resetPage();
        $("#history").html("");
    });

    $("#options-toggle").click(function () {
        $("#options-toggle").hide();
        $("#close-toggle").show();
        $("#close-toggle").css("display", "flex");
        $("#options-container").slideToggle();
        $("#options-container").css("display", "flex");
        $("#score").css("font-size", "80px");
    });

    $("#close-toggle").click(function () {
        $("#close-toggle").hide();
        $("#options-toggle").show();
        $("#options-container").slideToggle();
        $("#options-container").css("display", "flex");
        $("#score").css("font-size", "");
    });

    $("#information").click(function () {
        $("#information").hide();
        $("#close-information").show();
        $("#overlay").toggle("slide", { direction: "left" }, 500);
    });

    $("#close-information").click(function () {
        $("#close-information").hide();
        $("#information").show();
        $("#overlay").toggle("slide", { direction: "left" }, 500);
    });


});
