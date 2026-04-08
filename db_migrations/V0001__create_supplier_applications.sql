CREATE TABLE t_p41823543_quantum_data_extract.supplier_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  category VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);