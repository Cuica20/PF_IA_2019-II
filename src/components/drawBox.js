import React, { Component } from 'react';


function orderscore(descriptor) {
    var sortable = [];
    for (var _ in descriptor) {
        sortable.push(
          [_, Math.round(descriptor[_]*100000)/100000]    
        );
    }
    
    sortable = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable
}

class DrawBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: null,
      detections: null,
      match: null,
      express: null
    };
  }
  
  componentDidMount() {
    this.getDescription();
  }

  componentWillReceiveProps(newProps) {
    console.log("newProps: ", newProps)
    this.getDescription(newProps);
  }

  getDescription = async (props = this.props) => {
    debugger;
    const { fullDesc, faceMatcher } = props;

    if (!!fullDesc) {

      await this.setState({
        descriptors: fullDesc.map(fd => fd.descriptor),
        detections: fullDesc.map(fd => fd.detection),
        expressions: fullDesc.map(fd => fd.expressions),
        ages: fullDesc.map(fd => fd.age),
        gender: fullDesc.map(fd => fd.gender),
      });

      if (!!this.state.descriptors && !!faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });


        let express = await this.state.expressions.map(descriptor => orderscore(descriptor));
        this.setState({ express });
      }

    }
  };
  
  render() {
    const { imageWidth, boxColor } = this.props;
    const { detections, match, express, ages, gender} = this.state;
    
    console.log("Age: ", ages, " gender: ", gender)

    let box = null;

    if (!!detections) {
      box = detections.map((detection, i) => {
        const relativeBox = detection.relativeBox;
        const dimension = detection._imageDims;
        let _X = imageWidth * relativeBox._x;
        let _Y =
          (relativeBox._y * imageWidth * dimension._height) / dimension._width;
        let _W = imageWidth * relativeBox.width;
        let _H =
          (relativeBox.height * imageWidth * dimension._height) /
          dimension._width;

        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: boxColor,
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!express && express[i] ? (
                <p
                  style={{
                    backgroundColor: 'black',
                    border: 'solid',
                    borderColor: boxColor,
                    width: _W,
                    marginTop: -1,
                    color: 'white',
                    border:0,
                    margin:0,
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                ({Math.ceil(ages[i])}) {gender[i]}/ {express[i][0][0]}
                </p>

              ) : null}            
              {!!match && match[i] && match[i]._label !== 'unknown' ? (
                <p
                  style={{
                    backgroundColor: boxColor,
                    border: 'solid',
                    borderColor: boxColor,
                    width: _W,
                    marginTop: -1,
                    color: '#fff',
                    border:0,
                    margin:0,
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>

              ) : null}
            </div>
          </div>
        );
      });
    }

    return <div>{box}</div>;
  }
}

export default DrawBox;
