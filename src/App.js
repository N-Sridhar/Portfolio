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
const Experience = lazy(() => import('./components/Experience'));
const Hobby = lazy(() => import('./components/Also_i_can'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const screens = [
    {name: 'Home', icon: 'Home', link: '/', view: Home, navDelay: '.1s'},
    {
      name: 'About',
      icon: 'CornerDownRight',
      link: '/about',
      view: About,
      navDelay: '.1s',
    },
    {
      name: 'Experience',
      icon: 'Briefcase',
      link: '/experience',
      view: Experience,
      navDelay: '.2s',
    },
    {
      name: 'Also I Can',
      icon: 'Star',
      link: '/also_i_can',
      view: Hobby,
      navDelay: '.3s',
    },
    {
      name: 'Contact',
      icon: 'Send',
      link: '/contact',
      view: Contact,
      navDelay: '.4s',
    },
  ];
  return (
    <div className="App">
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
