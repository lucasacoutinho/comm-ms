INSERT INTO category (id, description) VALUES (1001, 'Comic Books');
INSERT INTO category (id, description) VALUES (1002, 'Movies');
INSERT INTO category (id, description) VALUES (1003, 'Books');
----
INSERT INTO supplier (id, name) VALUES (1001, 'Panini Comics');
INSERT INTO supplier (id, name) VALUES (1002, 'Amazon');
----
INSERT INTO product (id, name, quantity, supplier_id, category_id, created_at, updated_at) VALUES (1001, 'Crise nas Infinitas Terras', 10, 1001, 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO product (id, name, quantity, supplier_id, category_id, created_at, updated_at) VALUES (1002, 'Interestelar', 5, 1002, 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO product (id, name, quantity, supplier_id, category_id, created_at, updated_at) VALUES (1003, 'Harry Potter e a Pedra Filosofal', 3, 1002, 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
