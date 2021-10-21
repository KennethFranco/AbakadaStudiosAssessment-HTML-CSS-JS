let games = [];

var totalPrice = 0;

// addGame data acquiring + data submission into JSON Functionalities
const addGame = (ev)=>{
    ev.preventDefault();
    let game = {
        // Unique ID generated in order to use for the for loops later on
        id : Date.now(),

        gameTitle: document.getElementById("gameTitle").value,
        genre: document.getElementById("genre").value,
        developer: document.getElementById("developer").value,
        price: document.getElementById("price").value,
        storeURL: document.getElementById("storeURL").value,
        coverURL: document.getElementById("coverURL").value,
        releaseDate: document.getElementById("releaseDate").value,
    }

    games.push(game);
    
    document.getElementById("gameTitle").value = ""
    document.getElementById("genre").value = ""
    document.getElementById("developer").value = ""
    document.getElementById("price").value = ""
    document.getElementById("storeURL").value = ""
    document.getElementById("coverURL").value = ""
    document.getElementById("releaseDate").value = ""
    buildTable(games);

    // Put into console for checking purposes
    console.warn('added' , {games} );
    $('#staticBackdrop').modal('hide');
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("submitButton").addEventListener("click", addGame);
});

// editGame data acquiring + data submission into JSON functionalities, also makes respective modal appear
const editGame = (ev)=>{
    var table = document.getElementById("mainTable");
    ev.preventDefault();
    table.innerHTML = ""
    
    id = document.getElementById("current").innerHTML;
    // For loops used often to iterate throughout the entire JSON array
    for (var i= 0; i < games.length; i++){
        if(games[i].id == id){
            games[i].id = id
            games[i].gameTitle = document.getElementById("editGameTitle").value;
            games[i].genre = document.getElementById("editGenre").value; 
            games[i].developer = document.getElementById("editDeveloper").value;
            games[i].price = document.getElementById("editPrice").value; 
            games[i].storeURL =  document.getElementById("editStoreURL").value;
            games[i].coverURL = document.getElementById("editCoverURL").value;
            games[i].releaseDate = document.getElementById("editReleaseDate").value;
        }
    }

    document.getElementById("editGameTitle").value = ""
    document.getElementById("editGenre").value = ""
    document.getElementById("editDeveloper").value = ""
    document.getElementById("editPrice").value = ""
    document.getElementById("editStoreURL").value = ""
    document.getElementById("editCoverURL").value = ""
    document.getElementById("editReleaseDate").value = ""
    buildTable(games);
    $('#exampleModal').modal('hide');
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("submitEditsButton").addEventListener("click", editGame);
});

// Function builds table according to data inside JSON 
function buildTable(data){
    console.log(data)
    var table = document.getElementById("mainTable");

    // previous table is emptied so that games do not overlap
    table.innerHTML = ""

    // For loop used here in order to iterate throughout the entire array and create rows for each of them with all the corresponding data 
    for (var i = 0; i < data.length; i++){
        var row = 
        `<tr>
            <td>
                <img class = "tableImage" src="steam.png" alt="Steam Image">
            </td>
            <td>
                <h2 class=  "tableDataGameTitle"><b>${data[i].gameTitle}</b></h2>
                <br/>
                <p class = "tableOtherData">Genre: ${data[i].genre}</p>
                <br/>
                <p class = "tableOtherData">Developed by ${data[i].developer}</p>
                <br/>
                <h3 class = "tableDataPrice"><b>PHP ${data[i].price}</b></h3>
                <br/>
                <p class = "tableOtherData">Store URL: ${data[i].storeURL}</p>
                <br/>
                <p class = "tableOtherData">Cover Photo URL: ${data[i].coverURL}</p>
                <br/>
                <p class = "tableOtherData">Release Date: ${data[i].releaseDate}</p>
                <br/>
            </td>

            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning" id = "editButton" onclick = "editButton(${data[i].id})">Edit</button>
            </td>
        </tr>`
        table.innerHTML += row
    }
    // Each time table is built, calculateTotalPrice() function is called to recalculate the total price for all Games
    calculateTotalPrice();
}

// editButton functionalities, makes respective modal appear
function editButton(id){

    // For loop used here to prepopulate the fields in the Edit Form with the respective fields of the Game the user is trying to edit. This is done through passing the ID and using it inside the for loop to check for an exact match.
    for (var i= 0; i < games.length; i++){
        if(games[i].id == id){
            document.getElementById("current").innerHTML = games[i].id;
            document.getElementById("editGameTitle").value = games[i].gameTitle;
            document.getElementById("editGenre").value = games[i].genre;
            document.getElementById("editDeveloper").value = games[i].developer;
            document.getElementById("editPrice").value = games[i].price;
            document.getElementById("editStoreURL").value = games[i].storeURL;
            document.getElementById("editCoverURL").value = games[i].coverURL;
            document.getElementById("editReleaseDate").value = games[i].releaseDate;
        }
    }
}

// deleteButton functionalities, found inside the modal editButton makes visible
function deleteButton(){
    id = document.getElementById("current").innerHTML;

    // For loop also used here to find the Game with this specific ID and delete it from the JSON array
    for (var i= 0; i < games.length; i++){
        if(games[i].id == id){
            games.splice(i, 1);
            break
        }
    }
    buildTable(games)
}

// calclualteTotalPrice function in order to track the total price of all the Games 
function calculateTotalPrice(){
    totalPrice = 0;
    for (var i= 0; i < games.length; i++){
        totalPrice = Number(totalPrice) + Number(games[i].price);
        console.log(totalPrice)
    }
    document.getElementById("totalPrice").innerHTML = "Total Price: PHP " + totalPrice;
}



