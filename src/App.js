import React, {Suspense, useState, useEffect} from 'react';
import './App.scss';
import {screens} from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {data, createDoc, updateEntry, updateCoords} from './firestore';

export const CountContext = React.createContext();
export const SetCountContext = React.createContext();

function App() {
  const [id, setId] = useState('');
  const [oldData, setOldData] = useState('');

  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      setOldData(
        localStorage.getItem('timestamp') + ' -- ' + localStorage.getItem('id')
      );
    }
    createDoc(data, setId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id !== '' && oldData !== '') {
      updateEntry(id, oldData);
    }
  }, [id, oldData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latLong =
        'lat: ' +
        position.coords.latitude +
        ' | long: ' +
        position.coords.longitude;

      if ((latLong !== '') & (id !== '')) {
        updateCoords(id, latLong);
      }
    });
  }, [id]);

  const [count, setCount] = useState(0);
  const [visitOrder, setVisitOrder] = useState(0);

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
                        render={({match}) => (
                          <CountContext.Provider
                            value={[count, setCount, visitOrder, setVisitOrder]}
                          >
                            <screen.view id={id} />
                          </CountContext.Provider>
                        )}
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
