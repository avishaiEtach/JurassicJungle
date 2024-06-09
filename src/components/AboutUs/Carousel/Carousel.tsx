import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./Carousel.scss";
import { useCarousel } from "./hooks/useCarousel";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const AboutUsCarousel = () => {
  const { images, theme, activeStep, maxSteps, handleStepChange } =
    useCarousel();

  return (
    <Box className={"carousel__box"}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        disableLazyLoading
        enableMouseEvents
        className="carousel__container"
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                className="carousel__img"
                src={step.imgPath}
                alt={index.toString()}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={undefined}
        backButton={undefined}
      />
    </Box>
  );
};
