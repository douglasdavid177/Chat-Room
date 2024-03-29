import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaLaptopCode,
  FaComments,
  FaHome,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
const NavPanel = ({
  isOpen,
  setIsOpen,
  currentSectionKey,
  setSectionKey,
  user,
  logInOut,
}) => {
  const [comingSoonWarning, setComingSoonWarning] = useState(false);
  //const [dummyVar, setDummyVar] = useState(false);
  const badge = useRef();

  // This prevents the nav panel opening with the warning badge visible
  useEffect(() => {
    //console.log(user);
    cancelAnim();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        // Dark tinted transparent overlay covers entire viewport and allows a user to close the nav panel by clicking anywhere outside it
        <motion.div
          className={"background"}
          key={"bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => {
            if (!isOpen) return;
            setIsOpen(false);
          }}
        ></motion.div>
      )}

      {isOpen && (
        <motion.div
          className={"panelBG darkblur"}
          onClick={(e) => {
            // Without this, clicking anywhere inside the nav panel would also register on the overlay behind it,
            // therefore closing the nav panel prematurely
            e.stopPropagation();
          }}
          key={"panel"}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: [0.3, 1, 0.4, 1] }}
        >
          <div className={"panel"}>
            <div className="navHeadingContainer panelPadding">
              {" "}
              <h5 className="menuLabel">Main Menu</h5>
              {/* <FaComments /> */}
              <hr className="headerLine" />
            </div>

            <UserInfoSection />

            <MenuOptions>
              <MenuItem label={"Home"} sectionKey={0}>
                <FaHome />
              </MenuItem>
              <MenuItem label={"About"} sectionKey={1}>
                <FaLaptopCode />
              </MenuItem>

              <MenuItem label={"Chat Room"} sectionKey={2} newPage={true}>
                <FaComments />
              </MenuItem>
              {/* <MenuItem label={"Account Settings"} sectionKey={-1} /> */}
            </MenuOptions>

            <WarningBadge />

            <div className={"messageContainer"}>
              <p>
                {`
Remember that ALL messages—sent and received—can be seen by anyone on the internet, and are not private. Profane messages aren’t allowed. The security bot on duty will not hesitate to enforce this rule with a temporary ban.`}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .background {
          background-color: rgb(0 0 0 /0.9);
          position: fixed;
          inset: 0;
          z-index: 2;
        }
        .invisibleBackground {
          background: rgb(0 0 0 / 1);
          position: fixed;
          inset: 0;
          z-index: -1;
        }
        .panelBG {
          /*The visible background of the navpanel that moves*/

          //background-color: #191919;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: min(72.5vw, 25rem);
          z-index: 10;
        }
        .panel {
          /*This element is a scrollable flexbox container held inside the panelpg, the actually holds the content*/

          height: 100%;
          width: 100%;
          text-align: left;
          padding: 1.65rem 0rem 0.75rem 0rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
          //scrollbar-gutter: stable;
        }
        .panelPadding {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .panel button {
          border: none;
          //outline: none;
          background: none;
          color: white;
          cursor: pointer;
          margin: 0;
          padding: 0;
          text-align: left;
          flex-grow: 1;
        }

        .panel .menuOptions button:active {
          transform: scale(1.025) translateX(1.25%);
        }
        .panel button:not(.disabledButton):active {
          color: var(--main-purple-on-black);
        }

        .panel .menuOptions h3 {
          padding: 0;
          margin: 0.75rem 0rem;
          font-size: 1.125rem;
          //font-size: 1.2rem;
          line-height: 1.45;
          color: white;
        }

        .panel button.disabledButton h3 {
          color: hsl(0, 0%, 50%);
          //color: white;
        }
        .panel .homeLink {
          color: var(--main-purple-on-black);
        }

        .panel h5 {
          margin: 0;
          color: hsl(0, 0%, 50%);
          font-size: 0.9rem;
        }

        .panel h4 {
          margin: 0;
          color: hsl(0, 0%, 50%);
        }
        .panel hr {
          width: 100%;
          border: none;
          height: 0.2rem;
          color: white;
          background: white;
        }

        hr.miniline {
          width: auto;
          max-width: 95%;
          margin-bottom: 1.5rem;
          margin-bottom: 2.5rem;
          //margin-bottom: 0;
          margin-top: -3.25rem;

          height: 0.1rem;
        }
        .closedPanel {
          transform: translateX(100%);
        }
        .openPanel {
          transform: translateX(0%);
        }

        .panel ul {
          list-style-type: none;
          width: 100;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: stretch;
          flex-direction: column;
        }
        .panel li {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        }

        .bulletPoint {
          height: 7.5px;
          aspect-ratio: 1;
          background-color: white;
          border-radius: 50%;
          margin: 0;
          padding: 0;
          margin-right: 1rem;
          margin-left: 0.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .iconBulletPoint {
          height: auto;
          //aspect-ratio: 1;
          background: transparent;
          margin: 0;
          padding: 0;
          margin-right: 1rem;
          margin-left: 0.5rem;
          //transform: scale(1.2);
          height: 1.125rem;
          width: 1.125rem;
          font-size: 1.125rem;
          //background: red;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateY(-1px);
        }

        .panel .messageContainer {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 1.5rem;
          padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        }

        .panel .messageContainer p {
          font-size: 0.9rem;
          color: hsl(0, 0%, 60%);
          //font-weight: bold;
        }

        .comingSoonWarning {
          display: flex;
          align-items: flex-end;
          text-align: center;
          justify-content: center;
          padding-bottom: 0.5rem;
          width: 100%;
          height: 3rem;
          position: sticky;
          bottom: 1vh;
          flex-grow: 1;
        }
        .comingSoonWarning h5 {
          margin: 0;
          background-color: var(--grapefruit);
          color: white;
          border-radius: 25rem;
          padding: 0.5rem;
          opacity: 0;
        }

        h5.setWarning {
          animation: warningAnim 1.5s ease;
        }

        .menuOptions {
          width: 100%;
          margin-top: 0rem;
          margin-bottom: 2rem;
        }

        .panel .menuOptions button.currentMenuItem h3 {
          color: var(--main-purple-on-black);
        }

        .panel .navHeadingContainer {
          text-align: left;
          margin-bottom: 0.5rem;
          width: 100%;
        }

        .userInfoSectionContainer {
          margin-bottom: 1rem;
          align-self: center;
          width: calc(100% + 2rem);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0.5rem 0.65rem;
          padding-left: 1.5rem;
        }
        .userInfoSection {
          display: flex;
          flex-direction: row;
          align-items: center;
          //justify-content: space-evenly;
          justify-content: center;
          gap: 0.85rem;
          padding-left: 0rem;
          margin-top: 1rem;
        }
        .userPicHolder {
          border-radius: 5000rem 5000rem;
          background: hsl(0, 0%, 30%);
          //background: red;
          height: 4rem;
          width: 4rem;
          //border: 0.075rem solid white;
          overflow: hidden;
        }
        .userInfoTextHolder {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
          align-items: stretch;
          text-align: left;
          justify-content: center;
          transform: translateY(-10%);

          //flex-wrap: wrap;
          max-width: 70%;
        }
        .userInfoTextHolder p {
          margin: 0 0.05rem;
          padding: 0;
          color: rgb(255 255 255 / 0.99);
          color: hsl(0, 0%, 100%);
          font-size: 0.75rem;
          //font-weight: bold;
        }
        .userInfoSectionContainer p.emailText {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: rgb(255 255 255 / 0.99);
          color: hsl(0, 0%, 100%);
          //font-weight: bold;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .userInfoSectionContainer .label {
          color: rgb(255 255 255 / 0.6);
          color: hsl(0, 0%, 60%);
          //text-align: center;
        }
        .panel h5.menuLabel {
          color: white;
          position: relative;
          display: inline;
          margin-left: 0.5rem;
          font-size: 1rem;
        }
        .panel h5.lineAfter::after {
          content: "";
          position: absolute;
          left: 0;
          right: -0rem;
          bottom: -0.5rem;
          height: 0.1rem;
          background: white;
        }

        .panel button.linkButton {
          background: none;
          border: none;
          color: var(--main-purple-on-black);
          font-weight: bold;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-top: 0.2rem;
        }

        @keyframes warningAnim {
          0% {
            opacity: 0;
            transform: translateY(0px);
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-15px);
          }
        }
      `}</style>
    </AnimatePresence>
  );
  function MenuItem(props) {
    const disabled = props.sectionKey == -1;
    return (
      <li>
        {/* <div className={"bulletPoint"}></div> */}
        <div className={"iconBulletPoint"}>{props.children}</div>

        <button
          onClick={() => {
            if (props.sectionKey == -1) {
              // Trigger warning badge animation
              ResetAnim();
              return;
            }
            setSectionKey(props.sectionKey);
            setIsOpen(false);
          }}
          // Make label text gray if disabled, purple if it's the active section, or white otherwise
          className={`${disabled ? "disabledButton" : ""} ${
            props.sectionKey == currentSectionKey ? "currentMenuItem" : ""
          }`}
        >
          <h3>{props.label}</h3>
        </button>
      </li>
    );
  }

  function WarningBadge() {
    return (
      <div className={"comingSoonWarning"}>
        <h5
          ref={badge}
          // Apply css class with animation if variable is true, and then remove that class when the animation is complete
          className={comingSoonWarning ? "setWarning" : ""}
          onAnimationEnd={() => {
            setComingSoonWarning(false);
          }}
        >
          Coming soon!
        </h5>
      </div>
    );
  }

  function MenuOptions(props) {
    return (
      <div className={"menuOptions panelPadding"}>
        {/* <div className="navHeadingContainer">
          <hr align="right" className="miniline" />
          <h5>{props.label}</h5>
          <hr align="left" className="miniline" />
        </div> */}

        {/* <hr align="center" className="miniline" /> */}
        <ul>{props.children}</ul>
      </div>
    );
  }
  function UserInfoSection() {
    return (
      <div className="userInfoSectionContainer darkblurL2">
        <div className="userInfoSection">
          <div className="userPicHolder">
            {user && (
              <img
                src={user.photoURL}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5000rem 5000rem",
                }}
                alt="profile pic"
              />
            )}
          </div>
          <div className="userInfoTextHolder">
            {/* {!loggedIn && <p className="label">Not logged in.</p>} */}

            <p className="label">
              {" "}
              {/* {loggedIn ? "Logged in as:" : "Not logged in."} */}
              {user ? "Display name:" : "Not logged in."}
            </p>
            <p>
              {user ? (
                <span>{user.displayName}</span>
              ) : (
                <button className="linkButton" onClick={logInOut}>
                  Log in
                </button>
              )}
            </p>
            {/* {loggedIn && <button className="linkButton">Edit</button>} */}
            {user && <p className="label">Sending allowed</p>}
          </div>
        </div>
        {/* <p className="emailText">No email address. Not logged in.</p> */}

        <p className="emailText">
          {user && (
            <span className="label">
              Profile email address:
              <br />
            </span>
          )}
          {user ? (
            user.email
          ) : (
            <span className="label">
              You must be logged in to send messages
            </span>
          )}
        </p>
      </div>
    );
  }
  function ResetAnim() {
    cancelAnim();
    setTimeout(() => {
      setComingSoonWarning(true);
    }, 10);
  }
  function cancelAnim() {
    if (!badge.current) {
      return;
    }
    if (!comingSoonWarning) return;

    badge.current.classList.remove(".setWarning");
    badge.current.style.animation = "";
    setComingSoonWarning(false);
  }
};

export default NavPanel;
