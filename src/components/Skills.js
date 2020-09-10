import Ps from '../icons/ps.svg';
import Ae from '../icons/ae.svg';
import Pr from '../icons/pr.svg';
import Ai from '../icons/ai.svg';
import Blender from '../icons/blender.svg';
import Bienes from '../icons/bienes_mart.svg';
import Firebase from '../icons/firebase.svg';
import Xd from '../icons/xd.svg';
import Gitlab from '../icons/gitlab.svg';
import Docker from '../icons/docker.svg';

import React, {useEffect, useContext} from 'react';
import {useTrail, config} from 'react-spring';
import {animated} from 'react-spring';
import {ga} from '../firebase';
import Navbar from './Navbar';
import {updatePage, checkedUpdation, updatePageTime} from '../firestore';
import {CountContext} from '../App';
import moment from 'moment';
import {isMobile} from 'react-device-detect';
import ReactTooltip from 'react-tooltip';
import * as Icon from 'react-feather';

function Skills({id}) {
  const entryTime = moment();

  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 👨🏻‍💻';
    ga.logEvent('Skills Page');
    // console.log('Skills Page');
    window.scrollTo(0, 0);
  }, []);

  const [count, setCount, visitOrder, setVisitOrder] = useContext(CountContext);

  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(
        id,
        count + '. Skills (' + entryTime.format('h:mm:ss a') + ')'
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
          count + '. Skills (' + entryTime.format('h:mm:ss a') + ')'
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

  const spinner = 'spinner';
  const size = isMobile ? '35' : '45';

  const Tools = [
    {name: 'Firebase', icon: Firebase, text: 'Firebase'},
    {name: 'Xd', icon: Xd, text: 'Adobe XD'},
    {name: 'Gitlab', icon: Gitlab, text: 'GitLab'},
    {name: 'Docker', icon: Docker, text: 'Docker'},
  ];

  return (
    <>
      <Navbar show="yes" />
      <div className="Skills">
        <div className="Profession">
          <animated.div className="Text" style={trail[0]}>
            <h3>
              <span role="img" aria-label="smiling face">
                {/* I'm an inquisitive person and believes that "Keep Learning❗" is
                one of the best surviving technique. So I'll always try to learn
                new skills and technologies. */}
                I'm an inquisitive person and believe that "Keep learning❗" is
                one of the best surviving techniques.
                <br />
                This idea kept me engaging myself in learning new skills and
                technologies.
                <br />
                {/* And as far now, I learned these tech stacks 😊 */}
                Below I have enlisted my current mastery on tech stack 😊
              </span>
            </h3>
          </animated.div>
          <animated.div className="Container" style={trail[1]}>
            <ul>
              <li className="java">Java</li>
              <li className="spring">Spring Framework</li>
              <li className="htmlcss">HTML & CSS</li>
              <li className="react">React Js</li>
              <li className="sass">SASS</li>
            </ul>
          </animated.div>
          <animated.div className="Tools" style={trail[2]}>
            <h3>PLATFORM / TOOL</h3>
            <div className="Tool">
              {Tools.map((Tool, i) => (
                <div className={Tool.name} key={i}>
                  <img src={Tool.icon} alt={Tool.name} />
                  <h4>{Tool.text}</h4>
                </div>
              ))}
            </div>
          </animated.div>
        </div>
        <div className="Passion">
          <animated.div className="Text" style={trail[2]}>
            <h3>
              <span role="img" aria-label="emoji">
                {/* Besides technology, I'm engrossed in visual effects and computer
                graphics too and that kept me practicing these tools and try
                something. */}
                Besides technology, I'm engrossed in visual effects and computer
                graphics which cheered me up to explore and practice these tools
                and try something new.
              </span>
            </h3>
          </animated.div>
          <animated.div className="Cards" style={trail[3]}>
            <div
              className="ps"
              data-tip="Adobe Photoshop"
              data-border-color="yellow"
            >
              <svg className={spinner}>
                <circle cx={size} cy={size} r={size} />
                <circle cx={size} cy={size} r={size} />
              </svg>
              <div className="logo">
                <img src={Ps} alt="Photoshop" />
              </div>
            </div>
            <div
              className="ae"
              data-tip="Adobe AfterEffects"
              data-border-color="yellow"
            >
              <svg className={spinner}>
                <circle cx={size} cy={size} r={size} />
                <circle cx={size} cy={size} r={size} />
              </svg>
              <div className="logo">
                <img src={Ae} alt="AfterEffects" />
              </div>
            </div>
            <div
              className="pr"
              data-tip="Adobe PremierePro"
              data-border-color="yellow"
            >
              <svg className={spinner}>
                <circle cx={size} cy={size} r={size} />
                <circle cx={size} cy={size} r={size} />
              </svg>
              <div className="logo">
                <img src={Pr} alt="PremierePro" />
              </div>
            </div>
            <div
              className="ai"
              data-tip="Adobe Illustrator"
              data-border-color="yellow"
            >
              <svg className={spinner}>
                <circle cx={size} cy={size} r={size} />
                <circle cx={size} cy={size} r={size} />
              </svg>
              <div className="logo">
                <img src={Ai} alt="illustator" />
              </div>
            </div>
            <div
              className="blender"
              data-tip="Blender"
              data-border-color="yellow"
            >
              <svg className={spinner}>
                <circle cx={size} cy={size} r={size} />
                <circle cx={size} cy={size} r={size} />
              </svg>
              <div className="logo">
                <img src={Blender} alt="Blender" />
              </div>
            </div>
            <ReactTooltip place="top" border={true} />
          </animated.div>
        </div>
        <div className="Works">
          <div className="Development">
            <div className="Text">
              <h4>M Y - B U I L D</h4>
            </div>
            <div className="Cards">
              <div className="Bm">
                <img src={Bienes} alt="bienes mart" />
                <div className="Info">
                  <h2>Bienes Mart</h2>
                  <h4>Apparel & Clothing</h4>
                  <a
                    href="https://bienes-mart.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (id !== '') {
                        setVisitOrder((prevCount) => prevCount + 1);
                        checkedUpdation(
                          id,
                          visitOrder +
                            '. Bienes Mart (' +
                            moment().format('h:mm:ss a') +
                            ')'
                        );
                      }
                    }}
                  >
                    <Icon.ArrowRightCircle
                      className="button"
                      size={!isMobile ? '32px' : '40px'}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skills;
