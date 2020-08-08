import React, {lazy, Suspense} from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
// const Hobby = lazy(() => import('./components/Also_i_can'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const screens = [
    {name: 'Home', link: '/', view: Home, navDelay: '.1s'},
    {
      name: 'About Me',
      link: '/about',
      view: About,
      navDelay: '.1s',
    },
    {
      name: 'My Skill Set',
      link: '/skills',
      view: Skills,
      navDelay: '.2s',
    },
    // {
    //   name: 'Also I Can',
    //   link: '/also_i_can',
    //   view: Hobby,
    //   navDelay: '.3s',
    // },
    {
      name: 'To Find Me',
      link: '/contact',
      view: Contact,
      navDelay: '.4s',
    },
  ];
  return (
    <div className="App">
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Suspense fallback={<div />}>
        <Router>
          <Navbar menuOptions={screens} />
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
