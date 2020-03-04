import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 공부하기', done: true },
      { id: 1, text: '컴포넌트 스타일링 해보기', done: false }
    ]
  };

  getId = () => {
    return ++this.id;
  };
  id = 1;

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };
  handleInsert = () => {
    const { todos, input } = this.state;
    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };
    this.setState({
      todos: [...todos, newTodo],
      input: ''
    });
  };
  handleToggle = id => {
    const { todos } = this.state;
    //findIndex로 todos배열에서 id 인자와 일치하는 todo의 인덱스를 변수로 설정한다.
    const index = todos.findIndex(todo => todo.id === id);
    // todos배열에 선택한 index값을 가진 배열 요소의 done값을 반전 시킨다.
    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };
    // todos 배열에서 변경될 요소의 앞, 뒤를 슬라이스하고 변경된 값을 입력한다.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };
  handleRemove = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]
    });
  };
  render() {
    const { input, todos } = this.state;
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    return (
      <PageTemplate>
        <TodoInput
          onChange={handleChange}
          onInsert={handleInsert}
          value={input}
        />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </PageTemplate>
    );
  }
}

export default App;
