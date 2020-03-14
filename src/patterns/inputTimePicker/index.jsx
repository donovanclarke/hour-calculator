import React from "react";
import PropTypes from "prop-types";

import "./index.style.scss";

export const TimePicker = ({ onChange, min, max, label}) => {
  return (
    <>
      { label && <label className="label">{label}</label>}
      <input type="time" onChange={onChange} max={max} min={min} />
    </>
  )
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  label: PropTypes.string
}

TimePicker.defaultProps = {
  onChange: () => {},
  min: "",
  max: "",
  label: null
}

export default TimePicker