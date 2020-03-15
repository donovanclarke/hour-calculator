import React from "react";
import PropTypes from "prop-types";

import "./index.style.scss";

export const TimePicker = ({ onChange, min, max, label, inline}) => {
  const Element = inline ? "span" : "div";
  return (
    <Element>
      { label && <label className="label">{label}</label>}
      <input type="time" onChange={onChange} max={max} min={min} />
    </Element>
  )
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  label: PropTypes.string,
  inline: PropTypes.bool
}

TimePicker.defaultProps = {
  onChange: () => {},
  min: "",
  max: "",
  label: null,
  inline: true
}

export default TimePicker