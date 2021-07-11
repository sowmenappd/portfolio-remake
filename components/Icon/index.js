import PropTypes from "prop-types";

import icons from "./icons";

const Icon = ({ children: icon, className, white }) => {
  const name = icon.toLowerCase() + (white ? "White" : "");
  let src = icons?.[name];

  if (!src) src = icons?.[icon.toLowerCase()];

  if (src) {
    return (
      <img
        className={className}
        title={icon}
        src={src}
        alt={icon}
        style={{ width: 42, height: 42 }}
      />
    );
  }

  return null;
};

Icon.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  white: PropTypes.bool,
};

export default Icon;
