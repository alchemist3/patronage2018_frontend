countMovies(moviesData);

var moviesList = document.getElementById("moviesList");
makeMovieList(moviesData, moviesList);


function countMovies(moviesData) {
    var moviesCounterAll = moviesData.length.toString();

    var allMovies = document.getElementById("moviesCounterAll");
    allMovies.innerHTML = moviesCounterAll;

    var moviesCounterSeen = 0;
    for (var i = 0; i < moviesData.length; i++) {
        if (moviesData[i].seen === "T") {
            moviesCounterSeen++;
        }
    }
    var seenMovies = document.getElementById("moviesCounterSeen");
    seenMovies.innerHTML = moviesCounterSeen.toString();
}

function makeMovieList(jsonObject, listElement) {
    for (var i in jsonObject) {
        var newLI = document.createElement("li");

        newLI.innerHTML = jsonObject[i].title
        listElement.appendChild(newLI);
        var newUL = document.createElement("ul");
        newLI.appendChild(newUL);

        for (var j in jsonObject[i]) {
            if (j != "title" && j != "seen") {
                var liElement = document.createElement("li");
                liElement.innerHTML = j + ": " + jsonObject[i][j];
                newUL.appendChild(liElement);
            }
        }

        var seenLI = document.createElement("li");
        newUL.appendChild(seenLI);

        var label = document.createElement("label");
        label.innerHTML = "Seen ";
        seenLI.appendChild(label);

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", jsonObject[i].id);
        if (jsonObject[i].seen === "T") {
            checkbox.checked = "checked";
        }
        label.appendChild(checkbox);
    }
}

function updateMovies(jsonObj, id) {
    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].id == id) {
            if (jsonObj[i].seen == "T") {
                jsonObj[i].seen = "F";
            } else {
                jsonObj[i].seen = "T";
            }
            break;
        }
    }
}


var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", clickCheckbox);
}

function clickCheckbox(ev) {
    var id = ev.target.id;
    updateMovies(moviesData, id);
    countMovies(moviesData);
}