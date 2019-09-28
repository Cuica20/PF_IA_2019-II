import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import FaceRecognition from './views/faceRecognition';
import CameraFaceDetect from './views/cameraFaceDetect';
import CargarOpinion from './views/cargarOpinion';
import VerOpinion from './views/verOpinion';
import VerDetalleOpinion from './views/verDetalleOpinion';
import VerRecomendacion from './views/verRecomendacion';
import CaracteristicasFoto from './views/caracteristicasFoto';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
          <div className="route">
            <Header />
            <Route exact path="/" component={CameraFaceDetect} />
            <Route exact path="/photo" component={FaceRecognition} />
            <Route exact path="/caracteristicasFoto" component={CaracteristicasFoto} />
            <Route exact path="/cargarOpinion" component={CargarOpinion} />
            <Route exact path="/verOpinion" component={VerOpinion} />
            <Route exact path="/verDetalleOpinion" component={VerDetalleOpinion} />
            <Route exact path="/verRecomendacion" component={VerRecomendacion} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
