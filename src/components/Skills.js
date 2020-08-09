// import Java from '../skill icons/java.svg';

import React, {useEffect} from 'react';
import {useTrail, config} from 'react-spring';
import {animated} from 'react-spring';
import {ga} from '../firebase';
import Navbar from './Navbar';

function Skills() {
  useEffect(() => {
    ga.logEvent('Skills Page');
    console.log('Skills Page');
  }, []);

  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <>
      <Navbar show="yes" />
      <div className="Skills">
        <animated.div className="Text" style={trail[0]}>
          <h2>As of now.</h2>
        </animated.div>
        <animated.div className="Container" style={trail[1]}>
          {/* <animated.div className="Card" style={trail[0]}>
          <div className="Circle">
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className="Percent">
              <h2>82%</h2>
              <img src={Java} alt="java" width="50px" />
            </div>
          </div>
        </animated.div> */}

          <ul>
            <li className="java">Java</li>
            <li className="spring">Spring Framework</li>
            <li className="htmlcss">HTML & CSS</li>
            <li className="react">React Js</li>
            <li className="sass">SASS</li>
          </ul>
        </animated.div>
      </div>
    </>
  );
}

export default Skills;
