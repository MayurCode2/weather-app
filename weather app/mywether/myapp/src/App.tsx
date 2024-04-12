
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import Spage from "./pages/CityWeather";
import Main from "./pages/Main";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/searchId/:geoid" element={<Spage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
