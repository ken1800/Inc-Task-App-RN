import React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Todo from '../../screens/OpenTodosScreen';
import palette from '../../../palette';
import AddTodo from '../../screens/AddTodoScreen';
import TodoDetailsScreen from '../../screens/TodoDetailsScreen';

const Stack = createNativeStackNavigator();

function TodoNavigator() {
    return (
        <Stack.Navigator initialRouteName="Open Tasks">
            <Stack.Screen
                name="Open Tasks"
                component={Todo}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Task Details"
                component={TodoDetailsScreen}
                options={{
                    headerShown: true,
                    headerBackground: () => (
                        <View
                            style={{
                                backgroundColor: palette.defaultTheme,
                                height: 60,
                            }}
                        />
                    ),
                    headerTintColor: palette.white,
                }}
            />
            <Stack.Screen
                name="Create Task"
                component={AddTodo}
                options={{
                    headerShown: true,
                    headerBackground: () => (
                        <View
                            style={{
                                backgroundColor: palette.defaultTheme,
                                height: 60,
                            }}
                        />
                    ),
                    headerTintColor: palette.white,
                }}
            />
        </Stack.Navigator>
    );
}

export default TodoNavigator;