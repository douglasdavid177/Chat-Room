import { motion } from "framer-motion";

function ChatBubble(props) {
  const fromUser = props.message?.forceFromUser
    ? true
    : props.user && props.user.uid == props.message?.uid;

  const messageAnim = {
    hidden: { opacity: 0, x: -25, y: 5 },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.35 } },
  };
  const userMessageAnim = {
    hidden: { opacity: 0, x: 25, y: 5 },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.35 } },
  };
  const messageStyles = {
    display: "flex",
  };
  return (
    <motion.div
      key={"bubble"}
      variants={fromUser ? userMessageAnim : messageAnim}
      style={messageStyles}
    >
      <div className={`bubble ${fromUser ? "fromUser" : ""}`}>
        <p>{props.message?.text}</p>
        {props.hiddenTxt ? <p>{props.hiddenTxt}</p> : ""}

        <style jsx>{`
          .bubble {
            max-width: min(25rem, 80%);
            padding: 0.25rem 1rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            margin-left: 0;
            margin-right: auto;

            border-radius: 1.25rem 1.25rem;
            background: transparent;
            background: hsl(0, 0%, 18%);
            display: inline-block;
            font-size: 1rem;
          }
          .fromUser {
            margin-right: 0;
            margin-left: auto;
            background-color: var(--main-purple);
            border: none;
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export default ChatBubble;
