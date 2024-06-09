import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export const useCarousel = () => {
  const images = [
    {
      imgPath:
        "https://adventureexperience.co.uk/wp-content/uploads/2018/08/shutterstock_114610390.jpg",
    },
    {
      imgPath:
        "https://static.vecteezy.com/system/resources/previews/031/233/968/large_2x/archaeologist-works-on-an-archaeological-site-with-dinosaur-skeleton-in-wall-stone-fossil-tyrannosaurus-excavations-neural-network-ai-generated-photo.jpg",
    },
    {
      imgPath:
        "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2022/11/111522_cg_private-dino-fossils_feat_rev.jpg",
    },
    {
      imgPath:
        "https://plus.unsplash.com/premium_photo-1711652435000-8de3657c5f71?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return { images, theme, activeStep, maxSteps, handleStepChange };
};
