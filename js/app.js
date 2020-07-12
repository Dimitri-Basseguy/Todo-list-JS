/**
 * Todolist
 */
const app = {
  // risque que le DOM ne soit pas encore chargé, que la div n'existe pas encore
  // container: document.getElementById('todo'),

  init: function() {

  
    // créer d'abord une version statique (données en dur, pas de gestion des actions
    //   utilisateur)
    // - étape 1 : découpage en blocs
    //   - formulaire
    //   - compteur de tâches en cours
    //   - liste de tâches
    // - étape 2 : écrire chaque bloc en statique, HTML + CSS

    // dynamiser (utiliser des données, gérer les actions...)
    //   - créer une tâche à partir du formulaire
    //   - cocher une tâche (mise en forme)
    app.container = document.getElementById('todo');
    app.container.className = 'todo';
    
    app.createInput();
    app.createCounter();

  },

  

  // ajout du formulaire
  createInput: function () {
    const form = document.createElement('form');

    const inputElement = document.createElement('input');
    inputElement.className = 'input';
    inputElement.placeholder = 'Ajouter une tâche';
    console.log(inputElement);
    form.appendChild(inputElement);

    form.addEventListener('submit', app.handleSubmit);
    app.container.appendChild(form);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    console.log('test submit');
  },

  // Compteur de taches
  createCounter: function () {
    const taskCounter = document.createElement('p');
    taskCounter.textContent = 'X Tâches en cours';
    taskCounter.className = 'counter';
    app.container.appendChild(taskCounter);
  }
  
  

  

  // liste des tâches
  // const taskListElement = document.createElement('div');
  // taskListElement.className = 'task'
  
  // const taskCheckbox = document.createElement('input');
  // taskCheckbox.type = 'checkbox';
  // taskCheckbox.className = 'checkbox';
  // taskListElement.appendChild(taskCheckbox);

  // const taskListText = document.createElement('p');
  // taskListText.textContent = 'Faire une todo-list en JS';
  // taskListElement.appendChild(taskListText);
  
  // container.appendChild(taskListElement);
  // container.appendChild(taskListElement);
  // container.appendChild(taskListElement);

  // document.getElementsByClassName('input').addEventListener('submit', app.handleSubmit {
  //   // e.preventDefault();
  //   if (e.key === 'Enter') {
  //     logtest();
  //   }
  // });

  

  
  // function logtest() {
  //   console.log('enter activated');
  // };
}; 



// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
