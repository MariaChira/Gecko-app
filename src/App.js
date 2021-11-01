import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home/home';
import Details from './pages/details/details';
import FourZeroFour from './pages/fourZeroFour/fourZeroFour';
import Header from './components/header/header';
import { usePersistentStorage } from './customHooks/usePersistentStorage';

function App() {

  const data = {
    user: 'Cristi',
    info: {
      work: 'developer',
      sda: 'trainner',
      hobbies: ['music', 'javascript', 'python', 'books', 'electronics']
    }
  };

  const res = usePersistentStorage('get', 'test', data, 'local');
  console.log(res)

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/details/:id'>
            <Details />
          </Route>
          <Route>
            <FourZeroFour/>
          </Route>
        </Switch>
      </Router >
    </div >
  );
}

export default App;