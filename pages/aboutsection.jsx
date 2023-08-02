import LinkButton from "../components/linkbutton";

const AboutSection = (props) => {
  return (
    <div className="aboutSection">
      {/* <h3>This is the &apos;About&apos; section!</h3> */}
      <h3>About This Project</h3>
      <p>
        This project is a small JavaScript application built with NextJS and
        Firebase. It utilizes the ReactJS library under the hood for its
        front-end architecture. This allows JavaScript to be used to handle and
        organize several aspects of development including (but not limited to) a
        state management system, data binding, handling of events, application
        lifecycle and more, while also allowing the app to be structured in a
        modular fashion with reusable components. Animations were written using
        the Framer Motion API, and all CSS was written and applied using styled
        JSX classes
      </p>
      <p>
        The front-end half of the application was compiled and built with
        NextJS, which provides the structure for routing and also allows
        particular functions to run server side, for easy integration with
        databases and faster load times.{" "}
      </p>
      <p>
        The back-end half of this application was made using a Firebase Cloud
        Firestore Database. It&apos;s a noSQL document oriented database that
        scales horizontally with ease. Users can sign in using a Google account,
        and must be signed in to send messages.{" "}
      </p>
      <p>
        The{" "}
        <a href="https://github.com/douglasdavid177/Chat-Room">source code</a>{" "}
        can be viewed online on GitHub.
      </p>
      <LinkButton setNavPanelOpen={props.setNavPanelOpen} />
      <br />
      <style jsx>{`
        .aboutSection {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
        p {
          font-size: 1rem;
          margin-top: 0rem;
        }
      `}</style>
    </div>
  );
};
export default AboutSection;
