import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/Dashboard';
import CreateAppSheetPage from './pages/CreateAppSheetPage';
import AppSheetDataPage from './pages/AppSheetDataPage';
import AppSheetsPage from './pages/AppSheetsPage';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/users' element={<UsersPage />} />
        <Route path='/dashboard/sheets' element={<AppSheetsPage />} />
        <Route path='/app-sheet/:appSheetId' element={<AppSheetDataPage />} />
        <Route path='/app-sheet/create' element={<CreateAppSheetPage />} />
      </Route>
    </Routes>
  );
};

export default App;
