import React, {useEffect} from 'react';
import {useTrail, animated, config} from 'react-spring';
import {ga} from '../firebase';
import {Link} from 'react-router-dom';

function Home() {
  useEffect(() => {
    ga.logEvent('Home Page');
    console.log('Home Page');
  }, []);

  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});

  return (
    <div className="Home">
      <div className="Home-Main">
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
          <h3>Home Right</h3>
        </animated.div>
      </div>
      <div className="Home-Button">
        <Link to="/about">
          <div className="left">
            <h3>Home About</h3>
          </div>
        </Link>
        <Link to="/skills">
          <div className="middle">
            <h3>Home Skills</h3>
          </div>
        </Link>
        <Link to="/contact">
          <div className="right">
            <h3>Home Contact</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
