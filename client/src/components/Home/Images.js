import React from 'react';

const Images = ({ item }) => {
  return (
    <div className="product-img">
      <img
        src={`/api/product/photo/${item._id}`}
        alt={item.name}
        className="m-3"
        width="100%"
        height="180px"
      />
    </div>
  );
};

export default Images;
