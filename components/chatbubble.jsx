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
      <div
        className={`bubble ${fromUser ? "fromUser" : ""}`}
        style={{
          marginTop: props.message.displayName ? "1rem" : ".5rem",
        }}
      >
        {props.message.displayName && (
          <p
            className="displayName"
            style={{ textAlign: fromUser ? "right" : "left" }}
          >
            {props.message.displayName}
          </p>
        )}

        <p className="messageText">{props.message?.text}</p>
        {props.hiddenTxt ? <p>{props.hiddenTxt}</p> : ""}
        {props.message.photoUrl && (
          <div
            className="userPicWrapper"
            style={fromUser ? { right: "-1rem" } : { left: "-1rem" }}
          >
            <img
              src={props.message.photoUrl}
              alt="profile pic"
              className="userPic"
            />
          </div>
        )}

        <style jsx>{`
          .bubble {
            position: relative;

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
          .displayName {
            position: absolute;
            top: -1.625rem;
            overflow: visible;
            text-wrap: nowrap;
            font-size: 0.625rem;
            width: 100%;
            padding-right: 2rem;
          }
          p {
          }
          .messageText {
            font-size: 1rem;
            margin: 0.5rem 0rem;
            transform: translateY(calc((1rem * -0.2) * 0.5));
          }
          .userPicWrapper {
            border-radius: 5000rem 5000rem;
            background: hsl(0, 0%, 30%);

            height: 1.75rem;
            width: 1.75rem;
            position: absolute;
            bottom: -0.275rem;
            //left: -1rem;
            overflow: hidden;
          }
          .userPic {
            height: 100%;
            width: 100%;
            border-radius: 5000rem 5000rem;
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export default ChatBubble;
