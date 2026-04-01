import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

function Shops({
  products,
  addToCart,
  selectedShop,
  setSelectedShop,
  showNotification,
}) {
  const filteredProducts = selectedShop
    ? products.filter((p) => p.shop === selectedShop)
    : products;

  return (
    <div>
      <h1>Shops</h1>

      <div className="container">
        <div className="shops">
          <button
            onClick={() =>
              setSelectedShop(selectedShop === "Mc Donny" ? null : "Mc Donny")
            }
            style={{
              background: selectedShop === "Mc Donny" ? "#007bff" : "#333",
            }}
          >
            Mc Donny
          </button>

          <button
            onClick={() =>
              setSelectedShop(selectedShop === "CFK" ? null : "CFK")
            }
            style={{
              background: selectedShop === "CFK" ? "#007bff" : "#333",
            }}
          >
            CFK
          </button>

          <button
            onClick={() => setSelectedShop(null)}
            style={{
              background: selectedShop === null ? "#007bff" : "#333",
            }}
          >
            All
          </button>
        </div>

        <div className="products">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src="/images/burger.png"
                alt={p.name}
                className="product-image"
              />

              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.price} грн</p>

                <button
                  onClick={() => {
                    addToCart(p);
                    showNotification("Added to cart");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const updateCount = (id, count) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Number(count) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Invalid email");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: cart,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error");
      }

      alert("Order successfully sent!");

      // очистка корзины
      setCart([]);
      localStorage.removeItem("cart");

      // очистка формы
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Checkout form</h2>

        <p>Name</p>
        <input name="name" value={form.name} onChange={handleChange} />

        <p>Email</p>
        <input name="email" value={form.email} onChange={handleChange} />

        <p>Phone</p>
        <input name="phone" value={form.phone} onChange={handleChange} />

        <p>Address</p>
        <input name="address" value={form.address} onChange={handleChange} />
      </div>

      <div className="cart-right">
        <h1>Shopping Cart</h1>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src="/images/burger.png"
              alt={item.name}
              className="cart-image"
            />

            <div>
              <h3>{item.name}</h3>

              <div className="cart-item-row">
                <p>{item.price} грн</p>

                <select
                  value={item.count}
                  onChange={(e) => updateCount(item.id, e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2>Total: {total} грн</h2>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

function App() {
  const [products] = useState([
    { id: 1, name: "Big Burger", price: 100, shop: "Mc Donny" },
    { id: 2, name: "Small Burger", price: 80, shop: "Mc Donny" },
    { id: 3, name: "Fried Chicken", price: 120, shop: "CFK" },
    { id: 4, name: "Chicken Bucket", price: 200, shop: "CFK" },
  ]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedShop, setSelectedShop] = useState(() => {
    return localStorage.getItem("selectedShop") || null;
  });

  const [notification, setNotification] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (selectedShop) {
      localStorage.setItem("selectedShop", selectedShop);
    } else {
      localStorage.removeItem("selectedShop");
    }
  }, [selectedShop]);

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p,
        );
      }

      return [...prev, { ...product, count: 1 }];
    });
  };

  return (
    <div className="app">
      <nav>
        <Link to="/">Shops</Link> | <Link to="/cart">Shopping Cart</Link>
      </nav>

      {notification && <div className="notification">{notification}</div>}

      <Routes>
        <Route
          path="/"
          element={
            <Shops
              products={products}
              addToCart={addToCart}
              selectedShop={selectedShop}
              setSelectedShop={setSelectedShop}
              showNotification={showNotification}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

export default App;
