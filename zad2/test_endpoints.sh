#!/bin/bash
BASE="http://localhost:8000/api/products"

echo "=== CREATE ==="
curl -s -X POST $BASE \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":2999.99,"description":"Bardzo szybki laptop"}'

echo ""
echo "=== LIST ALL ==="
curl -s $BASE

echo ""
echo "=== GET ONE ==="
curl -s $BASE/1

echo ""
echo "=== UPDATE ==="
curl -s -X PUT $BASE/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","price":2499.99,"description":"Zaktualizowany"}'

echo ""
echo "=== DELETE ==="
curl -s -X DELETE $BASE/1

echo ""