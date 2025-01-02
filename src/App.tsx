import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationForm from "@/components/ApplicationForm";
import AdminDashboard from "@/components/AdminDashboard";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="game-dev-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/admin-login" element={<LoginPage />} />
          <Route
            path="/alterino-game-dev-admins"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
