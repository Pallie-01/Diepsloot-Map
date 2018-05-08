import React from "react";
import "./area.css";

class Area extends React.Component {
  handleClick = () => {
    //call the parent method selectFlat
    this.props.selectArea(this.props.area);
  }
  render() {
    const title = this.props.area.price + this.props.area.priceCurrency + ' - ' + this.props.area.name;

    const style = {
      backgroundImage: `url('${this.props.area.imageUrl}')`
    };

    return (
      <div className="area" onClick={this.handleClick}>
        <div className="area-picture"style={style}></div>
        <div className="area-title">{title}
        </div>
      </div>
    );
  }
}

export default Area ;
