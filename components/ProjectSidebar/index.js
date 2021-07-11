import Icon from "../Icon";
import styles from "./Sidebar.module.css";

const Sidebar = ({ year, client, services, tech, website }) => (
  <div className={styles.sidebar}>
    {year && (
      <Section>
        <p className={styles.title}>Year</p>
        <p className={styles.item}>{year}</p>
      </Section>
    )}
    {client && (
      <Section>
        <p className={styles.title}>Context / Client</p>
        <p className={styles.item}>{client}</p>
      </Section>
    )}
    {services && (
      <Section>
        <p className={styles.title}>Services</p>
        <ul>
          {services.split(", ").map((s) => (
            <li className={styles.item} key={s}>
              {s}
            </li>
          ))}
        </ul>
      </Section>
    )}
    {tech && (
      <Section className={styles.techs}>
        {tech.split(", ").map((t) => {
          return <Icon key={t}>{t}</Icon>;
        })}
      </Section>
    )}
  </div>
);

const Section = ({ children, className }) => (
  <div className={[styles.section, className].join(" ")}>{children}</div>
);

export default Sidebar;
