import React from "react";
import './HelpLinks.css'

const HelpLinks = () => {
    return (
        <div className="help-links-container">
            <div className="help-links-content">
                <div className="help-links-left">
                    <ul className="help-links-ul">
                        <li className="help-link">Help</li>
                        <li className="help-link">Shreddit Coins</li>
                        <li className="help-link">Shreddit Premium</li>
                    </ul>
                </div>
                <div className="help-links-right">
                    <ul className="help-links-ul">
                        <li className="help-link">About</li>
                        <li className="help-link">Careers</li>
                        <li className="help-link">Press</li>
                        <li className="help-link">Advertise</li>
                        <li className="help-link">Blog</li>
                        <li className="help-link">Terms</li>
                        <li className="help-link">Content Policy</li>
                        <li className="help-link">Privacy Policy</li>
                        <li className="help-link">Mod Policy</li>
                    </ul>
                </div>
            </div>
            <div className="help-links-languages">
                    <div className="help-links-language-left">
                        <li className="help-link">USA/Global</li>
                    </div>
                    <div className="help-links-language-right">
                        <li className="help-link">Deutsch</li>
                    </div>
            </div>
            <div className="help-links-footer">
                Shreddit Inc © 2022. All rights reserved
            </div>
        </div>
    )
}

export default HelpLinks
