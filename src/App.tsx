import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import './App.css';
import './components/layout/layout.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ecommerce" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/campaigns" element={<Dashboard />} />
            <Route path="/documents" element={<Dashboard />} />
            <Route path="/followers" element={<Dashboard />} />
            <Route path="/account" element={<Dashboard />} />
            <Route path="/corporate" element={<Dashboard />} />
            <Route path="/courses" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
