// lib/cashfree.js
import axios from 'axios';

const API_KEY = process.env.CASHFREE_API_KEY;
const API_SECRET = process.env.CASHFREE_API_SECRET;
const BASE_URL = process.env.CASHREE_BASE_URL

// Function to create Cashfree order
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/payout/v1/order/create`,
            orderData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': API_KEY,
                    'x-client-secret': API_SECRET
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to create order: ' + error.response.data.message);
    }
};

// Add more functions as needed for other Cashfree API endpoints
