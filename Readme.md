## Installation

### Environment Variables

1. **Backend Environment Variables**: Create a `.env` file in the `/backend` directory and add the following variables:
    ```bash
    PORT=<your_backend_port>
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    VECTORSHIFT_API_KEY=<your_vectorshift_api_key>
    VECTORSHIFT_BASE_URL=<your_vectorshift_base_url>
    ```

2. **Frontend Environment Variables**: Create a `.env` file in the `/frontend` directory and add:
    ```bash
    VITE_API_BASE_URL=<your_api_base_url>
    ```

### Setup

#### Backend

1. Navigate to the backend directory:
    ```bash
    cd /backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm run dev
    ```

#### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd /frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```
