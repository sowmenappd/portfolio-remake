import Link from "next/link";
import React from "react";

import styles from "./Footer.module.css";
import githubLogo from "./github.svg";
import twitterLogo from "./twitter.svg";

const Footer = ({ noBorder }) => (
  <footer>
    <div className={noBorder ? styles.containerNoBorder : styles.container}>
      <Link href="/">
        <img
          src={"https://sowmen-personal.s3.amazonaws.com/logo.png"}
          width="100px"
          style={{ borderRadius: "8px" }}
          alt="sr logo"
        />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com/sowmen.rahman.01"
            >
              <img src={twitterLogo} alt="sowmen rahman on facebook" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/sowmenappd"
            >
              <img src={githubLogo} alt="sowmen rahman on github" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
