import { Route, Routes } from "react-router-dom";
import { UserCard } from "./pages/UserCard";
import { CardRegister } from "./pages/CardRegister";
import { Toaster } from "./components/ui/toaster";
import { Home } from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards">
          <Route path=":id" element={<UserCard />} />
          <Route path="register" element={<CardRegister />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
