/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Nav.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }
  handleChange(e) {
    this.setState({ description: e.target.value });
  }
  addItem(e) {
    if (e.keyCode === 13) {
      this.props.data.des = this.state.description;
      this.props.addItem(this.props.data.des);
      this.setState({
        description: ""
      })
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              TodoList
            </a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <form id="addForm" className="navbar-form navbar-right" role="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a new item"
                  value={this.state.description}
                  onChange={this.handleChange.bind(this)}
                  onKeyDown={this.addItem.bind(this)}
                ></input>
                <input style={{ display: "none" }}></input>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
