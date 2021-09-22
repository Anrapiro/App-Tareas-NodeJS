const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'descripcion de una tarea por hacer'
};

const completado = {
  alias: 'c',
  default: true,
  desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
  .command('listar', 'Lista las tareas por hacer', ({ completado }))
  .command('crear', 'Crea un elemento por hacer (Tarea)', ({ descripcion }))
  .command('actualizar', 'Actualiza el estado completado de una tarea', ({
    descripcion,
    completado
  }))
  .command('eliminar', 'Elimina una tarea', ({ descripcion }))
  .help()
  .argv;

module.exports = {
  argv
};
