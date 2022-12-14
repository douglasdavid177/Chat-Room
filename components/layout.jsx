import React, { useState } from "react";
import NavBar from "./navbar";
import NavPanel from "./navpanel";

function Layout(props) {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [mainSectionKey, setMainSectionKey] = useState(0);
  const [myVal, setMyVal] = useState("David");

  const fLName = "Davido Douglaso";
  const emailAd = "douglasdavid177@gmail.com";
  const loggedIn = true;
  return (
    <div className="container">
      {
        React.cloneElement(props.children, {
          navPanelOpen,
          setNavPanelOpen,
          loggedIn,
          fLName,
          emailAd,
          mainSectionKey,
        })
        // Clone each child element so we can pass props down
      }
      <NavBar
        setNavPanelOpen={setNavPanelOpen}
        loggedIn={loggedIn}
        fLName={fLName}
        emailAd={emailAd}
      />
      <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
        loggedIn={loggedIn}
        fLName={fLName}
        emailAd={emailAd}
      />
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          position: fixed;
          left: 0;
          right: 0;
          height: 100%;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          height: 100%;
          width: 100%;
          overflow: hidden;
          scroll-behavior: smooth;
        }
        html {
          -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom */
        }

        .debugging {
          outline: 3px solid red;
        }
        body {
          background-color: black;
          color: white;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        h3 {
          color: hsl(0, 0%, 50%);
          font-size: 1.2rem;
        }
        h4 {
          color: hsl(0, 0%, 50%);
          font-size: 1rem;
        }
        h2 {
          color: hsl(0, 0%, 50%);
        }
        h1 {
          font-size: 1.75rem;
        }
        p {
          font-size: 0.75rem;
        }

        button:active {
          filter: brightness(105%);
          transform: scale(1.025);
        }
        .rightMessage {
          padding-left: 3rem;
        }
        .leftMessage {
          padding-right: 3rem;
        }
        .rightTextAlign {
          text-align: right;
        }
        .darkblur {
          background: rgb(28 28 28/0.6);
          backdrop-filter: blur(0.9rem);
        }
        .darkblurL2 {
          background: rgb(40 40 40/0.8);
        }
        .transparentBG {
          background: transparent;
        }

        /* Media queries adjust the amount of columns based on the width of the screen, to better accommodate smaller devices  */
        @media only screen and (max-width: 678px) {
          .rightMessage {
            padding-left: 3rem;
          }
          .leftMessage {
            padding-right: 3rem;
          }
        }
        @media only screen and (min-width: 678px) {
          .rightMessage {
            padding-left: 6rem;
          }
          .leftMessage {
            padding-right: 6rem;
          }
        }
        @media only screen and (min-width: 1200px) {
          .rightMessage {
            padding-left: 8rem;
          }
          .leftMessage {
            padding-right: 8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;
