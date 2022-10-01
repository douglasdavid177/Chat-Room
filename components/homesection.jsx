import { AnimatePresence, motion } from "framer-motion";
import LinkButton from "./linkbutton";

const HomeSection = ({ props }) => {
  return (
    <div className="homeSection">
      <div className="content">
        <AnimatePresence>
          <h1>David&apos;s Uber-Exclusive VIP Chat Room!</h1>

          <motion.div
            className="rightTextAlign rightMessage"
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.1, 0.1, 0, 1] }}
          >
            <h3>
              ...A virtual public chat room that updates in real time!
              <br />
            </h3>
          </motion.div>
          <motion.div
            className={"leftMessage"}
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.1, 0.1, 0, 1] }}
          >
            <h3>
              ...Please be kind! {/* &#128527;  */}
              {/* <br /> */}
              Mean messages can get you banned...
            </h3>
          </motion.div>

          <div className={"buttonWrapper"}>
            <motion.div
              initial={{ translateY: 40, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.1, 0.1, 0, 1],
              }}
            >
              <button>Enter chat room</button>
            </motion.div>

            <LinkButton props={props} delayAmt={0.35} />
          </div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          padding: 0rem;
        }
        h1 {
          //margin-top: 2.5rem;
          //margin-top: 0rem;
          margin-bottom: 1.75rem;
          text-align: left;
          position: relative;
        }

        h1::before {
          //content: "You're invited to...";
          content: "Welcome to...";
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(-1.25rem);
          font-size: 0.8rem;
          color: hsl(0, 0%, 50%);
        }

        h3 {
          margin: 1rem 0rem;
          align-self: flex-start;
        }
        h4 {
          margin: 0.5rem 0rem;
          align-self: flex-start;
        }
        .buttonWrapper {
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
          align-items: flex-end;
        }

        .buttonWrapper button {
          background-color: var(--main-purple);
          border: none;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          color: white;
          width: auto;
          min-width: 10.1rem;
          border-radius: 200rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          align-self: end;
          font-weight: bold;
          padding: 1rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          font-size: 0.85rem;
          font-size: 1rem;
        }
        .buttonWrapper button.secondaryBtn {
          background: none;
          border: 3px solid white;
        }
      `}</style>
    </div>
  );
};

export default HomeSection;
