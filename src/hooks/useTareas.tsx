import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tareas"
import type { ITarea } from "../types/iTarea"
import Swal from "sweetalert2"

export const useTareas = () => {

    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea} = tareaStore (useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea
        
    })))

    const getTareas = async()=>{
                const data = await getAllTareas();
                if(data) setArrayTareas(data); 
        };  


    const crearTarea = async (nuevaTarea:ITarea) => {
        agregarNuevaTarea(nuevaTarea);  
        try{
            await postNuevaTarea(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success"); 
        }catch(error){
            eliminarUnaTarea(nuevaTarea.id!)
            console.log("Algo salio mal al crear la tarea")
        }
    };

    const putTareaEditar = async (tareaEditada:ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id)

        editarUnaTarea(tareaEditada)
        try {
            await editarTarea(tareaEditada);
            Swal.fire("Exito", "Tarea editada correctamente", "success");
        } catch (error) {
            if(estadoPrevio) editarUnaTarea(estadoPrevio);
            console.log("Algo salio mal al editar la tarea")
        }
    };

    const eliminarTarea = async (idTarea:string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea)
        const confirm = await Swal.fire({
            title: "¿Estas seguro?",
            text:"Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirm.isConfirmed) { // Solo si el usuario confirma
            eliminarUnaTarea(idTarea)
            try {
                await eliminarTareaPorID(idTarea);
                Swal.fire("Eliminado", "Tarea elimianda correctamente", "success");
            } catch (error) {
                if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
                console.log("Algo salio mal al eliminar la tarea")
            }
        }
    };
    
  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
    tareas

  }
}
