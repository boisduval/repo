import React, { Component } from "react";
import "./Update.css";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuetext: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      valuetext: nextProps.data.description
    });
  }
  updateItem() {
    this.props.data.description = this.state.valuetext;
    this.props.updateItem(this.props.data);
  }
  handleChange(e) {
    this.setState({ valuetext: e.target.value });
  }
  render() {
    return (
      <div
        className="modal fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Update current item
              </h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.valuetext}
                    onChange={this.handleChange.bind(this)}
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.updateItem.bind(this)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
