var apiURL = "https://games-world.herokuapp.com";

function getGamesList(callbackFunction){
    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.json();
    }).then(function(arrayOfGames){
        callbackFunction(arrayOfGames);
    });
}


function deleteGame(gameID, callbackFunction) {
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r){
        return r.text();
    }).then(function(apiresponse){
        callbackFunction(apiresponse);
    });

}

function createGameRequest(gameObject, callbackCreateGame){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    }).then(function(createdGame){
        console.log(createdGame);
        callbackCreateGame(createdGame);
    });
}


function updateGameRequest(updatedGameObj, callbackUpdateGame){
    fetch(apiURL + "/games", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    }).then(function(response){
        return response.json();
    }).then(function(updatedGame){
        console.log(updatedGame);
        callbackUpdateGame(updatedGame);
    });
}


// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2