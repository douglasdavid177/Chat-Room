import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState("");
  return (
    <div className={"container"}>
      <div className={"content"}>
        {/* <motion.div
          initial={{ translateY: -50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            duration: 0.75,
            // ease: [0.1, 0.1, 0, 1],
          }}
        > */}
        <img
          src="/partysvg.svg"
          alt="An SVG of people socializing"
          className={"heroimg"}
        />
        {/* </motion.div> */}

        <h1>Welcome to David&apos;s Party Room!</h1>
        <motion.h4
          className={"leftMessage"}
          initial={{ translateX: -100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.1, 0.1, 0, 1] }}
        >
          ...A virtual public chatroom that updates in real-time! <br />
        </motion.h4>
        {/* <h3 className="rightTextAlign">
          Please be kind to each other ;) <br />
          This project was built with NextJS and Firebase.
        </h3> */}
        <motion.h4
          className="rightTextAlign rightMessage"
          initial={{ translateX: 100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.1, 0.1, 0, 1] }}
        >
          Please be kind to each other ;) {/* <br /> */}
          Mean messages can get you banned...
        </motion.h4>
        <div className={"buttonWrapper"}>
          <motion.div
            initial={{ translateY: 40, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.1, 0.1, 0, 1],
            }}
          >
            <button className={"primaryBtn"}>Enter chat room</button>
          </motion.div>
          <motion.div
            initial={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.25 + 0.1,
              ease: [0.1, 0.1, 0, 1],
            }}
          >
            <button> View another page</button>
          </motion.div>
        </div>

        {/* {user ? <MessageBoard /> : <PlaceholderBoard />} */}
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          padding: 0rem;
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-gutter: stable;

          /*Scrolls, with scrollbar not affecting layout*/
          /*Main content container has low padding bc padding is added to it in media queries*/
        }

        .heroimg {
          align-self: center;
          max-width: 95%;
          max-height: 28vh;
          max-height: 26vh;

          border: 3px solid white;
          border-radius: 500rem 500rem;
          margin-top: 3.5rem;
          margin-bottom: 0.5rem;
          aspect-ratio: 1/1;
        }

        h4 {
          margin: 0.75rem 0rem;
          align-self: flex-start;
        }

        .buttonWrapper {
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding-top: 1.5rem;
          align-items: flex-end;
        }

        h1 {
          margin-bottom: 1rem;
          text-align: right;
        }

        .buttonWrapper button {
          font: inherit;
          cursor: pointer;
          outline: inherit;
          background: none;
          color: white;
          width: auto;
          min-width: 10rem;
          min-width: 12rem;
          border: 3px solid white;
          border-radius: 200rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          align-self: end;
          font-weight: bold;
          padding: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 0.85rem;
          font-size: 1rem;
        }
        .buttonWrapper button.primaryBtn {
          background-color: var(--main-purple);
          border: none;
        }
        .buttonWrapper button:active {
          font-weight: 800;
        }

        /* Media queries adjust the amount of columns based on the width of the screen, to better accommodate smaller devices  */
        @media only screen and (max-width: 678px) {
          .content {
            padding-left: 7.5%;
            padding-right: 7.5%;
          }
        }
        @media only screen and (min-width: 678px) {
          .content {
            padding-left: 20%;
            padding-right: 20%;
          }
        }
        @media only screen and (min-width: 1200px) {
          .content {
            padding-left: 30%;
            padding-right: 30%;
          }
        }
      `}</style>
    </div>
  );
}
