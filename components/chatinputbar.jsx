import { AnimatePresence, motion } from "framer-motion";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

function ChatInputBar({
  visible,
  standardTransDur,
  scrollDownBtn,
  setScrollDownBtn,
  scrollContainer,
  loggedIn,
}) {
  const [targRot, setTargRot] = useState(90);
  const [currentDraft, setCurrentDraft] = useState("");

  useEffect(() => {
    const cont = scrollContainer?.current;
    if (cont == undefined || cont == null) return;
    console.log("cont:");
    console.log(cont);
    // cont.onScroll = checkRotateArrow;

    cont.addEventListener("scroll", checkRotateArrow);
    cont.addEventListener("resize", checkRotateArrow);
    //cont.addEventListener("orientationchange", checkRotateArrow);

    checkRotateArrow();

    return () => {
      cont.removeEventListener("scroll", checkRotateArrow);
      cont.removeEventListener("resize", checkRotateArrow);
      //cont.removeEventListener("orientationchange", checkRotateArrow);
    };
  }, []);

  useEffect(() => {
    checkRotateArrow();
  }, [visible]);

  function test() {
    console.log("changed orientation");
  }

  useEffect(() => {
    //checkRotateArrow();
  }, [scrollContainer.current?.scrollTop]);

  function checkRotateArrow() {
    // console.log("test");
    if (
      scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop -
        scrollContainer.current?.clientHeight <
      2
    ) {
      setTargRot(270);
    } else {
      setTargRot(359.5);

      // console.log(
      //   "sc top: " +
      //     scrollContainer.current.scrollTop +
      //     " clientheight: " +
      //     scrollContainer.current.clientHeight +
      //     "scrollheight: " +
      //     scrollContainer.current.scrollHeight
      // );
    }
  }
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
    <AnimatePresence>
      {visible && (
        <motion.div
          style={styles}
          className="darkblur" // barBG has to be applied as direct styes for some reason
          key={"barBG"}
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
          {loggedIn ? (
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
          ) : (
            <div className="inputGroup">
              <p>
                You must be logged in to send messages.{" "}
                <button className="loginBtn">Log In</button>
              </p>
            </div>
          )}
        </motion.div>
      )}

      {visible && (
        <motion.div style={scrollBtnStyles} key={"scrollDownButton"}>
          <button
            className="scrollButton"
            onClick={() => {
              setScrollDownBtn(true);
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
    </AnimatePresence>
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
