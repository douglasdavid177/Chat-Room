import LinkButton from "../components/linkbutton";
import ChatBubble from "../components/chatbubble";
import ChatInputBar from "../components/chatinputbar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatRoomSection = (props) => {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(30);
  const [messages] = useCollectionData(query, { idField: "id" });

  const bottomAnchorRef = useRef(null);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  const container = {
    hidden: false,
    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    if (messagesRef.count < 2) return;
    //props.scrollContainer.current?.scrollTo({})
    setTimeout(() => {
      bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    if (!props.scrollDownBtn) return;

    // console.log("scrollTop: " + props.scrollContainer.current?.scrollTop);
    // console.log("clientheight: " + props.scrollContainer.current?.clientHeight);
    // console.log("scrollHeight: " + props.scrollContainer.current?.scrollHeight);

    if (
      props.scrollContainer.current?.scrollHeight -
        props.scrollContainer.current?.scrollTop -
        props.scrollContainer.current?.clientHeight <
      2
    ) {
      props.setScrollDownBtn(false);
      props.setNavPanelOpen(true);
      return;
    }

    // console.log("scroll btn changed");

    bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    props.setScrollDownBtn(false);
  }, [props.scrollDownBtn]);
  return (
    <div className="chatroomSection">
      <p className="prevMsgsText">
        Viewing older messages requires database access
      </p>
      <AnimatePresence>
        {messages ? (
          <motion.div
            key={"room"}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* <div className="chatroomSection"> */}
            {/* <h3>Chat Room</h3> */}

            {/* <ChatBubble
              key={"first"}
              user={props.user}
              //message={messages ? messages[1] : { text: "maybe?" }}
            >
              heres some message text
            </ChatBubble>

            <ChatBubble fromUser={true} hiddenTxt={"n stuff"}>
              heres some more message text, from the user
            </ChatBubble>

            <ChatBubble fromUser={false}>heres some message text</ChatBubble>

            <ChatBubble fromUser={false} hiddenTxt={"n stuff"}>
              heres some message text, this time with a few more words,
              hopefully enough to create mutliple lines n stuff...
            </ChatBubble>

            <ChatBubble fromUser={true}>
              heres some more message text, from the user
            </ChatBubble>

            <ChatBubble fromUser={false}>heres some message text</ChatBubble> */}

            {messages.map((msg) => (
              <ChatBubble
                key={toString(msg.createdAt)}
                message={msg}
                user={props.user}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={"loadtxt"}
            exit={{
              translateY: -5,
              opacity: 0,
              transition: { duration: 0.7 },
            }}
          >
            <p className="loadingText"> Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bottomAnchor" ref={bottomAnchorRef}></div>

      <style jsx>{`
        .chatroomSection {
          //background: red;
          //flex-grow: 1;
          padding-top: 4rem;
          padding-bottom: 5rem;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
        }
        h3 {
          text-align: center;
        }
        .bottomAnchor {
          height: 0;
          width0: 0;
          padding: 0;
          margin: 0;
        }
        .loadingText {
          color: rgba(255 255 255 /0.5);
          color: rgba(130 130 130);
          align-self: center;
          text-align: center;
          position: absolute;
          left: 0;
          right: 0;
          transform: translateY(-0.75rem);
        }
        .prevMsgsText {
          color: rgba(130 130 130);
          align-self: center;
          text-align: center;
          position: absolute;
          top: 2rem;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatRoomSection;
