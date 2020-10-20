import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (url) => {

  const create = (data) => {
    console.log(data);
    return axios.post(url, { data })
  }

  const read = async () => {
    return await axios.get(url);
  }

  const update = (data, id) => {
    return axios.put(url + '/' + id, { data });
  }

  const remove = (id) => {
    return axios.delete(url + '/' + id);
  }

  return [create, read, update, remove];
}

export default useAjax;