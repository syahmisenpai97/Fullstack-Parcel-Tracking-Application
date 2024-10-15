import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParcelList from "./components/ParcelList";
import ParcelForm from "./components/ParcelForm";
import ReadParcel from "./components/ReadParcel";
import NavBar from "./components/NavBar"; // Adjust the path if necessary

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ParcelList />} />
        <Route path="/add" element={<ParcelForm isEdit={false} />} />
        <Route path="/edit/:trackingNumber" element={<ParcelForm isEdit={true} />} />
        <Route path="/parcel/:trackingNum" element={<ReadParcel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
