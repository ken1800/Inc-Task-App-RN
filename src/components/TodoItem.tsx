import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { Checkbox, Icon } from "react-native-paper";
import { SwipeRow } from 'react-native-swipe-list-view';

import { TodoItem as ITodoItem, useTodoContext } from "../context/TodoContext";
import { shortToastMessage } from "./ToastMessage";
import palette from "../../palette";
import { useNavigation } from "@react-navigation/native";

 function truncateString(input:string, ) {
    if(input.length > 30) {
      return input.substring(0, 30) + '...';
    }
    return input;
  }
  
const TodoItem = ({ todo }: { todo: ITodoItem}) => {
    const navigation = useNavigation<any>()
    const { toggleTodo, deleteTodo } = useTodoContext();

    return (
        <SwipeRow rightOpenValue={-100}>
            <View style={styles.deleteView}>
                <TouchableOpacity
                    style={styles.deleteTouchable}
                    onPress={() =>
                        Alert.alert(
                            'Delete Task?',
                            `Are you sure you want to delete the task "${todo.text}"?`,
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => deleteTodo(todo.id)
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                >
                    <Text style={styles.deleteText}>
                        <Icon source='delete-outline' size={30} color='white' />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <Checkbox
                    status={todo.completed ? 'checked' : 'unchecked'}
                    color={palette.defaultTheme}
                    uncheckedColor={palette.defaultTheme}
                    onPress={() =>{
                        toggleTodo(todo.id);
                        shortToastMessage(todo.completed ? 'Task marked as incomplete' : 'Task marked as complete');
                    }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Task Details', { todo })} style={styles.labelContainer}>
                    <Text style={styles.label}>{truncateString(todo.text)}</Text>
                </TouchableOpacity>
            </View>
        </SwipeRow>
    );
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: palette.error,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: palette.defaultTheme,
        borderBottomWidth: 0.5,
        height: 70,
        alignItems: 'center'
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        marginLeft: 10,
        fontSize: 20,
        width: '100%',
    }
});

export default TodoItem;
