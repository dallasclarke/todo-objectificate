const readline = require('readline');
const fs = require('fs');
const { dirname } = require('path');


let todos = [];
const interface = readline.createInterface({input: process.stdin, output: process.stdout})
const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

`

const loadTodos = function() {
  const file = fs.readFileSync(__dirname + '/../back-end/todos.json', 'utf8');
  const data = JSON.parse(file);
  todos = data.todos;
  

 
  console.log('Output', data.todos.length, todos.length);
}


const saveTodos = function() {
  

  const newContents = {todos: todos}
  const dataChange = JSON.stringify(newContents)
  fs.writeFileSync(__dirname + '/../back-end/todos.json', dataChange);

}

const displayTodos = function(shouldPrintNumber) {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const text = todo.text;
    const isComplete = todo.isComplete;
    const priority = todo.priority;
    const num = i + 1;
    let listSymbol = '*';
    let mark = '✖';
    if (shouldPrintNumber) {
      listSymbol = num + '.';
    }
    // console.log("Output", isComplete)
    if (isComplete === true) {
      mark = '✅';
    }

    const todoLine = listSymbol + ' ' + text + ' - priority: ' + priority + ' - ' + mark;
    // or, using interpolation:
    // const todoLine = `${listSymbol} ${todo.text} - priority: ${todo.priority} - ${mark}`
    console.log(todoLine);
  }
}

const add = function(text) {
  const todo = {
    "text": text,
    "isComplete": false,
    "priority": 1
  };
  todos.push(todo);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const complete = function(num) {
  
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i].isComplete = true;
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const uncomplete = function(num) {
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i].isComplete = false;
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const handleMenu = function(cmd) {
  if (cmd === '1') {
    // Add a todo.
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    // Remove a todo.
    displayTodos(true);
    interface.question('\nPlease pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    // Mark a todo complete.
    displayTodos(true);
    interface.question('\nPlease pick a todo to mark complete: ', complete)
  } else if (cmd === '4') {
    // Mark a todo complete.
    displayTodos(true);
    interface.question('\nPlease pick a todo to mark uncomplete: ', uncomplete)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

loadTodos();
displayTodos(false);
interface.question(menu, handleMenu);
