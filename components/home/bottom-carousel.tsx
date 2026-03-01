import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CarouselSlide from "./bottom-carousel-card"


const SlidesData = [
  {
    image: "https://ik.imagekit.io/mrityunjay/profile-sq.png", // put your image in /public
    title: "Built with VisionAgents and Stream",
    description:
      "Powered by real-time vision intelligence and seamless video infrastructure for accurate behavioral and technical analysis.",
  },
  {
    image: "https://ik.imagekit.io/mrityunjay/teach.png",
    title: "Practice with AI interviewer",
    description:
      "Simulate real technical interviews with behavioral analysis in real time.",
  },
  {
    image: "https://ik.imagekit.io/mrityunjay/teach%20(1).png",
    title: "Track measurable growth",
    description:
      "See your posture, confidence, and communication improve over time.",
  },
];

export default function BottomCarousel() {
   
   

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-xl text-center mt-5"
    >
      <CarouselContent>
        {SlidesData.map((slide, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <CarouselSlide
              image={slide.image}
              title={slide.title}
              description={slide.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

