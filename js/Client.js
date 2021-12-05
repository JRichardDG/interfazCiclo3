const baseUrl = "http://150.230.43.112:8080";
const path = "/api/Client";
let Client = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerClient();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerClient() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Client = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">idClient</th><th scope="col">email</th><th scope="col">password</th><th scope="col">name</th><th scope="col">age</th><th scope="col">messages</th><th scope="col">reservations</th></th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].idClient + "</td>";
    tabla += "<td>" + array[i].email + "</td>";
    tabla += "<td>" + array[i].password + "</td>";
    tabla += "<td>" + array[i].name + "</td>";
    tabla += "<td>" + array[i].age + "</td>";
    tabla += "<td>" + array[i].idMessage + "</td>";
    tabla += "<td>" + array[i].idReservation + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarClient(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarClient(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaClient").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaClient").html(tabla);
}

function agregarClient() {
  let objeto = {
    idClient: $("#idClient").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    name: $("#name").val(),
    age: $("#age").val(),
    messages: $("#messages").val(),
    reservations: $("#reservations").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerClient();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#idClient").val("");
  $("#email").val("");
  $("#password").val("");
  $("#name").val("");
  $("#age").val("");
  $("#messages").val("");
  $("#reservations").val("");
}

function mostrarClient(indice) {
  let objeto = Client[indice];
  $("#idClien").val(objeto.idClient);
  $("#email").val(objeto.email);
  $("#password").val(objeto.password);
  $("#name").val(objeto.name);
  $("#age").val(objeto.age);
  $("#messages").val(objeto.messages.idMessage);
  $("#reservations").val(objeto.reservations.idReservation);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarClient(objeto.id);
  });
}

function actualizarClient(id) {
  let objeto = {
    idClient: idClient,
    email: $("#email").val(),
    password: parseInt($("#password").val()),
    name: parseInt($("#name").val()),
    age: parseInt($("#age").val()),
    messages: parseInt($("#messages").val()),
    reservations: parseInt($("#reservations").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerClient();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarClient(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerClient();
    },
  });
}

function buscarClient() {
  let id = $("#id2").val();
  if (id !== "") {
    $.ajax({
      type: "GET",
      url: baseUrl + path + "/" + id,
      dataType: "JSON",
      success: function (response) {
        let array = [];
        if (response !== null) {
          array.push(response);
        }
        if (array.length > 0) {
          Client = array;
          armarTabla(array);
        } else {
          noHayRegistros();
        }
        $("#id2").val("");
      },
    });
  }else{
    alert("Debe ingresar un id a buscar")
  }
}
