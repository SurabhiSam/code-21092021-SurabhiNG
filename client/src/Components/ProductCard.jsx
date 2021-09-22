import React from "react";

function ProductCard(props) {
  console.log(props);
  return (
    <div className="card col-md-3 m-2">
      <img
        className="card-img-top"
        src={props.car.image}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.car.name}</h5>
        <p className="card-text">{props.car.description}.</p>
        <a href="#" class="btn btn-primary">
          View
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
