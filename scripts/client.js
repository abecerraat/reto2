const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const name = document.getElementById("txtName")
const email = document.getElementById("txtEmail")
const age = document.getElementById("txtAge")

function ObtenerClientes(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.age}</td>
                <td><button class="btn btn-outline-primary btn-sm" onclick="ObtenerIdClient(${element.id})">Detalle</button></td>
                <td><button class="btn btn-outline-primary btn-sm" onclick="EliminarClient(${element.id})">Eliminar</button></td>
            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function CrearClient(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id.value,
        "name": name.value,
        "email": email.value,
        "age": age.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al crear el cliente")
            }
        })
        .catch(error => console.log('error', error));
}

function ActualizarClient(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "name": name.value,
    "email": email.value,
    "age": age.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al actualizar el cliente")
            }
        })
        .catch(error => console.log('error', error));
}

function EliminarClient(id){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client?id=${id}`, requestOptions)
        .then(response => {
            if(response.status == 204){
                location.reload()
            }else{
                alert("Error al eliminar el cliente")
            }
        })
        .catch(error => console.log('error', error));
}

function ObtenerIdClient(id){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
        id.value = datos.id
        name.value = datos.name
        email.value = datos.email
        age.value = datos.age
    })
    .catch(error => console.log('error', error));
}

ObtenerClientes()   