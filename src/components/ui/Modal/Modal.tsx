import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import type { ITarea } from "../../../types/iTarea";
import { useTareas } from "../../../hooks/useTareas";

type IModal = {
    handleCloneModal: VoidFunction; 
}; 

const intialState: ITarea = {
    titulo:  "",
    descripcion: "",
    fechaLimite: "",
}



export const Modal : FC<IModal>= ({handleCloneModal}) => {

    const tareaActiva = tareaStore ((state) => state.tareaActiva)

    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const {crearTarea, putTareaEditar} = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(intialState);

    useEffect(() => {
        if(tareaActiva) setFormValues(tareaActiva);
    }, [])

    const handleChange = (e : ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
        const{name,value} = e.target  

        setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const handleSubmit = (e : FormEvent)=> {
        e.preventDefault();
        if(tareaActiva){
            putTareaEditar(formValues)
        } else{
            crearTarea({...formValues,id:new Date().toDateString()})
        }
        
        setTareaActiva(null);
        handleCloneModal(); 
    };

  return (
    <div className={styles.containerPrincipalModal}>
        <div className={styles.contentPopUP}>
            <div>
                <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <div>
                    <input placeholder="Ingrese un título" type="text" required onChange={handleChange} value={formValues.titulo} autoComplete="off" name="titulo" /> 
                    <textarea placeholder="Ingrese una descripción" required onChange={handleChange} value={formValues.descripcion} name="descripcion"></textarea>
                    <input type="date" required onChange={handleChange} value={formValues.fechaLimite} autoComplete="off" name="fechaLimite" />     
                </div>
                <div className={styles.buttonCard}>
                    <button onClick={handleCloneModal}>Cancelar</button>
                    <button type="submit">{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}
