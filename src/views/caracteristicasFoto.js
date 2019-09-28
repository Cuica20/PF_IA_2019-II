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

class CaracteristicasFoto extends Component {
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

  /*componentDidMount() {
    axios.get('../json/caracteristicasFoto.json')
        .then(response => this.setState({ caracteristicas: response.data.data }))
  }*/

  /*componentDidMount() {
    const url = 'https://hrws8ne1hk.execute-api.us-east-1.amazonaws.com/dev/v1/data';
    axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ caracteristicas: data })
          console.log(this.state.caracteristicas)
        })
  }*/

  /*renderUsers() {
    const { caracteristicas } = this.state

    debugger;
    return caracteristicas.map( user => (
        <div key={user.data.nombre}>{user.data.nombre} {user.data.nombre}</div>
    ))
  }*/

  render() {
    /*return <div>{ this.renderUsers() }</div>*/

    return (
        <div className="smartphone">
          <div className="content">
            <div>
              <div>
                <table>
                  <tr>
                    <th>Nombre Cliente</th>
                    <th>Edad</th>
                    <th size="1" width="5%">Sexo</th>
                    <th>Emoci&oacute;n</th>
                    <th>Fecha</th>
                  </tr>
                  <tr>
                    <td width="5%">Victor Villacorta</td>
                    <td width="5%">30</td>
                    <td width="5%">Male</td>
                    <td width="5%">Neutral</td>
                    <td width="5%">01/11/2019 11:00:01</td>
                  </tr>
                  <tr>
                    <td width="5%">Javier Cuicapuza</td>
                    <td width="5%">28</td>
                    <td width="5%">Male</td>
                    <td width="5%">Happy</td>
                    <td width="5%">01/10/2019 12:00:01</td>
                  </tr>
                  <tr>
                    <td width="5%">Jhosep Vega</td>
                    <td width="5%">36</td>
                    <td width="5%">Male</td>
                    <td width="5%">Happy</td>
                    <td width="5%">01/12/2019 18:34:01</td>
                  </tr>
                  <tr>
                    <td width="5%">Jonathan Quiza</td>
                    <td width="5%">27</td>
                    <td width="5%">Male</td>
                    <td width="5%">Neutral</td>
                    <td width="5%">01/11/2019 15:00:01</td>
                  </tr>
                  <tr>
                    <td width="5%">Rosa Soto</td>
                    <td width="5%">27</td>
                    <td width="5%">Female</td>
                    <td width="5%">Happy</td>
                    <td width="5%">15/12/2019 11:00:01</td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(CaracteristicasFoto);
