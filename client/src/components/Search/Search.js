import React, { useState, useEffect } from 'react';
import { getCategories } from '../../helpers/adminFetch';
import { getProductsBySearch } from '../../helpers/userFetch';
import Card from '../Home/Card';
import Pagination from "react-js-pagination";
import {Container} from 'react-bootstrap'

const Search = () => {
  const [data, setData] = useState({
    
    category: '',
    search: '',
    results: [],
    searched: false
  });
 const [categories,setCategories] = useState([])
  const {  category, search, results, searched } = data;
  const itemsPerPage = 6;
  const [ activePage, setCurrentPage ] = useState( 1 );

  const indexOfLastItem  = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems     = results.slice( indexOfFirstItem, indexOfLastItem );
  const handlePageChange = ( pageNumber ) => {
  
    setCurrentPage( pageNumber )
  }










  useEffect(() => {
    
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        
       setCategories(data)
      }
    });
    getProductsBySearch({
      search: '',
      category: 'All'
    }).then(response => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData({ ...data, results: response, searched: true });
       
      }
    });

  }, []);

 

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value });
  
  };

  const searchSubmit = event => {
    event.preventDefault();
    
    if (search||search=='') {
      getProductsBySearch({
        search: search || '',
        category: category
      }).then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };


  const searchMessage = (searched, results) => {
 
    if (searched && results.length < 1) {
      return `No product found!`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="mt-3 text-center">
        
        <div className="row card-container">
          {currentItems.map((product, i) => (
            <div className="col-4 mb-3" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container>
    <div className="m-3">
      {/* Search Form */}
      <form onSubmit={searchSubmit} >
        <span className="input-group-text bg-g">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <h3>Categories:</h3>
              <select className="btn mr-2" onChange={handleChange('category')}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="search"
              className="form-control"
              onChange={handleChange('search')}
              placeholder="Search ..."
            />
          </div>
          <div className="btn input-group-append" style={{ border: 'none' }}>
            <button className="btn bg-dg f-white">Search</button>
          </div>
        </span>
      </form>
      {/* Search  Results*/}
      
      <div className="result">
      {searchedProducts(results)}
      </div>
      <h1>{searchMessage(data.searched,data.results)}</h1>
      <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 6 }
               totalItemsCount={ results.length }
               pageRangeDisplayed={ 6 }
               onChange={ handlePageChange }
               itemClass="page-item"
linkClass="page-link"
            />
         </div>

    </div>
    </Container>
  );
};

export default Search;
