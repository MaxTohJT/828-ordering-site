'use client';
import { useState } from "react";

const menuItems = [
  { name: "Chicken Satay", price: 0.9 },
  { name: "Pork Satay", price: 0.9 },
  { name: "Mutton Satay", price: 0.9 },
  { name: "Ketupat", price: 0.9 },
];

export default function Page() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
  };

  const getTotal = () => {
    return Object.entries(cart).reduce((total, [item, qty]) => {
      const price = menuItems.find((i) => i.name === item)?.price || 0;
      return total + qty * price;
    }, 0).toFixed(2);
  };

  const buildWhatsAppLink = () => {
    const orderLines = Object.entries(cart)
      .map(([item, qty]) => `- ${qty}x ${item}`)
      .join("%0A");
    return `https://wa.me/65XXXXXXXX?text=Hi!%20I'd%20like%20to%20order:%0A${orderLines}%0A%0APickup%20at:%20____.%0AName:%20____`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>828 Wuxiang & Satay</h1>
      <p style={{ marginBottom: '20px' }}>Freshly grilled satay, open daily 9AM–9PM</p>

      <div>
        {menuItems.map((item) => (
          <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <div>
              <h2 style={{ fontWeight: '600' }}>{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'left' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Your Order</h3>
          <ul>
            {Object.entries(cart).map(([item, qty]) => (
              <li key={item}>{qty}x {item}</li>
            ))}
          </ul>
          <p style={{ marginTop: '10px', fontWeight: '600' }}>Total: ${getTotal()}</p>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <button style={{ marginTop: '10px', width: '100%' }}>Order on WhatsApp</button>
          </a>
        </div>
      )}
    </div>
  );
}