import React, { useState, useEffect } from 'react';
import './App.css';

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
const navbar = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  {
    name: 'Our Products',
    id: 'product',
    child: [
      ...categories.map((category) => ({
        name: category,
        id: category,
      })),
    ],
  },
  { name: 'Contact Us', id: 'contact' },
];

function ProductListings({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Store the fetched data in state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [category]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data:', formData);
  };

  return (
    <div className="App">
      <div className="top-bar">
        <div className="top-bar-left">
          <button className="top-bar-button">Free Delivery</button>
          <button className="top-bar-button">Log In</button>
          <button className="top-bar-button">Sign Up</button>
        </div>
        <div className="top-bar-right">
          <span className="follow-us">Follow Us:</span>
          <a href="#" className="follow-us-link">Facebook</a>
          <a href="#" className="follow-us-link">Twitter</a>
          <a href="#" className="follow-us-link">Instagram</a>
        </div>
      </div>
       <nav>
        <ul className="navbar">
          {navbar.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.name}</a>
              {item.child && (
                <ul className="submenu">
                  {item.child.map((childItem) => (
                    <li key={childItem.id}>
                      <a href={`#${childItem.id}`}>{childItem.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <header className="banner">
        <h1>Fresh 2022 Look</h1>
      </header>
      <main>
      <div className="rectangle">
      </div>
      <section className="products">
  <h2>Our Products</h2>
  <div className="product-list">
    {navbar.find((item) => item.id === 'product')?.child?.map((product) => (
      <div className="product-category" key={product.id}>
        <h2>{product.name}</h2>
        <ProductListings category={product.id} />
      </div>
    ))}
  </div>
</section>
        <section className="contact">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
