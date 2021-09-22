const argv = require('.//config//yargs').argv;
const porHacer = require('.//logica//por-hacer');

// console.log(argv);

const comando = argv._[0];

switch (comando) {
  case 'crear':
    var tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;

  case 'listar':
    var listTareas = porHacer.getAllTarea();

    for (const tarea of listTareas) {
      console.log('== Tareas por hacer =='.green);
      console.log(`${tarea.descripcion}`);
      console.log(`Estado: ${tarea.completado}`);
      console.log('======================'.green, '\n');
    }

    break;

  case 'actualizar':
    var actualizado = porHacer.actualizarTarea(argv.descripcion, argv.completado);

    if (actualizado) {
      console.log('Tarea actualizada con exito!!!'.green);
    } else {
      console.log('Tarea no encontrada'.red);
    }
    break;
  case 'eliminar':
    var borrado = porHacer.borrarTarea(argv.descripcion);

    if (borrado) {
      console.log('Borrado');
    } else {
      console.log(`No se encontro la tarea con la descripcion: ${argv.descripcion}`);
    }
    break;
  default:
    console.log('comando no valido');
}
