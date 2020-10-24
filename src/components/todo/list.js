import React, { useEffect, useState, useContext} from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import {SiteContext} from '../../context/site.js';

import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';
import Pagination from 'react-bootstrap/Pagination'

const TodoList = (props) => {
    const {context, toggleShow} = useContext(SiteContext);
    const [active, setActive] = useState(1);
    const [showCompleted, toggleCompleted] = useState(context.showCompleted);

    let start = ((active - 1) * context.numItems);
    let end = context.numItems + ((active - 1) * context.numItems);
    let list = props.list.slice(start, end);
    let pageList = [];

    const handlePagination = (e) => {
      setActive(Number(e.target.text));
    }

    const ReturnDate = (itemDate) => {
      if (itemDate) {
        itemDate = new Date(itemDate);
        let itemTime = itemDate.getTime();
        let nowTime = new Date().getTime();

        let secondsAgo = Math.ceil((nowTime - itemTime)/1000);
        let minutesAgo = Math.ceil(secondsAgo/60);
        let hoursAgo = Math.ceil(minutesAgo/60);

        if (secondsAgo < 60) {
          return secondsAgo + ' seconds ago'
        } else if (minutesAgo < 60) {
          return minutesAgo + ' minutes ago'
        } else if (hoursAgo < 24) {
          return hoursAgo + ' hours ago'
        } else {
          return () => {
              var month = itemDate.getUTCMonth() + 1; //months from 1-12
              var day = itemDate.getUTCDate();
              var year = itemDate.getUTCFullYear();

              return year + "/" + month + "/" + day;
          }
        }
        // else {
          // return dayAgo;
        // }
      }
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
    }, [context.showCompleted, props.list])

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
              <small>{ReturnDate(item.timestamp)}</small>
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
