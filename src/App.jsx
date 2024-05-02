import { useRef, useState } from 'react';
import Form from './components/form';
import './App.css';
// import './imgs/edit.svg'

function App() {
  return (
    <>
    <header className="my-5 text-center">
      <h1 className="display-2 text-success">Todo List</h1>
    </header>
    <main className="container">
    <Form/>
    </main>
    </>
  );
}

export default App;
