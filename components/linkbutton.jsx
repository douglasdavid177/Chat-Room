import { AnimatePresence, motion } from "framer-motion";

const LinkButton = ({ setNavPanelOpen, delayAmt }) => {
  return (
    <div className="btnHolder">
      <motion.div
        key={"linkButton"}
        initial={{ translateY: 50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: delayAmt > 0 ? delayAmt : 0.125,
          ease: [0.1, 0.1, 0, 1],
        }}
      >
        <button
          className={"linkBtn"}
          onClick={() => {
            setNavPanelOpen(true);
          }}
        >
          <div className=" rightArrowBefore"></div>
          <p>View menu</p>
        </button>
      </motion.div>
      <style jsx>{`
        .btnHolder {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          align-self: flex-end;
        }
        button {
          background-color: var(--main-purple);
          border: none;
          font: inherit;
          cursor: pointer;
          //outline: inherit;
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

        button.linkBtn {
          background: none;
          border: none;
          padding: 0.75rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          margin-top: -0.5rem;
          position: relative;
          color: var(--main-purple-on-black);
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: flex-end;
        }
        button.linkBtn p {
          margin: 0;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default LinkButton;
