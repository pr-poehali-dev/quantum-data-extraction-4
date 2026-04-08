CREATE TABLE t_p41823543_quantum_data_extract.orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  supplier VARCHAR(255),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_num INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  delivery_type VARCHAR(50) NOT NULL,
  delivery_address TEXT,
  payment_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);