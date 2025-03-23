import { useState } from "react";
import Navbar from "./Components/Navbar";
import NewsBoard from "./Components/NewsBoard";

const App = () => {
  const [category, setCategory] = useState("general");

  return (
    <div>
      {/* Navbar Component */}
      <Navbar setCategory={setCategory} />
      
      {/* Main Content wrapped in a container */}
      <div className="container mt-4">
        <NewsBoard category={category} />
      </div>
    </div>
  );
};

export default App;
