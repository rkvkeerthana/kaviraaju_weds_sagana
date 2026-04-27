import { Routes, Route, useNavigate } from "react-router-dom";
import Intro from "./components/Intro";
import Invitation from "./components/Invitation";
import "./App.css";
export default function App() {
  const navigate = useNavigate();

  return (
    <div className="app-frame">
      <div className="app-mobile">

        <Routes>
          <Route
            path="/"
            element={
              <Intro
                onEnter={(name: string) =>
                  navigate("/invite", { state: { name } })
                }
              />
            }
          />

          <Route path="/invite" element={<Invitation />} />
        </Routes>

      </div>
    </div>
  );
}