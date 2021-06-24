import SEO from "../SEO";
import Projects from "../Projects";
import styles from "./Home.module.css";

const Home = () => (
  <div className={styles.home}>
    <SEO
      title="SRDev"
      description="Portfolio of Sowmen, a full stack web/app developer, game-dev mentor and ML/DL enthusiast"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Person",
          name: "Sowmen Rahman",
          url: process.env.NEXT_PUBLIC_VERCEL_URL,
          image: process.env.NEXT_PUBLIC_VERCEL_URL + "/images/dp.png",
          sameAs: [
            "https://www.facebook.com/sowmen.rahman.01",
            "https://twitter.com/SowmenR",
            "https://www.instagram.com/art1san__",
            "https://www.youtube.com/channel/UC5vjE1_tiI-sOhcZTT0AI8A",
            "https://www.linkedin.com/in/sowmen-rahman-01/",
            "https://github.com/sowmenappd",
            "https://sowmenrahman.tech",
          ],
          jobTitle: "Software Engineer",
        }),
      }}
    />
    <Projects />
  </div>
);

export default Home;
