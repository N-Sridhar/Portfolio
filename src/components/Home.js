import React, {useEffect, useContext} from 'react';
import {useTrail, animated, config} from 'react-spring';
import {ga} from '../firebase';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {useWindowSize} from 'react-use';
import {updatePage, updatePageTime} from '../firestore';
// eslint-disable-next-line no-unused-vars
import {CountContext} from '../App';
import moment from 'moment';

// import Techie from '../icons/techie.png';
import Techie from '../icons/techie.svg';

function Home({id}) {
  const entryTime = moment();

  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 🏡';
    ga.logEvent('Home Page');
    console.log('Home Page');
  }, []);

  const {height, width} = useWindowSize();
  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});

  const [count, setCount] = useContext(CountContext);

  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(
        id,
        count + '. home page (' + entryTime.format('h:mm:ss a') + ')'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    return () => {
      const exit = moment();
      if (id !== '') {
        updatePageTime(
          entryTime,
          exit,
          id,
          count + '. home page (' + entryTime.format('h:mm:ss a') + ')'
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="Home">
        <div
          className="Home-Main"
          style={
            height > 792 && width > 768
              ? {height: '29rem'}
              : height > 754 && width > 768
              ? {height: '27rem'}
              : height > 663 && width > 768
              ? {height: '24rem'}
              : height > 625 && width > 768
              ? {height: '19rem'}
              : height < 625 && width > 768
              ? {height: '16rem'}
              : {height: '30rem'}
          }
        >
          <animated.div className="home-left" style={trail[0]}>
            <h2>
              <span role="img" aria-label="hi">
                Hi 👋🏻 myself,
              </span>
            </h2>
            <h1>
              <span>SRIDHAR</span>
            </h1>
            {/* <h2>Developer | Designer</h2> */}
            <h3>Web-App Developer</h3>
          </animated.div>
          <animated.div className="home-right" style={trail[1]}>
            {/* <h3>Home Right | {id}</h3> */}
            <img src={Techie} alt="Techie.svg" />
          </animated.div>
        </div>
        <div className="Home-Button">
          <Link to="/about">
            <div className="left fadeInUp" style={{animationDelay: '.1s'}}>
              {/* <div class="bg" />
              <div class="bg bg2" />
              <div class="bg bg3" /> */}
              <h3>A b o u t</h3>
            </div>
          </Link>
          <Link to="/skills">
            <div className="middle fadeInUp" style={{animationDelay: '.2s'}}>
              <h3>S k i l l s</h3>
            </div>
          </Link>
          <Link to="/contact">
            <div className="right fadeInUp" style={{animationDelay: '.3s'}}>
              <h3>C o n t a c t</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
