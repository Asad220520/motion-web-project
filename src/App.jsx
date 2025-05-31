import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
