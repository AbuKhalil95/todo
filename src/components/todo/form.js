import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const TodoForm = (props) => {

  const [item, setItem] = useState({});
  const [handleSubmit, handleChange, values] = useForm(addItem);

  function addItem(item) {
    props.handleSubmit(item);
    setItem({item});
  };

  return (
    <Form onSubmit={handleSubmit} className="border">
      <h3>Add To Do Item</h3>
      <Form.Group>
        <Form.Label>To Do Item</Form.Label>
        <Form.Control type="text" name="text" placeholder="Add To Do List Item" onChange={handleChange} required/>
        <Form.Text className="text-muted">The next job in the pipeline!</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Assigned To</Form.Label>
        <Form.Control type="text" name="assignee" placeholder="Assignee Name" onChange={handleChange} required/>
      </Form.Group>
      <Form.Group controlId="formBasicRange">
        <Form.Label>Difficulty Rating</Form.Label>
        <Form.Control type="range" defaultValue="2" min="1" max="5" name="difficulty" onChange={handleChange} required />
      </Form.Group>
      <div>
        <Button variant="primary" type="submit" >Add Item</Button>
      </div>
    </Form>
  );
  
}

export default TodoForm;
