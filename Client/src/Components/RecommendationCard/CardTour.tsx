import { TourProps, Tour } from "antd";
import { useEffect, useState } from "react";

export default function CardTour({ card, buttons, interested, notInterested }) {
  const [open, setOpen] = useState<boolean>(false);
  const handleFinish = () => {
    setOpen(false);
    localStorage.setItem("RecommendationCardTour", "true");
  };

  useEffect(() => {
    const tourExecuted = localStorage.getItem("RecommendationCardTour");
    if (!tourExecuted) {
      setOpen(true);
    }
  }, []);

  const steps: TourProps["steps"] = [
    {
      title: "Welcome to Rekami!",
      description:
        "This is Where your going to see your Recommendations, and now we're going to learn how to use it!",
      target: () => card.current,
    },
    {
      title: "How to use?",
      description:
        "You're going to receive a recommendation, and you have these two buttons.",
      target: () => buttons.current,
    },
    {
      title: "Interested Button",
      description: "Click here if this happens to be of your interest.",
      target: () => interested.current,
    },
    {
      title: "Not Interested Button",
      description: "And Click here if it's not.",
      target: () => notInterested.current,
    },
    {
      title: "Simple isn't it?",
      description: "Now you're ready to start swiping!",
      target: () => card.current,
    },
  ];

  return <Tour open={open} onClose={handleFinish} steps={steps} />;
}
