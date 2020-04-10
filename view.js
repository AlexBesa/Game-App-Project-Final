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

    const gameObjectId = document.getElementById(`${gameObj._id}`);
    gameObjectId.addEventListener("click", function(event){
        if(event.target.classList.contains("delete-btn")){
            // console.log("event.target.getAttribute('id')",event.target.parentElement.getAttribute("id"));
            deleteGame(event.target.parentElement.getAttribute("id"), function(apiResponse){
                console.log("api response is here: ",apiResponse);
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }else if(event.target.classList.contains("update-btn")){           
            createUpdateDivElement( gameObj, event.target.parentElement);        
        }
    });
}

function createUpdateDivElement(updateGameObj, gameContainer){  
    const updateElement = document.createElement("div");
    updateElement.classList.add("updateFormDiv");
    updateElement.innerHTML = 
        `<div class ="updateForm", id ="${updateGameObj._id}">
        <label for="gameTitle">Your Title *</label>
        <input type="text" value="${updateGameObj.title}" name="gameTitle" id="updateGameTitle" />
        
        <label for="updateGameDescription">Your Description</label>
        <input type="text" name="updateGameDescription" value = "${updateGameObj.description}" id="updateGameDescription" />

        <label for="gameImageUrl">Put a new URL image*</label>
        <input type="text" value = "${updateGameObj.imageUrl}" name="updateGameImageUrl" id="updateGameImageUrl" />

        <button class="updateBtn">Save Changes</button>
        <button class="cancelBtn">Cancel</button>
        </div>`;
    gameContainer.appendChild(updateElement);
    console.log('gameContainer is: ', gameContainer);
    console.log('updated game object is: ', updateGameObj);
    
    const updateGameObjectId = document.getElementById(`${updateGameObj._id}`);
    updateGameObjectId.addEventListener("click", function(event){
        if(event.target.classList.contains("cancelBtn")){
            // console.log("eventul sters este:",event.target.parentNode);
            removeDeletedElementFromDOM(event.target.parentElement); 
        }else if (event.target.classList.contains("updateBtn")){        
            // console.log("updateGameObj este aici",updateGameObj);
            gameContainer.classList.add('grayed-out');
            const updateGameTitleInputValue = updateElement.querySelector('#updateGameTitle').value;
            // console.log("updateGameTitleInputValue is :",updateGameTitleInputValue);
            const updateGameDescriptionInputValue = updateElement.querySelector('#updateGameDescription').value;
            const updateGameImageUrlInputValue = updateElement.querySelector('#updateGameImageUrl').value;
            
            gameContainer.querySelector('img').src = updateGameImageUrlInputValue;
            gameContainer.querySelector('h1').innerHTML = updateGameTitleInputValue;
            gameContainer.querySelector('p').innerHTML = updateGameDescriptionInputValue;
            
            updateGameObj.title=updateGameTitleInputValue;
            updateGameObj.imageUrl=updateGameImageUrlInputValue;
            updateGameObj.description=updateGameDescriptionInputValue;
            
            updateGameRequest(updateGameObj, function() { console.log("Status update: Success !!! ")}, gameContainer)

            removeDeletedElementFromDOM(event.target.parentElement);
        }    
    });
  
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
    inputEl.before(errorMsgElement);
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
        console.log("aici e urlencoded ", urlencoded)

        createGameRequest(urlencoded, createDomElement);

        console.log("aici e createGameRequest ", createGameRequest)
        
    }
    gameTitle.value = "";
    gameDescription.value = "";
    gamePublisher.value = "";
    gameImageUrl.value = "";
    gameRelease.value = "";
})
