import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconRocket from '../../../assets/Icon__Network--xDAI.png';
import { CloseOutlined } from '@ant-design/icons';

import './NotificationBar.scss';

const NotificationBar = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleBar = () => setIsHidden(!isHidden);

  const barClass = isHidden ? 'NotificationBar IsHidden' : 'NotificationBar';

  return (
    <div className={barClass}>
      <div className="Row Contain">
        <button className="Simple" onClick={toggleBar}>
          <CloseOutlined />
        </button>
        <img src={iconRocket} alt="rocket" />
        <p>
          <strong>DAOhaus is now available on the xDAI network!</strong>
          <br />
          Transaction fees got you down? Check our guide on how to switch to
          xDAI for cheaper, faster interactions.
        </p>
        <Link className="Button Secondary" to="/help#xDAI">
          Quick Guide
        </Link>
      </div>
    </div>
  );
};

export default NotificationBar;
