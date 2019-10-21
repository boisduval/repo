import React, { Component } from "react";
import "./TodoItem.css";

class TodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      state: 0,
      description: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.data.id,
      state: nextProps.data.state,
      description: nextProps.data.description
    });
  }
  delete() {
    this.props.deleteItem(this.props.data.id);
  }
  getCurrentItem() {
    this.props.getCurrentItem(this.props.data);
  }
  haveDone() {
    this.setState({
      state: !this.state.state + 0
    });
    this.props.haveDone(this.props.data);
  }
  render() {
    let data = this.props.data;

    return (
      <li className="list-group-item item">
        <i
          className={
            data.state === 1
              ? "glyphicon glyphicon-ok done"
              : "glyphicon glyphicon-ok"
          }
          onClick={this.haveDone.bind(this)}
        ></i>
        <span className="description">{data.description}</span>
        <div className="dosth">
          <i
            className="glyphicon glyphicon-pencil"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.getCurrentItem.bind(this)}
          ></i>
          <i
            className="glyphicon glyphicon-trash del"
            onClick={this.delete.bind(this)}
          ></i>
        </div>
      </li>
    );
  }
}

export default TodeItem;
