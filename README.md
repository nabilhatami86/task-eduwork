
# Eduwork 🎨

Eduwork Frontend is the client-side application for the **Eduwork** platform, built with **React**, **Redux**, **React Icons**, **Bootstrap**, and custom **CSS** for styling. It connects to the **Eduwork Server** backend to provide an interactive user interface for managing courses, user authentication, and more.

## Features 🚀

- **User Authentication**: Secure login and registration system integrated with the backend.
- **Course Management**: View, add, and interact with courses offered by Eduwork.
- **Global State Management**: Redux is used for managing the application state across components.
- **Responsive UI**: Uses **Bootstrap** for responsive design, with custom **CSS** for styling.
- **Icons Integration**: **React Icons** is used to provide modern icons throughout the app.

---

## Getting Started 🚧

To get the frontend application up and running on your local machine, follow these steps.

### Prerequisites 🛠️

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation 🔥

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nabilhatami86/task-eduwork.git
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the frontend project and add the following configuration:

   ```env
   REACT_APP_SERVICE_NAME=server
   REACT_APP_SECRET_KEY=nabilhatami
   REACT_APP_DB_HOST=localhost
   REACT_APP_DB_PORT=27017
   REACT_APP_DB_USER=eduwork
   REACT_APP_DB_PASS=
   REACT_APP_DB_NAME=eduwork
   ```

   Replace values as necessary (e.g., `REACT_APP_DB_PASS` if you have a password for the database).

5. **Run the application**:
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000` (or another port if specified).

---

## Technologies Used 🔧

- **React**: JavaScript library for building user interfaces.
- **Redux**: Predictable state container for JavaScript apps.
- **React Icons**: Provides a library of customizable icons.
- **Bootstrap**: Front-end framework for building responsive web applications.
- **CSS**: Custom styles and layout for the application.
- **Axios**: Promise-based HTTP client to interact with the backend.

---

## Folder Structure 📁

Here’s an overview of the folder structure for the frontend project:

```
/Frontend # Entry point for the React app, contains components, Redux, services, and styling.
 /Backend # Server-side files and configurations (e.g., Express API, database connection, server
      
```

---

## Using React Icons 🖼️

React Icons is used to add beautiful, scalable vector icons to your app. Here's how to use them:

### Installation

To install **React Icons**:
```bash
npm install react-icons
```

### Example Usage

Here’s an example of how to use icons in your components:

```javascript
import { FaBeer, FaUserCircle } from 'react-icons/fa';

const MyComponent = () => {
  return (
    <div>
      <h1>Welcome to Eduwork <FaBeer /></h1>
      <button>
        <FaUserCircle /> Login
      </button>
    </div>
  );
};
```

The icons will automatically scale based on their container size, and you can customize their size, color, and style.

---

## Using Bootstrap for Responsive Design 📱

Bootstrap is a front-end framework that helps you design responsive web apps quickly.

### Installation

To install **Bootstrap**:
```bash
npm install bootstrap
```

Import it into your main `index.js` or `App.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Example Usage

You can use Bootstrap classes to style your components easily. For example:

```javascript
import { Button } from 'react-bootstrap';

const MyComponent = () => {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to Eduwork</h1>
      <Button variant="primary">Get Started</Button>
    </div>
  );
};
```

The `Button` component from **React-Bootstrap** will automatically use Bootstrap's styles.

---

## Redux State Management 🔄

Redux helps manage the global state of the app. Here’s how you can integrate it:

### Actions 🎬

Actions are used to dispatch data to the Redux store.

Example action to fetch courses:

```javascript
// actions/courseActions.js
import axios from 'axios';

export const fetchCourses = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
    dispatch({ type: 'FETCH_COURSES', payload: response.data });
  } catch (error) {
    dispatch({ type: 'COURSES_ERROR', error: error.message });
  }
};
```

### Reducers 🛠️

Reducers define how the state is updated based on the action types.

Example reducer for courses:

```javascript
// reducers/courseReducer.js
const courseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return { ...state, courses: action.payload };
    case 'COURSES_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default courseReducer;
```

### Store 🏢

Set up the Redux store:

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

---

## Custom CSS Styling 🎨

You can also use custom CSS to style the application. For example, in the `styles` folder, create a file like `App.css` and import it into your components.

Example CSS (e.g., `App.css`):

```css
h1 {
  font-size: 2rem;
  text-align: center;
  color: #4CAF50;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```

Import it into your `App.js`:

```javascript
import './styles/App.css';
```

---

## Contributing 🤝

We welcome contributions to improve Eduwork Frontend. Here’s how you can contribute:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature/your-feature`).
3. **Make your changes** and **commit** them (`git commit -am 'Add new feature'`).
4. **Push your branch** (`git push origin feature/your-feature`).
5. **Open a pull request**.

---

## License 📜

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

---

## Acknowledgements 🙏

- **React** and **Redux**: For building the interactive frontend and managing the state.
- **React Icons**: For beautiful and scalable vector icons.
- **Bootstrap**: For responsive layout and styling.
- Thanks to all contributors and the open-source community!

---

### Stay Connected! 🌐
- [GitHub Repository](https://github.com/nabilhatami86/task-eduwork)
```

### Penjelasan:
- **`.env`**: Menambahkan variabel lingkungan yang diperlukan untuk konfigurasi API dan database.
- **React Icons, Bootstrap, CSS**: Menambahkan instruksi penggunaan pustaka tersebut untuk memberi tampilan yang lebih menarik dan responsif.
- **Redux**: Ditambahkan contoh penggunaan Redux untuk pengelolaan status aplikasi.
