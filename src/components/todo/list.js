import React, { useEffect, useState, useContext} from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import {SiteContext} from '../../context/site.js';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Pagination from 'react-bootstrap/Pagination'

const TodoList = (props) => {
    const {context, toggleShow} = useContext(SiteContext);
    const [active, setActive] = useState(1);
    const [showCompleted, toggleCompleted] = useState(context.showCompleted);
    let start = ((active - 1) * context.numItems);
    let end = context.numItems + ((active - 1) * context.numItems);
    let list = props.list.slice(start ,end);
    let pageList = [];
    
    const handlePagination = (e) =>{
      setActive(Number(e.target.text));
    }

    for (let i = 1; i <= Math.ceil(props.list.length / context.numItems); i++) {
      pageList.push(
        <Pagination.Item key={i} active={i === active} disabled={i === active} onClick ={handlePagination} >
          {i}
        </Pagination.Item>
      );
    }

    useEffect(() => {
      console.log('toggling locally')
      toggleCompleted(!showCompleted);
    }, [context])

  return (
    <ListGroup>
      <div className='custom-control custom-switch'>
        <input type='checkbox' className='custom-control-input' id='customSwitches' readOnly
        onChange={toggleShow}
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          {showCompleted ? "  Without completed" : "  With completed"}
          </label>
      </div>
      {list.map(item => (
        <ListGroup.Item
        className={`complete-${item.complete}`}
        key={item._id}>
          <Toast onClose={() => props.handleDelete(item._id)} onClick={() => props.handleComplete(item._id)}>
            <Toast.Header>
              <Badge pill variant={!item.complete ? "success" : "danger"}>{!item.complete ? "Pending" : "Complete"}</Badge>{' '}
              <strong className="mr-auto">{item.assignee}</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              <span style={{textDecorationLine: item.complete ? 'line-through': "none"}}>
                {item.text}
              </span>
              <small>Difficulty: {item.difficulty}</small>
            </Toast.Body>
          </Toast>
        </ListGroup.Item>
      ))}
      <Pagination>{pageList}</Pagination>   
    </ListGroup>
  );

}

export default TodoList;
