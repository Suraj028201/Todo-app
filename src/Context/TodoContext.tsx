import React, { createContext, useContext, useState } from 'react';

export interface Todo {
  id: number;
  task: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

export const TodoProvider = ({ children }:any) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const value: TodoContextType = {
    todos,
    setTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
