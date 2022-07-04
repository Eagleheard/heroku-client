import React from 'react';
import { NavLink } from 'react-router-dom';

import firstGamepad from 'assets/gamepad1.jpg';
import secondGamepad from 'assets/gamepad2.jpg';
import mail from 'assets/mail.png';
import insta from 'assets/insta.png';
import phone from 'assets/phone.png';

import './style.scss';

export const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__main-description">
          <div className="about__main-description-text">
            <h1>Who we are?</h1>
            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
              eveniet, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores
              et quas molestias excepturi sint, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat! At vero eos et accusamus et
              iusto odio dignissimos ducimus, quia voluptas sit, aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque
              porro quisquam est, nisi ut aliquid ex ea commodi consequatur!
            </p>
          </div>
          <img alt="first gamepad" src={firstGamepad} className="about__first-gamepad" />
        </div>
        <div className="about__additional-description">
          <img alt="second gamepad" src={secondGamepad} className="about__second-gamepad" />
          <div className="about__additional-description-text">
            <h1>What we offer</h1>
            <p>
              Computer game is an electronic game that involves interaction with a user interface or
              input device – such as a joystick, controller, keyboard, or motion sensing device – to
              generate visual feedback. This feedback mostly commonly is shown on a video display
              device, such as a TV set, monitor, touchscreen, or virtual reality headset.
            </p>
            <div className="about__link-container">
              <p>If you want to buy diffrent games - visit our</p>
              <NavLink to="/store" className="about__link">
                Store
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          <h3 className="about__contact"> Contact Us</h3>
          <img className="about__contact--link" src={mail} alt="mail" />
          <img className="about__contact--link" src={phone} alt="phone" />
          <img className="about__contact--link" src={insta} alt="instagram" />
        </div>
      </div>
    </div>
  );
};
