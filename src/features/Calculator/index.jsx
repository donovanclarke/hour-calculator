import React, { Component } from "react";
import uuid from "uuid";

import { convertToSeconds, returnSplitTime } from "../../utilities";

import "./index.style.scss"; 

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: []
    }
    this.renderCalculatorRow = this.renderCalculatorRow.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.addTimeRow = this.addTimeRow.bind(this);
    this.removeTimeRow = this.removeTimeRow.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
  }

  setStartTime(event, id) {
    const { range } = this.state;
    const { target: { value } } = event;
    const copy = range;
    const index = range.findIndex(({ id: timeId }) => timeId === id);
    const timeSheet = 
      range.filter(({ id: timeId }) => timeId === id)
      .map(item => {
          item.start = returnSplitTime(value);
          item.min = value;
        if (item.end !== 0) {
            const endTime = new Date(item.end);
            item.difference = convertToSeconds(returnSplitTime(value), endTime);
        }
        return item; 
      });
    copy.splice(index, 1, ...timeSheet);
    this.setState({
    range: copy
    })
  };

  setEndTime(event, id) {
    const { range } = this.state;
    const { target: { value } } = event;
    const copy = range;
    const index = range.findIndex(({ id: timeId }) => timeId === id);
    const timeSheet = 
      range.filter(({ id: timeId }) => timeId === id)
      .map(item => {
          item.end = returnSplitTime(value);
          item.max = value;
        if (item.end !== 0 || item.start !== 0) {
          const startTime = new Date(item.start);
          const endTime = new Date(item.end);
          item.difference = convertToSeconds(startTime, endTime);
        }
        return item; 
      });
    copy.splice(index, 1, ...timeSheet);
    this.setState({
    range: copy
    })
  };

  removeTimeRow(id) {
    const { range } = this.state;
    const timeSheet = range.filter(({ id: timeId }) => timeId !== id);
    this.setState({
    range: timeSheet
    })
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
          max: undefined
        }
    ]
    }))
  };

  renderCalculatorRow() {
    const { range } = this.state;
    return (
    <> 
      {range.map(({ id, max, min }) => (
        <div key={id}>
          <span>
            <input type="time" onChange={e => this.setStartTime(e, id)} max={max} />
          </span>
          <span>
            <input type="time" onChange={e => this.setEndTime(e, id)} min={min} />
          </span>
          <span>
            <button type="button" onClick={() => this.removeTimeRow(id)}>X</button>
          </span>
        </div>
      ))}
    </>
    )
  }

  renderTime() {
    const { range } = this.state;
    if (range.length < 1) {
      return (
        <div className="empty-message">
          <h2>Click "Add Time" to get started.</h2>
        </div>
      )
    }
    const totalSeconds = range.reduce((a, b) => ({ difference: a.difference + b.difference }));
    const { difference } = totalSeconds;
    const hours = Math.floor(difference / 3600)
    const minutes = Math.floor(difference / 60) % 60
    const display = 
    [hours, minutes].map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
    return (
      <div>
        <h2>Time: {display !== "00" && display}</h2>
      </div>
    )
  }

  render() {
    return (
    <>
      {this.renderCalculatorRow()}
      <button type="button" onClick={this.addTimeRow}>Add Time</button>
      {this.renderTime()}
    </>
    );
  }
};

export default Calculator;