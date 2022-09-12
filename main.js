
let form = document.getElementById('form');
let input = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');

form.addEventListener('submit', (e)=>{
e.preventDefault();
formValidation();
});


let formValidation = ()=>{
    if (input.value === '') {
     msg.innerHTML = 'Task cannot be blank!';
    } else {
     msg.innerHTML = '';
     accepData();
     add.setAttribute("data-bs-dismiss" ,"modal")
     add.click();
     (()=>{
        add.setAttribute("data-bs-dismiss" ,"")
     })()
    }
};

let data = [];

let accepData = ()=>{
    data.push({
        text: input.value,
        date: dateInput.value,
        description: textarea.value
        
    });
    localStorage.setItem('data', JSON.stringify(data));

    console.log(data);
    createTask();

}

let createTask = ()=>{
    tasks.innerHTML = "";
    data.map((x,y)=>{
return (
    tasks.innerHTML += ` <div id=${y}>
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
    <span class="option">
      <i onClick ="update(this)" data-bs-toggle="modal" data-bs-target="#form"  class="fa-solid fa-pen-to-square"></i>
      <i onClick = "deleteTask(this); createTask()" class="fa-solid fa-trash"></i>
    </span>
    </div>`
)
    })

resetForm();
};

let resetForm = ()=>{
    input.value = '';  
    dateInput.value = '';
    textarea.value = '';
}

let deleteTask = (e)=>{
e.parentElement.parentElement.remove();
data.splice(e.parentElement.parentElement.id, 1);
localStorage.setItem('data', JSON.stringify(data));
}

let update = (e)=>{
    let selectTask = e.parentElement.parentElement;
    input.value = selectTask.children[0].innerHTML ;
    dateInput.value = selectTask.children[1].innerHTML ;
    textarea.value = selectTask.children[2].innerHTML ;
    e.parentElement.parentElement.remove();
    deleteTask(e);

}


(()=>{
   data = JSON.parse( localStorage.getItem("data"))
    console.log(data)
    createTask();
})();
// 'today is my birthday'? window.alert('say happy birthday to samuel'): 'Here come the king';