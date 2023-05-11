function NavBar({ setNavPanelOpen, loggedIn, fLName, mainSectionKey }) {
  return (
    <div className="navbar darkblur transparentBG">
      <div className={"hamburgerHolder"}>
        <button
          className={"hamburger"}
          onClick={() => {
            setNavPanelOpen(true);
          }}
        >
          <img src="./menu.svg"></img>
        </button>
      </div>
      {mainSectionKey == 2 && <h4 className="centered">Chat Room</h4>}
      <div className="loggedInStatus rightTextAlign">
        <p>{loggedIn ? fLName : "Not logged in."}</p>
        <button className="rightTextAlign">
          <p>{loggedIn ? "Log out" : "Log in"}</p>
          {/* <p>{loggedIn ? "View profile" : "Log in"}</p> */}
        </button>
      </div>
      <style jsx>
        {`
          .navbar {
            //background: #171717;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 4rem;
            padding-top: 0rem;
            display: flex;
            flex-direction: row;
            width: 100%;
            //justify-content: space-between;
            align-items: center;
          }

          .hamburgerHolder {
            margin-left: 1.5rem;
            margin-right: 1rem;
            width: 2rem;
          }
          button.hamburger {
            width: 2rem;
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

          .loggedInStatus {
            width: 10rem;
            margin-top: 0rem;
            margin-right: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            flex-grow: 1;
          }
          .loggedInStatus p {
            margin-bottom: 0.15rem;
            margin-top: 0rem;
            font-size: 0.75rem;
            color: hsl(0, 0%, 55%);
            //font-weight: bold;
          }
          .loggedInStatus button {
            margin-top: 0rem;
            background: none;
            outline: none;
            border: none;
            min-width: 5rem;
            cursor: pointer;
            font-weight: bold;
          }
          .loggedInStatus button p {
            color: var(--main-purple-on-black);
          }
          .loggedInStatus button:active h5 {
            transform: translateX(-1.25%);
          }
          .centered {
            justify-self: start;
          }
        `}
      </style>
    </div>
  );
}
export default NavBar;
