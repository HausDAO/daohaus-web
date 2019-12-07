import React from "react";

import './Help.scss';

const  Help = () => 

    <div className="Page">
        <div className="View">
            <div className="Help">
                <div className="Sections">
                    <div className="Intro Section">
                        <h2>WTF is a Moloch?</h2>
                        <p>Content.</p>
                        <a href="https://medium.com/odyssy/moloch-primer-for-humans-9e6a4f258f78" rel="noopener noreferrer">Read on Medium</a>
                    </div>
                    <div className="Section" id="Summon">
                        <h2>Summon a Dao</h2>
                        <p>Most users should summon a dao through ‘Easy’ mode. ‘Hard’ mode is for custom implementations and is not recommended for average users.</p>
                        <h4>Data</h4>
                        <p>Provide a name & description for the dao.</p>
                        <h4>Currency</h4>
                        <p>Select a main Currency to accept as tribute. Currently wETH and DAI are available through Easy mode.</p>
                    </div>
                    <div className="Section" id="Summon">
                        <h2>Pledge to a Dao</h2>
                        <p>Most users should summon a dao through ‘Easy’ mode. ‘Hard’ mode is for custom implementations and is not recommended for average users.</p>
                        <h4>Data</h4>
                        <p>Provide a name & description for the dao.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export default Help;
