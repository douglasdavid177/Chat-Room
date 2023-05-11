import { AnimatePresence, motion } from "framer-motion";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

function ChatInputBar({
  visible,
  standardTransDur,
  scrollDownBtn,
  setScrollDownBtn,
  scrollContainer,
}) {
  const [targRot, setTargRot] = useState(0);

  useEffect(() => {
    const cont = scrollContainer?.current;
    console.log("cont:");
    console.log(cont);
    // cont.onScroll = checkRotateArrow;
    // cont.addEventlistener("scroll", checkRotateArrow);
    // return () => {
    //   cont.removeEventListener("scroll", checkRotateArrow);
    // };
  }, []);

  useEffect(() => {
    //checkRotateArrow();
  }, [scrollContainer.current?.scrollTop]);

  function checkRotateArrow() {
    console.log("test");
    if (
      scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop -
        scrollContainer.current?.clientHeight <
      2
    ) {
      setTargRot(90);
    } else {
      setTargRot(0);
    }
  }
  const styles = {
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
          <div className="inputGroup">
            <input type="text" className="textInput darkblurL2"></input>
            <button className="sendButton">S</button>
          </div>
        </motion.div>
      )}

      {visible && (
        <motion.div
          style={scrollBtnStyles}
          key={"scrollDownButton"}
          animate={{ rotate: targRot }}
        >
          <button
            className="scrollButton"
            onClick={() => {
              setScrollDownBtn(true);
            }}
          >
            <FaArrowDown style={{ color: "var(--main-purple)" }} />
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .barBG {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 5rem;
          width: 100%;
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
          //outline: none;
          border: none;
          flex-grow: 1;
          height: 60%;
          height: 2rem;
          margin-left: 0.5rem;
          margin-right: 1rem;
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
        }
      `}</style>
    </AnimatePresence>
  );
}

export default ChatInputBar;
