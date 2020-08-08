import React, {useEffect} from 'react';
import {animated, config, useTrail} from 'react-spring';
import {ga} from '../firebase';

function Also_i_can() {
  useEffect(() => {
    ga.logEvent('Also_I_Can Page');
    console.log('Also_I_Can Page');
  }, []);

  const [trail, set] = useTrail(1, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <div className="Also_i_can">
      <animated.div style={trail[0]}>
        <h1>Also_i_can</h1>
      </animated.div>
    </div>
  );
}

export default Also_i_can;
