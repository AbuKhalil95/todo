import React, {useState} from 'react';

export const SiteContext = React.createContext();

function SiteProvider(props) {

    const [showCompleted, setShowCompleted] = useState(true);
    const [numItems, setNumItems] = useState(3);
    const [sortType, setSortType] = useState('difficulty');

    const context = {
        showCompleted, 
        numItems, 
        sortType,
        setShowCompleted,
        setNumItems,
        setSortType
    }

    function toggleShow() {
        setShowCompleted(!showCompleted);
    }

    return (
        <SiteContext.Provider value={{context, toggleShow}}>
            {props.children}
        </SiteContext.Provider>
    )
} 

export default SiteProvider;