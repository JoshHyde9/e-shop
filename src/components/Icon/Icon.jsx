import PropTypes from "prop-types";
import React from "react";

import { iconPaths } from "../../utils/IconLib";

/**
 * @param {{icon: string, strokeColour: string, size: string, fillColour?: string, viewBox?: string}} props
 */
export const Icon = ({ icon, strokeColour, size, fillColour, viewBox }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      stroke={strokeColour}
      fill={fillColour}
      width={size}
      height={size}
    >
      {iconPaths[icon]()}
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  strokeColour: PropTypes.string.isRequired,
  fillColour: PropTypes.string,
  size: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  fillColour: "none",
  viewBox: "0 0 24 24",
};
