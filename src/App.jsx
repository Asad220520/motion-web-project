import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Courses from "./pages/Courses/Courses";
import Contacts from "./pages/Contacts/Contacts";

const App = (props) => {
  const { children, title, url } = props;
  return (
    <div className="App">
      <Header url={url} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Онас" element={<AboutUs />} />
          <Route path="/курсы" element={<Courses />} />
          <Route path="/контакты" element={<Contacts />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
