Instafarm: Agriculture Product Ecommerce Website

Instafarm is a feature-rich agriculture product ecommerce website developed on Next.js 14. This README file provides instructions on how to set up the project in your localhost.

Setup Instructions

Clone the Repository
git clone https://github.com/ataul-mustafa/instafarm.git

Install DependenciesNavigate to the project directory and install the required dependencies using npm or yarn:
cd instafarm
npm install

Set Up Environment VariablesCreate a .env file in the root directory of the project and add the following environment variables:

DB_URL=             // MongoDB connection URL
JWT_SECRET_KEY=     // Secret key for JWT token
CASHFREE_CLIENT_ID= // Cashfree Client ID
CASHFREE_API_SECRET=// Cashfree API Secret


Start the Development ServerRun the following command to start the development server:

npm run dev
This will start the Next.js development server on http://localhost:3000.


Project Structure
/src/app/api: Contains api.
/src/app/components: Contains reusable React components.
/src/app/route*: contain all client route
/src/Context API: Contains Context API
/src/Images: contains Images


Technologies Used
Next.js: Frontend framework for server-rendered React applications.
React: JavaScript library for building user interfaces.
MongoDB: NoSQL database for storing product and user data.
Express.js: Backend framework for handling API requests.
JWT: JSON Web Tokens for user authentication.
bcypt: for encrypting the password
Cashfree : Payment gateway for processing payments.