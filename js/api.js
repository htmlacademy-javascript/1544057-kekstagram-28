import { API_URL } from './constants.js';

export const get = async () => {
  const response = await fetch(`${API_URL}/data`,);
  if (!response.ok) {
    throw new Error('Failed to load data');
  }
  return await response.json();

};

export const post = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    throw new Error('Failed to save data');
  }
  return await response.json();

};
