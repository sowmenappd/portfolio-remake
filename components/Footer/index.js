import Link from "next/link";
import React from "react";

import styles from "./Footer.module.css";

import ICONS from "../../utils/icons";

const Footer = ({ noBorder }) => (
  <footer>
    <div
      className={noBorder ? styles.containerNoBorder : styles.container}
      style={{ width: "100%" }}
    >
      <Link href="/">
        <img
          src={"/images/wide-logo.png"}
          width="100px"
          style={{ borderRadius: "8px" }}
          alt="logo"
        />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <span style={{ margin: 2 }}>
              <a target="_blank" href="https://github.com/sowmenappd">
                {ICONS.Github({ size: 24, color: "gray" })}
              </a>
            </span>
            <span style={{ margin: 2 }}>
              <a
                target="_blank"
                href="https://www.facebook.com/sowmen.rahman.01"
              >
                {ICONS.Facebook({ size: 24, color: "blue" })}
              </a>
            </span>
            <span style={{ margin: 2 }}>
              <a target="_blank" href="https://www.instagram.com/art1san__">
                {ICONS.Instagram({ size: 24, color: "black" })}
              </a>
            </span>
            <span style={{ margin: 2 }}>
              <a target="_blank" href="https://twitter.com/sowmenr">
                {ICONS.Twitter({ size: 24, color: "#1DA1F2" })}
              </a>
            </span>

            {/* <a
              target="_blank"
              rel="noopener noreferrer"
              href=""
            >
              <img src={githubLogo} alt="sowmen rahman on github" />
            </a> */}
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
