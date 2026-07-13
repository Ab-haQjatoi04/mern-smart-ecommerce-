import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

// Mapping real-world tech stock photos based on tags to tell a true visual story
const getProductImage = (tags) => {
  const cleanTags = tags.map(t => t.toLowerCase());
  if (cleanTags.includes('headphones')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
  if (cleanTags.includes('earbuds')) return 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80';
  if (cleanTags.includes('keyboard')) return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80';
  if (cleanTags.includes('gaming') && cleanTags.includes('mouse')) return 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80';
  if (cleanTags.includes('mouse')) return 'https://images.unsplash.com/photo-1625774292194-43c269a017ce?w=500&q=80';
  return 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80';
};

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        if (res.data.length > 0) {
          loadProductDetails(res.data[0]);
        } else {
          setLoading(false);
        }
      })
      .catch(err => console.error("Catalog fetch error:", err));
  }, []);

  const loadProductDetails = (product) => {
    setCurrentProduct(product);
    setLoading(true);

    axios.get(`http://localhost:5000/api/products/${product._id}/recommendations`)
      .then(res => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("AI engine failure:", err);
        setLoading(false);
      });
  };

  if (loading && !currentProduct) {
    return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748b' }}>Initializing Nexus Storefront...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* REAL-WORLD E-COMMERCE NAVBAR */}
      <nav className="navbar">
        <a href="#" className="nav-logo">
          <span style={{ color: 'var(--primary)' }}>⚡</span> NEXUS TECH
        </a>
        <div className="nav-search">
          <input type="text" placeholder="Search premium peripherals, components, gear..." disabled />
        </div>
        <div className="nav-actions">
          <span>Categories</span>
          <span>Deals</span>
          <span style={{ cursor: 'pointer', position: 'relative' }}>
            🛒 Cart <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '50%', fontSize: '10px', marginLeft: '2px' }}>0</span>
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>JA</div>
        </div>
      </nav>

      {/* STORE MAIN CONTENT */}
      <div className="store-container">
        
        {currentProduct && (
          <div className="store-main-layout">
            
            {/* Left Column: Premium Interactive Showcase */}
            <div className="store-image-wrapper">
              <img 
                src={getProductImage(currentProduct.tags)} 
                alt={currentProduct.name} 
                className="store-image-large"
              />
            </div>

            {/* Right Column: E-commerce Checkout Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="category-badge">{currentProduct.category}</span>
                <h1 className="store-title">{currentProduct.name}</h1>
                <div style={{ display: 'flex', items: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '15px' }}>
                  <span>⭐⭐⭐⭐⭐ (4.9 Rating)</span> | <span>SKU: {currentProduct._id.slice(-6)}</span>
                </div>
                <div className="store-price">${currentProduct.price}</div>
                <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>{currentProduct.description}</p>
              </div>

              <div>
                <button className="btn-primary" onClick={() => alert('Item added to active checkout sandbox!')}>
                  Add to Cart
                </button>

                {/* VISUAL PROOF OF MACHINE LEARNING ARCHITECTURE */}
                <div className="ai-insight-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--ai-purple)', marginBottom: '6px' }}>
                    <span>🧠</span> AI FEATURE MODEL INSIGHTS
                  </div>
                  <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#5b21b6', lineHeight: '1.4' }}>
                    This item has been mapped into vector space. The recommendation shelf below is actively evaluating similarities based on these attributes:
                  </p>
                  <div className="tag-row" style={{ marginTop: '0' }}>
                    {currentProduct.tags.map((tag, idx) => (
                      <span key={idx} className="store-tag" style={{ background: '#f3e8ff', color: '#6b21a8', border: '1px solid #e9d5ff' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* RELATED SHOWCASE SHELF */}
        <div style={{ marginBottom: '80px' }}>
          <h3 className="shelf-title">
            <span className="ai-sparkle-icon">✨</span> Smart Suggestions: Inspired by Your Browsing History
          </h3>

          {loading ? (
            <p style={{ color: '#64748b' }}>Recalculating proximity dimensions...</p>
          ) : (
            <div className="store-grid">
              {recommendations.map(item => (
                <div 
                  key={item._id} 
                  className="store-card"
                  onClick={() => loadProductDetails(item)}
                >
                  <div className="store-card-img-wrapper">
                    <img 
                      src={getProductImage(item.tags)} 
                      alt={item.name} 
                      className="store-card-img"
                    />
                  </div>
                  <div className="store-card-content">
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '600' }}>{item.name}</h4>
                      <div className="tag-row">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="store-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--dark)' }}>${item.price}</span>
                      <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>View Gear →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;