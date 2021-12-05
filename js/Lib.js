const baseUrl = "http://150.230.43.112:8080";
const path = "/api/Lib";
let Lib = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerLib();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerLib() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Lib = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">id</th><th scope="col">target</th><th scope="col">capacity</th><th scope="col">category</th><th scope="col">name</th><th scope="col">description</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>" + array[i].target + "</td>";
    tabla += "<td>" + array[i].capacity + "</td>";
    tabla += "<td>" + array[i].category.id + "</td>";
    tabla += "<td>" + array[i].name + "</td>";
    tabla += "<td>" + array[i].description + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarLib(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarLib(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaLib").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaLib").html(tabla);
}

function agregarLib() {
  let objeto = {
    target: $("#target").val(),
    capacity: $("#capacity").val(),
    name: $("#name").val(),
    description: $("#description").val(),
  };

  $.ajax({
    type: "POST",
    url: baseUrl + path + "/save",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerLib();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#id").val("");
  $("#target").val("");
  $("#capacity").val("");
  $("#category").val("");
  $("#name").val("");
  $("#description").val("");
}

function mostrarLib(indice) {
  let objeto = Lib[indice];
  $("#id").val(objeto.id);
  $("#target").val(objeto.target);
  $("#capacity").val(objeto.capacity);
  $("#category").val(objeto.category);
  $("#name").val(objeto.name);
  $("#description").val(objeto.description);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarLib(objeto.id);
  });
}

function actualizarLib(id) {
  let objeto = {
    id: id,
    target: $("#target").val(),
    capacity: parseInt($("#capacity").val()),
    category: parseInt($("#category").val()),
    name: parseInt($("#name").val()),
    description: parseInt($("#description").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerLib();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarLib(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerLib();
    },
  });
}

function buscarLib() {
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
          Lib = array;
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
