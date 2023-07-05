import { AnimatePresence, motion } from "framer-motion";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

function ChatInputBar({
  visible,
  standardTransDur,
  //scrollDownBtn,
  setScrollDownBtn,
  setScrollDownBtnPointedDown,
  scrollContainer,
  loggedIn,
  user,
  logInOut,
}) {
  const [targRot, setTargRot] = useState(90);
  const [currentDraft, setCurrentDraft] = useState("");

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

    const cont = scrollContainer?.current;
    if (cont == undefined || cont == null) return;
    console.log("cont:");
    console.log(cont);

    if (visible) {
      cont.addEventListener("scroll", checkRotateArrow);
      window.addEventListener("resize", checkRotateArrow);
      window.addEventListener("orientationchange", checkRotateArrow);
    } else {
      cont.removeEventListener("scroll", checkRotateArrow);
      window.removeEventListener("resize", checkRotateArrow);
      window.removeEventListener("orientationchange", checkRotateArrow);
    }
  }, [visible]);

  const styles = {
    //Framer Motion divs don't work with styled jsx classes
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: "3.5rem",
    width: "100%",
  };
  const scrollBtnStyles = {
    position: "fixed",
    left: "1.5rem",
    right: 0,
    bottom: "3rem",
  };
  return (
    <div>
      <AnimatePresence mode="wait">
        {visible &&
          (user ? (
            <motion.div
              style={styles}
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
                <input
                  type="text"
                  className="textInput darkblurL2"
                  value={currentDraft}
                  onChange={handleInputDraft}
                  onBlur={validateInputDraft}
                ></input>
                <button className="sendButton">S</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              style={styles}
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
        <motion.div style={scrollBtnStyles} key={"scrollDownButton"}>
          <button
            className="scrollButton"
            onClick={async () => {
              await setScrollDownBtn(true);
              checkRotateArrow();
            }}
          >
            <motion.div
              initial={{ rotate: 359 }}
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
          color: white;
          font-size: 1rem;
          outline: none;
          border: none;
          flex-grow: 1;
          height: 60%;
          height: 2rem;
          margin-left: 0.5rem;
          margin-right: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;

          border-radius: 1.25rem 1.25rem;
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
    const newDraft = e.target.value;
    setCurrentDraft(newDraft);
  }
  function validateInputDraft(e) {
    const newDraft = e.target.value;
    setCurrentDraft(newDraft);
  }
}

export default ChatInputBar;
