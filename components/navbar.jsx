function NavBar({ setNavPanelOpen }) {
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
      <div className="loggedInStatus rightTextAlign">
        <h5>Not logged in.</h5>
        <button className="rightTextAlign">
          <h5>Log in</h5>
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
            justify-content: space-between;
            align-items: center;
          }

          .hamburgerHolder {
            margin-left: 1.5rem;
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
          }
          .loggedInStatus h5 {
            margin-bottom: 0.15rem;
            margin-top: 0rem;
            font-size: 0.75rem;
            color: rgb(255 255 255 / 0.5);
          }
          .loggedInStatus button {
            margin-top: 0rem;
            background: none;
            outline: none;
            border: none;
            min-width: 5rem;
            cursor: pointer;
          }
          .loggedInStatus button h5 {
            color: var(--main-purple-on-black);
          }
          .loggedInStatus button:active h5 {
            transform: scale(1.05) translateX(-2.5%);
          }
        `}
      </style>
    </div>
  );
}
export default NavBar;
