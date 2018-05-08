import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Area from './components/hello.js/area';
import Marker from './components/hello.js/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      selectedArea: null,
      search: ""
    };
  }

componentDidMount() {
  const url = "https://raw.githubusercontent.com/Pleaner/diepslootData/master/data.json"
  fetch(url) //AJAX
  .then(response => response.json())
  .then(data => {
    this.setState({
      areas: data,
      allAreas: data
    })
  })
}

selectArea = (area) => {
  console.log(area)
  this.setState({
    selectedArea: area
  })
}

handleSearch = (event) => {
  this.setState({
    search: event.target.value,
    areas: this.state.allAreas.filter((area) => new RegExp(event.target.value, "i").exec(area.name))
  });
}

  render() {
    let center = {
      lat: -26.2041,
      lng: 28.0473
    }

    if(this.state.selectedArea) {
      center = {
        lat: this.state.selectedArea.lat,
        lng:this.state.selectedArea.lng
      }
    }

    return (
    <div className="app">
      <div className="main">
        <div className="search">
          <input
          type="text"
          placeholder="search..."
          value={this.state.search}
          onChange={this.handleSearch} />
        </div>
        <div className="areas">
          {this.state.areas.map((area) => {
            return <Area key={area.name}
            area={area}
            selectArea={this.selectArea} />
          })}
        </div>
      </div>
      <div className="map">
        <GoogleMapReact
          center={center}
          zoom={10}
          >
            {this.state.areas.map((area) => {
              return <Marker
              key={area.name}
              lat={area.lat}
              lng={area.lng}
              text={area.price}
              selected={area === this.state.selectedArea}/>
            })}
          </GoogleMapReact>
      </div>
    </div>
    );
  }
}

export default App;
