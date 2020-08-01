import React from 'react';
import {useTrail, animated, config} from 'react-spring';

function Home() {
  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});

  return (
    <div className="Home">
      <animated.div className="home-left" style={trail[0]}>
        <h3>
          <span role="img" aria-label="hi">
            Hi 👋🏻 myself,
          </span>
        </h3>
        <h1>
          <span>SRIDHAR</span>
        </h1>
        <h2>Developer | Designer</h2>
      </animated.div>
      <animated.div className="home-right" style={trail[1]}>
        <b>Home Right</b>
      </animated.div>
    </div>
  );
}

export default Home;
