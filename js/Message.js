const baseUrl = "http://150.230.70.76:8080";
const path = "/api/Message";
let Message = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerMessage();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerMessage() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Message = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">idMessage</th><th scope="col">messageText</th><th scope="col">client</th><th scope="col">lib</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].idMessage + "</td>";
    tabla += "<td>" + array[i].messageText + "</td>";
    tabla += "<td>" + array[i].idClient + "</td>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarMessage(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarMessage(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaMessage").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaMessage").html(tabla);
}

function agregarMessage() {
  let objeto = {
    messageText: $("#messageText").val(),
    client: $("#client").val(),
    lib: $("#lib.id").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerMessage();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#messageText").val("");
  $("#client").val("");
  $("#lib.id").val("");
}

function mostrarMessage(indice) {
  let objeto = Message[indice];
  $("#idMessage").val(objeto.idMessage);
  $("#messageText").val(objeto.messageText);
  $("#client").val(objeto.client.idClient);
  $("#lib.id").val(objeto.lib);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarMessage(objeto.id);
  });
}

function actualizarMessage(id) {
  let objeto = {
    id: id,
    messageText: $("#messageText").val(),
    client: parseInt($("#client").val()),
    lib: parseInt($("#lib.id").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerMessage();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarMessage(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerMessage();
    },
  });
}

function buscarMessage() {
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
          Message = array;
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
