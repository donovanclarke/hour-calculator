import React from "react";
import PropTypes from "prop-types";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import Lottie from "react-lottie-wrapper";

import InputTimePicker from "../../../../patterns/inputTimePicker";
import * as animationData from "../../../../assets/animation";

import "./index.style.scss";

export const CalculatorRow = ({ range, begin, end, remove }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  if (range.length === 0) {
    return (
      <div>
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled
        />
      </div>
    )
  }
  return (
    <div className="time-container">
      <TransitionGroup>
        {range.map(({ id, max, min }) => (
          <CSSTransition
            key={id}
            timeout={300}
            classNames="animation"
          >
            <div className="input-row">
              <InputTimePicker
                label="Start"
                onChange={e => begin(e, id)}
                max={max}
              />
              <InputTimePicker
                label="End"
                onChange={e => end(e, id)}
                min={min}
              />
              <span>
                <button
                  type="button"
                  onClick={() => remove(id)}
                  className="action-button"
                >
                  X
                </button>
              </span>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

CalculatorRow.propTypes = {
  range: PropTypes.array.isRequired,
  begin: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default CalculatorRow;