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
    modalInserta:false,
    modalEditar: false
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

  insertarAnime=()=>{
    var valor_nuevo={...this.state.form};
    valor_nuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valor_nuevo);
    this.setState({data: lista, modalInserta:false});
  }
 
  mostrarModalEditar = (anime) =>{
    this.setState({
      modalEditar: true,
      form: anime
    });
  }

  ocultarModalEditar = () =>{
    this.setState({
      modalEditar: false
    });
  }

  editarAnime=(anime)=>{
    let contador=0;
    let lista=this.state.data;
    lista.map((registro)=>{
      if(anime.id==registro.id){
        lista[contador].personaje=anime.personaje;
        lista[contador].anime=anime.anime;
      }
      contador++;
      this.setState({data:lista, modalEditar:false});
    }
    )
  }

Eliminar=(anime)=>{
  var opcion=window.confirm("Realmente desea elminar el anime"+anime.anime);
  if(opcion){
    var contador=0;
    var lista= this.state.data;
    lista.map((registro)=>{
      if(registro.id==anime.id){
        lista.splice(contador, 1);
      }
    contador++;
    this.setState({data: lista, modalEditar:false});
    })
  }
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
                    <td><Button color="primary" onClick={()=>this.mostrarModalEditar(anime)}>Editar</Button>{"  "}
                      <Button color="danger" onClick={()=>this.Eliminar(anime)}>Eliminar</Button></td>
                    
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
              <Button color="primary" onClick={()=>{this.insertarAnime()}}>Insertar</Button>{"  "}
              <Button color="danger" onClick={()=>{this.ocultarModalInsertar()}}>Cancelar</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>id:</label>
                <input className="form-control" name="id" type="text" readOnly value={this.state.form.id}/>
              </FormGroup>
              <FormGroup>
                <label>Personaje: </label>
                <input className="form-control" name="personaje" type="text" value={this.state.form.personaje} onChange={this.handleChange}></input>
              </FormGroup>
              <FormGroup>
                <label>Anime: </label>
                <input className="form-control" name="anime" type="text" value={this.state.form.anime} onChange={this.handleChange}></input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>{this.editarAnime(this.state.form)}}>Aceptar</Button>{"  "}
              <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
            </ModalFooter>
          </Modal>

        </body>
      </div>
    );
  }
}

export default App;
