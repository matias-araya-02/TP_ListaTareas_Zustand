import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore"
import styles from "./ListTareas.module.css";
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import type { ITarea } from "../../../types/iTarea";
import { useTareas } from "../../../hooks/useTareas";


export const ListTareas = () => {

    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    const {getTareas, tareas} = useTareas();

    useEffect(() => {
        getTareas();
    }, [])

    const [openModalTarea, setOpenModalTarea] = useState(false);

    const handleOpenModalEdit = (tarea:ITarea) =>{
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    };

    const handleCloneModal = () =>{
        setOpenModalTarea(false)
    };

  return (
    <>
        <div className={styles.containerPrincipalLisTareas}>
            <div className={styles.containerTitleAndButton}>
                <h2>Lista de Tareas</h2>
                <button
                  className={styles.botonAgregarTarea}
                  onClick={() => {setOpenModalTarea(true)}}
                >
                  Agregar Tarea
                </button>
            </div>
            <div className={styles.containerList}>
                {tareas.length > 0 ? ( 
                    tareas.map((el) => (
                        <CardList key={el.id} handleOpenModalEdit={handleOpenModalEdit} tarea={el}/>
                    ))
                ) : ( 
                    <div>
                        <h3>No hay tareas</h3>
                    </div>
                )}
            </div>
        </div>
        {openModalTarea && <Modal handleCloneModal={handleCloneModal}/>}
    </>
  )
};
