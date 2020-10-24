import React, { useEffect, useState,useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/useAjax';
import './todo.scss';
import { SiteContext } from '../../context/site.js';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ToDo = (props) => {
  const {context, toggleShow} = useContext(SiteContext);
  const todoAPI = context.urlStorage;

  const [list, setList] = useState([]);
  const [updateList, startUpdateList] = useState([]);
  const [change, triggerChange] = useState(false);

  const [create, read, update, remove] = useAjax(todoAPI);

  const addItem = async (item) => {
    item.due = new Date();
    item.complete = false;
    console.log(item);
    create(item)
      .then(async results => {
        startUpdateList([...updateList, results.data]);
        triggerChange(!change);
      })
      .catch(console.error);
  };

  const toggleComplete = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      update(item, item._id)
      .then((result) => {
        startUpdateList(list.map(listItem => listItem._id === item._id ? item : listItem));
        triggerChange(!change);
      })
    }
  };

  const deleteItem = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    console.log('removing: ', id);
    await remove(id);
    startUpdateList(list.map((listItem, index) => listItem._id === item._id ? list.splice(index, 1) : listItem));
    triggerChange(!change);
  }

  const filterData = (data) => {

    return data.filter( i => {
      console.log(i, i.complete);
      return context.showCompleted ? i : i.complete === context.showCompleted
    });
  }

  const sortData = (data) => {
    return data.sort((a, b) => (a[context.sortType] >= b[context.sortType]) ? 1 : -1);
  }

  useEffect(() => {   // read from API storage once
    read().then(results => {
      let newData = filterData(results.data.results)
      newData = sortData(newData);

      startUpdateList(newData);
      setList(newData);
    });
  }, []);

  useEffect(() => { // re-render after changes detected
    let newData = filterData(updateList)
    newData = sortData(newData);

    setList(newData);
  }, [context, change, updateList, props]);

    return (
      <>       
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
            <Col sm={4} className="todo">
              <TodoForm handleSubmit={addItem} />
            </Col>
            <Col sm={1}></Col>
            <Col sm={6}>
              <TodoList list={list} handleComplete={toggleComplete} handleDelete={deleteItem}/>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </Container>
      </>
    );
}

export default ToDo;
