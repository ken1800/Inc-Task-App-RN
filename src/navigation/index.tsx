import { BottomTabsNavigator } from './bottom-navigator/bottom-navigator';
import CompletedTodo from '../screens/CompletedTodosScreen';
import TodoNavigator from './todo-navigator';

const Tabs = [
    {
        name: 'Tasks',
        component: TodoNavigator,
        icon: 'book-open'
    },
    {
        name: 'Completed Tasks',
        component: CompletedTodo,
        icon: 'check-circle',
    },
]

function Navigator() {
    return (
        <BottomTabsNavigator tabs={Tabs} />
    );
}

export default Navigator;