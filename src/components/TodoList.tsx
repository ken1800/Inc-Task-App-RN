import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useTodoContext } from '../context/TodoContext';
import palette from '../../palette';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const { openTodos } = useTodoContext();
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            {openTodos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        You have no tasks
                    </Text>
                    <Text style={styles.emptyText}>
                        Click the button below to add a new task
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => {
                            navigation.navigate('Create Task');
                        }}
                        style={styles.addButton}
                    >
                        Add Task
                    </Button>
                </View>
            ) : (
                <>
                    <Text style={styles.header}>My Tasks</Text>
                    <View  style={styles.todoListContainer}>
                        <ScrollView>
                            {openTodos.map((todo) => (
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
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        width: '90%',
        padding: 3,
        height: '70%',
    },
});

export default TodoList;
