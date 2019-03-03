import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTodo from './components/create-todo-component'
import EditTodo from './components/edit-todo-component'
import TodosList from './components/todos-list-component'
import logo from './assets/task.svg'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='container-fluid'>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <a className='navbar-brand' href='https://getbootstrap.com/docs/4.3/components/navbar/'>
              <img src={logo} width='30' heigth='30' alt='todoApp' />
            </a>
            <Link to='/' className='navbar-brand'>ToDo App</Link>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item active'>
                  <Link to='/' className='nav-link'>Todos</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/create' className='nav-link'>Create</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path='/' exact component={TodosList} />
          <Route path='/edit/:id' component={EditTodo} />
          <Route path='/create' component={CreateTodo} />
        </div>
      </Router>
    )
  }
}

export default App
