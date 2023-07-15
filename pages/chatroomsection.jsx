import LinkButton from "../components/linkbutton";
import ChatBubble from "../components/chatbubble";
import ChatInputBar from "../components/chatinputbar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatRoomSection = (props) => {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt", "desc").limit(20);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [scrollTop, setScrollTop] = useState(0);

  const bottomAnchorRef = useRef(null);

  //const messagesOrdered = messages?.toReversed();
  const messagesOrdered = messages ? messages.toReversed() : null;

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  const container = {
    hidden: false,
    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.15,
      },
    },
  };

  // useEffect(() => {
  //   if (!messages) return;
  //   //messages.reverse();
  // }, [messages]);

  useEffect(() => {
    props.scrollContainer.current.addEventListener("scroll", checkScroll);
    return () => {
      props.scrollContainer.current.removeEventListener("scroll", checkScroll);
    };
  }, [props.scrollContainer.current]);

  useEffect(() => {
    if (messagesRef.count < 2) return;
    //props.scrollContainer.current?.scrollTo({})

    setTimeout(() => {
      bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [messages, props.user]);

  useEffect(() => {
    if (!props.scrollDownBtn) return;

    if (
      props.scrollDownBtnPointedDown ||
      props.scrollContainer.current?.scrollHeight -
        props.scrollContainer.current?.scrollTop -
        props.scrollContainer.current?.clientHeight >
        2
    ) {
      props.setScrollDownBtn(false);
      bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    // console.log("scroll btn changed");

    props.setScrollDownBtn(false);
    props.setNavPanelOpen(true);
  }, [props.scrollDownBtn]);

  return (
    <div
      className="chatroomSection"
      style={{ paddingBottom: `${props.inputBarHeightPx + 27}px` }}
    >
      <AnimatePresence>
        {scrollTop < -32 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.35 }}
          >
            {" "}
            <p className="prevMsgsText">
              Viewing older messages requires database access
            </p>
          </motion.div>
        )}
        {messagesOrdered ? (
          <motion.div
            key={"room"}
            variants={container}
            initial="hidden"
            animate="show"
          >
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

            {messagesOrdered.map((msg, ind) =>
              msg.createdAt ? (
                <ChatBubble
                  key={msg.createdAt.toDate().toString()}
                  message={msg}
                  user={props.user}
                />
              ) : (
                ""
              )
            )}
          </motion.div>
        ) : (
          <motion.div
            key={"loadtxt"}
            exit={{
              translateY: -15,
              opacity: 0,
              transition: { duration: 0.5 },
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
          padding-top: 4.25rem;
          // Padding bottom applied as inline style
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
          position: fixed;
          top: 3.05rem;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
  function checkScroll(e) {
    const newScrollTop = props.scrollContainer.current.scrollTop;
    setScrollTop(newScrollTop);
  }
};

export default ChatRoomSection;
