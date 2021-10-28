import './App.css';
import React, {useEffect,  useContext} from 'react'
import {
	HashRouter as Router, 
	Switch, 
	Route, 
	Link,
	useRouteMatch,
	useParams
  } from "react-router-dom";

  import ContextProvider from './context'

import Main from './components/Main'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:year/:region?">
          <ContextProvider>
            <Main/>
          </ContextProvider>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;

const Home = () => {
return (
    <div>
      <Link to="/2017">2017</Link>
    </div>
  )
}

