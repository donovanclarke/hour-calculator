import React, { Component } from "react";
import uuid from "uuid";

import CalculatorDisplay from "./sub-features/CalculatorDisplay";
import CalculatorRow from "./sub-features/CalculatorRow";
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
    const isComplete = isValidDate(returnSplitTime(value)) && isValidDate(timeSheet[0].end);
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
    this.setState({ range });
  };

  setEndTime(event, id) {
    const { range: time } = this.state;
    const { target: { value } } = event;
    const range = [ ...time ];
    const timeSheet = 
      time.filter(({ id: timeId }) => timeId === id);
    const isComplete = isValidDate(timeSheet[0].start) && isValidDate(value);
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
    this.setState({ range });
  };

  removeTimeRow(id) {
    const { range: stateRange } = this.state;
    const range = stateRange.filter(({ id: timeId }) => timeId !== id);
    this.setState({ range });
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
    }));
  };

  render() {
    const { range } = this.state;
    return (
    <>
      <CalculatorRow
        range={range}
        begin={this.setStartTime}
        end={this.setEndTime}
        remove={this.removeTimeRow}
      />
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