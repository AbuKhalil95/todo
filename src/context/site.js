import React, {useState} from 'react';

export const SiteContext = React.createContext();

function SiteProvider(props) {

    const [showCompleted, setShowCompleted] = useState(true);
    const [numItems, setNumItems] = useState(3);
    const [sortType, setSortType] = useState('difficulty');

    const state = {
        showCompleted, 
        numItems, 
        sortType,
        setShowCompleted,
        setNumItems,
        setSortType
    }

    return (
        <SiteContext.Provider value={state}>
            {props.children}
        </SiteContext.Provider>
    )
} 

export default SiteProvider;