import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  return (
    <div className={"container"}>
      <div className={"content"}>
        <img
          src="/partysvg.svg"
          alt="An SVG of people socializing"
          className={"heroimg"}
        />
        <h1>Welcome to David&apos;s Party Room!</h1>

        <h4 className={"leftMessage"}>
          ...A virtual public chatroom that updates in real-time! <br />
        </h4>
        {/* <h3 className="rightTextAlign">
          Please be kind to each other ;) <br />
          This project was built with NextJS and Firebase.
        </h3> */}
        <h4 className="rightTextAlign rightMessage">
          Please be kind to each other ;) {/* <br /> */}
          Mean messages can get you banned...
        </h4>
        <div className={"buttonWrapper"}>
          <button className={"primaryBtn"}>Enter chat room</button>
          <button>View another page</button>
        </div>

        {/* {user ? <MessageBoard /> : <PlaceholderBoard />} */}
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          padding: 0rem;
          position: fixed;
          inset: 0;
          overflow-y: auto;
          scrollbar-gutter: stable;

          /*Scrolls, with scrollbar not affecting layout*/
        }

        .heroimg {
          align-self: center;
          width: auto;
          max-width: 95%;
          max-height: 28vh;
          max-height: 26vh;
          aspect-ratio: 1/1;
          border: 3px solid white;
          border-radius: 50% 50%;
          margin-top: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .buttonWrapper {
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding-top: 1.5rem;
        }

        h1 {
          margin-bottom: 1rem;
          text-align: right;
        }

        .buttonWrapper button {
          font: inherit;
          cursor: pointer;
          outline: inherit;
          background: none;
          color: white;
          width: auto;
          min-width: 10rem;
          min-width: 11.2rem;
          border: 3px solid white;
          border-radius: 2rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          align-self: end;
          font-weight: bold;
          padding: 0.5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 0.85rem;
          font-size: 1rem;
        }
        .buttonWrapper button.primaryBtn {
          background-color: var(--main-purple);
          border: none;
        }

        /* Media queries adjust the amount of columns based on the width of the screen, to better accommodate smaller devices  */
        @media only screen and (max-width: 678px) {
          .content {
            padding-left: 7.5%;
            padding-right: 7.5%;
          }
        }
        @media only screen and (min-width: 678px) {
          .content {
            padding-left: 20%;
            padding-right: 20%;
          }
        }
        @media only screen and (min-width: 1200px) {
          .content {
            padding-left: 30%;
            padding-right: 30%;
          }
        }
      `}</style>
    </div>
  );
}
