import React, {Suspense} from 'react';
import './App.scss';
import {screens} from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Suspense fallback={<div />}>
        <Router>
          {/* <Navbar show="yes" /> */}
          <Route
            render={({location}) => (
              <React.Fragment>
                <Switch location={location}>
                  {screens.map((screen, index) => {
                    return (
                      <Route
                        exact
                        path={screen.link}
                        render={({match}) => <screen.view />}
                        key={index}
                      />
                    );
                  })}
                  <Redirect to="/" />
                </Switch>
              </React.Fragment>
            )}
          ></Route>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
