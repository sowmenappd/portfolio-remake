import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import styles from "./index.module.css";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    return (
      <div className={styles.container}>
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          customStyle={{
            height: "100%",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodeBlock;
