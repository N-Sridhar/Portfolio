import React from 'react';
import {useTrail, config} from 'react-spring';
import {animated} from 'react-spring';

function Experience() {
  const [trail, set] = useTrail(1, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <div className="Experience">
      <animated.div style={trail[0]}>
        <h1>Experience</h1>
      </animated.div>
    </div>
  );
}

export default Experience;
