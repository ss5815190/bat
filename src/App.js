import Exam from"./pages/exam"
import Home from"./pages/home"
import { HashRouter,BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" exact element={<Exam />} />
        <Route path="/chactroom" element={<Home />} />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
