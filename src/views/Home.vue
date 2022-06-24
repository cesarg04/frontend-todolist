<script>
import { Icon } from "@iconify/vue";
import { useTaskStore } from "../store/tasks";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { ref, inject } from "vue";
import axios from "axios";
import { rootUrl } from "../composables/settings";
import { editTask, taskDelete, updateStateTasl } from "../composables/tasks";
import { useRoute } from "vue-router";
import { useAuthStore } from '../store/auth';

export default {
  name: "Home",
  components: {
    Icon,
  },
  setup() {
    const route = useRoute();
    const toast = inject("toast");
    const taskStore = useTaskStore();
    const authStore = useAuthStore()
    let TasksArr = ref([]);
    const titulo = ref("");
    const descripcion = ref("");
    const isEdit = ref(false);

    const getTasksUser = async () => {
      const tasksUser = await taskStore.getTasks();
      const { tasks } = tasksUser;
      //const reverse = tasks.re
      TasksArr.value = tasks;
      console.log(TasksArr.value);
      return TasksArr.value.reverse();
    };

    onBeforeMount(async () => {
      await taskStore.init();
      await getTasksUser();
    });

    const toastSuccess = (message) => {
      return toast.success(`${ message }`, {
          position: "top-right",
          duration: 3000,
        });
    }

    const toastError = (message) => {
      return toast.error(`${ message }`, {
          position: "top-right",
          duration: 3000,
        });
    }

    const createTask = async () => {
      try {
        const res = await axios.post(
          rootUrl + "/tareas",
          {
            titulo: titulo.value,
            descripcion: descripcion.value,
          },
          { headers: { "x-token": taskStore.$state.token } }
        );

        titulo.value = ''
        descripcion.value = ''

        toastSuccess('Task created succesfully')

        getTasksUser();
      } catch (error) {
        toastError('Error to create task')
      }
    };

    const taskEdit = async (id) => {
      const task = await axios.get(rootUrl + `/tareas/${id}`, {
        headers: { "x-token": taskStore.$state.token },
      });
      const taskn = task.data.tarea;
      titulo.value = taskn.titulo;
      descripcion.value = taskn.descripcion;
      isEdit.value = true;
      route.params.id = id;
    };

    const endTaskEdit = async () => {
      const id = route.params.id;

      try {
        await editTask(id, titulo.value, descripcion.value);
        toastSuccess('Task updated successfully')
        isEdit.value = false;

        await getTasksUser();
        titulo.value = "";
        descripcion.value = "";
      } catch (error) {
        toastError('Error updating the task, please try again')
      }
    };

    const taskComplete = async (id) => {
      try {
        await updateStateTasl(id);
        toastSuccess('Task completed')
        getTasksUser();
      } catch (error) {
        console.log(error);
        toastError('Error updating the task, please try again')
      }
    };

    const deleteTask = async (id) => {
      try {
        await taskDelete(id);
        toastSuccess('Task deleted successfully')

        getTasksUser();
      } catch (error) {
        console.log(error);
        toastError('Error deleting the task, please try again')
      }
    };

    const Logout = async() =>{
      toastSuccess('Logout')

      await authStore.logout()

    }

    return {
      titulo,
      descripcion,
      getTasksUser,
      TasksArr,
      createTask,
      taskEdit,
      isEdit,
      endTaskEdit,
      deleteTask,
      taskComplete,
      Logout
    };
  },
};
</script>
<template>
  <div class="mx-10">

    <div>
      <h1 class="font-rubik text-3xl font-semibold text-center">
        TodoList Tasks
      </h1>
    </div>

    <div class="absolute rounded-lg px-2 py-2 cursor-pointer right-20 top-9 hover:bg-gray-100" @click="Logout">
      <Icon icon="icon-park:logout" class="text-5xl fill-red-600"/>
    </div>

    <div class="grid grid-cols-3 mt-10">
      <div class="border">
        <div class="my-10 mx-5">
          <input
            type="text"
            name="tittle"
            id=""
            placeholder="Title"
            class="w-full"
            v-model="titulo"
            required
          />
        </div>
        <div class="mx-5">
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            class="bg-inputs font-rubik border rounded"
            placeholder="Content"
            v-model="descripcion"
            required
          ></textarea>
        </div>

        <div class="flex justify-center my-5" v-if="isEdit">
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-rubik
              text-2xl
              font-semibold
              py-2
              px-2
              rounded
            "
            @click="endTaskEdit"
          >
            Edit Task
          </button>
        </div>
        <div class="flex justify-center my-5" v-else>
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-rubik
              text-2xl
              font-semibold
              py-2
              px-2
              rounded
            "
            @click="createTask()"
          >
            Add Task
          </button>
        </div>
      </div>

      <div class="col-span-2 ml-10 mt-16 border rounded-md overflow-y-auto">
        <div class="border-b mb-4" v-for="item in TasksArr" :key="item._id" :class="{'bg-blue-300': item.completada}">
          <div class="flex">
            <div class="w-9/12">
              <h1 class="text-2xl font-rubik font-semibold pl-2">
                {{ item.titulo }}
              </h1>
              <p class="font-rubik text-xl pl-2">{{ item.descripcion }}</p>
            </div>

            <div class="flex justify-between items-center py-3" >
              <div
                class="
                  px-2
                  border
                  rounded-lg
                  cursor-pointer
                  bg-blue-400
                  py-2
                  mx-1
                  hover:bg-blue-500
                "
                @click="taskEdit(item._id)"
                v-if="!item.completada"
              >
                <Icon icon="akar-icons:edit" class="text-4xl text-white" />
              </div>
              <div
                class="
                  px-2
                  border
                  rounded-lg
                  cursor-pointer
                  bg-green-400
                  py-2
                  mx-1
                  hover:bg-green-500
                "
                @click="taskComplete(item._id)"
                v-if="!item.completada"
              >
                <Icon icon="bi:check-square" class="text-4xl text-white" />
              </div>
              <div
                class="
                  px-2
                  border
                  rounded-lg
                  cursor-pointer
                  bg-red-400
                  py-2
                  mx-1
                  hover:bg-red-500
                "
                @click="deleteTask(item._id)"
              >
                <Icon
                  icon="ant-design:delete-outlined"
                  class="text-4xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply font-rubik text-xl bg-inputs h-10 rounded-md px-2;
}

textarea {
  @apply bg-inputs text-xl px-2;
}

.div-icons {
}
</style>