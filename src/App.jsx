import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import UploadCsv from './pages/UploadCsv';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path="/upload-csv"
          element={<UploadCsv />}
        />
        <Route
          path="/transactions"
          element={<Transactions />}
        />
      </Route>
    </Routes>
  );
}

export default App;
