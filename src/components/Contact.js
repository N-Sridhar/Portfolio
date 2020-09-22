import Phone from '../icons/phone.svg';
import Gmail from '../icons/gmail.svg';
import Whatsapp from '../icons/whatsapp.svg';
import Facebook from '../icons/facebook.svg';
import Instagram from '../icons/insta.svg';
import Twitter from '../icons/twitter.svg';
import Snapchat from '../icons/snapchat.svg';
import LinkedIn from '../icons/linkedin.svg';
import GitHub from '../icons/github.svg';
import Dribbble from '../icons/dribble.svg';
import Discord from '../icons/discord.svg';
import Thanks from '../icons/thanks.png';
import React, {useEffect, useState, useContext} from 'react';
import {useTrail, animated, config} from 'react-spring';
import ReactTooltip from 'react-tooltip';
import {ga} from '../firebase';
import Navbar from './Navbar';
import {updatePage, checkedUpdation, updatePageTime} from '../firestore';
import {CountContext} from '../App';
import moment from 'moment';
function Contact({id}) {
  const entryTime = moment();
  const [visited, setVisited] = useState(null);
  useEffect(() => {
    document.title = 'Sridhar Nallasamy 😊 • 📲';
    ga.logEvent('Contact Page');
    window.scrollTo(0, 0);
  }, []);
  const [count, setCount, visitOrder, setVisitOrder] = useContext(CountContext);
  useEffect(() => {
    if (id !== '') {
      setCount((prevCount) => prevCount + 1);
      updatePage(
        id,
        count + '. Contact (' + entryTime.format('h:mm:ss a') + ')'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (visited !== null) {
      ga.logEvent(visited);
      setVisitOrder((prevCount) => prevCount + 1);
      checkedUpdation(
        id,
        visitOrder + '. ' + visited + ' (' + moment().format('h:mm:ss a') + ')'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visited, id]);
  useEffect(() => {
    return () => {
      const exitTime = moment();
      if (id !== '') {
        updatePageTime(
          entryTime,
          exitTime,
          id,
          count + '. Contact (' + entryTime.format('h:mm:ss a') + ')'
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});
  const icons = [
    {
      name: Phone,
      alt: 'Phone',
      href: 'tel:+91 9600208181',
      tooltip: 'Call:<br/>+91 9600208181',
      borderColor: 'green',
    },
    {
      name: Gmail,
      alt: 'Gmail',
      href: 'mailto:nsridharbtech@gmail.com',
      tooltip: 'Mail:<br/>nsridharbtech@gmail.com',
      borderColor: '#b23121',
    },
    {
      name: LinkedIn,
      alt: 'Linkedin',
      href: 'https://www.linkedin.com/in/sridhar-nallasamy-781564160',
      tooltip: 'LinkedIn:<br/>Sridhar Nallasamy',
      borderColor: '#0e76a8',
    },
    {
      name: GitHub,
      alt: 'Github',
      href: 'https://github.com/N-Sridhar',
      tooltip: 'GitHub:<br/>N-Sridhar',
      borderColor: 'white',
    },
    {
      name: Whatsapp,
      alt: 'Whatsapp',
      href: 'https://wa.me/919600208181?text=Hi%20Sridhar,%20',
      tooltip: 'Whatsapp:<br/>96002 08181',
      borderColor: '#25d366',
    },
    {
      name: Instagram,
      alt: 'Instagram',
      href: 'https://www.instagram.com/sridhar.n3',
      tooltip: 'Instagram:<br/>Sridhar',
      borderColor: '#dd2a7b',
    },
    {
      name: Facebook,
      alt: 'Facebook',
      href: 'https://www.facebook.com/sri.luzifer',
      tooltip: 'Facebook:<br/>Sridhar',
      borderColor: '#3b5998',
    },
    {
      name: Twitter,
      alt: 'Twitter',
      href: 'https://twitter.com/Sri_Luzifer',
      tooltip: 'Twitter:<br/>Sridhar Nallsamy',
      borderColor: '#00acee',
    },
    {
      name: Snapchat,
      alt: 'Snapchat',
      href: 'https://www.snapchat.com/add/n.sridhar3',
      tooltip: 'Snapchat:<br/>n.sridhar3',
      borderColor: '#fffc00',
    },
    {
      name: Dribbble,
      alt: 'Dribbble',
      href: 'https://dribbble.com/SriLuzifer',
      tooltip: 'Dribbble:<br/>Sridhar Nallasamy',
      borderColor: '#ea4c89',
    },
    {
      name: Discord,
      alt: 'Discord',
      href: 'https://discord.com/channels/CM%E4%B9%88SriLuzifer#0791',
      tooltip: 'Discord:<br/>CM么SriLuzifer',
      borderColor: '#7289da',
    },
  ];
  return (
    <>
      <Navbar show="yes" />
      <div className="Contact">
        <animated.div className="Text" style={trail[0]}>
          <h2>
            Need a hand?
            <br />
            Reach me by your convenient medium.
          </h2>
        </animated.div>
        <animated.div className="Icons" style={trail[1]}>
          {icons.map((icon, i) => (
            <a
              href={icon.href}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              <animated.img
                src={icon.name}
                alt={icon.alt}
                data-tip={icon.tooltip}
                data-border-color={icon.borderColor}
                onClick={() => setVisited(`${icon.alt}`)}
              />
              <ReactTooltip place="bottom" multiline={true} border={true} />
            </a>
          ))}
        </animated.div>
      </div>
      <div className="Thanks opacityIn" style={{animationDelay: '.25s'}}>
        <img src={Thanks} alt="Thanks" />
      </div>
    </>
  );
}
export default Contact;
