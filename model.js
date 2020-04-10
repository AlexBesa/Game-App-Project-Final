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
        console.log("api resp",apiresponse)
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

function updateGameRequest(updatedGameObj, callbackUpdateGame, gameContainerDiv){
	console.log("Here is updated updatedGameObj: ", updatedGameObj);	
		fetch(apiURL + "/games/" + updatedGameObj._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body:"title=" + updatedGameObj.title 
				+"&description=" + updatedGameObj.description 
				+"&imageUrl=" + updatedGameObj.imageUrl
			}).then(function(response){
					return response.json();
			}).then(function(updatedGame){
					// console.log(updatedGame);
                    gameContainerDiv.classList.remove('grayed-out');
                    // grayed-out is indicating that the function is unavailable at a given time
                    // it's used until user receive the response from 'server'
					callbackUpdateGame(updatedGame);
			});
	}



// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2