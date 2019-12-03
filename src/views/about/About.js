import React from "react";

import HeroBackground from '../../assets/daohaus__hero--falling.png';

const About = () => 
    <div className="FullView">
        <div className="Hero" style={{ backgroundImage: 'url(' + HeroBackground + ')' }}>
            <h1>Daohaus is on a mission to lower coordination cost to ZERO.</h1>
        </div>
        <div className="View">
            <p>Content.</p>
        </div>
    </div>;

export default About;
