import Logo from '../VGS.svg';

import React, {useState, useRef} from 'react';
import * as Icon from 'react-feather';
import {useSpring, animated, useTransition} from 'react-spring';
import {useLockBodyScroll, useWindowSize} from 'react-use';
import {Link} from 'react-router-dom';

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

function Navbar({menuOptions}) {
  const [expand, setExpand] = useState(false);

  const windowSize = useWindowSize();
  useLockBodyScroll(expand);

  const [spring, set, stop] = useSpring(() => ({opacity: 0}));
  set({opacity: 1});
  stop();

  const transitions = useTransition(expand, null, {
    from: SLIDE_IN_MOBILE,
    enter: SLIDE_OUT_MOBILE,
    leave: SLIDE_IN_MOBILE,
    config: {mass: 1, tension: 210, friction: 26},
  });

  return (
    <div className="Navbar" style={spring}>
      <div className="Brand opacityIn" style={{animationDelay: '.25s'}}>
        <Link to="/">
          <img src={Logo} alt="Sridhar 😎| VGS"></img>
        </Link>
      </div>

      <MenuX {...{expand, setExpand}} />

      <animated.div className="Items">
        {menuOptions.map((option, i) => (
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

      {transitions.map(({item, key, props}) =>
        item ? (
          <animated.div key={key} style={props}>
            <Expand {...{menuOptions, setExpand, windowSize}} />
          </animated.div>
        ) : (
          <animated.div key={key} style={props}></animated.div>
        )
      )}
    </div>
  );
}

function Expand({menuOptions, setExpand}) {
  const expandElement = useRef(null);
  return (
    <div className="Expand fadeInUp" ref={expandElement}>
      {menuOptions.map((option, i) => {
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
