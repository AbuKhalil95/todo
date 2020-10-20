import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/useAjax';
import './todo.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const todoAPI = 'https://abukhalil-api-backend.herokuapp.com/api/v1/todo';

const ToDo = (props) => {
  const [list, setList] = useState([]);
  const [create, read, update, remove] = useAjax(todoAPI);

  const addItem = async (item) => {
    item.due = new Date();
    create(item)
      .then(results => {
        setList([...list, results.data.results])
      })
      .catch(console.error);
  };

  const toggleComplete = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      update(JSON.stringify(item), item._id)
      .then((result) => {
        console.log(result);
        setList(list.map(listItem => listItem._id === item._id ? item : listItem))
      })
    }
  };


  useEffect(() => {
    read().then(results => {
      setList(results.data.results);
    });
  }, []);

    return (
      <>
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">React</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
            </Nav>
          </Navbar>
        </header>
        
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
        <Container>
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
