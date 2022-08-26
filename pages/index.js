import { useState } from "react";
import styles from "../styles/homepage.module.css";

export default function Home() {
  const [user, setUser] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="/partysvg.svg"
          alt="An SVG of people socializing"
          className={styles.heroimg}
        />
        <h1 className="rightTextAlign">Welcome to David's Party Room!</h1>

        <h4 className={"leftMessage"}>
          ...A virtual public chatroom that updates in real-time! <br />
        </h4>
        {/* <h3 className="rightTextAlign">
          Please be kind to each other ;) <br />
          This project was built with NextJS and Firebase.
        </h3> */}
        <h4 className="rightTextAlign rightMessage">
          Please be kind to each other ;) {/* <br /> */}
          Mean messages can get you banned...
        </h4>
        <div className={styles.buttonWrapper}>
          <button>Enter chat room</button>
          <button className={styles.secondaryBtn}>View another page</button>
        </div>

        {/* {user ? <MessageBoard /> : <PlaceholderBoard />} */}
      </div>
      <div className={styles.hamburgerHolder}>
        <button
          className={styles.hamburger}
          onClick={() => {
            // setNavPanelOpen(!navPanelOpen);
          }}
        >
          <img src="./menu.svg"></img>
        </button>
      </div>
      {/* <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
      /> */}
    </div>
  );
}
