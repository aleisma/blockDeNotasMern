import React, { Component } from 'react';


class App extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);


       }

       addTask(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/tasks/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.title,
              description: this.state.description
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'Tarea Actualizada!'});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTask();
            });
        } else {
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              M.toast({html: 'Tarea Guardada :D '});
              this.setState({title: '', description: ''});
              this.fetchTask();
            })
            .catch(err => console.error(err));
        }
    
      }
    componentDidMount(){
        this.fetchTask();

    }
    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
            //console.log(this.state.tasks);

            });
            
    }

    deleteTask(id) {
        if(confirm('¿Seguro que quieres eliminar esta tarea?')) {
          fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              M.toast({html: 'Tarea Eliminada :('});
              this.fetchTask();
            });
        }
      }
    editTask(id) {
        fetch(`/api/tasks/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              title: data.title,
              description: data.description,
              _id: data._id
            });
          });
      }
    
    

    handleChange(e){
      const {name,value} = e.target;
      this.setState({
           [name] : value        
      });


    }
    render(){
        return(
            <div>
                {/*NAVIGATION */  }
                <nav className="light-blue darken-10">
                
                <div className="container">
                
                <a className="brand-logo" href="/">
                <i className="large material-icons">event_note</i>
                Lista de Tareas    </a>
                </div>
                </nav>
                <div className="container">
                <div className="row">
                <div className="col s5">
                <div className="card">
                <div className="card-content">
                <form onSubmit={this.addTask}>
                    <div className="row">
                    <div className="input-field col s12"> 
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Titulo de Tarea" value={this.state.title} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="input-field col s12"> 
                    <textarea className="materialize-textarea"name="description" onChange={this.handleChange} placeholder="Descripción" value={this.state.description}></textarea>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col s10 offset-s1 center-align"> 
                    <button  type="submit" className="btn light-blue darken-12"> Enviar
                    <i className="material-icons right">send</i>
                    </button>
                    </div>
                    </div>

                </form>
                </div>
                </div>
                </div>
                <div className="col s7">
                <table>
                    <thead>
                       <tr>
                           <th>Título</th>
                           <th>Descripción</th>
                           </tr> 
                    </thead>
                    <tbody>
                       {
                           this.state.tasks.map(task => {
                               return(
                                <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <button style={{margin:'4px'}} className="btn-floating btn-large waves-effect waves-light blue" onClick={() => this.editTask(task._id)}> <i className="material-icons">edit</i></button>
                                    <button className="btn-floating btn-large waves-effect waves-light red" onClick={() => this.deleteTask(task._id)}> 
                                    <i className="material-icons">delete</i></button>
                                </td>
                            </tr>
                               )
                           })
                       }
                    </tbody>
                </table>
                
                </div>
               

                </div>

                </div>



            </div>
        )
     }
}  
export default App;