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
        <div>
          <iframe width="800" height="800"
                  src="https://app.powerbi.com/view?r=eyJrIjoiNzMxYWU3YzAtMzk1NC00MGRmLThjMjItMDJlNWZjY2ZkNjEzIiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9"
                  frameBorder="0" allowFullScreen="true"></iframe>
        </div>

    );
  }
}

export default withRouter(VerDetalleOpinion);
