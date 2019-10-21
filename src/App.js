/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Axios from "axios";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Nav from "./Nav";
import Container from "./Container";
import Update from "./Update";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      currentItem: {
        id: -1,
        state: 0,
        description: ""
      },
      des: {
        des: ""
      },
      count: -1,
      pageCount: null,
      handlePage: {
        currentPage: 1,
        pageSize: 10
      },
      next: null,
      previous: null
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.getCurrentItem = this.getCurrentItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.haveDone = this.haveDone.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getTodoList = this.getTodoList.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previous = this.previous.bind(this);
  }
  componentDidMount() {
    this.getTodoList();
  }
  deleteItem(id) {
    const that = this;
    Axios.delete(`http://127.0.0.1:8000/api/todoList/${id}/`).then(res => {
      that.getTodoList();
    });
  }
  getTodoList() {
    const that = this;
    Axios.get(
      `http://127.0.0.1:8000/api/todoList/?page=${that.state.handlePage.currentPage}&size=${that.state.handlePage.pageSize}`
    ).then(res => {
      var num = Math.ceil(res.data.count / that.state.handlePage.pageSize);
      that.setState({
        todoList: res.data.results,
        count: res.data.count,
        pageCount: num,
        next: res.data.next,
        previous: res.data.previous
      });
    });
  }
  getCurrentItem(item) {
    this.setState({
      currentItem: {
        id: item.id,
        state: item.state,
        description: item.description
      }
    });
  }
  updateItem(item) {
    const that = this;
    Axios.put(`http://127.0.0.1:8000/api/todoList/${item.id}/`, {
      description: item.description
    }).then(res => {
      $("#myModal").modal("hide");
      that.getTodoList();
    });
  }
  addItem(des) {
    const that = this;
    Axios.post(`http://127.0.0.1:8000/api/todoList/`, {
      description: des
    }).then(res => {
      that.getTodoList();
      $("#navbar").collapse("hide");
    });
  }
  haveDone(item) {
    item.state = !item.state + 0;
    Axios.put(`http://127.0.0.1:8000/api/todoList/${item.id}/`, {
      state: item.state,
      description: item.description
    }).then(res => {});
  }
  nextPage() {
    if (this.state.next !== null) {
      Axios.get(`${this.state.next}`).then(res => {
        this.setState({
          todoList: res.data.results,
          next: res.data.next,
          previous: res.data.previous
        });
      });
    }
  }
  previous() {
      Axios.get(`${this.state.previous}`).then(res => {
        this.setState({
          todoList: res.data.results,
          next: res.data.next,
          previous: res.data.previous
        });
      });
  }
  render() {
    return (
      <div className="App">
        <Nav ref="des" data={this.state.des} addItem={this.addItem}></Nav>
        <Container
          data={this.state.todoList}
          deleteItem={this.deleteItem}
          getCurrentItem={this.getCurrentItem}
          haveDone={this.haveDone}
          pageCount={this.state.pageCount}
          handlePage={this.state.handlePage}
          getTodoList={this.getTodoList}
          nextPage={this.nextPage}
          previous={this.previous}
        ></Container>
        <Update
          data={this.state.currentItem}
          updateItem={this.updateItem}
        ></Update>
      </div>
    );
  }
}

export default App;
