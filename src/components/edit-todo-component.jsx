import React, { Component } from 'react'
import axios from 'axios'

export default class EditTodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  componentDidMount () {
    axios
      .get('http://localhost:4000/todos/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h3>Edición de tareas</h3>
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
                onChange={this.onChangeTodoPriotity}
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
                onChange={this.onChangeTodoPriotity}
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
                onChange={this.onChangeTodoPriotity}
              />
              <label className='form-check-label'>Alta</label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
