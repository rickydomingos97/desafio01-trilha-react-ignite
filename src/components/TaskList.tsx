import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import { useToasts } from 'react-toast-notifications' // SNACKBAR //
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { addToast} = useToasts()

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // se estiver vazio vai exibir o snackbar //
    if(newTaskTitle) {
      const newTask = {
        id: Math.random(), //gera um id aleatorio //
        title: newTaskTitle, // texto a ser criado //
        isComplete: false // valor inicial isComplete: false //
      }

        // callback //
    setTasks(oldTaskState => [...oldTaskState, newTask]); // spread operator  - adiciona um item ao array sem alterar o array //

    addToast("Tarefa adicionada a lista!", {
      appearance: 'info',
      autoDismiss: true,
    })

    setNewTaskTitle(''); // limpa o input apos adicionar uma nova Task //

    } else {
    addToast("Por favor, coloque um titulo na tarefa para adiciona-la a lista!", {
      appearance: 'warning',
      autoDismiss: true,
    })
  }
}

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTaskComplete = tasks.map
    ( task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task );
    console.log(newTaskComplete)
    setTasks( newTaskComplete );
    addToast("TAREFA CONCLUIDA COM SUCESSO!", {
      appearance: 'info',
      autoDismiss: true,
    })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTasks = tasks.filter( task => task.id !== id )
    setTasks( filteredTasks );

    addToast("Esta tarefa foi deletada da lista.", {
      appearance: 'error',
      autoDismiss: true,
    })
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}