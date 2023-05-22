import { useContext } from "react";
import Exam from"./pages/exam"
import Home from"./pages/home"
import { HashRouter,BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
function App() {
  const {currentUser}=useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children
  };
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" exact element={<Exam />} />
        <Route path="/chatroom" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
