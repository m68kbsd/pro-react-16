import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "thinkpad.co.ke",
      todoItems: [{ action: "Buy Domain Name", done: true},
                  { action: "Draw Business plan", done: false},
                  { action: "Develop Business Application", done: false},
                  { action: "Get Sample thinkpads for sale", done: false},
                  { action: "Integrate Payments and Shipping methods to Clients", done: false},
                  { action: "Host application on Vultr OpenBSD", done: true}],
      newItemText: ""
    }
  }

  updateNewTextValue = (event) => {
    this.setState({newItemText: event.target.value});
  }

  createNewTodo = () => {
    if (!this.state.todoItems
          .find(item => item.action === this.state.newItemText)) {
      this.setState({
        todoItems: [...this.state.todoItems,
          {action: this.state.newItemText, done: false}],
        newItemText: ""
      });
    }
  }

  toggleTodo = (todo) => this.setState({
    todoItems:
      this.state.todoItems.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item)
  })

  todoTableRows = () => this.state.todoItems.map(item =>
    <tr key={item.action}>
      <td>{item.action}</td>
      <td>
        <input type="checkbox" checked={item.done}
          onChange={() => this.toggleTodo(item)} />
      </td>
    </tr>);       

  render = () => 
    <div className="App">
      <h4 className="bg-primary text-white text-center p-2">
        {this.state.userName}'s To-Do List
        ({this.state.todoItems.filter(t => !t.done).length} items to do)
      </h4>
      <div className="container-fluid">
        <div className="my-1">
          <input className="form-control"
            value={this.state.newItemText}
            onChange={this.updateNewTextValue} />
          <button className="btn btn-primary mt-1"
            onClick={this.createNewTodo}>Add</button>
        </div>
        <table className="table table-stripped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.todoTableRows()}</tbody>
        </table>
      </div>
    </div>
}

export default App;
