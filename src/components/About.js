// eslint-disable-next-line no-unused-vars
import React, {useEffect, useContext, useState} from 'react';
import {useTrail, config, animated} from 'react-spring';
import {ga} from '../firebase';
import Navbar from './Navbar';
import {updatePage, updatePageTime} from '../firestore';
import {CountContext} from '../App';
import moment from 'moment';

function About({id}) {
  const entryTime = moment();

  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 📄';
    ga.logEvent('About Page');
    console.log('About Page');
  }, []);

  const [count, setCount] = useContext(CountContext);

  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(id, count + '. about page');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    return () => {
      const exitTime = moment();
      if (id !== '') {
        updatePageTime(entryTime, exitTime, id, count + '. about page');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [trail, set] = useTrail(1, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <>
      <Navbar show="yes" />
      <div className="About">
        <animated.div style={trail[0]}>
          <h2>
            <span>
              I am Sridhar and i expertise in visual effects.Check out the
              services offered! To know a little more about me,keep going.
              <br />
              I am a free spirited person who thrives on enthusiasm and strives
              to heighten the energy level of my environment.
              <br />
              My hometown is Tiruppur,TN and is close to my heart. It's the kind
              of place that grows on you! When you have a meddlesome mind,you
              stumble across a number of things that incites curiosity.
              <br />
              VFX is one such discovery for me and i have grown passionate of it
              ever since.That's all folks! Thank you for your time and patience.
              <br />
              Well, did I mention my killer skills in football❗
            </span>
          </h2>
        </animated.div>
      </div>
    </>
  );
}

export default About;
