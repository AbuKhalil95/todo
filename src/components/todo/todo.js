import React, { useEffect, useState,useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/useAjax';
import './todo.scss';
import { SiteContext } from '../../context/site.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const todoAPI = 'https://abukhalil-api-backend.herokuapp.com/api/v1/todo';

const ToDo = (props) => {
  const context = useContext(SiteContext);

  const [list, setList] = useState([]);
  const [updateList, startUpdateList] = useState([]);

  const [create, read, update, remove] = useAjax(todoAPI);

  const addItem = async (item) => {
    item.due = new Date();
    item.complete = false;
    console.log(item);
    create(item)
      .then(results => {
        console.log(results);
        startUpdateList([...list, results.data.results])
      })
      .catch(console.error);
  };

  const toggleComplete = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      update(item, item._id)
      .then((result) => {
        console.log(result);
        startUpdateList(list.map(listItem => listItem._id === item._id ? item : listItem))
      })
    }
  };

  const deleteItem = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    console.log('removing: ', id);
    await remove(id);
    startUpdateList(list.map((listItem, index) => listItem._id === item._id ? list.splice(index, 1) : listItem))
  }

  useEffect(() => {
    read().then(results => {
      let newList = results.data.results.filter( i => {
        return context.showCompleted ? i : i.complete === context.showCompleted
      });

      newList = newList.sort((a, b) => (a[context.sortType] > b[context.sortType]) ? 1 : -1);
      startUpdateList(newList);
    });
  }, []);

  useEffect(() => {
    setList(updateList);
  }, [updateList]);

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
              <Col sm={1}></Col>
              <Col sm={6}>
                <TodoList list={list} handleComplete={toggleComplete} handleDelete={deleteItem}/>
              </Col>
              <Col sm={3}></Col>
            </section>
          </Row>
        </Container>
      </>
    );
}

export default ToDo;
