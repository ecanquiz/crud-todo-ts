let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");

textInput.value = "";
dateInput.value = "";
textarea.value = "";

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

let data = {};

const acceptData = () => {
  data["textInput"] = textInput.value;
  data["dateInput"] = dateInput.value;
  data["textarea"] = textarea.value;
  console.log(data);
  createTask();
};

const createTask = () => {
  tasks.innerHTML += `
  <div>
    <p>${data.textInput}</p><p>${data.dateInput}</p><p>${data.textarea}</p>
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
  dateInput.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  textarea.value = e.parentElement.previousElementSibling.innerHTML; 
  e.parentElement.parentElement.remove();
};


