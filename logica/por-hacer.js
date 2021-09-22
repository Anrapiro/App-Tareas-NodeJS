const fs = require('fs');
require('colors');

let listPorHacer = [];

/**
 * Crea una nueva tarea por hacer
 * @param  {[String]} descripcion descripcion de la tarea
 * @return {[Object]} porHacer
 */
function crear (descripcion) {
  // Cargamos la base de datos para agregar(append) todo lo nuevo
  cargarDB();
  const porHacer = {
    descripcion,
    completado: false
  };

  listPorHacer.push(porHacer);
  guardarDB();

  return porHacer;
}

/**
 * Crea el archivo .json y guarda los datos alli simulando una DB
 * @return {[String]} respuesta de la funcion
 */
function guardarDB () {
  // Pasamos los datos al archivo .json
  var data = JSON.stringify(listPorHacer);

  const file = './/db//data.json';
  // Escribir en el archivo
  fs.writeFile(file, data, (err) => {
    if (err) {
      throw new Error('ERROR EN EL ESCRITURA DEL ARCHIVO'.red, err);
    }

    console.log(`Cambios guardados correctamente en ${file.green}`);
  });
}

/**
 * Lectura del archivo .json
 * @return {[String]} respuesta
 */
function cargarDB () {
  try {
    // Converir los datos del archivo .json en un objeto
    listPorHacer = require('../db/data.json');
  } catch (e) {
    // Si hay un error al obtener los datos del archivo .json, asignamos un arreglo vacio
    listPorHacer = [];
  } finally {

  }
}

/**
 * Obtenemos un listado de todas las tareas almacenadas en el archivo .json
 * @return {[Object]} listado de por haceres
 */
function getAllTarea () {
  cargarDB();
  return listPorHacer;
}

/**
 * Actualizar una tarea almacenada en la base de datos (.json)
 * @param  {[String]} descripcion descripcion de la tarea
 * @param  {[boolean]} completado estado de la tarea
 * @return {[boolean]} respuesta del comportamiento
 */
function actualizarTarea (descripcion, completado) {
  // Cargar listado del archivo .json
  cargarDB();

  // Obtener la posicion del dato en el arreglo
  var index = listPorHacer.findIndex((tarea) => {
    return tarea.descripcion === descripcion;
  });

  // Evaluar si existe el elemento en el arreglo
  if (index >= 0) {
    // modificamos el valor
    listPorHacer[index].completado = completado;

    // Guardamos el cambio en la base de datos
    guardarDB();
    return true;
  } else {
    return false;
  }
}

/**
 * Elimina una tarea del archivo .json
 * @param  {[String]} descripcion descripcion de la tarea
 * @return {[boolean]} respuesta de la funcion
 */
function borrarTarea (descripcion) {
  cargarDB();
  // Creamos un nuevo arreglo con el valor del filtro el cual nos retorna un arreglo
  const newList = listPorHacer.filter((tarea) => {
    // retorna un nuevo arreglo con la excepto el que deseamos borrar
    return tarea.descripcion !== descripcion;
  });

  // Comparamos si el arreglo tienen un numero de elementos distintos
  if (newList.length !== listPorHacer.length) {
    listPorHacer = newList;
    guardarDB();
    return true;
  } else {
    return false;
  }
}

module.exports = {
  crear,
  getAllTarea,
  actualizarTarea,
  borrarTarea
};
