const API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
}
