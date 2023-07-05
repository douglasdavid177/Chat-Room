import { AnimatePresence, motion } from "framer-motion";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
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
  loggedIn,
  user,
  logInOut,
}) {
  const [targRot, setTargRot] = useState(90);
  const [currentDraft, setCurrentDraft] = useState("");
  const [textAreaHeightPx, setTextAreaHeightPx] = useState(32);
  const textArea = useRef(null);

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
    const cont = scrollContainer?.current;
    if (cont == undefined || cont == null) return;
    console.log("cont:");
    console.log(cont);

    //checkRotateArrow();
    adjustTextAreaHeight();

    if (visible) {
      cont.addEventListener("scroll", checkRotateArrow);
      window.addEventListener("resize", checkRotateArrow);
      //window.addEventListener("orientationchange", checkRotateArrow);
    } else {
      cont.removeEventListener("scroll", checkRotateArrow);
      window.removeEventListener("resize", checkRotateArrow);
      //window.removeEventListener("orientationchange", checkRotateArrow);
      setCurrentDraft("");
    }
  }, [visible, scrollContainer.current]);

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
    left: "1.5rem",
    right: 0,
    bottom: `${textAreaHeightPx + 16}px`,
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
                  ref={textArea}
                  className="textInput darkblurL2"
                  value={currentDraft}
                  onChange={handleInputDraft}
                  onBlur={validateInputDraft}
                ></textarea>
                <button className="sendButton">S</button>
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
          animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.1 } }}
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
          min-height: 2rem;
          margin-left: 0.5rem;
          margin-right: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 8px;
          border-radius: 1.25rem 1.25rem;
          overflow-wrap: break-word;
          resize: none;
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
    adjustTextAreaHeight();
    setCurrentDraft(newDraft);
  }
  function validateInputDraft(e) {
    const newDraft = e.target.value;
    setCurrentDraft(newDraft);
    //Upload
    setCurrentDraft("");
  }
  function adjustTextAreaHeight() {
    if (!textArea.current) return;
    textArea.current.style.height = "2rem";
    let newHeight = textArea.current.scrollHeight;
    if (newHeight > 90) newHeight = 90;

    textArea.current.style.height = `${newHeight}px`;
    setTextAreaHeightPx(newHeight);
    setInputBarHeightPx(newHeight + 24);
  }
}

export default ChatInputBar;
