import React from "react";
import logo from "../ProjectLogo.png"; // Import the image

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          {/* Container for the logo and text */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} style={{ width: '80px', height: '60px', marginRight: '0px' }} />
            <a className="navbar-brand page-scroll" href="/">
              Ecoeats
            </a>{" "}
          </div>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/inventory" >
                Inventory
              </a>
            </li>
            <li>
              <a href="/recipes" className="page-scroll">
              Recipes
              </a>
            </li>
            {/* Dropdown menu */}
            <li className="dropdown">
  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
    Meet Our Team <span className="caret"></span>
  </a>
  <ul className="dropdown-menu team-dropdown">
    {/* Group picture */}
    <li className="team-picture">
      <img src="img/group.jpg" alt="Meet Our Team" />
    </li>
    {/* Team members */}
    <li><a href="#">Anqi Chen - Master of Business Information Systems</a></li>
    <li><a href="#">Namrata - Master of Cybersecurity</a></li>
    <li><a href="#">Rohan Singh - Master of Data Science</a></li>
    <li><a href="#">Eishi Sano - Master of Information Technology</a></li>
    <li><a href="#">Zhuyun Chen - Master of Information Technology</a></li>
    {/* Add more team members as needed */}
  </ul>
</li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
