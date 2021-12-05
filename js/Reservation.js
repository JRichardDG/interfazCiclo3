const baseUrl = "http://150.230.43.112:8080";
const path = "/api/Reservation";
let Reservation = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerReservation();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerReservation() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Reservation = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">startDate</th><th scope="col">devolutionDate</th><th scope="col">client</th><th scope="col">lib</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].startDate + "</td>";
    tabla += "<td>" + array[i].devolutionDate + "</td>";
    tabla += "<td>" + array[i].idClient + "</td>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarReservation(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarReservation(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaReservation").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaReservation").html(tabla);
}

function agregarReservation() {
  let objeto = {
    startDate: $("#startDate").val(),
    devolutionDate: $("#devolutionDate").val(),
    idClient: $("#idClient").val(),
    id: $("#id").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerReservation();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#startDate").val("");
  $("#devolutionDate").val("");
  $("#idClient").val("");
  $("#id").val("");
}

function mostrarReservation(indice) {
  let objeto = Reservation[indice];
  $("#startDate").val(objeto.startDate);
  $("#devolutionDat").val(objeto.devolutionDate);
  $("#idClient").val(objeto.idClient);
  $("#id").val(objeto.id);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarReservation(objeto.id);
  });
}

function actualizarReservation(id) {
  let objeto = {
    id: id,
    startDate: $("#startDate").val(),
    devolutionDate: parseInt($("#devolutionDate").val()),
    idClient: parseInt($("#idClient").val()),
    id: parseInt($("#id").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerReservation();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarReservation(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerReservation();
    },
  });
}

function buscarReservation() {
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
          Reservation = array;
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
