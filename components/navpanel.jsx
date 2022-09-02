import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const NavPanel = ({ isOpen, setIsOpen, currentSectionKey, setSectionKey }) => {
  const [comingSoonWarning, setComingSoonWarning] = useState(false);
  const [dummyVar, setDummyVar] = useState(false);
  const badge = useRef();

  // This prevents the nav panel opening with the warning badge visible
  useEffect(() => {
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
          transition={{ duration: 0.7, ease: [0.3, 1, 0.4, 1] }}
        >
          <div className={"panel"}>
            <div className="navHeadingContainer panelPadding">
              {" "}
              <h5 className="menuLabel lineAfter">Main Menu</h5>
            </div>
            <UserInfoSection />

            <MenuOptions>
              <MenuItem label={"Home"} sectionKey={0} />
              <MenuItem label={"About"} sectionKey={-1} />
              <MenuItem label={"Chat Room"} sectionKey={-1} />
              {/* <MenuItem label={"Account Settings"} sectionKey={-1} /> */}
            </MenuOptions>

            <WarningBadge />

            <div className={"messageContainer"}>
              <p>
                {`
Remember that ALL messages—sent and received—can be seen by anyone on the internet, and are not private. Toxic messages aren’t allowed. The security bot on duty will not hesitate to enforce this rule with a temporary ban.`}
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
          scrollbar-gutter: stable;
        }
        .panelPadding {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .panel button {
          border: none;
          outline: none;
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
          margin: 0.5rem 0rem;
          font-size: 1.125rem;
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
          width: 85%;
          width: 100%;
          margin-bottom: 1.5rem;
          border: none;
          height: 0.2rem;
          color: hsl(0, 0%, 50%);
          background: hsl(0, 0%, 50%);
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
          align-items: center;
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
          margin-bottom: 2rem;
        }

        .userInfoSectionContainer {
          margin-bottom: 1rem;
          align-self: center;
          width: calc(100% + 2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 0rem;
        }
        .userInfoSection {
          display: flex;
          flex-direction: row;
          align-items: center;
          //justify-content: space-evenly;
          justify-content: center;
          gap: 1.5rem;
          padding-left: 0rem;
          margin-top: 1rem;
        }
        .userPicHolder {
          border-radius: 5000rem 5000rem;
          background: #505050;
          //background: red;
          height: 4rem;
          width: 4rem;
          //border: 0.075rem solid white;
        }
        .userInfoTextHolder {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          align-items: stretch;
          text-align: left;
          justify-content: center;
          //flex-wrap: wrap;
          max-width: 70%;
        }
        .userInfoTextHolder p {
          margin: 0 0.05rem;
          padding: 0;
          color: rgb(255 255 255 / 0.6);
          font-size: 0.75rem;
          //font-weight: bold;
        }
        .userInfoSectionContainer p.emailText {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: rgb(255 255 255 / 0.6);
          //font-weight: bold;
          padding-left: 1rem;
          padding-right: 1rem;
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
        <div className={"bulletPoint"}></div>

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
          // Make label text gray if disabled, green if it's the active section, or white otherwise
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
          <div className="userPicHolder"></div>
          <div className="userInfoTextHolder">
            <p>Logged in as:</p>
            <p>David Douglas</p>
            {/* <p className="emailText">no valid email address</p> */}
          </div>
        </div>
        {/* <p className="emailText">No email address. Not logged in.</p> */}
        <p className="emailText">douglasdavid177@gmail.com</p>
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
