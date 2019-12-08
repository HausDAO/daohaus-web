import React from "react";

import HeroBackground from '../../assets/daohaus__hero--rando.jpg';

const About = () => 
    <div className="FullView">
        <div className="Hero" style={{ backgroundImage: 'url(' + HeroBackground + ')' }}>
            <div className="Contents">
                <h1>Daohaus is on a mission to lower coordination cost to ZERO.</h1>
            </div>
        </div>
        <div className="View">
            <h2>History</h2>
            <p>Content.</p>
        </div>
    </div>;

export default About;
