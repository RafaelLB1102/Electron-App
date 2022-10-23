var localDB = new PouchDB('application');
var remoteDB = new PouchDB('http://admin:hola123@localhost:5984/application');

localDB.info().then(function (info) {
    console.log(info);
})

/* Creating a document */

const verifyInputs = (name, lastname, cellphone, direction, stratum, email) => {
    if (name == "" || lastname == "" || cellphone == "" || direction == "" || stratum == "NA" || email == "") {
        return false
    }
    return true

}

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getDocCount = (doc_count) => {
    return doc_count
}

const saveFile = (name, lastname, cellphone, direction, stratum, email) => {

    let file = {
        "_id": makeid(5),
        "name": name,
        "lastname": lastname,
        "cellphone": cellphone,
        "direction": direction,
        "stratum": stratum,
        "email": email
    }

    localDB.put(file)
}

const clearInputs = () => {
    document.getElementById("name").value = ""
    document.getElementById("lastnames").value = ""
    document.getElementById("cellphone").value = ""
    document.getElementById("direction").value = ""
    document.getElementById("stratum").value = "NA"
    document.getElementById("email").value = ""
}


var show = document.getElementById("show")
var createButton = document.getElementById("createButton")
var syncButton = document.getElementById("sync")
if (createButton) {
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
} else if (show) {
    show.addEventListener("click", () => {
        localDB.allDocs({ include_docs: true }).then(function (docs) {
            console.log(docs.rows);
            let tbody = document.getElementById("tbody")
            for (let i = 0; i < docs.rows.length; i++) {
                let tr = document.createElement("tr")
                for (let j = 0; j < 7; j++) {
                    let td = document.createElement("td")
                    switch (j) {
                        case 0:
                            td.innerHTML = docs.rows[i].doc._id
                            break
                        case 1:
                            td.innerHTML = docs.rows[i].doc.name
                            break
                        case 2:
                            td.innerHTML = docs.rows[i].doc.lastname
                            break
                        case 3:
                            td.innerHTML = docs.rows[i].doc.cellphone
                            break
                        case 4:
                            td.innerHTML = docs.rows[i].doc.direction
                            break
                        case 5:
                            td.innerHTML = docs.rows[i].doc.email
                            break
                        case 6:
                            td.innerHTML = docs.rows[i].doc.stratum
                            break
                    }
                    tr.appendChild(td)
                }
                tbody.appendChild(tr)
            }
        })
        show.disabled = true
    })

    syncButton.addEventListener("click", ()=>{
        localDB.sync(remoteDB)
    })
}