import React from 'react';

import ToDo from './components/todo/todo.js';
import SiteContext from './context/site.js';

export default () => {
    return (
    <SiteContext>
        <ToDo />
    </SiteContext>
    );
}
