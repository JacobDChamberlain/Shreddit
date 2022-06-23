import React from "react";
import './HelpLinks.css'

const HelpLinks = () => {
    return (
        <div className="help-links-container">
            <div className="help-links-content">
                <div className="help-links-left">
                    <ul className="help-links-ul">
                        <li className="help-link">Other Projects:</li>
                        <li className="help-link"><a className="help-a" href="https://flixtagram.herokuapp.com">Flixtagram</a></li>
                        <li className="help-link"><a className="help-a" href="https://rememberthemilk-solo-fork.herokuapp.com">MemberTheMilk</a></li>
                    </ul>
                </div>
                <div className="help-links-right">
                    <ul className="help-links-ul">
                        <li className="help-link">About</li>
                        <li className="help-link"><a className="help-a" href="https://jacobdchamberlain.github.io/">Portfolio</a></li>
                        <li className="help-link"><a className="help-a" href="https://open.spotify.com/artist/0CP5nqR6lT3g3StExsINGG">Press</a></li>
                        <li className="help-link"><a className="help-a" href="mailto: JacobDChamberlain@gmail.com">Email</a></li>
                        <li className="help-link"><a className="help-a" href="tel:214-772-4221">Mobile</a></li>
                        <li className="help-link">Terms</li>
                        <li className="help-link">Content Policy</li>
                        <li className="help-link">Privacy Policy</li>
                        <li className="help-link">Mod Policy</li>
                    </ul>
                </div>
            </div>
            <div className="help-links-languages">
                {/* <div className="help-links-language-left">
                    <li className="help-link">USA/Global</li>
                </div>
                <div className="help-links-language-right">
                    <li className="help-link">Deutsch</li>
                </div> */}
            </div>
            <div className="help-links-footer">
                Jacob D. Chamberlain 2022
            </div>
        </div>
    )
}

export default HelpLinks
