const baseUrl = "http://150.230.70.76:8080";
const path = "/api/Score";
let Score = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerScore();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerScore() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Score = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">id</th><th scope="col">text</th><th scope="col">stars</th><th scope="col">date</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>" + array[i].text + "</td>";
    tabla += "<td>" + array[i].stars + "</td>";
    tabla += "<td>" + array[i].date + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarScore(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarScore(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaScore").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaScore").html(tabla);
}

function agregarScore() {
  let objeto = {
    id: $("#id").val(),
    text: $("#text").val(),
    stars: $("#stars").val(),
    date: $("#date").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerScore();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#id").val("");
  $("#text").val("");
  $("#stars").val("");
  $("#date").val("");
}

function mostrarScore(indice) {
  let objeto = Score[indice];
  $("#id").val(objeto.id);
  $("#text").val(objeto.text);
  $("#stars").val(objeto.stars);
  $("#date").val(objeto.date);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarScore(objeto.id);
  });
}

function actualizarScore(id) {
  let objeto = {
    id: id,
    name: $("#text").val(),
    password: parseInt($("#stars").val()),
    email: parseInt($("#date").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerScore();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarScore(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerScore();
    },
  });
}

function buscarScore() {
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
          Score = array;
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
