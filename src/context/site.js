import React, {useState} from 'react';

export const SiteContext = React.createContext();

function SiteProvider(props) {
  // url
  const [urlStorage, setUrl] = useState('https://abukhalil-api-backend.herokuapp.com/api/v1/todo');

  const [showCompleted, setShowCompleted] = useState(true);
  const [numItems, setNumItems] = useState(3);
  const [sortType, setSortType] = useState('difficulty');

  const context = {
    urlStorage,
    showCompleted, 
    numItems, 
    sortType,
    setUrl,
    setShowCompleted,
    setNumItems,
    setSortType,
  };

  return (
    <SiteContext.Provider value={{context}}>
      {props.children}
    </SiteContext.Provider>
  );
} 

export default SiteProvider;