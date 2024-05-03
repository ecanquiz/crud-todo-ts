/*let form = document.getElementById("form");
let textInput = <HTMLInputElement>document.getElementById("textInput");
let dateInput = <HTMLInputElement>document.getElementById("dateInput");
let textArea = <HTMLInputElement>document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
type Task = {title: string; description: string; done: string;}
let task: Task = {title: '', description: '', done: ''};

textInput.value = "";
dateInput.value = "";
textArea.value = "";

const getTasks = async ()=> {
  try {
    const response = await fetch("http://localhost:8000/tasks");
    const responseData: Task[] = await response.json();
    return responseData;
  }
  catch (error) {
    console.error("Error", error);
  }
}

getTasks()
  .then(r => {
    tasks!.innerHTML = r!.map(t => {
      return `
        <div>
          <p>${t.title}</p><p>${t.description}</p><p>${t.done}</p>
          <span class="options">
            <i onClick="editTask(this)" class="fas fa-edit"></i>
            <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `;
    }).toString().replace(/,/g,'');
  })
  .catch(e => console.log(e));

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "" || dateInput.value === "" || textArea.value === "") {
    msg!.innerHTML = "Task cannot be blank";
    console.log("failure");
  } else {
    console.log("successs");
    msg!.innerHTML = "";
    acceptData();
  }
};

const acceptData = () => {
  task["title"] = textInput.value;
  task["description"] = textArea.value;
  task["done"] = dateInput.value;
  createTask();
};

const createTask = () => {
  tasks!.innerHTML += `
  <div>
    <p>${task.title}</p><p>${task.description}</p><p>${task.done}</p>
    <span class="options">
      <i onClick="editTask(this)" class="fas fa-edit"></i>
      <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

const deleteTask = (e: HTMLInputElement) => {
  e.parentElement!.parentElement!.remove();
};

const editTask = (e: HTMLInputElement) => {  
  textInput.value = e.parentElement!.previousElementSibling!.previousElementSibling!.previousElementSibling!.innerHTML;
  textArea.value = e.parentElement!.previousElementSibling!.previousElementSibling!.innerHTML;
  dateInput.value = e.parentElement!.previousElementSibling!.innerHTML;   
  e.parentElement!.parentElement!.remove();
};*/
