import React from 'react';
import { render } from '@testing-library/react-native';

import { TodoProvider } from '../context/TodoContext';
import CompletedTodosScreen from '../screens/CompletedTodosScreen';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
jest.mock('react-native-swipe-list-view', () => 'SwipeListView');

describe('CompletedTodosScreen component', () => {
    it('renders correctly', async () => {
        const { getByText } = render(
        <TodoProvider>
            <CompletedTodosScreen />
        </TodoProvider>
        );
        const title = getByText("You have no completed tasks");
        expect(title).toBeDefined();
    });
});
