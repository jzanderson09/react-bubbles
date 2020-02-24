import React, { Component } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

class BubblePage extends Component {
  constructor() {
    super();
    this.state = {
      colorList: []
    }
  }

  componentDidMount() {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        this.setState({ colorList: res.data });
        console.log(this.state.colorList);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='BubblePage-Container'>
        <h2>BubblePage test!</h2>
        <ColorList 
          colors={this.state.colorList} 
          />
        <Bubbles colors={this.state.colorList} />
      </div>
    );
  }
}

export default BubblePage;
