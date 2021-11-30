const baseUrl = "http://150.230.70.76:8080";
const path = "/api/Category";
let Category = [];

$(document).ready(function () {
  mostrarAgregar();
  obtenerCategory();
});

function mostrarAgregar() {
  $("#btnAgregar").show();
  $("#btnActualizar").hide();
}

function obtenerCategory() {
  $.ajax({
    type: "GET",
    url: baseUrl + path + "/all",
    dataType: "JSON",
    success: function (response) {
      if (response.length > 0) {
        Category = response;
        armarTabla(response);
      } else {
        noHayRegistros();
      }
    },
  });
}

function armarTabla(array) {
  let tabla =
    '<thead><tr><th scope="col">id</th><th scope="col">name</th><th scope="col">description</th><th scope="col">Acciones</th></tr></thead>';
  tabla += "<tbody>";
  for (let i = 0; i < array.length; i++) {
    tabla += "<tr>";
    tabla += "<td>" + array[i].id + "</td>";
    tabla += "<td>" + array[i].name + "</td>";
    tabla += "<td>" + array[i].description + "</td>";
    tabla += "<td>";
    tabla +=
      '<button id="btnActualizar" type="button" class="btn btn-primary" onclick="mostrarCategory(' +
      i +
      ')">Actualizar</button>';
    tabla +=
      '<button id="btnEliminar" type="button" class="btn btn-primary" onclick="eliminarCategory(' +
      array[i].id +
      ')">Eliminar</button>';
    tabla += "</td>";
    tabla += "</tr>";
  }
  tabla += "</tbody>";
  $("#tablaCategory").html(tabla);
}

function noHayRegistros() {
  let tabla =
    '<thead><tr><th scope="col"></th></tr></thead><tbody><tr><td>NO HAY REGISTROS</td></tr></tbody>';
  $("#tablaCategory").html(tabla);
}

function agregarCategory() {
  let objeto = {
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
      obtenerCategory();
      limpiarInput();
    },
  });
}

function limpiarInput() {
  $("#name").val("");
  $("#description").val("");
}

function mostrarCategory(indice) {
  let objeto = Category[indice];
  $("#id").val(objeto.id);
  $("#name").val(objeto.name);
  $("#description").val(objeto.description);

  $("#btnAgregar").hide();
  $("#btnActualizar").show();
  $("#btnActualizar").click(function () {
    actualizarCategory(objeto.id);
  });
}

function actualizarCategory(id) {
  let objeto = {
    id: id,
    name: $("#name").val(),
    description: parseInt($("#description").val()),
  };

  $.ajax({
    type: "PUT",
    url: baseUrl + path + "/update",
    data: JSON.stringify(objeto),
    dataType: "JSON",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      obtenerCategory();
      limpiarInput();
      mostrarAgregar();
    },
  });
}

function eliminarCategory(id) {
  $.ajax({
    type: "DELETE",
    url: baseUrl + path + "/" + id,
    dataType: "JSON",
    success: function (response) {
      obtenerCategory();
    },
  });
}

function     buscarCategory() {
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
          Category = array;
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
