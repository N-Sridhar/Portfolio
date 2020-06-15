import Logo from '../VGS.svg';

import React from 'react';
import * as Icon from 'react-feather';

function navbar() {
  return (
    <div className="Navbar">
      <div className="Brand opacityIn" style={{animationDelay: '.5s'}}>
        <img src={Logo} alt="Sridhar 😎| VGS"></img>
        {/* <span role="img" aria-label="shirt">
          Y-Clothing 👕
        </span> */}
      </div>
      <div className="Items">
        <div className="wrapper">
          <ul>
            <li>
              <div
                className="NavItems fadeInUp"
                style={{animationDelay: '.4s'}}
              >
                <Icon.Home color="blue" /> Home
              </div>
            </li>
            <li>
              <div
                className="NavItems fadeInUp"
                style={{animationDelay: '.5s'}}
              >
                <Icon.CornerDownRight color="blue" /> About
              </div>
            </li>
            <li>
              <div
                className="NavItems fadeInUp"
                style={{animationDelay: '.6s'}}
              >
                <Icon.Briefcase color="blue" /> Service
              </div>
            </li>
            <li>
              <div
                className="NavItems fadeInUp"
                style={{animationDelay: '.7s'}}
              >
                <Icon.Star color="blue" /> Samples
              </div>
            </li>
            <li>
              <div
                className="NavItems fadeInUp"
                style={{animationDelay: '.8s'}}
              >
                <Icon.Send color="blue" /> Contact
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default navbar;
