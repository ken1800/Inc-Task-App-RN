import * as React from 'react';

import Navigator from './navigation';
import { TodoProvider } from './context/TodoContext';

export default function Index() {
  return (
    <TodoProvider>
       <Navigator />
    </TodoProvider>
  );
}
