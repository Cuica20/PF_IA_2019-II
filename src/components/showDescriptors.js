import React, { Component } from 'react';
import './stye_description.css';

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

class ShowDescriptors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptors: [],
      names: [],
      isOpen: false
    };
  }
  
  componentWillMount() {
    this.update();
  }

  componentWillReceiveProps(newProps) {
    this.update(newProps);
  }

  update = (props = this.props) => {
    let { fullDesc } = props;

    if (!!fullDesc) {
      this.setState({
        descriptors: fullDesc.map(fd => fd.descriptor),
        names: range(0, fullDesc.length -1)
      });
    }
  };

  toggleModal = () => {
    this.setState({
      isOpen: false
    });
  }
  
  render() {
    const { descriptors } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center'
        }}
      >
        <h3>Detail Descriptions</h3>
        
        <div id="overlay">
           <div class="loader"id="laoder">
           </div>
        </div>

        <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => this.closeModal()}>&times;</span>
          <p id='msje'></p>
        </div>

      </div>

        {!!descriptors
          ? descriptors.map((descriptor, i) => (
              <form
                key={i}
                style={{
                  padding: 10,
                  margin: 20,
                  wordBreak: 'break-all',
                  borderStyle: 'solid',
                  borderColor: 'blue'
                }}
              >
                <input name="tag"
                type="text"
                id={i}
                placeholder={i}
                ref={(c) => this.title = c}
                onChange={() => this.fixName(i)}
                onClick={() => this.fixName(i)}
                />

                <button type="button"
                 onClick={() => this.onSubmit(i, descriptor)}
                 className="btn">
                 Añadir registro
                </button>

                <div
                ref={(dd) => this.descrip = dd}
                >{descriptor}</div>
              </form>
            ))
          : null}
      </div>
    );
  }
  onSubmit(i, descriptor) {
    var result = Object.keys(descriptor).map(function(key) {
      return descriptor[key];
    });

    const res = {
       method: 'POST',
       body: JSON.stringify({
        'name': this.state.names[i],
        'descriptor': result
       }),
       headers: new Headers({
         'Content-type': 'application/json'
       }),
     };

     // Muestro loading
     var overlay1 = document.getElementById("overlay")
     overlay1.style.display = "block";

     // Limpio el mensaje de salida
     var mymodal = document.getElementById("myModal")
     var msje = document.getElementById("msje")
     //msje.innerHTML = ''
     mymodal.style.display = "none";

     // Inicio POST
     fetch('https://hrws8ne1hk.execute-api.us-east-1.amazonaws.com/dev/v1/struct', res).then(res => res.json())
     .then(result => {
        if(result.status == 'error'){
          var error = result.message
          overlay1.style.display = "none";
          console.log("error: ", typeof(error), String(error));
          msje.style.color = "red";
          msje.innerHTML = 'Error:, ' + String(error)
          mymodal.style.display = "block";
        }else{
          overlay1.style.display = "none";
          console.log("//////////// result:", result);
          msje.style.color = "green";
          msje.innerHTML = 'Registro satisfactorio: ' + JSON.stringify(result)
          mymodal.style.display = "block";
      }
     }).catch(function(error) {
        overlay1.style.display = "none";
        console.log("error: ", typeof(error), String(error));
        msje.style.color = "red";
        msje.innerHTML = 'Error de conexion, ' + String(error)
        mymodal.style.display = "block";
    });

  };

  closeModal(){
    var mymodal = document.getElementById("myModal")
    mymodal.style.display = "none";
    window.location.reload();
  };

  fixName(i) {
    var name = document.getElementById(i).value
    this.state.names[i] = name
  }

}

export default ShowDescriptors;
