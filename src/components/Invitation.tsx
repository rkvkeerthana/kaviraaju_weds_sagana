import React, { useEffect, useRef, useState } from "react";
import "./Invitation.css";
import { useLocation } from "react-router-dom";

import coupleImg from "../assets/img/pinkswing.png";

// BACKGROUNDS
import heroBg from "../assets/img/invi_bg.jpg";
import storyBg from "../assets/img/inv2.jpg";
import eventBg from "../assets/img/post.jpg";
import venueBg from "../assets/img/Soft blush with floating hearts Wallpaper.jpg";
import DateRunningBg from "../assets/img/bgs4.jpg";
import thankyouBg from "../assets/img/bgs.jpg";

// GALLERY
import img1 from "../assets/img/kumba_traditional.png";
import img2 from "../assets/img/poojakumba.png";
import img3 from "../assets/img/7.png";
import img4 from "../assets/img/weddingpair.png";
import img5 from "../assets/img/kumtur.png";
import img6 from "../assets/img/agni deepa.png";

// OVERLAY IMAGE
import overlayImg from "../assets/img/god.png";

const images = [img1, img2, img3, img4, img5, img6];

const Invitation: React.FC = () => {
  const location = useLocation();
  const name = location.state?.name || "Dear Guest";

  const calendarRef = useRef<HTMLDivElement>(null);

  // 📅 EVENTS
  const engagementDate = new Date("2026-05-28T18:00:00+05:30");
  const weddingDate = new Date("2026-05-29T06:00:00+05:30");

  const eventMonth = "May 2026";

  // 🎞 SLIDER
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 📅 GOOGLE CALENDAR (WITH REMINDER)
  const saveToCalendar = (date: Date, title: string) => {
    const start = date.toISOString().replace(/-|:|\.\d+/g, "");
    const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
      &text=${encodeURIComponent(title)}
      &dates=${start}/${end}
      &details=${encodeURIComponent("Reminder set 2 days before 💖")}
      &trp=false`;

    window.open(url, "_blank");
  };

  // ⏳ COUNTDOWN (TO WEDDING)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = weddingDate.getTime() - new Date().getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="invite-container">

      {/* HERO */}
      <section className="section hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="overlay" />

        <h1 className="logo">K | S</h1>

        <h2 className="invite-text">
          We Invite You, <span>{name}</span> 💖
        </h2>

        <p className="sub-text">
          & your family with heartfelt love and joy,<br />
          we are eagerly waiting for your presence<br />
          to bless our wedding ceremony.
        </p>

        <img src={coupleImg} className="hero-img" alt="couple"   loading="lazy"/>

        <p className="quote">“Two souls, one journey, forever begins here.”</p>
      </section>

      {/* STORY */}
      <section className="section story" style={{ backgroundImage: `url(${storyBg})` }}>
        <div className="overlay" />

        <h2>Our Story</h2>
        <p>
          A beautiful journey that started with friendship,
          grew into love, and now celebrates forever together </p><br/>
        <h3 className="weds"  >Kaviraaju weds Sagana</h3>
      </section>

      {/* EVENT */}
      <section className="section event" ref={calendarRef} style={{ backgroundImage: `url(${eventBg})` }}>
        <div className="overlay" />

        <h2 className="event-title">Wedding Events</h2>

        {/* MONTH */}
        <div className="calendar-header">
          <span className="month-year">{eventMonth}</span>

          <div className="day-labels">
            <span>S</span><span>M</span><span>T</span>
            <span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="calendar-grid">
          {[...Array(31)].map((_, i) => {
            const day = i + 1;

            const isEngagement = day === 28;
            const isWedding = day === 29;

            return (
              <div
                key={i}
                className={`date-wrapper 
                  ${isEngagement ? "engagement-date" : ""} 
                  ${isWedding ? "wedding-date" : ""}`}
                onClick={() => {
                  if (isEngagement)
                    saveToCalendar(engagementDate, "Engagement 💍 - May 28, 6PM");

                  if (isWedding)
                    saveToCalendar(weddingDate, "Wedding 💖 - May 29, 6AM");
                }}
              >
                {day}

                {isEngagement && <span className="tag">💍</span>}
                {isWedding && <span className="tag">💖</span>}
              </div>
            );
          })}
        </div>

        {/* INFO */}
        <p className="ceremony-time">
           May 28 - Engagement (After 6 PM) <br />
           May 29 - Wedding (6 AM - 7 AM)
        </p>

        <p className="ceremony-note">
          Tap the <span className="highlight-click">highlighted dates</span> to save events to Google Calendar
        </p>

        {/* SLIDER */}
        <div className="slider">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              alt="gallery"
               loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* VENUE */}
     <section
  className="section venue-section"
  style={{ backgroundImage: `url(${venueBg})` }}
>
  <div className="overlay" />

  <h2 className="venue-title">Venue</h2>
  

  {/* PLACE */}
  <p className="venue-name">CSK Mahal</p>

  {/* FULL ADDRESS */}
  <p className="venue-address">
    V3J8+82H,Madurai - Thirumangalam Rd,<br />
    Devi Nagar, Balaji Nagar,<br />
    Thiruparankundram,<br />
    Tamil Nadu - 625005
  </p>
<br/>
  {/* EVENTS TIMELINE */}
  <div className="event-timeline">
    <p> May 28 — Engagement (After 6 PM)</p>
    <p> May 29 — Marriage (6 AM – 7 AM)</p>
  </div>
<div className="contact-box">

  <p className="contact-title"> Contact</p>

  <div className="contact-list">

    <a href="tel:+919080634239">📞 +91 90806 34239</a>
    <a href="tel:+919442029001">📞 +91 94420 29001</a>
    <a href="tel:+919488468153">📞 +91 94884 68153</a>
    <a href="tel:+919750805464">📞 +91 97508 05464</a>
    <a href="tel:+919876543210">📞 +91 98765 43210</a>

  </div>

</div>

  {/* MAP */}
  <iframe
    title="wedding-map"
    src="https://www.google.com/maps?q=CSK%20Mahal%20Madurai&output=embed"
    width="100%"
    height="250"
    loading="lazy"
    style={{ border: 0, borderRadius: "12px", marginTop: "15px" }}
  />
</section>

      {/* ================= DATE RUNNING ================= */}

      <section className="section date-running" style={{ backgroundImage: `url(${ DateRunningBg })` }} >
        <div className="overlay-soft" />
        {/* CENTER PNG IMAGE */} 
        <div className="date-overlay-img">
          <img src={overlayImg} alt="wedding"  loading="lazy" /> 
          </div>
        {/* SIGNATURE TEXT */}
        <div className="signature-area">
          <h2 className="cursive-signature typing"> From hearts united <br /> Forever & Always! </h2> 
          </div>

        {/* COUNTDOWN */}
        <div className="countdown-container">
          <div className="countdown-item">
            <span className="label">DAYS</span>
            <span className="number">{timeLeft.days}</span>
          </div>
          <div className="countdown-item">
             <span className="label">HOURS</span>
              <span className="number">{timeLeft.hours}</span> 
              </div>
               <div className="countdown-item">
                 <span className="label">MINUTES</span> 
                 <span className="number">{timeLeft.minutes}</span>
                  </div> 
                  <div className="countdown-item">
                     <span className="label">SECONDS</span> 
                     <span className="number">{timeLeft.seconds}</span>
                      </div>
                       </div> 
                       </section>

      {/* THANK YOU */}
      <section className="section thankyou" style={{ backgroundImage: `url(${thankyouBg})` }}>
        <div className="overlay" />

        <h2>With Love & Gratitude 💖</h2>

        <p>
          Thank you for being part of our special day <br />
          Your presence means everything to us.
        </p>
      </section>

    </div>
  );
};

export default Invitation;