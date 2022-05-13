import React from "react";
import './HelpLinks.css'

const HelpLinks = () => {
    return (
        <div className="help-links-container">
            <div className="help-links-content">
                <div className="help-links-left">
                    <ul className="help-links-ul">
                        <li>Help</li>
                        <li>Shreddit Coins</li>
                        <li>Shreddit Premium</li>
                    </ul>
                </div>
                <div className="help-links-right">
                    <ul className="help-links-ul">
                        <li>About</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Advertise</li>
                        <li>Blog</li>
                        <li>Terms</li>
                        <li>Content Policy</li>
                        <li>Privacy Policy</li>
                        <li>Mod Policy</li>
                    </ul>
                </div>
            </div>
            <div className="help-links-footer">
                Shreddit Inc © 2022. All rights reserved
            </div>
        </div>
    )
}

export default HelpLinks
