import Ps from '../icons/ps.svg';
import Ae from '../icons/ae.svg';
import Pr from '../icons/pr.svg';
// eslint-disable-next-line
import Ai from '../icons/ai.svg';
import Blender from '../icons/blender.svg';

import React, {useEffect, useContext} from 'react';
import {useTrail, config} from 'react-spring';
import {animated} from 'react-spring';
import {ga} from '../firebase';
import Navbar from './Navbar';
import {updatePage, updatePageTime} from '../firestore';
import {CountContext} from '../App';
import moment from 'moment';

function Skills({id}) {
  const entryTime = moment();

  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 👨🏻‍💻';
    ga.logEvent('Skills Page');
    console.log('Skills Page');
  }, []);

  const [count, setCount] = useContext(CountContext);

  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(
        id,
        count + '. skills page (' + entryTime.format('h:mm:ss a') + ')'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    return () => {
      const exitTime = moment();
      if (id !== '') {
        updatePageTime(
          entryTime,
          exitTime,
          id,
          count + '. skills page (' + entryTime.format('h:mm:ss a') + ')'
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [trail, set] = useTrail(4, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <>
      <Navbar show="yes" />
      <div className="Skills">
        <div className="Profession">
          <animated.div className="Text" style={trail[0]}>
            <h2>Profession.</h2>
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
        <div className="Passion">
          <animated.div className="Text" style={trail[2]}>
            <h2>Passion.</h2>
          </animated.div>
          <animated.div className="Cards" style={trail[3]}>
            <h3 className="ps">
              <img src={Ps} alt="Photoshop" />
            </h3>
            <h3 className="ae">
              <img src={Ae} alt="AfterEffects" />
            </h3>
            <h3 className="pr">
              <img src={Pr} alt="PremierePro" />
            </h3>
            <h3 className="blender">
              <img src={Blender} alt="Blender" />
            </h3>
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default Skills;
