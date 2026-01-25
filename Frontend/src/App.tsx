import AppRoutes from "./pages/routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext"; 
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
        <Toaster position="top-right" /> 
      </div>
    </AuthProvider>
  );
}

export default App;