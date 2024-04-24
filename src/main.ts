let form = document.getElementById("form");
let textInput = <HTMLInputElement>document.getElementById("textInput");
let dateInput = <HTMLInputElement>document.getElementById("dateInput");
let textArea = <HTMLInputElement>document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
const url = "http://10.90.20.129:8001/tasks"

let idtaskEditing: Number = 0

type Task = { id?: Number, title: string; description: string; done: string; };

let task: Task = {title: '', description: '', done: '' };

textInput.value = "";
dateInput.value = "";
textArea.value = "";


// Funcion que llama las tareas, las recorre para mostrarlos directamente en documento cuando se haga llamado a la función.
// para reutilizar la funcion cuantas veces sea necesario

const getTasks = async () => {
  try {
    const response = await fetch(url);
    const responseData: Task[] = await response.json();
    tasks!.innerHTML = responseData!.map(t => {
      return `
        <div class="CardTask">
        <h3>task #${t.id}</h3>
          <p>${t.title}</p><p>${t.description}</p><p>${t.done}</p>
          <span class="options">
            <i onClick="editTask(this,'${t.id}')" class="fas fa-edit"></i>
            <i onClick="deleteTask(${t.id})" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `;
    }).toString().replace(/ ,/g, "")

    idtaskEditing = 0 // se establece la id en 0 porque en caso de que se haya modificado algo, se borre la id.
  }
  catch (error) {
    console.error("Error", error);
  }
}

// Recien cuando se carga el documento

getTasks()

form!.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// fin carga inicial del documento

const formValidation = () => {
  if (textInput.value === "" || dateInput.value === "" || textArea.value === "") {
    msg!.innerHTML = "<br>Task cannot be blank";
  } else {
    msg!.innerHTML = "";
    acceptData();
  }
};

const acceptData = () => {
  task["title"] = textInput.value;
  task["description"] = textArea.value;
  task["done"] = dateInput.value;
  
  idtaskEditing == 0 ? createTask() : ModifyTask();

  // esto limpia los campos
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

const createTask = async () => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status == 201) getTasks()
    else msg!.innerHTML = "<br>text error";
};

const deleteTask = async (id: Number) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  })
  if (response.status == 201) getTasks()
    else msg!.innerHTML = "<br>text error";
};

const editTask = (e: HTMLInputElement, id: any) => {
  idtaskEditing = id
  textInput.value = e.parentElement!.previousElementSibling!.previousElementSibling!.previousElementSibling!.innerHTML;
  textArea.value = e.parentElement!.previousElementSibling!.previousElementSibling!.innerHTML;
  dateInput.value = e.parentElement!.previousElementSibling!.innerHTML;
  e.parentElement!.parentElement!.remove();
};


const ModifyTask = async () => {
  const response = await fetch(`${url}/${idtaskEditing}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.status == 200) getTasks()
    else msg!.innerHTML = "<br>no se pudo modificar";
};