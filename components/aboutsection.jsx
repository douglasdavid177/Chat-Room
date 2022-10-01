import LinkButton from "./linkbutton";

const AboutSection = ({ props }) => {
  return (
    <div className="aboutSection">
      {/* <h3>This is the &apos;About&apos; section!</h3> */}
      <h3>About This Project</h3>
      <p>
        This section is still being worked on and is currently incomplete. Heres
        some text to make this section look filled in the meantime... Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Error aut debitis ex,
        corrupti iusto quas nostrum architecto sint dolorum sed? Reprehenderit
        molestias, aspernatur aliquam recusandae provident reiciendis hic libero
        vitae?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, vel
        nemo repudiandae iste velit quam consectetur quis cum quo aliquam? In
        facere expedita praesentium omnis quas numquam quos temporibus quam.
      </p>
      <LinkButton props={props} />
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
