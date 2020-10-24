import React, { useEffect, useState, useContext } from 'react';

import ToDo from './components/todo/todo.js';
import Login from './components/login/login';
import Show from './components/login/show';
import {AuthContext} from './context/auth.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default () => {
    const context = useContext(AuthContext);
    const [okRender, setRender] = useState(context.loggedIn);

    const enableRender = (confirm) => {
        if (confirm) {
            setRender(true);
        } else if (!confirm) {
            setRender(false);
        }
    }

    useEffect(() => {
        enableRender(context.loggedIn);
    }, [context])

    return (
    <>
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">React</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Login getAuth={enableRender} />
                </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <Show condition={okRender}>
            <ToDo />
        </Show>
    </>
    );
}
