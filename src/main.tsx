import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root element with error handling
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Could not find root element to mount React application");
} else {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Failed to render the application:", error);
    // Display a fallback error message to the user
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>There was an error loading the application. Please try refreshing the page.</p>
      </div>
    `;
  }
}
