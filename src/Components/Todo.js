import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

export const Todo = () => {

  const apiUrl = 'http://localhost:3000'
  const apiUrlDeployed = 'http://localhost:3000'

  const [title, setTitle] = useState("");
  const [newItems, setNewItems] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${apiUrl}/user/todo/${token}`
      );
      setData(response.data.result.list);
    };
    fetchData();
  },[]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNewItemChange = (e, listIndex) => {
    const newItemsCopy = [...newItems];
    newItemsCopy[listIndex] = e.target.value;
    setNewItems(newItemsCopy);
  };

  const handleAddList = async (e) => {
    const obj = { name: title,
    items: [] };
    data.push(obj)
    const setTitleResponse = await axios.post(
      `${apiUrl}/user/list/${token}`,
      { obj }
    );
    setData(setTitleResponse.data.result.list);
    
    setTitle("");
  };

  const handleAddItem = async (list, listIndex) => {
    const newItem = newItems[listIndex];
    const obj = {
      title: newItem,
      listId: list._id
    };
    const addTodoResponse = await axios.post(
      `${apiUrl}/user/todo/${token}`,
      { obj }
    );
    setData(addTodoResponse.data.result.list)
  };


  const handleEditItem = async(item, newTitle) => {
    const obj = {
      todoId: item._id,
      title: newTitle
    }
    const editDataResponse = await axios.put(
        `${apiUrl}/user/todo/${token}`,
        { obj }
    );
  
    setData(editDataResponse.data.result.list);

  };

  const handleEditList = async(item, newTitle) => {
    const obj = {
      listId: item._id,
      name: newTitle
    }
    const editDataResponse = await axios.put(
        `${apiUrl}/user/list/${token}`,
        { obj }
    );
  
    setData(editDataResponse.data.result.list);

  };

  const handleDeleteItem = async(item) => {
    const obj = {
      todoId: item._id 
    }
    const deleteDataResponse = await axios.post(
        `${apiUrl}/user/deltodo/${token}`,
        { obj }
    );
  
    setData(deleteDataResponse.data.result.list);
  };

  const handleDeleteList = async(item) => {
    const obj = {
      listId: item._id 
    }
    const deleteDataResponse = await axios.post(
        `${apiUrl}/user/dellist/${token}`,
        { obj }
    );
  
    setData(deleteDataResponse.data.result.list);
  };

  return (
    <div className="container mt-4 ">
      <Card>
        <Card.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter list title"
              value={title}
              onChange={handleTitleChange}
            />
            <Button className="mt-2 mx-2" onClick={handleAddList}>
              Add List
            </Button>
          </Form.Group>
        </Card.Body>
      </Card>

      {data.map((list, listIndex) => (
  <Card key={listIndex} className="mt-4 box col-6">
    <Card.Body>
    <div className="d-flex justify-content-between">
        <Form.Control
          type="text"
          placeholder="Enter item"
          value={newItems[listIndex]}
          onChange={(e) => handleNewItemChange(e, listIndex)}
        />
        
        <Button
          variant="success"
          className="mx-2"
          onClick={() => handleAddItem(list, listIndex)}
        >
          Add Item
        </Button>
      </div>
      <hr />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Enter list title"
          value={list.name}
          onChange={(e) => handleEditList(list,e.target.value)}
        />
        <Button
          variant="danger"
          className="mt-2 mx-2"
          onClick={() => handleDeleteList(list)}
        >
          Delete List
        </Button>
      </Form.Group>
      <hr />
      <ul>
        {list.items.map((item, itemIndex) => (
          <li key={itemIndex}>
            <div className="d-flex justify-content-between">
              <Form.Control
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleEditItem(item, e.target.value)
                }
              />

              <Button
              className="mx-2"
                variant="danger"
                onClick={() => handleDeleteItem(item)}
              >
                Delete Item
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
))}
    </div>
  );
};
