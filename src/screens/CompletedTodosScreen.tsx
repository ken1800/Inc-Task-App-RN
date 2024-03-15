import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTodoContext } from '../context/TodoContext';
import palette from '../../palette';
import TodoItem from '../components/TodoItem';

const CompletedTodosScreen: React.FC = () => {
  const { completedTodos } = useTodoContext();

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
        <Text variant="headlineMedium" style={styles.header}>
          Hi, welcome back!
        </Text>
        <Icon name='trophy' size={100} color={palette.defaultTheme} />
      </View>
    
      {completedTodos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You have no completed tasks
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Completed Tasks</Text>
          <View style={styles.todoListContainer}>
            <ScrollView>
              {completedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.defaultTheme,
    padding: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: palette.defaultTheme,
    marginTop: 20,
  },
  todoListContainer: {
    borderRadius: 5,
    width: '90%',
    padding: 3,
    height: '60%',
  },
});

export default CompletedTodosScreen;
