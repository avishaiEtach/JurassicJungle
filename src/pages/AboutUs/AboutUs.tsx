import React, { useState } from "react";
import { AboutUsCarousel } from "../../components/AboutUs/Carousel/Carousel";
import "./AboutUs.scss";
import { Employs } from "../../components/AboutUs/Employs/Employs";

export function AboutUs() {
  return (
    <div>
      <div className="carousel__main__container">
        <AboutUsCarousel />
        <div>
          <h1>Welcome to Jurassic Jungle</h1>
          <p className="about__us__text">
            JurassicJungle.com stands as the ultimate portal into the
            captivating world of dinosaurs and prehistoric life, catering to
            enthusiasts of all ages. Upon entering our virtual domain, visitors
            are immediately immersed in a breathtaking landscape filled with
            lush jungles and awe-inspiring dinosaurs. This welcome scene sets
            the stage for a journey of discovery and exploration through our
            comprehensive collection of captivating information.
          </p>
          <p className="about__us__text">
            Delving deeper into our featured content reveals a rich array of
            dinosaur species and compelling articles awaiting exploration. From
            the iconic Tyrannosaurus Rex to lesser-known yet equally fascinating
            creatures, our extensive database offers detailed descriptions and
            stunning illustrations to engage and educate visitors of all
            interests and expertise levels.
          </p>
          <p className="about__us__text">
            At the heart of our mission is the desire to foster a vibrant
            community of dinosaur enthusiasts worldwide. Through our platform,
            individuals are encouraged to engage in discussions, share insights,
            and forge connections with like-minded enthusiasts. Our aim is to
            create a dynamic space where knowledge and passion for dinosaurs
            converge, enriching the experiences of all who participate.
          </p>
          <p className="about__us__text">
            With easy access to essential resources and information, including
            contact details and privacy policies, JurassicJungle.com serves as
            the premier destination for unlocking the secrets of the dinosaurs.
            Whether you're a seasoned enthusiast or a curious newcomer, our
            immersive experience promises to ignite your imagination and deepen
            your appreciation for the wonders of prehistoric life.
          </p>
        </div>
      </div>
      <Employs />
    </div>
  );
}
