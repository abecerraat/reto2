const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const messagetext = document.getElementById("txtMessageText")

function ObtenerMessage(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.messagetext}</td>
                <td><button onclick="ObtenerIdMessage(${element.id})">Detalles</button></td>
                <td><button class="btn btn-outline-primary btn-sm" onclick="EliminarMessage(${element.id})">Eliminar</button></td>
            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function CrearMessage(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id.value,
        "messagetext": messagetext.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al crear el mensaje")
            }
        })
        .catch(error => console.log('error', error));
}

function ActualizarMessage(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "messagetext": messagetext.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al actualizar el mensaje")
            }
        })
        .catch(error => console.log('error', error));
}

function EliminarMessage(id){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message?id=${id}`, requestOptions)
        .then(response => {
            if(response.status == 204){
                location.reload()
            }else{
                alert("Error al eliminar el mensaje")
            }
        })
        .catch(error => console.log('error', error));
}

function ObtenerIdMessage(id){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
        id.value = datos.id
        messagetext.value = datos.messagetext
    })
    .catch(error => console.log('error', error));
}

ObtenerMessage()