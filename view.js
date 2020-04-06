
getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.innerHTML = `<div id="${gameObj._id}">
                        <h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn">Delete Game</button>
                        <button class="update-btn">Edit Game</button></div>`;    

    container1.appendChild(gameELement);

    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
        if(event.target.classList.contains("delete-btn")){
            console.log(event.target);
            deleteGame(event.target.getAttribute("id"), function(apiResponse){
                console.log(apiResponse);
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }else if(event.target.classList.contains("update-btn")){
            console.log("ce e aici?")
            // var toUpdateObject ={
            //     title:event.target.parentElement.querySelector("h1").innerHTML,
            //     description: ,
            //     imageUrl:
            // }
            var toUpdateObject = {
                title : event.target.parentElement.querySelector("h1").innerHTML,
                description : event.target.parentElement.querySelector("p").innerHTML,
                imageUrl:"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
            };

            createUpdateDivElement( toUpdateObject, event.target.parentElement);
            

        }
        
    });
}

function createUpdateDivElement(updateGameObj, gameContainer){
    console.log(updateGameObj);
    const updateElement = document.createElement("div");
    updateElement.classList.add("updateForm")
    updateElement.setAttribute("class","updateForm")
    updateElement.innerHTML = 
        `<label for="gameTitle">Your Title *</label>
        <input type="text" value="${updateGameObj.title}" name="gameTitle" id="updateGameTitle" />

        <label for="gameDescription">Your Description</label>
        <textarea name="gameDescription" value = "${updateGameObj.description}" id="updateGameDescription"></textarea>

        <label for="gameImageUrl">Put a new URL image*</label>
        <input type="text" value = "${updateGameObj.imageUrl}" name="updateGameImageUrl" id="gameImageUrl" />

        <button class="updateBtn">Save Changes</button>
        <button class="cancelBtn">Cancel</button>`
    gameContainer.appendChild(updateElement)
}



function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, createDomElement);
    }
})


// const updateGameTitle = document.getElementById("updateGameTitle");
// const updateGameDescription = document.getElementById("updateGameDescription");
// const updateGameImageUrl = document.getElementById("updateGameImageUrl");

// var urlencoded2 = new URLSearchParams();
// urlencoded2.append("title", updateGameTitle.value);
// urlencoded2.append("description", updateGameDescription.value);
// urlencoded2.append("imageUrl", updateGameImageUrl.value);