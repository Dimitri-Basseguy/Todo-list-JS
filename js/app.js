/**
 * Todolist
 */

/* 
version impérative : on stocke les données directement dans le DOM. Pas pratique pour
ajouter des fonctionnalités (si on voulait ordonner les tâches : finies puis pas
finies => traitement du clic sur une tâche aaaahhhhhhhhh)

Programmation déclarative :
- on a une seule source de vérité : les données
- quand on veut changer quelque chose (par exemple traiter une action utilisateur) :
on modifie les données
- dès que les données changent, on reconstruit l'affichage en partant de zéro

avantages et inconvénients
- impératif : on met à jour dans le DOM seulement ce qui a changé, mais peu évolutif
- déclaratif : évolutif, mais on recharge tout le DOM (bof pour la performance)

Et si on pouvait avoir quelque chose d'évolutif, mais qui mette à jour dans le 
DOM seulement ce qui a changé ?
=> React !
Il utilise un DOM virtuel (génération du JSX, ce n'est pas affiché), et met à jour
dans le DOM réel seulement ce qui a changé (mécanisme de réconciliation)
*/

const app = {
  // données : seule source de vérité
  tasks: [
    {
      // on définit ce qu'on veut :) . Un id sera pratique pour repérer chaque tâche
      id: 1,
      title: 'Coder une todo-list',
      done: true,
    },
    {
      id: 2,
      title: 'Améliorer la todo-list',
      done: false,
    }
  ],

  init: function() {
    app.drawUI();
  },

  // dessiner l'interface utilisateur
  drawUI: function() {
    app.container = document.getElementById('todo');

    // on commence par vider le container, car on reconstruit tout l'affichage
    app.container.innerHTML = '';
    app.container.className = 'todo';

    app.createForm();
    app.createCounter();
    app.createListTasks();
  },

  createForm: function() {
    // je crée un élément de type form
    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Ajouter une tâche';
    input.className = 'input';
    form.appendChild(input);

    // on écoute l'événement de soumission du formulaire
    form.addEventListener('submit', app.handleSubmit);

    // j'ajoute l'élément au DOM
    app.container.appendChild(form);
  },

  createCounter: function() {
    // en version déclarative, s'il faut changer la valeur du compteur => je vais
    // modifier les données puis reconstruire l'affichage en partant de zéro,
    // donc pas besoin de séparer le traitement avec 'setCounterValue'
    
    const counter = document.createElement('p');
    counter.className = 'counter';

    // on crée un tableau avec seulement les tâches non terminées
    const tasksNotDone = app.tasks.filter((task) => {
      // on retourne true si on veut conserver l'élément, false sinon
      // return task.done === false;
      // NOT task.done => négation
      return !task.done;
    });

    // nombre de tâches non terminées
    const count = tasksNotDone.length;

    if (count > 1) {
      counter.textContent = `${count} tâches en cours`;
    }
    else {
      counter.textContent = `${count} tâche en cours`;
    }

    app.container.appendChild(counter);
  },

  createListTasks: function() {
    app.ul = document.createElement('ul');
    app.container.appendChild(app.ul);

    // appel à generateTask pour chaque tâche de tasks
    app.tasks.forEach((task) => {
      app.generateTask(task.title, task.id, task.done);
    });
  },

  // générer une tâche dans la liste des tâches
  generateTask: function(taskTitle, taskId, isDone) {
    const taskContainer = document.createElement('li');

    if (isDone) {
      taskContainer.setAttribute('class', 'task task--done');
    } else {
      taskContainer.setAttribute('class', 'task task--notDone');
    }

    // utilisation d'une même valeur à deux endroits => variable
    const id = 'checkbox-' + taskId;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    // comme on recharge le DOM à chaque changement de données, il faut qu'on
    // force la valeur de la checkbox
    checkbox.checked = isDone;

    checkbox.id = id;

    // on ajoute l'id de la tâche pour pouvoir le récupérer avec l'évenement 'change'
    checkbox.dataset.identifier = taskId;

    // on écoute le changement de valeur de la checkbox
    checkbox.addEventListener('change', app.handleChange);

    const label = document.createElement('label');
    label.textContent = taskTitle;
    label.className = 'taskLabel';
    // label.setAttribute('for', id);
    // strictement équivalent à :
    label.htmlFor = id;

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);

    app.ul.appendChild(taskContainer);
  },

  handleSubmit(event) {
    // on empêche le comportement par défaut de l'événement, on ne veut pas que la
    // page soit rechargée
    event.preventDefault();

    // closest ne fonctionne pas ici : remonte vers la racine, ne descend pas dans
    // l'élément
    // event.target.closest('.input-addTask')

    // childNodes : les noeuds enfants
    const inputValue = event.target.childNodes[0].value;

    // trim supprime les espaces en début et en fin de la chaîne
    if (inputValue.trim() !== '') {
      console.log('submit!', inputValue);

      // modifier le DOM : non !
      // app.generateTask(inputValue);

      // on met à jour les données : on crée une tâche (object), on l'ajoute au tableau
      const newTask = {
        // id dynamique : taille du tableau + 1
        // ça fonctionne ici, mais ne pas utiliser ça si on peut supprimer des tâches
        id: app.tasks.length + 1,
        title: inputValue,
        done: false,
      };
      app.tasks.push(newTask);
      console.log(app.tasks);
      
      // puis on reconstruit l'interface en partant de zéro
      app.drawUI();

      // vider l'input
      event.target.childNodes[0].value = '';
    }
    else {
      // TODO afficher un joli message à l'utilisateur
      console.log('attention le champ est vide');
    }
  },

  handleChange: function(event) {
    console.log('change!', event.target.checked);
    console.log('dataset :', event.target.dataset.identifier);

    // pour pouvoir comparer, on transforme en nombre
    const identifier = Number(event.target.dataset.identifier);

    // modifier les données : récupère la tâche dans le tableau, modifie done
    const taskToUpdate = app.tasks.find((task) => task.id === identifier);
    // console.log(taskToUpdate);
    taskToUpdate.done = event.target.checked;

    console.log(app.tasks);

    // puis reconstruire l'interface
    app.drawUI();

    // if (event.target.checked) {
    //   event.target.closest('li').classList.add('taskContainer--done');

    //   // décrémenter le nombre de tâches
    //   app.count -= 1;
    //   app.setCounterValue();
    // }
    // else {
    //   event.target.closest('li').classList.remove('taskContainer--done');

    //   // incrémenter le nombre de tâches
    //   app.count += 1;
    //   app.setCounterValue();
    // }
  }

};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
