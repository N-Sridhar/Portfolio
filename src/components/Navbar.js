import Logo from '../logo.svg';
import React, {useState, useRef, lazy} from 'react';
import * as Icon from 'react-feather';
import {useSpring, animated, useTransition} from 'react-spring';
import {useLockBodyScroll} from 'react-use';
import {Link} from 'react-router-dom';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Contact = lazy(() => import('./Contact'));
export const screens = [
  {name: 'Home', link: '/', view: Home, navDelay: '.1s'},
  {name: 'About Me', link: '/about', view: About, navDelay: '.1s'},
  {name: 'My Skill Set', link: '/skills', view: Skills, navDelay: '.2s'},
  {name: `Let’s talk`, link: '/contact', view: Contact, navDelay: '.3s'},
];
const SLIDE_IN_MOBILE = {
  opacity: 1,
  position: 'absolute',
  height: '100vh',
  top: 85,
  zIndex: 999,
};
const SLIDE_OUT_MOBILE = {
  opacity: 1,
  position: 'absolute',
  height: '100vh',
  top: 85,
  zIndex: 999,
};
function Navbar({show}) {
  const [expand, setExpand] = useState(false);
  useLockBodyScroll(expand);
  const [spring] = useSpring(() => ({
    from: {opacity: 0},
    to: {opacity: 1},
  }));
  const transitions = useTransition(expand, {
    from: SLIDE_IN_MOBILE,
    enter: SLIDE_OUT_MOBILE,
    leave: SLIDE_IN_MOBILE,
    config: {mass: 1, tension: 210, friction: 26},
    onRest: () => setExpand(false),
  });
  return (
    <animated.div className="Navbar" style={spring}>
      <div className="Brand opacityIn" style={{animationDelay: '.25s'}}>
        <Link to="/">
          <img src={Logo} alt="Sridhar 😎| VGS"></img>
        </Link>
      </div>
      <MenuX {...{expand, setExpand}} />{' '}
      <animated.div
        className="Items"
        style={show === 'yes' ? {} : {display: 'none'}}
      >
        {screens.map((option, i) => (
          <animated.div
            className="NavItems fadeInUp"
            style={{animationDelay: `${option.navDelay}`}}
            key={i}
          >
            <Link to={option.link} key={i}>
              <span>{option.name}</span>
            </Link>
          </animated.div>
        ))}
      </animated.div>
      {transitions((styles, item, t, i) => (
        <animated.div key={i} style={styles}>
          {item && <Expand {...{setExpand}} />}
        </animated.div>
      ))}
    </animated.div>
  );
}
function Expand({setExpand}) {
  const expandElement = useRef(null);
  return (
    <div className="Expand fadeInUp" ref={expandElement}>
      {screens.map((option, i) => {
        return (
          <Link
            to={option.link}
            key={i}
            onClick={() => {
              setExpand(false);
            }}
          >
            <span {...activePage(option.link)}>{option.name}</span>
          </Link>
        );
      })}
      <div className="Expand-bottom">
        <h5>
          <span role="img" aria-label="smile">
            ❗ SRIDHAR 🙋🏻‍♂️
          </span>
        </h5>
      </div>
    </div>
  );
}
const activePage = (link) => ({
  className: `${window.location.pathname === link ? 'focused' : ''}`,
});
const MenuX = ({expand, setExpand}) => {
  return (
    <div className="MenuButton fadeInUp">
      {expand ? (
        <Icon.X onClick={() => setExpand(!expand)} />
      ) : (
        <Icon.Menu onClick={() => setExpand(!expand)} />
      )}
    </div>
  );
};
export default Navbar;
