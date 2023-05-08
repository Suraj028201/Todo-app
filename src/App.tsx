import './App.css';
import Router from './Router/router';
import { TodoProvider } from './Context/TodoContext';
import UserProvider from './Context/ProfileContext';

function App() {
  return (
    <div>
      <UserProvider>
        <TodoProvider>
          <Router/>
        </TodoProvider>
      </UserProvider>
    </div>
  );
}

export default App;
