const addToDo = document.querySelector("#addToDo");
const toDoOutput = document.querySelector(".to-dos")
const inputField = document.querySelector("#input-field")

addToDo.addEventListener('click' , function(){
    let paragraph = document.createElement("p");
    paragraph.innerText = inputField.value;
    toDoOutput.appendChild(paragraph)
    inputField.value = "";
})