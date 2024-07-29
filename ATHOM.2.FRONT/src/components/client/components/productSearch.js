import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getApiUrl } from '../../../services/apiConfig'
//import {searchProductsByName} from '../../../services/product';

function ProductSearch (){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            try {
              const url = getApiUrl(`product/search?searchTerm=${searchTerm}`)  
              const response = await axios.get(url);
              if (response.status === 200) {
                setSearchResults(response.data);
              } else {
                console.error('Error searching products:', response.data);
              }
            } catch (error) {
              console.error('Error searching products:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onInput={handleSearch}
            placeholder="Buscar productos"
          />
          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((product) => (
                <div key={product.id}>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  {/* Display other product details */}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );    

};

export default ProductSearch;