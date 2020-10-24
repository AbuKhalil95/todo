import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (url) => {

  const create = async (data) => {
    console.log(data);
    return await axios.post(url, data);
  };

  const read = async () => {
    return await axios.get(url);
  };

  const update = async (data, id) => {
    return await axios.put(url + '/' + id, data);
  };

  const remove = async (id) => {
    return await axios.delete(url + '/' + id);
  };

  return [create, read, update, remove];
};

export default useAjax;