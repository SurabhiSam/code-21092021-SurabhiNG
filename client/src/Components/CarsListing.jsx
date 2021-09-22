import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProductCard from "./ProductCard";

const CarsListing = () => (
  <Query
    query={gql`
      {
        cars {
          id
          name
          image
          createdAt
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.cars.map((car, key) => (
        <ProductCard car={car} key={car.id} />
      ));
    }}
  </Query>
);
export default CarsListing;
