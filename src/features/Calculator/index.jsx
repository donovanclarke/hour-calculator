import React, { Component } from "react";
import uuid from "uuid";
import Lottie from "react-lottie-wrapper";
import { 
  TransitionGroup, 
  CSSTransition 
} from "react-transition-group";

import InputTimePicker from "../../patterns/inputTimePicker";
import CalculatorDisplay from "./sub-features/CalculatorDisplay";
import * as animationData from "../../assets/animation/index.json";
import { 
  convertToSeconds,
  returnSplitTime,
  isValidDate
} from "../../utilities";

import "./index.style.scss"; 

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: []
    }
    this.renderCalculatorRow = this.renderCalculatorRow.bind(this);
    this.addTimeRow = this.addTimeRow.bind(this);
    this.removeTimeRow = this.removeTimeRow.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  setStartTime(event, id) {
    const { range: time  } = this.state;
    const { target: { value } } = event;
    const range = [ ...time ];
    const timeSheet = 
      time.filter(({ id: timeId }) => timeId === id);
    const isComplete = isValidDate(returnSplitTime(value)) && isValidDate(timeSheet[0].end)
    const start = {
      ...timeSheet[0],
      start: returnSplitTime(value),
      min: value,
      isComplete,
      difference: 
        timeSheet[0].end !== 0 ? 
          convertToSeconds(returnSplitTime(value), new Date(timeSheet[0].end))
        : 0
    };
    range.splice(time.findIndex(({ id: timeId }) => timeId === id), 1, start);
    this.setState({ range })
  };

  setEndTime(event, id) {
    const { range: time } = this.state;
    const { target: { value } } = event;
    const range = [ ...time ];
    const timeSheet = 
      time.filter(({ id: timeId }) => timeId === id);
    const isComplete = isValidDate(timeSheet[0].start) && isValidDate(value)
    let end = {
      ...timeSheet[0],
      end: returnSplitTime(value),
      max: value,
      isComplete
    };
    if (end.end !== 0 || end.start !== 0) {
      end = {
        ...end,
        difference: convertToSeconds(new Date(end.start), new Date(end.end))
      }
    }
    range.splice(time.findIndex(({ id: timeId }) => timeId === id), 1, end);
    this.setState({ range })
  };

  removeTimeRow(id) {
    const { range } = this.state;
    const timeSheet = range.filter(({ id: timeId }) => timeId !== id);
    this.setState({ range: timeSheet })
  };

  addTimeRow() {
    this.setState(prevState => ({
    range: [
      ...prevState.range,
        {
          id: uuid.v4(),
          start: 0,
          end: 0,
          difference: 0,
          min: undefined,
          max: undefined,
          isComplete: false
        }
    ]
    }))
  };

  renderCalculatorRow() {
    const { range } = this.state;
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
              <span>
                <InputTimePicker
                  label="Start"
                  onChange={e => this.setStartTime(e, id)}
                  max={max}
                />
              </span>
              <span>
                <InputTimePicker
                  label="End"
                  onChange={e => this.setEndTime(e, id)}
                  min={min}
                />
              </span>
              <span>
                <button
                  type="button"
                  onClick={() => this.removeTimeRow(id)}
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

  render() {
    const { range } = this.state;
    return (
    <>
      {this.renderCalculatorRow()}
        <div className="action-row">
          <button
            type="button"
            className="button"
            onClick={this.addTimeRow}
          >
            Add Time
        </button>
        </div>
      <CalculatorDisplay range={range} />
    </>
    );
  }
};

export default Calculator;