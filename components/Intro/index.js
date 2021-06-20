import styles from "./Intro.module.css";

const Intro = () => (
  <>
    <div className={styles.intro}>
      <div className={styles.shortOne}>
        <p className={styles.greeting}>Hello, I'm Sowmen Rahman!</p>
        <br />
        <br />
        <p className={styles.myTitle}>🌐 Full stack developer </p>
        <p className={styles.myTitle}>🚀 ML/DL enthusiast</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:sowmen.appd@gmail.com"
        >
          <button className={styles.helloButton}>Contact Me</button>
        </a>
        <div
          style={{ lineHeight: "1.6em", fontSize: "22px", paddingTop: "28px" }}
        >
          <p>
            I’m a Bangladesh based full-stack developer specializing in web
            technologies. I’m experienced in <strong>HTML5</strong>,{" "}
            <strong>TypeScript</strong> and <strong>CSS3</strong> and modern
            libraries <strong>React</strong>, <strong>Next.js </strong>
            and <strong>React Native</strong>.
          </p>
          <p>
            I have a working knowledge of <b>DevOps</b>,{" "}
            <b>Cloud Infrastructure</b> and have professionally managed
            pipelines using <b>Kubernetes</b>, <b>Docker</b> and{" "}
            <b>Amazon Web Services</b>.
          </p>
        </div>
      </div>
      <div className={styles.longOne}>
        <img src="/images/dp.png" alt="dp" className={styles.coverDp} />

        <p>
          I’m also the co-founder and CTO of{" "}
          <a href="https://freshease.com.au" target="_blank" rel="noreferrer">
            Freshease
          </a>
          , a growing same-day grocery delivery service in Australia.
        </p>
        <p>
          Alongside, I am an indie-game heart-throb and have developed a few
          games using <strong>Unity</strong> game engine.
        </p>
        <p>
          I am a fast learner, am passionate about programming paradigms and
          constantly learning about data structures, algorithms, software
          architectures and design patterns. Software technologies are
          temporary, but the core principles are everlasting.
        </p>
      </div>
    </div>
    <div className={styles.br}></div>
  </>
);

export default Intro;
