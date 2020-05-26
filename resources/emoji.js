$(document).ready(function(e) {
    var hintclick = 0;
    var q;
    var final;
    var count = 0;
    var cor = 0;
    var qtext = "";

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    function makeQ(array) {
        var t = "";
        for (var x = 0; x < array.length; x++) {
            t += "<img src=\"images/" + array[x] + ".png\" /> ";
        }
        return t;
    }

    $.getJSON("resources/metadata.json", function(m) {
        $("#title").html(m[0].title);
    });

    $.getJSON("resources/emojis.json", function(d) {
        q = d;
        shuffle(q);
        final = q.length;
        $("#cat").html(q[0].category);
        qtext = makeQ(q[0].question);
        $("#q").html(qtext);
        $("#ans").val("");
    });

    $("#submit").click(function() {
        var a = q[count].answer.toUpperCase().split("|");
        var yes = $.inArray($("#ans").val().toUpperCase(), a);
        if (yes > -1) {
            cor++;
            $("#fbtext").html("Correct! \n" + q[count].anstext);
            $(".blur").show();
            $("#feedback").show();
        }
        else {
            alert("Try again");
            $("#ans").val("");
            $("#ans").focus();
        }
    });
    
    $("#giveup").click(function() {
        $("#fbtext").html(q[count].anstext);
        $(".blur").show();
        $("#feedback").show();
    });

    $("#hintbut").click(function() {
        hintclick++;
        var h = "hint" + hintclick;
        console.log(q[count][h]);
        $("#hint").html(q[count][h]);
        if (hintclick == 3) {
            $("#hintbut").prop("disabled", true);
        }
    });
    
    $("#quit").click(function() {
        $(".playarea").hide();
        $(".results").show();
        $("#finalresult").html("You answered " + cor + " out of " + count + " correct.");
    });

    $(".close span").click(function() {
        $(".blur").hide();
        $("#feedback").hide();
        count++;
        if (count < final) {
            $("#cat").html(q[count].category);
            qtext = makeQ(q[count].question);
            $("#q").html(qtext);
            $("#ans").val("");
            $("#hintbut").prop("disabled", false);
            hintclick = 0;
            $("#hint").html("");
        }
        else {
            $(".playarea").hide();
            $(".results").show();
            $("#finalresult").html("You answered " + cor + " out of " + final + " correct.");
        }
    });
});
