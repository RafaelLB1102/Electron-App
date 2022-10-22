var localDB = new PouchDB('application');
var remoteDB = new PouchDB('http://admin:hola123@localhost:5984/application');

var createButton = document.getElementById("createButton")



/* Creating a document */
const verifyInputs = (name, lastname, cellphone, direction, stratum, email) => {
    if (name == "" || lastname == "" || cellphone == "" || direction == "" || stratum == "NA" || email == "") {
        return false
    }
    return true

}

const saveFile = (name, lastname, cellphone, direction, stratum, email) => {
    let file = {
        "_id": String(localDB.info().doc_count + 1),
        "name": name,
        "lastname": lastname,
        "cellphone": cellphone,
        "direction": direction,
        "stratum": stratum,
        "email": email
    }

    localDB.put(file)
}

const clearInputs = () =>{
    document.getElementById("name").value = ""
    document.getElementById("lastnames").value = ""
    document.getElementById("cellphone").value = ""
    document.getElementById("direction").value = ""
    document.getElementById("stratum").value = "NA"
    document.getElementById("email").value = ""
}

createButton.addEventListener("click", () => {
    let name = document.getElementById("name").value
    let lastname = document.getElementById("lastnames").value
    let cellphone = document.getElementById("cellphone").value
    let direction = document.getElementById("direction").value
    let stratum = document.getElementById("stratum").value
    let email = document.getElementById("email").value

    let areCorrect = verifyInputs(name, lastname, cellphone, direction, stratum, email)

    if (!areCorrect) {
        alert("Por favor reingrese todos los campos")
    } else {
        alert("Se han enviado los datos a la base de datos local")
        saveFile(name, lastname, cellphone, direction, stratum, email)
    }
    clearInputs()
  
})


