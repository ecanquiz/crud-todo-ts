let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let data = {};
let tasksList = []

textInput.value = "";
dateInput.value = "";
textarea.value = "";

const getTasks = async ()=> {
  try {
    const response = await fetch("http://localhost:8000/tasks");
    const responseData = await response.json();
    // console.log('result', responseData)
    return responseData;
  }
  catch (error) {
    console.error("Error", error);
  }
}

getTasks()
  .then(r => {    
        
    //r.forEach((d) => {
    //  data["title"] = d.title;
    //  data["description"] = d.description;
    //  data["done"] = d.done;     
    //});
    tasksList = r
    console.log("tasksList", tasksList) 
  })
  .catch(error => console.log(e));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "" || dateInput.value === "" || textarea.value === "") {
    msg.innerHTML = "Task cannot be blank";
    console.log("failure");
  } else {
    console.log("successs");
    msg.innerHTML = "";
    acceptData();
  }
};



const acceptData = () => {
  data["title"] = textInput.value;
  data["description"] = textarea.value;
  data["done"] = dateInput.value;  
  console.log(data);
  createTask();
};

const createTask = () => {
  tasks.innerHTML += `
  <div>
    <p>${data.title}</p><p>${data.description}</p><p>${data.done}</p>
    <span class="options">
      <i onClick="editTask(this)" class="fas fa-edit"></i>
      <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
};

const editTask = (e) => {  
  textInput.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  textarea.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  dateInput.value = e.parentElement.previousElementSibling.innerHTML;   
  e.parentElement.parentElement.remove();
};


