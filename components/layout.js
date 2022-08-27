function Layout(props) {
  return (
    <div className="container">
      {props.children}
      <div className={"hamburgerHolder"}>
        <button
          className={"hamburger"}
          onClick={() => {
            // setNavPanelOpen(!navPanelOpen);
          }}
        >
          <img src="./menu.svg"></img>
        </button>
        {/* <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
      /> */}
      </div>
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
        .hamburgerHolder {
          position: fixed;
          top: 0.75rem;
          left: 0.75rem;
          width: 2rem;
        }
        button.hamburger {
          width: 1.85rem;
          aspect-ratio: 1;
          background: none;
          border: none;
          outline: none;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        button.hamburger img {
          height: 100%;
          width: 100%;
          backdrop-filter: blur(0.1rem);
          border-radius: 0.2rem;
        }
      `}</style>
      <style jsx global>{`
        :root {
          --main-purple: #6400a0;
        }

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
          font-size: 1.15rem;
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
        .rightMessage {
          padding-left: 3rem;
        }
        .leftMessage {
          padding-right: 3rem;
        }
        .rightTextAlign {
          text-align: right;
          align-self: flex-end;
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
