import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import Products from './Products';

const Categories = () => {
  const { products, setCategoriesProducts } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Clear the categoriesProducts array when leaving the categories page
    return () => {
      setCategoriesProducts([]);
    };
  }, []);

  const handleFilter = (category) => {
    const filteredProducts = products.filter((item) => item.category === category);
    setCategoriesProducts(filteredProducts);
    setActiveCategory(category);
  };

  return (
    <>
      <div className="categories-container">
        <div className='all-categories'><button
          className={`categories-button ${activeCategory === null ? 'active' : ''}`}
          onClick={() => {
            handleFilter(null);
            setActiveCategory(null);
          }}
        >
          All Categories
        </button></div>
        <div className='categories-others'><button
          className={`filter-button ${activeCategory === 'jewelery' ? 'active' : ''}`}
          onClick={() => handleFilter('jewelery')}
        >
          Jewelery
        </button>
          <button
            className={`filter-button ${activeCategory === "men's clothing" ? 'active' : ''}`}
            onClick={() => handleFilter("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className={`filter-button ${activeCategory === "women's clothing" ? 'active' : ''}`}
            onClick={() => handleFilter("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className={`filter-button ${activeCategory === 'electronics' ? 'active' : ''}`}
            onClick={() => handleFilter('electronics')}
          >
            Electronics
          </button></div>
      </div>
      <Products />
    </>
  );
};

export default Categories;
