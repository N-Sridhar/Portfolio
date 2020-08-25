// eslint-disable-next-line no-unused-vars
import React, {useEffect, useContext, useState} from 'react';
import {useTrail, config, animated} from 'react-spring';
import {ga} from '../firebase';
import Navbar from './Navbar';
import {updatePage, updatePageTime, getPDF} from '../firestore';
import {CountContext} from '../App';
import moment from 'moment';
import * as Icon from 'react-feather';
import ReactTooltip from 'react-tooltip';
import {Link} from 'react-router-dom';

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
      updatePage(
        id,
        count + '. about page (' + entryTime.format('h:mm:ss a') + ')'
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
          count + '. about page (' + entryTime.format('h:mm:ss a') + ')'
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [trail, set] = useTrail(3, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  return (
    <>
      <Navbar show="yes" />
      <div className="About">
        <animated.div className="Text" style={trail[0]}>
          <h3>
            <span>
              I’m a Web-App developer from TamilNadu, India.
              <br />
              I’ve always sought out opportunities and challenges that are
              meaningful to me.
              <br />
              I’ve never stopped engaging my passion to help others and solve
              problems.
              <br />I endeavor to delight end-users through quality, performance
              and innovation, employing best practices and technical wisdom to
              deliver best-fit customized solutions and support.
            </span>
          </h3>
        </animated.div>
        <div className="Resume">
          <animated.div className="Resume-card" style={trail[1]}>
            <h3>
              <span>
                Always I'll try to deliver
                <br />
                More than Expected❗
              </span>
            </h3>
            <Icon.FileText
              className="Icon"
              color="cyan"
              data-tip="Resume"
              data-border-color="cyan"
              onClick={() => {
                // if (id !== '') {
                getPDF('55');
                // }
              }}
            />
            <ReactTooltip place="top" border={true} />
          </animated.div>
        </div>
        <animated.div className="About-button">
          <div className="left fadeInUp" style={{animationDelay: '.2s'}}>
            <Link to="/skills">
              <h3>
                <span>
                  Check out my skills
                  <br />
                  and if you think
                  <br />I can fulfill your requirements,
                </span>
              </h3>
              <Icon.ChevronsRight color="yellow" />
            </Link>
          </div>
          <div className="right fadeInUp" style={{animationDelay: '.3s'}}>
            <Link to="/contact">
              <h3>Please do reach out to me.</h3>
              <Icon.ChevronsRight color="yellow" />
            </Link>
          </div>
        </animated.div>
      </div>
    </>
  );
}

export default About;
