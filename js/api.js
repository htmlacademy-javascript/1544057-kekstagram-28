import { API_URL } from './constants.js';

export const get = async (handleError) => {
  try {
    const response = await fetch(`${API_URL}/data`,);
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return await response.json();
  } catch (error) {
    handleError();
    throw error;
  }
};

export const post = async (data, handleError) => {
  try {
    const response = await fetch(API_URL + false, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error('Failed to save data');
    }
    return await response.json();
  } catch (error) {
    handleError();
    throw error;
  }
};
