/* eslint-disable no-undef */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Container.css";
import TodoItem from "./TodeItem";

class Container extends React.Component {
  getTodoList(e) {
    var regex = /pageNum/;
    if (regex.test(e.target.parentNode.className)) {
      $(".pagination li")
        .siblings()
        .removeClass("active");
      e.target.parentNode.className = "active pageNum";
      this.props.handlePage.currentPage = parseInt(e.target.dataset.num);
      this.props.getTodoList();
    }
  }
  nextPage() {
    var newNum = this.props.handlePage.currentPage;
    this.props.handlePage.currentPage = parseInt(newNum) + 1;
    if (this.props.handlePage.currentPage > this.props.pageCount) {
      this.props.handlePage.currentPage = this.props.pageCount;
    } else {
      this.props.nextPage();
    }
  }
  previous() {
    var newNum = this.props.handlePage.currentPage;
    this.props.handlePage.currentPage = parseInt(newNum) - 1;
    if (this.props.handlePage.currentPage < 1) {
      this.props.handlePage.currentPage = 1;
    } else {
      this.props.previous();
    }
  }
  render() {
    let str = [];
    for (let i = 0; i < this.props.pageCount; i++) {
      str.push(
        <li
          key={i}
          className={
            i + 1 === this.props.handlePage.currentPage
              ? "active pageNum"
              : "pageNum"
          }
        >
          <a href="javascript:void(0);" data-num={i + 1}>
            {i + 1}
          </a>
        </li>
      );
    }
    let todos = this.props.data;
    let todoItems = todos.map(item => {
      return (
        <TodoItem
          key={item.id}
          data={item}
          deleteItem={this.props.deleteItem}
          getCurrentItem={this.props.getCurrentItem}
          haveDone={this.props.haveDone}
        />
      );
    });
    return (
      <div className="Container">
        <div className="container">
          {/* 待办事项列表 */}
          <ul className="list-group">{todoItems}</ul>
        </div>
        {/* 分页 */}
        <nav aria-label="Page navigation">
          <ul className="pagination" onClick={this.getTodoList.bind(this)}>
            <li onClick={this.previous.bind(this)}>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">上一页</span>
              </a>
            </li>
            {str}
            <li onClick={this.nextPage.bind(this)} id="next">
              <a href="#" aria-label="Next">
                <span aria-hidden="true">下一页</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Container;
