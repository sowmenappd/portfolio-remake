import Link from "next/link";

import styles from "./Header.module.css";

const Header = ({ smallLogo }) => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/">
        <a>
          <img
            className={styles.logo}
            src={"/images/wide-logo.png"}
            style={{
              width: smallLogo ? 70 : 120,
            }}
            width={120}
            alt="logo"
          />
        </a>
      </Link>
      <nav className={styles.nav}>
        <div className={styles.navbuttons}>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          <Link href="mailto:sowmen.appd@gmail.com">
            <a className={styles.contactLink} rel="noopener noreferrer">
              Contact
            </a>
          </Link>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
