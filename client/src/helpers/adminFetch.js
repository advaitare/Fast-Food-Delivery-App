//---------------Categories Fetch
export const createCategory = (userId, token, category) => {
  return fetch(`http://localhost:5000/api/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`http://localhost:5000/api/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (userId, token, categoryId) => {
  return fetch(
    `http://localhost:5000/api/category/${categoryId}/${userId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategory = categoryId => {
  return fetch(`http://localhost:5000/api/category/${categoryId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateCategory = (userId, token, categoryId, category) => {
  return fetch(
    `http://localhost:5000/api/category/${categoryId}/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//----------------Orders Fetch---------------
export const getOrders = (userId, token) => {
  return fetch(`http://localhost:5000/api/order/list/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(
    `http://localhost:5000/api/order/status-values/${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(
    `http://localhost:5000/api/order/${orderId}/status/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, orderId })
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//----------Products Fetch----------
export const createProduct = (userId, token, product) => {
  return fetch(`http://localhost:5000/api/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProducts = () => {
  return fetch(`http://localhost:5000/api/products?limit=undefined`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(
    `http://localhost:5000/api/product/${productId}/${userId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = productId => {
  return fetch(`http://localhost:5000/api/product/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (userId, token, productId, product) => {
  return fetch(
    `http://localhost:5000/api/product/${productId}/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
