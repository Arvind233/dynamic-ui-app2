import React, { useState } from 'react';
import './App.css';

const navbar = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  {
    name: 'Our Products',
    id: 'product',
    child: [
      { name: 'FLORIDA JACKET', image: 'Product 1.png', id: 'p1' },
      { name: 'FLORIDA JACKET', id: 'p2' },
      { name: 'FLORIDA JACKET', id: 'p3' },
      { name: 'FLORIDA JACKET', id: 'p4' },
    ],
  },
  { name: 'Contact Us', id: 'contact' },
];

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
      <div className="product-item" key={product.id}>
        <img src={`/Product%201.png`} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Suffered Alteration in some form.</p>
        <p>Price: $100</p>
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
