# Fire Propagation Simulation

This project simulates fire propagation using a PHP Symfony backend and a React TypeScript frontend.

---

## **Project Structure**

```
project-root/
├── symfony-backend/     # Symfony backend
├── frontend/            # React TypeScript frontend
```

### Backend

The backend is a PHP Symfony application located in the `symfony-backend` directory. It provides endpoints to process fire propagation logic.

### Frontend

The frontend is a React TypeScript application located in the `frontend` directory. It provides a user interface to visualize the simulation and interact with the propagation model.

---

## **Installation Guide**

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js and npm](https://nodejs.org/)

---

### **Backend Setup**

1. Navigate to the backend folder:

   ```bash
   cd symfony-backend
   ```

2. Start the backend services using Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Install dependencies:

   ```bash
   docker exec -it backend_php composer install
   ```

4. Ensure the Symfony server is running and accessible:
   - Backend API should be available at `http://localhost:8080`

---

### **Frontend Setup**

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## **Usage**

1. Access the frontend application to view and interact with the fire propagation simulation.
2. The frontend communicates with the backend to retrieve and process simulation data.
3. A cell can have 3 status :

- 🟦 : Untouch (can burn)
- 🟥 : burning
- 🟫(grey) : burnt (can no longer burn)

---

## **License**

This project is licensed under the MIT License. See `LICENSE` for details.
