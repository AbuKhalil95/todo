import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const TodoList = (props) => {

    return (
      <ListGroup>
        {props.list.map(item => (
          <ListGroup.Item action variant={!item.complete ? "success" : "danger"}
          className={`complete-${item.complete.toString()}`}
          key={item._id}
          onClick={() => props.handleComplete(item._id)}>
            <span style={{textDecorationLine: item.complete ? 'line-through': "none"}}>
              {item.text}
            </span>          
          </ListGroup.Item>
        ))}
      </ListGroup>
    );

}

export default TodoList;
