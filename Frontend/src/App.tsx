import AppRoutes from "./pages/routes/AppRoutes";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50"> 
      <AppRoutes />
    </div>
  );
}

export default App
