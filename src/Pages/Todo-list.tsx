import React, { useState, useEffect } from 'react';
import "../Style/TodoList.css";
import { useTodos, Todo, Subtask } from '../Context/TodoContext';

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [subinputValue, setSubInputValue] = useState<string>('');
  const {todos, setTodos} = useTodos();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [IsEditing, setIsEditing] = useState(false);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const storedTodos = localStorage.getItem(`${email}`);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  },[]);

  useEffect(() => {
    const localStorageKeys = Object.keys(localStorage);
    console.log(localStorageKeys);
    if(!localStorageKeys.includes(`${email}`))localStorage.setItem(`${email}`, JSON.stringify(todos));
    if(todos.length != 0)localStorage.setItem(`${email}`, JSON.stringify(todos));
  },[todos, email]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: todos.length + 1,
      task: inputValue,
      subtasks: [],
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
    localStorage.setItem(`${email}`, JSON.stringify(todos));
  };

  const handleEditClick = (taskId: number) => {
    setEditingTaskId(taskId);
    setIsEditing(true);
  };

  const onEnterPressed = (event:any) => {
     if(event.key === 'Enter'){
     handleAddTodo();
     }
  }

  const handleDelete = (index:number) => {
    const newArray = [...todos];
    newArray.splice(index, 1);
    setTodos(newArray);
    if(todos.length === 1){localStorage.removeItem(`${email}`)}
    else {localStorage.setItem(`${email}`, JSON.stringify(todos));}
  }

  const handleSubtaskSubmit = (e: React.FormEvent<HTMLFormElement>, todoId: number) => {
    e.preventDefault();
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    if (todoToUpdate) {
      const newSubtask: Subtask = { id: todoToUpdate.subtasks.length + 1, title: subinputValue, completed: false };
      todoToUpdate.subtasks = [...todoToUpdate.subtasks, newSubtask];
      const updatedTodos = todos.map((todo) => (todo.id === todoId ? todoToUpdate : todo));
      setTodos(updatedTodos);
      localStorage.setItem(`${email}`, JSON.stringify(todos));
    }
    setSubInputValue('');
    setIsEditing(false);
  };

  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: number, subtaskId: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    setSubInputValue(e.target.value);
    if (todoToUpdate) {
      const updatedSubtasks = todoToUpdate.subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, title: e.target.value } : subtask
      );
      todoToUpdate.subtasks = updatedSubtasks;
      const updatedTodos = todos.map((todo) => (todo.id === todoId ? todoToUpdate : todo));
      setTodos(updatedTodos);
      localStorage.setItem(`${email}`, JSON.stringify(todos));
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={onEnterPressed}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
       <ul>
        {todos.map((todo:any, index) => (
          <li key={todo.id}>
            <div className='todo-data'>
            <span>&bull; {todo.task}</span>
            <button className='data-btn' onClick={() => handleEditClick(todo.id)}>Add sub task</button>
            <button className='data-btn' onClick={() => handleDelete(index)}>Delete</button>
            </div>
            {editingTaskId === todo.id && (
              <form onSubmit={(e) => handleSubtaskSubmit(e, todo.id)}>
                <input
                  hidden = {!IsEditing}
                  type="text"
                  placeholder="Enter a subtask..."
                  value={subinputValue}
                  onChange={(e) => handleSubtaskChange(e, todo.id, 0)}
                />
                </form>)}
                <ul>
                    {todo.subtasks.map((subtask:any) => (
                        <li key={subtask.id}>
                        <label style={{fontSize: '20px', fontWeight:'normal'}}>
                          &rarr;  {subtask.title}
                        </label>
                        </li>
                    ))}
                </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
