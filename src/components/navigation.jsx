import React from "react";

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
          <a className="navbar-brand page-scroll" href="/">
            Ecoeats
          </a>{" "}
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
            <li>
              <a href="/information" className="page-scroll">
              Information
              </a>
            </li>
            <li>
              <a href="/Recycling" className="page-scroll">
              Recycling Agencies
              </a>
            </li>
            <li>
              <a href="/Knowledge" className="page-scroll">
              Check My Knowledge
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
