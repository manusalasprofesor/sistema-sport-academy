async function sistemaSportAcademy() {
    // Declaración de variables
    const nombresAlumnos = [];
    const puntosAlumnos = [];
    let continuar = true,
        opcion, nuevaEntrada, listado, nuevaPuntuacion, nuevoAlumno, entradaUpdate, alumnoUpdate, puntuacionUpdate;

    // Función que devuelve una promesa que se resuelve al pulsar una tecla
    const pausa = () => new Promise(resolve =>{
        console.log('Pulse cualquier tecla para continuar...');
        document.addEventListener('keydown', () => resolve())},{once: true} // una vez se produce el evento, éste se borra
    );

    while (continuar){
        opcion = prompt(`===== MENÚ DE OPCIONES =====
            1. Registrar alumno
            2. Listar Alumnos
            3. Actualizar puntos
            4. Eliminar registro
            5. Estadísticas
            6. Salir
            Elija una de las opciones...`);
        
        listado = '=== LISTADO DE ALUMNOS Y PUNTUACIONES ===\n';
        if (nombresAlumnos.length > 0){
            nombresAlumnos.forEach((alumno, indice) =>{
            listado += `[${indice}] - ${alumno[0].toUpperCase() + alumno.slice(1)} - ${puntosAlumnos[indice]} puntos\n`;
            });
        }
        
        switch(opcion){
            case '1':
                console.clear();
                // VERIFICAMOS QUE LA ENTRADA ESTÉ PRESENTE Y EL USUARIO NO HAYA PULSADO CANCELAR
                nuevoAlumno = prompt('Introduzca el nombre del alumno a registrar...')?.toLowerCase()?.trim();  //forma moderna(Optional Chaining / Operador de encadenamiento opcional)-> No hace trim() si el valor es null
                if (!nuevoAlumno){
                    console.log('Error: Ha introducido un nombre no válido o ha pulsado cancelar...');
                    await pausa();
                    break;
                }

                // VERIFICAMOS LA ENTRADA QUE ESTÉ PRESENTE Y EL USUARIO NO HAYA PULSADO CANCELAR
                nuevaEntrada = prompt(`Introduzca una puntuación (0 - 100) para ${nuevoAlumno[0].toUpperCase() + nuevoAlumno.slice(1)}...`)?.trim() ?? ''; // Operador de Coalescencia Nula (Nullish Coalescing)-> Si lo de la izquierda es null o undefined (cancelar) usa un string vacío
                
                nuevaPuntuacion = (nuevaEntrada === '' || isNaN(nuevaEntrada)) ? -1 : Number(nuevaEntrada);
                if (nuevaPuntuacion < 0 || nuevaPuntuacion > 100){
                    console.log('Error: Introduzca una puntuación válida (0 - 100)...');
                    await pausa();
                    break;
                }

                // AÑADIMOS LOS DATOS A SUS CORRESPONDIENTES ARRAYS
                nombresAlumnos.push(nuevoAlumno);
                puntosAlumnos.push(nuevaPuntuacion);
                console.log('Nuevo alumno registrado...');
                await pausa();
                break;
            
            case '2':
                console.clear();
                if (nombresAlumnos.length === 0){
                    console.log('No hay datos registrados...');
                    await pausa();
                    break;
                }
                console.log(listado);
                await pausa();
                break;
            
            case '3':
                console.clear();
                // VERIFICAMOS QUE EL ARRAY TENGA DATOS
                if (nombresAlumnos.length === 0){
                    console.log('No hay datos registrados...');
                    await pausa();
                    break;
                }

                // VERIFICAMOS QUE EL USUARIO NO HAYA DEJADO EL CAMPO VACÍO O HAYA PULSADO CANCELAR
                entradaUpdate = prompt(`${listado}
                    Elija un ID de alumno a actualizar...
                `)?.trim() ?? '';

            
                alumnoUpdate = (entradaUpdate === '' || isNaN(entradaUpdate)) ? -1 : parseInt(entradaUpdate);
                if (alumnoUpdate < 0 || alumnoUpdate > nombresAlumnos.length-1){
                    console.log('Error: ha elegido un ID erróneo o ha pulsado cancelar...');
                    await pausa();
                    break;
                }

                // COMPROBAMOS DE NUEVO LA NUEVA PUNTUACIÓN (OPERADOR DE COALESCENCIA NULA)
                nuevaPuntuacion = prompt(`Introduzca la nueva puntuación (0 - 100) para ${nombresAlumnos[alumnoUpdate][0].toUpperCase() + nombresAlumnos[alumnoUpdate].slice(1)}...`)?.trim() ?? '';
                
                puntuacionUpdate = (nuevaPuntuacion === '' || isNaN(nuevaPuntuacion)) ? -1 : Number(nuevaPuntuacion);
                
                if (puntuacionUpdate < 0 || puntuacionUpdate > 100){
                    console.log('Error: Ha introducido una puntuación incorrecta o ha pulsado Cancelar...');
                    await pausa();
                    break;
                }

                // ACTUALIZAMOS LA PUNTUACIÓN DEL ALUMNO ELEGIDO
                puntosAlumnos[alumnoUpdate] = puntuacionUpdate;
                console.log(`Puntuación de ${nombresAlumnos[alumnoUpdate][0].toUpperCase() + nombresAlumnos[alumnoUpdate].slice(1)} actualizada...`); 
                await pausa();
                break;
           
            case '4':
                console.clear();
                // COMPROBAMOS QUE EL ARRAY TENGA DATOS
                if (nombresAlumnos.length === 0){
                    console.log('No hay datos registrados...');
                    await pausa();
                    break;
                }

                // OPERADOR DE COALESCENCIA NULA
                entradaUpdate = prompt(`${listado}
                    Elija un ID de alumno a dar de baja...
                `)?.trim() ?? '';

                alumnoUpdate = (entradaUpdate === '' || isNaN(entradaUpdate)) ? -1 : parseInt(entradaUpdate);
                
                if (alumnoUpdate < 0 || alumnoUpdate > nombresAlumnos.length-1){
                    console.log('Error: ha elegido un ID erróneo o ha pulsado cancelar...');
                    await pausa();
                    break;
                }
                
                console.log(`${nombresAlumnos[alumnoUpdate][0].toUpperCase() + nombresAlumnos[alumnoUpdate].slice(1)} eliminado...`);
                nombresAlumnos.splice(alumnoUpdate, 1);
                puntosAlumnos.splice(alumnoUpdate, 1);
                await pausa();
                break;
            
            case '5':
                console.clear();
                if(nombresAlumnos.length === 0){
                    console.log('No hay datos registrados...');
                    await pausa();
                    break;
                }

                 // MÉTODO INTEGRADO LEGIBILIDAD
                // Calculamos el valor máximo y el índice de ese valor
                let puntMax = Math.max(...puntosAlumnos);
                // Filtramos los nombres cuyos índices tengan la puntuación máxima
                let capitanes = nombresAlumnos.filter((_, i) => puntosAlumnos[i] === puntMax);
                let promedio = puntosAlumnos.reduce((a,b) => a + b, 0) / puntosAlumnos.length;

                // Capitalizamos los capitanes antes de presentarlos
                const capitanesFormateados = capitanes.map(nombre => 
                     nombre.charAt(0).toUpperCase() + nombre.slice(1)
                );
                console.log(`El promedio de puntuaciones es: ${promedio.toFixed(2)}`);
                console.log(`Capitán(es): ${capitanesFormateados.join(", ")} (${puntMax} pts)`);

                // MÉTODO EFICIENTE ACADÉMICO(cuando tenemos muchos datos)
                /* let puntMax = -Infinity;
                let capitanes = [];
                let suma = 0;

                puntuaciones.forEach((punt, i) => {
                    suma += punt;
                    if (punt > puntMax) {
                        puntMax = punt;
                        capitanes = [nombres[i]]; // Reiniciamos el array con el nuevo líder
                    } else if (punt === puntMax) {
                        capitanes.push(nombres[i]); // Añadimos al colíder
                    }
                });

                console.log(`Promedio: ${(suma / puntuaciones.length).toFixed(2)}`);
                console.log(`Capitán(es): ${capitanes.join(", ")} con ${puntMax} puntos`); */
                    
                // MÉTODO USANDO OBJETOS MEJOR RENDIMIENTO EN CASO DE MUCHOS DATOS
                // const resultados = puntosAlumnos.reduce((acc, numero, indice) => {
                //     acc.suma += numero;

                //     if (numero > acc.maximo) {
                //         acc.maximo = numero;
                //         // Si hay un nuevo máximo, reemplazamos la lista anterior
                //         acc.capitanes = [nombresAlumnos[indice][0].toUpperCase() + nombresAlumnos[indice].slice(1)];
                //     } else if (numero === acc.maximo) {
                //         // Si es igual, lo añadimos a la lista de capitanes
                //         acc.capitanes.push(nombresAlumnos[indice][0].toUpperCase() + nombresAlumnos[indice].slice(1));
                //     }
                //     return acc;
                // }, {
                //     suma: 0,
                //     maximo: -Infinity,
                //     capitanes: []
                // });

                // const promedio = (resultados.suma / puntosAlumnos.length).toFixed(2);

                // console.log(`El promedio de puntuaciones es: ${promedio}`);
                // console.log(`Capitán(es): ${resultados.capitanes.join(", ")} con ${resultados.maximo} puntos`);
                
                await pausa();
                break;
            case '6':
            case null:
                console.clear();
                continuar = false;
                console.log('Fin del programa');
                break;
            default:
                alert('Opción no válida!!!');
        }
    }
}

sistemaSportAcademy().catch(console); // en caso de producirse un error en la promesa, capturamos el error
