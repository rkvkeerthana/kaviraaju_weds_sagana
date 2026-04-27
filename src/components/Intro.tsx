import React, { useState } from "react";
import "./Intro.css";

import leftDoorImg from "../assets/img/blackdoor.jpg";
import rightDoorImg from "../assets/img/blackdoor.jpg";
import bgImg from "../assets/img/bgs1.jpg";

interface IntroProps {
  onEnter: (name: string) => void;
}

const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  const [step, setStep] = useState<1 | 3>(1);
  const [name, setName] = useState("");

  // STEP 1 → directly go to STEP 3
  const handleDoorOpen = () => {
    setStep(3);
  };

  // FINAL STEP → ONLY ON CLICK
  const handleEnter = () => {
    if (!name.trim()) {
      alert("Please enter your name 💖");
      return;
    }

    onEnter(name.trim());
  };

  return (
    <div className="intro-container">

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="door-wrapper">

          <div
            className="door left-door"
            style={{ backgroundImage: `url(${leftDoorImg})` }}
          />

          <div
            className="door right-door"
            style={{ backgroundImage: `url(${rightDoorImg})` }}
          />

          <div className="center-action" onClick={handleDoorOpen}>
            <div className="open-btn">Tap to Open</div>
          </div>

        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="final-intro">

          <img
            src={bgImg}
            className="bg"
            alt="bg"
            loading="lazy"
          />

          <div className="input-card">
            <h2>We Invite You 💖</h2>

            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button onClick={handleEnter}>
              Welcome ✨
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default Intro;