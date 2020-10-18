import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import './todo.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ToDo = (props) => {
  const [list, addList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    addList([...list, item]);
  };

  const toggleComplete = id => {
    console.log('handling toggle');
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      addList(newList);
    }
    console.log(list);
  };

  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];

    addList(list);
  }, [])

    return (
      <>
        <header>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">React</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
              </Navbar>
            </Col>
          </Row>
          <Container as="nav">
            <Row>
              <Col>
                <Navbar bg="info" variant="secondary">
                  <section className="title">
                    <h2>
                      To Do List Manager ({list.filter(item => !item.complete).length})
                    </h2>
                  </section>
                </Navbar>
              </Col>
            </Row>
          </Container>
        </header>
        
        <Container as="nav">
          <Row>
            <section className="todo">
              <Col sm={4}>
                <TodoForm handleSubmit={addItem} />
              </Col>
              <Col></Col>
              <Col sm={6}>
                <TodoList list={list} handleComplete={toggleComplete}/>
              </Col>
              <Col sm={3}></Col>        
            </section>
          </Row>
        </Container>
      </>
    );
}

export default ToDo;
