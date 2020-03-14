import React from "react";
import PropTypes from "prop-types";

import { renderTimeDisplay } from "../../../../utilities";

import "./index.style.scss";

export const CalculatorDisplay = ({ range }) => {
  if (range.length < 1) {
    return (
      <div className="empty-message">
        <h2>Click "Add Time" to get started.</h2>
      </div>
    )
  }
  const display = renderTimeDisplay(range);
    return (
      <div>
        <h2>
          {display && display !== "00" ?
            (`${display}`) : ("Start entering your time.")
          }
        </h2>
      </div>
    )
  }

  CalculatorDisplay.propTypes = {
    range: PropTypes.array.isRequired
  }

  export default CalculatorDisplay;