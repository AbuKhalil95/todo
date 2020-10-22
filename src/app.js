import React from 'react';

import ToDo from './components/todo/todo.js';
import SiteContext from './context/site.js';
import { AuthContext } from './context/auth.js';
import Login from './components/login/login';

export default () => {
    const { context } = useContext(AuthContext);
    let okToRender = false; 

    try {
        okToRender = context.loggedIn
    } catch(e) {
        console.log("error in Auth component !")
    }

    return (
    <SiteContext>
        <If condition={okToRender}>
            <Then>
                <ToDo />
            </Then>
        </If>
        <Else>
            <When condition={!okToRender}>
                <Login />
            </When>
        </Else>
    </SiteContext>
    );
}
