import SEO from "../SEO";
import Projects from "../Projects";
import styles from "./Home.module.css";

const Home = () => (
  <div className={styles.home}>
    <SEO
      title="SRDev | Portfolio"
      description="Portfolio of Sowmen, a full stack web/app developer, game-dev mentor and ML/DL enthusiast"
    />
    <Projects />
  </div>
);

export default Home;
