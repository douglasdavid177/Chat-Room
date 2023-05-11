import LinkButton from "../components/linkbutton";
import ChatBubble from "../components/chatbubble";
import ChatInputBar from "../components/chatinputbar";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ChatRoomSection = (props) => {
  const bottomAnchorRef = useRef(null);
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
    //props.scrollContainer.current?.scrollTo({})
    setTimeout(() => {
      bottomAnchorRef.current?.scrollIntoView();
    }, 20);
  }, []);

  useEffect(() => {
    if (!props.scrollDownBtn) return;
    if (
      props.scrollContainer.current?.scrollHeight -
        props.scrollContainer.current?.scrollTop -
        props.scrollContainer.current?.clientHeight <
      2
    ) {
      props.setScrollDownBtn(false);
      return;
    }

    // console.log("scrollTop: " + props.scrollContainer.current?.scrollTop);
    // console.log("innerheight: " + props.scrollContainer.current?.clientHeight);
    // console.log("scrollHeight: " + props.scrollContainer.current?.scrollHeight);

    // console.log("scroll btn changed");

    bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    props.setScrollDownBtn(false);
  }, [props.scrollDownBtn]);
  return (
    <div>
      <motion.div variants={container} initial="hidden" animate="show">
        <div className="chatroomSection">
          {/* <h3>Chat Room</h3> */}

          <ChatBubble fromUser={false}>heres some message text</ChatBubble>

          <ChatBubble fromUser={true}>
            heres some more message text, from the user
          </ChatBubble>

          <ChatBubble fromUser={false}>heres some message text</ChatBubble>

          <ChatBubble fromUser={false}>
            heres some message text, this time with a few more words, hopefully
            enough to create mutliple lines
          </ChatBubble>

          <ChatBubble fromUser={true}>
            heres some more message text, from the user
          </ChatBubble>

          <ChatBubble fromUser={false}>heres some message text</ChatBubble>
          <div className="bottomAnchor" ref={bottomAnchorRef}></div>
        </div>
      </motion.div>

      <style jsx>{`
        .chatroomSection {
          //background: red;
          //flex-grow: 1;
          padding-top: 4rem;
          padding-bottom: 5rem;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
      `}</style>
    </div>
  );
};

export default ChatRoomSection;
