import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTodo extends Component {
  constructor (props) {
    super(props)

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  onChangeTodoDescription (e) {
    this.setState({
      todo_description: e.target.value
    })
  }

  onChangeTodoResponsible (e) {
    this.setState({
      todo_responsible: e.target.value
    })
  }

  onChangeTodoPriority (e) {
    this.setState({
      todo_priority: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()

    console.log(`Formulario cargado:`)
    console.log(`Descripción de tarea: ${this.state.todo_description}`)
    console.log(`Responsable de tarea: ${this.state.todo_responsible}`)
    console.log(`Prioridad de tarea: ${this.state.todo_priority}`)
    console.log(`Completado?  ${this.state.todo_completed}`)

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todos_completed: this.state.todo_completed
    }
    axios.post('http://localhost:4000/todos/add', newTodo)
      .then(res => console.log(res.data))

    this.setState({
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    })
  }

  render () {
    return (
      <div>
        <h2>Crear nueva tarea</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Descripción: </label>
            <input type='text'
              className='form-control'
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className='form-group'>
            <label>Responsable: </label>
            <input type='text'
              className='form-control'
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className='form-group'>
            <div className='form-check form-check-inline'>
              <input className='form-check-input'
                type='radio'
                name='priorityOptions'
                id='prorityBaja'
                value='Baja'
                checked={this.state.todo_priority === 'Baja'}
                onChange={this.onChangeTodoPriority}
              />
              <label className='form-check-label'>Baja</label>
            </div>
            <div className='form-check form-check-inline'>
              <input className='form-check-input'
                type='radio'
                name='priorityOptions'
                id='prorityMedia'
                value='Media'
                checked={this.state.todo_priority === 'Media'}
                onChange={this.onChangeTodoPriority}
              />
              <label className='form-check-label'>Media</label>
            </div>
            <div className='form-check form-check-inline'>
              <input className='form-check-input'
                type='radio'
                name='priorityOptions'
                id='prorityAlta'
                value='Alta'
                checked={this.state.todo_priority === 'Alta'}
                onChange={this.onChangeTodoPriority}
              />
              <label className='form-check-label'>Alta</label>
            </div>
          </div>
          <div className='form-group'>
            <input type='submit' value='Create ToDo' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}
