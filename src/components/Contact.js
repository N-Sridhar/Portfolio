import Phone from '../contact icons/phone.svg';
import Gmail from '../contact icons/gmail.svg';
import Whatsapp from '../contact icons/whatsapp.svg';
import Facebook from '../contact icons/facebook.svg';
import Instagram from '../contact icons/insta.svg';
import Twitter from '../contact icons/twitter.svg';
import Snapchat from '../contact icons/snapchat.svg';
import LinkedIn from '../contact icons/linkedin.svg';
import GitHub from '../contact icons/github.svg';
import Discord from '../contact icons/discord.svg';
import Freelancer from '../contact icons/freelancer.svg';

import React from 'react';
import {useTrail, animated, config} from 'react-spring';
import ReactTooltip from 'react-tooltip';

function Contact() {
  const [trail, set] = useTrail(2, () => ({
    transform: 'translate3d(0, 30px, 0)',
    opacity: 0,
    config: config.wobbly,
  }));
  set({transform: 'translate3d(0, 0px, 0)', opacity: 1});

  const icons = [
    {
      name: Phone,
      alt: 'phone',
      href: 'tel:+91 9600208181',
      tooltip: 'Call:<br/>+91 9600208181',
      borderColor: 'green',
    },
    {
      name: Gmail,
      alt: 'gmail',
      href: 'mailto:nsridharbtech@gmail.com',
      tooltip: 'Mail:<br/>nsridharbtech@gmail.com',
      borderColor: '#b23121',
    },
    {
      name: Whatsapp,
      alt: 'whatsapp',
      href: 'https://wa.me/919600208181?text=Hi%20Sridhar,%20',
      tooltip: 'Whatsapp:<br/>96002 08181',
      borderColor: '#25d366',
    },
    {
      name: Facebook,
      alt: 'facebook',
      href: 'https://www.facebook.com/sri.luzifer',
      tooltip: 'Facebook:<br/>Sridhar',
      borderColor: '#3b5998',
    },
    {
      name: Instagram,
      alt: 'instagram',
      href: 'https://www.instagram.com/sridhar.n3',
      tooltip: 'Instagram:<br/>Sridhar',
      borderColor: '#dd2a7b',
    },
    {
      name: Twitter,
      alt: 'twitter',
      href: 'https://twitter.com/Sri_Luzifer',
      tooltip: 'Twitter:<br/>Sridhar Nallsamy',
      borderColor: '#00acee',
    },
    {
      name: Snapchat,
      alt: 'snapchat',
      href: 'https://www.snapchat.com/add/n.sridhar3',
      tooltip: 'Snapchat:<br/>n.sridhar3',
      borderColor: '#fffc00',
    },
    {
      name: LinkedIn,
      alt: 'linkedin',
      href: 'https://www.linkedin.com/in/sridhar-nallasamy-781564160',
      tooltip: 'LinkedIn:<br/>Sridhar Nallasamy',
      borderColor: '#0e76a8',
    },
    {
      name: GitHub,
      alt: 'github',
      href: 'https://github.com/N-Sridhar',
      tooltip: 'GitHub:<br/>N-Sridhar',
      borderColor: 'white',
    },
    {
      name: Discord,
      alt: 'discord',
      href: 'https://discord.com/channels/CM%E4%B9%88SriLuzifer#0791',
      tooltip: 'Discord:<br/>CM么SriLuzifer',
      borderColor: '#7289da',
    },
    {
      name: Freelancer,
      alt: 'freelancer',
      href: 'https://www.freelancer.in/u/SridharNallasamy',
      tooltip: 'Freelancer:<br/>@SridharNallasamy',
      borderColor: '#29b2fe',
    },
  ];
  return (
    <div className="Contact">
      <animated.div className="Text" style={trail[0]}>
        <h1>Want to know more about me.</h1>
        <h3>Then please feel free to reach me.</h3>
      </animated.div>
      <animated.div className="Icons" style={trail[1]}>
        {icons.map((icon, i) => (
          <a href={icon.href} key={i} target="_blank" rel="noopener noreferrer">
            <animated.img
              src={icon.name}
              alt={icon.alt}
              data-tip={icon.tooltip}
              data-border-color={icon.borderColor}
            />
            <ReactTooltip place="bottom" multiline={true} border={true} />
          </a>
        ))}
      </animated.div>
    </div>
  );
}

export default Contact;
