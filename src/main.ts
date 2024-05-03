let form = document.getElementById("form");
let textInput = <HTMLInputElement>document.getElementById("textInput");
let dateInput = <HTMLInputElement>document.getElementById("dateInput");
let textArea = <HTMLInputElement>document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");

const url = `${import.meta.env.VITE_API_URL}/tasks` as string;

let idTaskEditing: Number = 0

type Task = { id?: Number, title: string; description: string; done: string; };

let task: Task = { title: '', description: '', done: '' };

textInput.value = "";
dateInput.value = "";
textArea.value = "";


// Funcion que llama las tareas, las recorre para mostrarlos directamente en documento cuando se haga llamado a la función.
// para reutilizar la funcion cuantas veces sea necesario

const getTasks = async () => {
  try {
    const response = await fetch(url);
    const responseData: Task[] = await response.json();
    tasks!.innerHTML = "";
    responseData!.map(t => {
      const cardTask = document.createElement("div");
      cardTask.classList.add("CardTask");

      const taskTitle = document.createElement("h3");
      taskTitle.textContent = `task #${t.id}`;

      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = t.title;

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = t.description;

      const doneParagraph = document.createElement("p");
      doneParagraph.className = "fechaDone";
      doneParagraph.textContent = t.done;

      const optionsSpan = document.createElement("span");
      optionsSpan.classList.add("options");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-edit");
      editIcon.textContent = " Modify";
      editIcon.onclick = () => editTask(t.id)

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      deleteIcon.textContent = " Delete";
      deleteIcon.onclick = () => deleteTask(t.id)


      optionsSpan.appendChild(editIcon);
      optionsSpan.appendChild(deleteIcon);

      cardTask.appendChild(taskTitle);
      cardTask.appendChild(titleParagraph);
      cardTask.appendChild(descriptionParagraph);
      cardTask.appendChild(doneParagraph);
      cardTask.appendChild(optionsSpan);

      tasks!.appendChild(cardTask);
    });
    idTaskEditing = 0 // se establece la id en 0 porque en caso de que se haya modificado algo, se borre la id.
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

  idTaskEditing == 0 ? createTask() : ModifyTask();

  // esto limpia los campos
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

const createTask = async () => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(task),
  })
  if (response.status == 201) getTasks()
  else msg!.innerHTML = "<br>text error";
};

const deleteTask = async (id: any) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  })
  if (response.status == 200) getTasks()
  else msg!.innerHTML = "<br>text error";
};

const editTask = async (id: any) => {
  idTaskEditing = id 
  const response = await fetch(`${url}/${id}`)
  const res: Task = await response.json()
  if (response.status == 200) {
    textInput.value = res.title;
    textArea.value = res.description;
    dateInput.value = res.done;
  }

  else msg!.innerHTML = "<br>text error";
  /*  idTaskEditing = id 
 textInput.value = target.parentElement!.previousElementSibling!.previousElementSibling!.previousElementSibling!.innerHTML;
  textArea.value = target.parentElement!.previousElementSibling!.previousElementSibling!.innerHTML;
  dateInput.value = target.parentElement!.previousElementSibling!.innerHTML;
  target.parentElement!.parentElement!.remove(); */
};


const ModifyTask = async () => {
  const response = await fetch(`${url}/${idTaskEditing}`, {
    method: "PUT",
    body: JSON.stringify(task),
  })
  if (response.status == 200) getTasks()
  else msg!.innerHTML = "<br>no se pudo modificar";
};

