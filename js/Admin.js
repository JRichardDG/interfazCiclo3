const baseUrl = "http://150.230.70.76:8080";
const path = "/api/Admin";
let Admin = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerAdmin();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerAdmin() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Admin = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">id</th><th scope="col">name</th><th scope="col">password</th><th scope="col">email</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>" + array[i].name + "</td>";
    tabla += "<td>" + array[i].password + "</td>";
    tabla += "<td>" + array[i].email + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarAdmin(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarAdmin(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaAdmin").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaAdmin").html(tabla);
}

function agregarAdmin() {
  let objeto = {
    id: $("#id").val(),
    name: $("#name").val(),
    password: $("#password").val(),
    email: $("#email").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerAdmin();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#id").val("");
  $("#name").val("");
  $("#password").val("");
  $("#email").val("");
}

function mostrarAdmin(indice) {
  let objeto = Admin[indice];
  $("#id").val(objeto.id);
  $("#name").val(objeto.name);
  $("#password").val(objeto.password);
  $("#email").val(objeto.email);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarAdmin(objeto.id);
  });
}

function actualizarAdmin(id) {
  let objeto = {
    id: id,
    name: $("#name").val(),
    password: parseInt($("#password").val()),
    email: parseInt($("#email").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerAdmin();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarAdmin(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerAdmin();
    },
  });
}

function buscarAdmin() {
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
          Admin = array;
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
