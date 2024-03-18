import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TodoProvider } from '../context/TodoContext';
import AddTodo from '../screens/AddTodoScreen';

jest.useFakeTimers();

describe('AddTodo component', () => {
  beforeEach(() => {
    AsyncStorage.getItem = jest.fn();
    AsyncStorage.setItem = jest.fn();
  });

  it('renders correctly', async () => {
    const { getByText } = render(
      <TodoProvider>
        <AddTodo />
      </TodoProvider>
    );
    const addButton = getByText("Add Task");
    expect(addButton).toBeDefined();
  });

  it('disables the submit button when fields are empty', async () => {
    const { getByText } = render(
      <TodoProvider>
        <AddTodo />
      </TodoProvider>
    );
    const addButton = getByText("Add Task");
    expect(addButton).toBeDisabled();
  });

  it('enables the submit button when fields are filled', async () => {
    const { getByText, getByTestId } = render(
      <TodoProvider>
        <AddTodo />
      </TodoProvider>
    );

    const taskTitleInput = getByTestId("taskTitle");
    const taskDescriptionInput = getByTestId("taskDescription");

    await waitFor(() => {
      act(() => {
        fireEvent.changeText(taskTitleInput, "Test Task");
      });
    });
  
    await waitFor(() => {
      act(() => {
        fireEvent.changeText(taskDescriptionInput, "Test Description");
      });
    });

    expect(taskTitleInput.props.value).toBe("Test Task");
    expect(taskDescriptionInput.props.value).toBe("Test Description");
    expect(getByText("Add Task")).toBeEnabled();
  });

  it('adds a todo when submit button is pressed', async () => {
    const { getByTestId } = render(
      <TodoProvider>
        <AddTodo />
      </TodoProvider>
    );
    const taskTitleInput = getByTestId("taskTitle");
    const taskDescriptionInput = getByTestId("taskDescription");
    const addButton = getByTestId("addTaskButton");
  
    await waitFor(() => {
      act(() => {
        fireEvent.changeText(taskTitleInput, "Test Task");
      });
    });
  
    await waitFor(() => {
      act(() => {
        fireEvent.changeText(taskDescriptionInput, "Test Description");
      });
    });
  
    await waitFor(async () => {
      act(() => {
        fireEvent.press(addButton);
      });
    });

    await waitFor(() => {
      act(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });
    expect(addButton).toBeEnabled();
  });
});
