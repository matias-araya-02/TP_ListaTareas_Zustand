import { create } from "zustand";
import type { ITarea } from "../types/iTarea";

interface ITareaStore{
    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareaActiva: (tareaActiva: ITarea | null ) => void; 
    setArrayTareas: (arrayDeTareas: ITarea[]) => void;
    agregarNuevaTarea: (nuevaTarea: ITarea) => void;
    editarUnaTarea: (tareaActualizada: ITarea) => void;
    eliminarUnaTarea: (idTarea : string) => void; 
    

}


export const tareaStore = create<ITareaStore>((set) => ({
    tareas: [],
    tareaActiva: null,

//Funciones modificadoras para el array

//Agregar array de tareas
setArrayTareas:(arrayDeTareas) => set(()=>({tareas : arrayDeTareas})),

//Agregar una tarea al array
agregarNuevaTarea: (nuevaTarea) => set((state) => ({tareas: [...state.tareas, nuevaTarea]})), 

//Editar una tarea 
editarUnaTarea: (tareaEditada) => set((state) => {
    const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? {...tarea,...tareaEditada} : tarea);
    return {tareas: arregloTareas};
}),

//Eliminar una tarea del array
eliminarUnaTarea: (idTarea) => set((state) => {
    const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
    return {tareas: arregloTareas};
}),

//Setear la tarea activa
setTareaActiva: (tareaActivaIn) => set(() => ({tareaActiva : tareaActivaIn}))
    
}));




