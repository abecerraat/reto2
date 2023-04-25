const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const brand = document.getElementById("txtBrand")
const model = document.getElementById("txtModel")
const categoryId = document.getElementById("txtCategoryId")

function ObtenerCar(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.brand}</td>
                <td>${element.model}</td>
                <td>${element.category_id}</td>
                <td><button class="btn btn-outline-primary btn-sm" onclick="ObtenerIdCar(${element.id})">Detalle</button></td>
                <td><button class="btn btn-outline-primary btn-sm" onclick="EliminarCar(${element.id})">Eliminar</button></td>
            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function CrearCar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id.value,
        "brand": brand.value,
        "model": model.value,
        "category_id": categoryId.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al agregar el carro")
            }
        })
        .catch(error => console.log('error', error));
}

function ActualizarCar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "brand": brand.value,
    "model": model.value,
    "category_id": categoryId.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
        .then(response => {
            if(response.status == 201){
                location.reload()
            }else{
                alert("Error al actualizar el carro")
            }
        })
        .catch(error => console.log('error', error));
}

function EliminarCar(id){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car?id=${id}`, requestOptions)
        .then(response => {
            if(response.status == 204){
                location.reload()
            }else{
                alert("Error al eliminar el carro")
            }
        })
        .catch(error => console.log('error', error));
}

function ObtenerIdCar(id){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://gfe6319d29a3d14-e9e1q5g8enqh0jy9.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
        id.value = datos.id
        brand.value = datos.brand
        model.value = datos.model
        categoryId.value = datos.category_id
    })
    .catch(error => console.log('error', error));
}

ObtenerCar()