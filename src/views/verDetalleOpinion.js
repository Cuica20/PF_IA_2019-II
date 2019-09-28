import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import {
  isFaceDetectionModelLoaded
} from '../api/face';

const INIT_STATE = {
  url: null,
  imageURL: null,
  fullDesc: null,
  imageDimension: null,
  error: null,
  loading: false
};

class VerDetalleOpinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      showDescriptors: false,
      isModelLoaded: !!isFaceDetectionModelLoaded(),
      caracteristicas: []
    };
    //this.componentDidMount();
  }

  componentDidMount() {
    axios.get('../json/caracteristicasFoto.json')
        .then(response => this.setState({ caracteristicas: response.data.data }))
  }

  renderUsers() {
    const { caracteristicas } = this.state

    return caracteristicas.map( user => (
        <div key={user.id}>{user.first_name} {user.last_name}</div>
    ))
  }

  render() {
    debugger;
    /*return <div>{ this.renderUsers() }</div>*/

    return (
        <div className="smartphone">
          <div className="content">
            <div className='some-page-wrapper'>
              <h2>Detalle tu opini&oacute;n</h2>
              <div className='row'>
                <div className='column'>
                  <div>
                    <img height="250" width="250" src={require('../imagenes/yuya.jpg')}/>
                  </div>
                </div>
                <div className='column'>
                  <div>
                    <p rows="4" cols="50">
                      Me gusto usar el Labial color HD Velvet
                    </p>
                    <br/>
                    <h3>Rating:</h3>
                    <p>4.5%</p>
                    <h3>Categor&iacute;a:</h3>
                    <p>Labial color HD Velvet. Rosa petal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default withRouter(VerDetalleOpinion);
