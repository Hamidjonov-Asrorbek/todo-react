import React from "react";
import { useRef, useState, useEffect } from 'react';
import Modal from "../Modal";
import del from '/src/assets/delete.svg';
import edit from '/src/assets/edit.svg';
import './style.css'


export default function Form(){
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) ?? []);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos]);

  const [modal, setModal] = useState({
    show: false,
    todoId: "",
    todoText: "",
  });
  
  
  // const input = useRef();
  
  // form create
  function FormSubmit(e){
    e.preventDefault();
    // let newTodo = input.current.value;
    // input.current.value = ""
    let date = new Date();
    let newTodo = {
      id: date.getTime(),
      text,
      time: getTime(),
    }
    setTodos((prev) => [...prev, newTodo]);
    setText('');
  }

  // ************************

  // delete todo
  function deleteTodo(todoId){
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId))
  };
  // ****************
  
  // time

  function getTime(){
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    return `${hour}:${minute}, ${date}`;
}
  
  // html return
  return  (
    <>
    <form id="form-create" className="mb-3" onSubmit={FormSubmit}>
    <div className="mb-3">
      <input
        onChange={(e) =>{
          setText(e.target.value);
        }}
        value = {text}
        id="inputCreate"
        type="text"
        className="mb-1 form-control"
        placeholder="Enter todo..."
        required
        />
        <button id="add_btn" className="btn btn-outline-primary d-block ms-auto">Add</button>
        <span id="message-create" className="text-danger d-block"></span>
      </div>
    </form>
  <ul id="list-group-todo" className="list-group d-flex justify-content-between">
                 {todos.length ? 
                  todos.map(({id, text, time}) => {
                    return (<li className='list-group-item' key={id}>
                    <p>{text}</p>
                    <div className='align-items-center gap-5'>
                        <span className='opacity-50 me-2'>{time}</span>
                        <img src={edit} onClick={() => setModal((prev) =>{
                          return {...prev, show:true, todoId: id, todoText:text}
                        })} width='25' style={{marginInline: "10px"}} alt="edit"/>
                        <img src={del} onClick={() => deleteTodo(id)} width='25' alt="delete"/>
                    </div>
                  </li>);
                 }): "No todos :)"}
  </ul>
  {modal.show && <Modal setTodos = {setTodos} itemId = {modal.todoId} itemText = {modal.todoText} closeModal={setModal}/>}
  </>)
}
