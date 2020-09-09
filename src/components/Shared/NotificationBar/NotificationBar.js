import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconRocket from '../../../assets/Icon__Network--xDAI.png';
import {
  CloseOutlined,
  ArrowRightOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

import './NotificationBar.scss';

const NotificationBar = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const toggleBar = () => setIsHidden(!isHidden);
  const barClass = isHidden ? 'NotificationBar IsHidden' : 'NotificationBar';

  return (
    <>
      {location.pathname === '/' ? (
        <div className={barClass}>
          {console.log(location)}
          <div className="Row">
            <img src={iconRocket} alt="rocket" />
            <p>
              <strong>DAOhaus is now available on the xDAI network!</strong>
              <br />
              Transaction fees got you down? Check our guide on how to switch to
              xDAI for cheaper, faster interactions.
            </p>
            <div className="Actions">
              <Link className="Button Secondary" to="/help#xDAI">
                <OrderedListOutlined style={{ marginRight: '5px' }} /> Quick
                Guide
              </Link>
              {window.location.href.indexOf('xdai.daohaus.club') <= -1 ? (
                <a
                  className="Button Outlined Secondary"
                  href="https://xdai.daohaus.club/"
                >
                  Go to xDAI{' '}
                  <ArrowRightOutlined style={{ marginLeft: '5px' }} />
                </a>
              ) : null}

              <button className="Simple" onClick={toggleBar}>
                <CloseOutlined />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NotificationBar;
