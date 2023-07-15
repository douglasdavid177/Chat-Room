import { AnimatePresence, motion } from "framer-motion";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import Router from "next/router";

function ChatInputBar({
  visible,
  standardTransDur,
  //scrollDownBtn,
  setScrollDownBtn,
  setScrollDownBtnPointedDown,
  scrollContainer,
  scrollHeight,
  setInputBarHeightPx,
  textBoxRef,
  firestore,
  loggedIn,
  user,
  logInOut,
}) {
  const [targRot, setTargRot] = useState(90);
  const [currentDraft, setCurrentDraft] = useState("");
  const [textAreaHeightPx, setTextAreaHeightPx] = useState(32);
  const textArea = useRef(null);
  const messagesRef = firestore.collection("messages");

  const checkRotateArrow = useCallback(() => {
    if (
      scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop -
        scrollContainer.current?.clientHeight <
      2
    ) {
      setTargRot(270);
      setScrollDownBtnPointedDown(false);
    } else {
      setTargRot(359.5);
      setScrollDownBtnPointedDown(true);
    }
  }, []);

  useEffect(() => {
    checkRotateArrow();
  }, [scrollHeight]);

  useEffect(() => {
    setCurrentDraft("");
    adjustTextAreaHeight();

    const cont = scrollContainer?.current;
    if (cont == undefined || cont == null) return;
    console.log("cont:");
    console.log(cont);

    //checkRotateArrow();

    if (visible) {
      cont.addEventListener("scroll", checkRotateArrow);
      window.addEventListener("resize", checkRotateArrow);
      //window.addEventListener("orientationchange", checkRotateArrow);
    } else {
      cont.removeEventListener("scroll", checkRotateArrow);
      window.removeEventListener("resize", checkRotateArrow);
      //window.removeEventListener("orientationchange", checkRotateArrow);
    }
  }, [visible, scrollContainer.current]);

  useEffect(() => {
    adjustTextAreaHeight(currentDraft.length > 0);
  }, [currentDraft]);

  const bgStyles = {
    //Framer Motion divs don't work with styled jsx classes
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: `${textAreaHeightPx + 24}px`,
    width: "100%",
  };
  const scrollBtnStyles = {
    position: "fixed",
    left: "1.2rem",
    right: 0,
    bottom: `${textAreaHeightPx + 13}px`,
  };
  return (
    <div>
      <AnimatePresence mode="wait">
        {visible &&
          (user ? (
            <motion.div
              style={bgStyles}
              className="darkblur" // barBG has to be applied as direct styes for some reason
              key={"barBGLoggedIn"}
              initial={{
                y: "101%",
              }}
              animate={{
                // scale: 1,
                y: "0%",

                // opacity: 1,
                transition: {
                  duration: standardTransDur,
                  //delay: standardTransDur,
                },
              }}
              exit={{
                //scale: 1,
                y: "100%",

                //opacity: 0,
              }}
              transition={{ duration: standardTransDur * 1 }}
            >
              <div className="inputGroup">
                <textarea
                  ref={textBoxRef}
                  className="textInput darkblurL2"
                  value={currentDraft}
                  onChange={handleInputDraft}
                  onBlur={validateInputDraft}
                  onFocus={async () => {
                    await setScrollDownBtnPointedDown(true);
                    await setScrollDownBtn(true);
                    adjustTextAreaHeight();
                  }}
                ></textarea>
                <button
                  className="sendButton"
                  onClick={async () => {
                    if (currentDraft == "") return;
                    await messagesRef.add({
                      text: currentDraft,
                      createdAt: serverTimestamp(),
                      uid: user.uid,
                      photoUrl: user.photoURL,
                      displayName: user.displayName,
                    });
                    setCurrentDraft("");

                    //adjustTextAreaHeight();
                  }}
                >
                  S
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              style={bgStyles}
              className="darkblur" // barBG has to be applied as direct styes for some reason
              key={"barBGNotLoggedIn"}
              initial={{
                y: "101%",
              }}
              animate={{
                // scale: 1,
                y: "0%",

                // opacity: 1,
                transition: {
                  duration: standardTransDur,
                  //delay: standardTransDur,
                },
              }}
              exit={{
                //scale: 1,
                y: "100%",

                //opacity: 0,
              }}
              transition={{ duration: standardTransDur * 1 }}
            >
              <div className="inputGroup">
                <p>
                  You must be logged in to send messages.{" "}
                  <button className="loginBtn" onClick={logInOut}>
                    Log In
                  </button>
                </p>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {visible && (
        <motion.div
          style={scrollBtnStyles}
          key={"scrollDownButton"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 0.225 } }}
        >
          <button
            className="scrollButton"
            onClick={async () => {
              await setScrollDownBtn(true);
              checkRotateArrow();
            }}
          >
            <motion.div
              initial={{ rotate: targRot }}
              animate={{ rotate: targRot }}
              key={"arrowIcon"}
            >
              <FaArrowDown style={{ color: "#7d10bc" }} />
            </motion.div>
          </button>
        </motion.div>
      )}

      <style jsx>{`
         {
          /* .barBG {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 5rem;
          width: 100%;
        } */
        }
        .inputGroup {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-around;
          padding: 0 0.5rem;
        }
        .textInput {
          background-color: rgb(40 40 40 /0.8);
          //background: blue;
          color: white;
          font-size: 1rem;
          outline: none;
          border: none;
          flex-grow: 1;
          //height: 60%;
          min-height: 1.99rem;
          height: 2.15rem;
          margin-left: 0.5rem;
          margin-right: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 8px;
          border-radius: 1.25rem 1.25rem;
          overflow-wrap: break-word;
          resize: none;
          //text-wrap: nowrap;
          overflow-x: hidden;
          //line-height: 1.25rem;
        }
        .sendButton {
          //all: unset;
          border: none;
          outline: inherit;
          background-color: var(--main-purple);
          color: white;
          border-radius: 999rem;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .scrollButton {
          width: 3rem;
          height: 3rem;
          font-size: 1.2rem;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .loginBtn {
          background: none;
          border: none;
          color: var(--main-purple-on-black);
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </div>
  );

  function handleInputDraft(e) {
    const bar = e.target;
    const newDraft = bar.value;
    //setCurrentDraft(newDraft);
    //adjustTextAreaHeight();
    setCurrentDraft(removeLinebreaks(newDraft));
  }
  function validateInputDraft(e) {
    const newDraft = e.target.value;
    setCurrentDraft(removeLinebreaks(newDraft));
    adjustTextAreaHeight(false);
    //Upload
    //setCurrentDraft("");
  }
  function adjustTextAreaHeight(grow = true) {
    if (!textBoxRef.current) return;
    textBoxRef.current.style.height = "2rem";
    if (grow) {
      let newHeight = textBoxRef.current.scrollHeight;
      if (newHeight > 90) newHeight = 90;

      textBoxRef.current.style.height = `${newHeight}px`;
      setTextAreaHeightPx(newHeight);
      setInputBarHeightPx(newHeight + 24);
    } else {
      textBoxRef.current.style.height = "35px";

      setTextAreaHeightPx(35);
      setInputBarHeightPx(59);
    }
  }
  function removeLinebreaks(str) {
    return str.replace(/[\r\n]+/gm, "");
  }
}

export default ChatInputBar;
