import React from "react";
import { useRef, useState } from 'react';
import del from '/src/assets/delete.svg';
import edit from '/src/assets/edit.svg';
import './style.css'


export default function Form(){
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("")
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
    }
    setTodos((prev) => [...prev, newTodo])
    setText('');
  }
  // ************************

  // delete todo
  function deleteTodo(todoId){
    setTodos((prev) =>{
      prev.filter((todo) =>{
        return todo.id !== todoId;
      })
    })
  }
  // ****************
  console.log(todos);
  
  // html return
  return  (
    <>
    <form id="form-create" className="mb-3" onSubmit={FormSubmit}>
    <div className="mb-3">
      <input
        onChange={(e) =>{
          setText(e.target.value);
        }}
        value={text}
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
                 {/* todo create */}
                 {todos.length ? 
                  todos.map(({id, text}) => {
                    return <li className='list-group-item' key={id}>
                    <p>{text}</p>
                    <div className='align-items-center gap-5'>
                        <span className='opacity-50 me-2'></span>
                        <img src={edit} width='25' style={{marginRight: "10px"}} alt="edit"/>
                        <img src={del} onClick={() => {deleteTodo(id)}} width='25' alt="delete"/>
                    </div>
                  </li>
                 }): "No todos :)"}
                 {/* **************** */}
  </ul>
  </>)
}
