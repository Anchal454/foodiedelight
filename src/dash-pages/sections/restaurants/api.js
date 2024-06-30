const API_URL = 'https://mockapi.com/restaurants';

export const fetchRestaurants = async (page,rowsPerPage,filterName) => {
  const response = await fetch(`${API_URL}?page_size=${rowsPerPage}&page=${page}&filterName=${filterName}`);
  return response.json();
};

export const addRestaurant = async (restaurant) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurant),
  });
  return response.json();
};

export const updateRestaurant = async (restaurant) => {
  const response = await fetch(`${API_URL}/${restaurant.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurant),
  });
  return response.json();
};

export const deleteRestaurant = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
