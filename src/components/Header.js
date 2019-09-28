import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="Navbar">
          <Link to="/">A tu medida</Link>
          <Link to="/caracteristicasFoto">Caracter&iacute;sticas de la foto</Link>
          <Link to="/photo">Comparte tu experiencia</Link>
          <Link to="/cargarOpinion">Cargar tu opini&oacute;n</Link>
          <Link to="/verOpinion">Ver tu opini&oacute;n</Link>
          <Link to="/verRecomendacion">Ver tu Recomendaci&oacute;n</Link>
        </div>
      </header>
    );
  }
}

export default Header;
