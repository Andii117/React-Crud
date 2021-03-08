import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table , Button, Container, Modal , ModalHeader, ModalBody, FormGroup, ModalFooter} from 'reactstrap'

const data = [
  {id : 1, personaje: "Naruto", anime:  "Naruto"},
  {id : 2, personaje: "Son Goku", anime:  "Drabon Ball Z"},
  {id : 3, personaje: "Yugui Moto", anime:  "Yu-Gui-Oh!"}
]

class  App extends React.Component {

  state={
    data,
    form:{
      id:"",
      personaje:"",
      anime:""
    },
    modalInserta:false
  }

  handleChange = event =>{
    this.setState({
      form:{
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({
      modalInserta: true
    });
  }

  ocultarModalInsertar=()=>{
    this.setState({
      modalInserta: false
    });
  }

  render(){
    return (
      <div className="App">
        <nav className="nav"><a href="#">Página de Anime</a></nav>
        <body className="App-body">
          <Container>
            <Button color="dark" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
            <br/><br/><br/>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Personaje</th>
                  <th>Anime</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(anime =>(
                  <tr>
                    <td>{anime.id}</td>
                    <td>{anime.personaje}</td>
                    <td>{anime.anime}</td>
                    <td><Button color="primary">Editar</Button>{"  "}
                      <Button color="danger">Eliminar</Button></td>
                    
                  </tr>
                    )
                  )
                }
              </tbody>
            </Table>
          </Container>

          <Modal isOpen={this.state.modalInserta}>
            <ModalHeader>
              <div>
                <h3>Insertar registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>id:</label>
                <input className="form-control" name="id" type="text" readOnly value={this.state.data.length+1}/>
              </FormGroup>
              <FormGroup>
                <label>Personaje: </label>
                <input className="form-control" name="personaje" type="text" onChange={this.handleChange}></input>
              </FormGroup>
              <FormGroup>
                <label>Anime: </label>
                <input className="form-control" name="anime" type="text" onChange={this.handleChange}></input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Insertar</Button>{"  "}
              <Button color="danger" onClick={()=>{this.ocultarModalInsertar()}}>Cancelar</Button>
            </ModalFooter>
          </Modal>

        </body>
      </div>
    );
  }
}

export default App;
