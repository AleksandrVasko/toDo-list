"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplete = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');
const todoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];

const render = function () {
    todoList.innerHTML = '';
    todoComplete.innerHTML = '';
    todoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.id = 'block' + index;
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            `<button class="todo-remove" id ='btn${index}'></button>` +
            '<button class="todo-complete"></button>' +
            '</div>';
            
        if (item.completed) {
            todoComplete.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector(`#btn${index}`).addEventListener('click', function () {
            document.getElementById(`block${index}`).outerHTML = '';
            todoData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('todoData', JSON.stringify(todoData));
        });
    });
    localStorage.clear();
    localStorage.setItem('todoData', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (/\S/.test(headerInput.value)) {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        };
        todoData.push(newToDo);
        headerInput.value = '';
        render();
    }
});

render();