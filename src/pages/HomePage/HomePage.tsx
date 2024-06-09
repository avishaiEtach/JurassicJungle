import React from "react";
import "./HomePage.scss";
import { Hero } from "../../components/HomePage/Hero/Hero";
import { GiTripleClaws } from "react-icons/gi";
import { Button } from "@mui/material";
import { PopularFamily } from "../../components/HomePage/PopularFamily/PopularFamily";
import { BestArticles } from "../../components/HomePage/BestArticles/BestArticles";
import { GiTRexSkull } from "react-icons/gi";

export function HomePage() {
  return (
    <div className="main__container">
      <Hero />
      <PopularFamily />
      <BestArticles />
      <div className="join__to__club flex space-between">
        <div className="flex g20">
          <div className="claws__icon">
            <GiTRexSkull />
          </div>
          <div>
            <h4>Roar!</h4>
            <p>
              Ready to uncover exclusive finds and paleontological treasures?
              Join our Family now!
            </p>
          </div>
        </div>
        <Button className="join__to__club__btn" variant="outlined">
          Join Family
        </Button>
      </div>
    </div>
  );
}
