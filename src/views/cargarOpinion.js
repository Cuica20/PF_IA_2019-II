import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';

import {Redirect, withRouter} from 'react-router-dom';
import {
  createMatcher, getFullFaceDescription,
  isFaceDetectionModelLoaded, loadModels
} from '../api/face';
import DrawBox from "../components/drawBox";
import ShowDescriptors from "../components/showDescriptors";
import {JSON_PROFILE} from "../common/profile";

const MaxWidth = 300;
const boxColor = '#4da1b8';
const testImg = require('../img/test.jpg');

const INIT_STATE = {
  url: null,
  imageURL: null,
  fullDesc: null,
  imageDimension: null,
  error: null,
  loading: false
};

class CargarOpinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded(),
      caracteristicas: []
    };
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
    await this.matcher();
  };

  matcher = async () => {
    const faceMatcher = await createMatcher(await JSON_PROFILE());
    this.setState({ faceMatcher });
  };

  handleFileChange = async event => {
    this.resetState();
    if(event.target.files.length > 0){
      await this.setState({
        imageURL: URL.createObjectURL(event.target.files[0]),
        loading: true
      });
      this.handleImageChange();
    }
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = async () => {
    this.resetState();
    let blob = await fetch(this.state.url)
        .then(r => r.blob())
        .catch(error => this.setState({ error }));

    if (!!blob && blob.type.includes('image')) {
      this.setState({
        imageURL: URL.createObjectURL(blob),
        loading: true
      });
      this.handleImageChange();
    }
  };

  handleImageChange = async (image = this.state.imageURL) => {
    await this.getImageDimension(image);
    console.log("@@@@@ this.state: ", this.state)

    await getFullFaceDescription(image, this.state.WIDTH, this.state.HEIGHT).then(fullDesc => {
      this.setState({ fullDesc, loading: false });
    });
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/verOpinion' />
    }
  }

  /*loadDropdown(){
    const res = {
      method: 'POST',
      body: JSON.stringify({
        'codigoConsultora': '',
        'textoBusqueda': '',
        'paginacion': '{ "numeroPagina": 0, "cantidad": 1 }',
        'orden':'{ "campo": "ORDEN", "tipo": "asc" }',
        'filtro':'[\n' +
            '       {\n' +
            '          "NombreGrupo": "Secciones",\n' +
            '          "Opciones": [ { "IdFiltro": "sec-cat", "NombreFiltro": "Catalogo" } ]\n' +
            '        }\n' +
            '     ]',
        'configuracion':'{\n' +
            '          "sociaEmpresaria": "0",\n' +
            '          "suscripcionActiva": "False",\n' +
            '          "mdo": "False",\n' +
            '          "rd": "False",\n' +
            '          "rdi": "False",\n' +
            '          "diaFacturacion": 0,\n' +
            '          "esFacturacion": false\n' +
            '     }'
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNyIjoiYXBwUE9DIiwiaWF0IjoxNTY3ODA4NzEwLCJleHAiOjE1Njc4OTUxMTB9.nAQfJYcFbSBMjePP4UDGxLGLdxo7WmtVyaQnXIetv0w'
      }),
    };

    // Inicio POST
    fetch('https://api-qa.belcorp.biz/v2/products/PE/201914/sb-web', res).then(res => res.json())
        .then(result => {
          if(result.status == 'error'){
            var error = result.message
            console.log("error: ", typeof(error), String(error));
          }else{
            debugger;
            console.log("//////////// result:", result);
          }
        }).catch(function(error) {
      console.log("error: ", typeof(error), String(error));
    });

  }*/

  render() {

    /*return <div>{ this.renderUsers() }</div>*/
    const {
      WIDTH,
      HEIGHT,
      imageURL,
      fullDesc,
      faceMatcher,
      showDescriptors,
      isModelLoaded,
      error,
      loading
    } = this.state;

    let spinner = (
        <div
            style={{
              margin: 0,
              color: '#4da1b8',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textShadow: '2px 2px 3px #fff'
            }}
        >
          <div className="loading" />
          <h3>Processing...</h3>
        </div>
    );

    return (
        <div className="smartphone">
          <div className="content">
            <div>
              <div align="center">
                <h2>Carga tu opini&oacute;n</h2>

                <div>
                  <div
                      style={{
                        position: 'relative',
                        width: WIDTH,
                        height: HEIGHT
                      }}
                  >
                    {!!imageURL ? (
                        <div
                            style={{
                              position: 'relative'
                            }}
                        >
                          <div style={{ position: 'absolute' }}>
                            <img style={{ width: WIDTH }} src={imageURL} alt="imageURL" />
                          </div>
                        </div>
                    ) : null}
                    {loading ? spinner : null}
                  </div>
                  <div
                      style={{
                        width: WIDTH,
                        padding: 10,
                        marginTop: 10
                      }}
                  >
                    <p>Cargue una imagen desde su dispositivo</p>
                    <input
                        id="myFileUpload"
                        type="file"
                        onChange={this.handleFileChange}
                        accept=".jpg, .jpeg, .png"
                    />
                    <br />

                    {!!showDescriptors ? <ShowDescriptors fullDesc={fullDesc} /> : null}
                  </div>
                </div>
                <div>
                  <h2 align="center">Descripci&oacute;n</h2>

                  <textarea rows="4" cols="50">
            Me gusto usar el Labial color HD Velvet
            </textarea>
                  <br/>
                  <select>
                    <option value="volvo">Labial color HD Velvet. Rosa petal</option>
                    <option value="saab">Esmalte profesional 6 en 1 para uñas. Café miel</option>
                    <option value="opel">Miss Sexy</option>
                    <option value="audi">Reloj golden Night</option>
                  </select>
                  <br/>
                  <br/>
                  <style type="text/css">
                    {`
                  .btn-flat {
                    background-color: gray;
                    color: white;
                  }
              
                  .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                  }
                  `}
                  </style>
                  {this.renderRedirect()}
                  <Button onClick={this.setRedirect} variant="flat" size="xxl">
                    Cargar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(CargarOpinion);
