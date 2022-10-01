import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import HomeSection from "../components/homesection";
import AboutSection from "../components/aboutsection";

export default function Home(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className={"container"}>
      <div className={"content"}>
        <div className="heroimgContainer">
          <img
            className={"heroimg"}
            src="/partysvg.svg"
            alt="An SVG of people socializing"
            layout="fill"
          />
        </div>

        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            key={props.mainSectionKey}
            initial={{ translateY: 20, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: -30,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              //ease: [0.3, 1, 0.4, 1],
            }}
          >
            {componentFromKey(props.mainSectionKey)}
          </motion.div>
        </AnimatePresence>

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

        .heroimgContainer {
          align-self: center;
          height: auto;
          width: auto;
          height: 20vh;
          width: auto;
          margin-top: 4rem;
          //margin-bottom: 0.5rem;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .heroimg {
          height: 100%;
          width: auto;
          //aspect-ratio: 1;
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

  function componentFromKey(key) {
    switch (key) {
      case 0:
        return <HomeSection props={props} />;
      case 1:
        return <AboutSection props={props} />;
      default:
        return <HomeSection props={props} />;
    }
  }
}
