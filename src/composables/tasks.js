import axios from 'axios';
import { rootUrl } from './settings';
import { inject } from 'vue';
import { useTaskStore } from '../store/tasks';

const token = localStorage.getItem('token')
//const storeTask = useTaskStore();
/*
export const createTask = async (titulo, descripcion) => {

    try {
        const token = localStorage.getItem('token');

        const res = await axios.post(rootUrl + '/tareas', { headers: { 'x-token': token } }, {
            titulo,
            descripcion
        })

        toast.success('Task created succesfully', {
            position: "top-right",
            duration: 3000
        })

        storeTask.getTasks()

    } catch (error) {

        console.log(error)

    }


}
*/
export const editTask = async (id, titulo = '', descripcion = '') => {
    

    const res = await axios.put(rootUrl + `/tareas/${id}`, { titulo, descripcion }, {
        headers: { 'x-token': token }
    })

    
}

export const taskDelete = async(id) => {

    const res = await axios.delete(rootUrl + `/tareas/${id}`, {headers: { 'x-token': token }})

}

export const updateStateTasl = async(id) => {

    const res = await axios.put(rootUrl + `/tareas/complete/${id}`, { completada: true }, { headers: { 'x-token': token } } )
    console.log(res)
}



