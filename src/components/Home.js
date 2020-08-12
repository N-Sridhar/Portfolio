import React, {useEffect, useContext} from 'react';
import {useTrail, animated, config} from 'react-spring';
import {ga} from '../firebase';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {useWindowSize} from 'react-use';
import {updatePage} from '../firestore';
// eslint-disable-next-line no-unused-vars
import {CountContext} from '../App';

function Home({id}) {
  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 🏡';
    ga.logEvent('Home Page');
    console.log('Home Page');
  }, []);

  const {height, width} = useWindowSize();
  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});

  const [count, setCount] = useContext(CountContext);

  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(id, count + '. home page');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="Home">
        <div
          className="Home-Main"
          style={
            height > 792 && width > 768
              ? {height: '29rem'}
              : height > 754 && width > 768
              ? {height: '27rem'}
              : height > 663 && width > 768
              ? {height: '24rem'}
              : height > 625 && width > 768
              ? {height: '19rem'}
              : height < 625 && width > 768
              ? {height: '16rem'}
              : {height: '32rem'}
          }
        >
          <animated.div className="home-left" style={trail[0]}>
            <h2>
              <span role="img" aria-label="hi">
                Hi 👋🏻 myself,
              </span>
            </h2>
            <h1>
              <span>SRIDHAR</span>
            </h1>
            <h2>Developer | Designer</h2>
          </animated.div>
          <animated.div className="home-right" style={trail[1]}>
            <h3>Home Right | {id}</h3>
          </animated.div>
        </div>
        <div className="Home-Button">
          <Link to="/about">
            <div className="left fadeInUp" style={{animationDelay: '.1s'}}>
              <h3>Home About</h3>
            </div>
          </Link>
          <Link to="/skills">
            <div className="middle fadeInUp" style={{animationDelay: '.2s'}}>
              <h3>Home Skills</h3>
            </div>
          </Link>
          <Link to="/contact">
            <div className="right fadeInUp" style={{animationDelay: '.3s'}}>
              <h3>Home Contact</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
