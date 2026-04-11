import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Automation from './pages/Automation';
import Management from './pages/Management';
import ProtectedRoute from "./services/ProtectedRoute";
import NotiProvider from "./services/NotiProvider";
import ToastNoti from "./components/ui/ToastNoti";
import Layout from './pages/Layout';
export default function App() {
  return (
    <BrowserRouter>
      <NotiProvider>
        <ToastNoti /> {/* Global notification component */}
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="devices" element={<Dashboard />} />
                <Route path="environment" element={<Dashboard />} />
                <Route path="security" element={<Dashboard />} />
                <Route path="notifications" element={<Dashboard />} />
                <Route path="automation" element={<Automation />} />
                <Route path="management" element={<Management />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </NotiProvider>
    </BrowserRouter>
  );
}
