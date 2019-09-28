import React, { Component } from 'react';
import axios from 'axios'
import { withRouter,BrowserRouter, Route,Redirect } from 'react-router-dom';
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

class VerOpinion extends Component {
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
      return <Redirect to='/verDetalleOpinion' />
    }
  }

  render() {
    debugger;
    /*return <div>{ this.renderUsers() }</div>*/

    return (
        <div className="smartphone">
          <div className="content">
            <div className='some-page-wrapper'>
              <h2>Ver tu opini&oacute;n</h2>
              <div className='row'>
                <div className='column'>
                  <div>
                    <img height="150" width="200" src={require('../imagenes/yuya.jpg')}/>
                  </div>
                </div>
                <div className='column'>
                  <div>
                    <p rows="4" cols="50">
                      Me gusto usar el Labial color HD Velvet
                    </p>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect}>Ver m&aacute;s</button>
                  </div>
                </div>
              </div>
              <br/>
              <div className='row'>
                <div className='column'>
                  <div>
                    <img height="150" width="200" src={require('../imagenes/yuya2.jpg')}/>
                  </div>
                </div>
                <div className='column'>
                  <div>
                    <p rows="4" cols="50">
                      Me gusto usar el Labial color HD Velvet
                    </p>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect}>Ver m&aacute;s</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(VerOpinion);
