import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TodoItem {
  id: number;
  text: string;
  description: string;
  completed: boolean;
}

interface TodoContextType {
  todos: TodoItem[];
  openTodos: TodoItem[];
  completedTodos: TodoItem[];
  error: string | null;
  addTodo: (todo: TodoItem) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (updatedTodo: TodoItem) => void;
  deleteTodo: (id: number) => void;
}

const initialTodos: TodoItem[] = [];

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('todos');
        if (jsonValue !== null) {
          setTodos(JSON.parse(jsonValue));
        }
      } catch (e) {
        setError('Error fetching todos from AsyncStorage: ' + (e as Error).message);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        setError('Error saving todos to AsyncStorage: ' + (e as Error).message);
      }
    };

    saveTodos();
  }, [todos]);

  const addTodo = (todo: TodoItem) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (updatedTodo: TodoItem) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  }

  const todoContextValue: TodoContextType = {
    todos,
    openTodos: todos.filter((todo) => !todo.completed),
    completedTodos: todos.filter((todo) => todo.completed),
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};
