import React, { useEffect, useRef, useState } from "react";
import NavBar from "./navbar";
import NavPanel from "./navpanel";
import ChatInputBar from "./chatinputbar";
import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import HomeSection from "../pages/index";
import AboutSection from "../pages/aboutsection";
import ChatRoomSection from "../pages/chatroomsection";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF_MuJZupudZGDBKcodfq4Mj8Bi3MmGaY",
  authDomain: "davids-party-room.firebaseapp.com",
  projectId: "davids-party-room",
  storageBucket: "davids-party-room.appspot.com",
  messagingSenderId: "650211449081",
  appId: "1:650211449081:web:b2c164c8c2c3fae8782a28",
  measurementId: "G-BD22FSMDY5",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function Layout(props) {
  const router = useRouter();

  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [mainSectionKey, setMainSectionKey] = useState(0);
  const [actualMainSectionKey, setActualMainSectionKey] = useState(0);
  //const [myVal, setMyVal] = useState("David");
  const [showHeroImg, setShowHeroImg] = useState(true);
  const [scrollDownBtn, setScrollDownBtn] = useState(false);

  const [fLName, setFLName] = useState("Davido Douglaso");
  const [emailAd, setEmailAd] = useState("douglasdavid177@gmail.com");
  const [loggedIn, setLoggedIn] = useState(false);

  const [user] = useAuthState(auth);

  const scrollContainer = useRef(null);

  const standardTransDur = 0.35;

  useEffect(() => {
    setMainSectionKey(numberFromRoute(router.asPath));
    setActualMainSectionKey(numberFromRoute(router.asPath));
  }, []);
  useEffect(() => {
    setMainSectionKey(numberFromRoute(router.asPath));
    if (actualMainSectionKey != 2) {
      scrollContainer.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setTimeout(() => {
        scrollContainer.current?.scrollTo({
          top: 0,
          //behavior: "smooth",
        });
      }, standardTransDur * 800);
    }
    setActualMainSectionKey(numberFromRoute(router.asPath));
    // checkAndSetHeroImg();
  }, [router.asPath]);
  useEffect(() => {
    if (mainSectionKey != actualMainSectionKey) {
      // console.log("why");
      // console.log(
      //   mainSectionKey +
      //     " " +
      //     actualMainSectionKey +
      //     " " +
      //     numberFromRoute(router.asPath)
      // );
      changeKey(mainSectionKey);
    }
  }, [mainSectionKey]);

  function changeKey(key) {
    let route = "";
    switch (key) {
      case 0:
        route = "/";
        break;
      case 1:
        route = "/aboutsection";
        break;
      case 2:
        route = "/chatroomsection";
        break;
      default:
        route = "/";
    }

    router.push(route);
    //setActualMainSectionKey(mainSectionKey);
    checkAndSetHeroImg();
  }

  // const fLName = "Davido Douglaso";
  // const emailAd = "douglasdavid177@gmail.com";
  // const loggedIn = true;

  return (
    <div className={"container"}>
      <div className={"content"} ref={scrollContainer}>
        {/* <motion.div initial={{ height: "auto" }} animate={{ height: "30vh" }}> */}
        <AnimatePresence>
          {showHeroImg && numberFromRoute(router.asPath) < 2 && (
            <motion.div
              key={"headerImage"}
              initial={{
                scale: 0.975,
                y: -3,
                opacity: 0.0,
              }}
              animate={{
                scale: 1,
                y: 0,

                opacity: 1,
                transition: {
                  duration: standardTransDur + 0,
                },
              }}
              exit={{
                scale: 1,
                y: -30,

                opacity: 0,
              }}
              transition={{ duration: standardTransDur }}
            >
              <div className="heroimgContainer">
                <img
                  className={"heroimg"}
                  src="/partysvg.svg"
                  alt="An SVG of people socializing"
                  layout="fill"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* </motion.div> */}

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            checkAndSetHeroImg();
          }}
        >
          <motion.div
            key={router.asPath}
            initial={{ translateY: 20, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              transition: {
                duration:
                  numberFromRoute(router.asPath) != 2 ? standardTransDur : 0, // Don't fade in chatroom page bc its blank on load anyway, minus the loading text
              },
            }}
            exit={{
              translateY: -30,
              opacity: 0,
            }}
            transition={{
              duration: standardTransDur,
              //ease: [0.3, 1, 0.4, 1],
            }}
          >
            {/* {componentFromKey(mainSectionKey)} */}
            {React.cloneElement(props.children, {
              firestore,
              setNavPanelOpen,
              scrollContainer,
              scrollDownBtn,
              setScrollDownBtn,
              setMainSectionKey, //mainly for action button on home screen
              user, // for chatroom to know which color to make bubbles
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <ChatInputBar
        visible={numberFromRoute(router.asPath) == 2}
        standardTransDur={standardTransDur}
        scrollDownBtn={scrollDownBtn}
        setScrollDownBtn={setScrollDownBtn}
        scrollContainer={scrollContainer}
        //loggedIn={loggedIn}
        user={user}
        logInOut={logInOut}
      />
      <NavBar
        setNavPanelOpen={setNavPanelOpen}
        //loggedIn={loggedIn}
        user={user}
        fLName={fLName}
        emailAd={emailAd}
        mainSectionKey={mainSectionKey}
        auth={auth}
        logInOut={logInOut}
      />
      <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
        //loggedIn={loggedIn}
        user={user}
        fLName={fLName}
        emailAd={emailAd}
        logInOut={logInOut}
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

        .content {
          display: flex;
          flex-direction: column;
          align-items: stretch;
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
          display: flex;
          justify-content: center;
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
  function componentFromKey(key) {
    switch (key) {
      case 0:
        return <HomeSection {...{ setNavPanelOpen }} />;

      case 1:
        return <AboutSection {...{ setNavPanelOpen }} />;
      case 2:
        return <ChatRoomSection props={props} />;
      default:
        return <HomeSection {...{ setNavPanelOpen }} />;
    }
  }
  function numberFromRoute(path = router.asPath) {
    let num = 0;
    switch (path) {
      case `/`:
        num = 0;
        break;
      case `/aboutsection`:
        num = 1;
        break;
      case `/chatroomsection`:
        num = 2;
        break;

      default:
        num = 0;
        break;
    }
    return num;
  }
  function checkAndSetHeroImg() {
    if (numberFromRoute(router.asPath) < 2) {
      setShowHeroImg(true);
      return;
    }
    setShowHeroImg(false);
  }
  function checkShowHeroImg() {
    if (numberFromRoute(router.asPath) < 2) {
      return true;
    }
    return false;
  }
  function logInOut() {
    if (user) {
      auth.signOut();
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  }
}

export default Layout;
