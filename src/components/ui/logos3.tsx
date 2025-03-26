
"use client";

import { useEffect, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Ils font confiance à notre solution",
  logos = [
    {
      id: "logo-1",
      description: "Supabase",
      image: "/lovable-uploads/f2667950-68a5-4464-963e-1c956f312793.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-2",
      description: "OpenAI",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/320px-OpenAI_Logo.svg.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-3",
      description: "GitHub",
      image: "/lovable-uploads/67757e96-e869-43ca-9289-3084b35a15bd.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-4",
      description: "Lovable",
      image: "/lovable-uploads/82e134ee-d25a-4571-8c5f-8f3f34850ed4.png",
      className: "h-10 w-auto",
    },
  ],
}: Logos3Props) => {
  const isXs = useMediaQuery("(max-width: 480px)");
  const isSm = useMediaQuery("(min-width: 481px) and (max-width: 767px)");
  const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [itemSpacing, setItemSpacing] = useState("mx-8");

  // Adjust carousel properties based on screen size
  useEffect(() => {
    if (isXs) {
      setScrollSpeed(0.2);
      setItemsToShow(1.5);
      setItemSpacing("mx-2");
    } else if (isSm) {
      setScrollSpeed(0.25);
      setItemsToShow(2);
      setItemSpacing("mx-3");
    } else if (isMd) {
      setScrollSpeed(0.35);
      setItemsToShow(3);
      setItemSpacing("mx-4"); 
    } else {
      setScrollSpeed(0.5);
      setItemsToShow(4);
      setItemSpacing("mx-6");
    }
  }, [isXs, isSm, isMd]);

  // Calculate basis class based on items to show
  const getBasisClass = () => {
    if (isXs) return "basis-2/3";
    if (isSm) return "basis-1/2";
    if (isMd) return "basis-1/3";
    return "basis-1/4";
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 dark:bg-gray-900">
      <div className="container flex flex-col items-center text-center px-4">
        <h2 className="my-3 sm:my-4 md:my-6 text-pretty text-lg sm:text-xl md:text-2xl font-bold lg:text-4xl dark:text-white">
          {heading}
        </h2>
      </div>
      <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-8">
        <div className="relative mx-auto flex items-center justify-center px-2 sm:px-4 md:px-6 max-w-full lg:max-w-5xl">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[AutoScroll({ playOnInit: true, direction: "forward", speed: scrollSpeed })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className={`flex justify-center pl-0 ${getBasisClass()}`}
                >
                  <div className={`${itemSpacing} flex shrink-0 items-center justify-center py-4`}>
                    <div className="flex h-8 sm:h-10 md:h-12 lg:h-16 items-center justify-center">
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-6 sm:w-8 md:w-12 bg-gradient-to-r from-background to-transparent dark:from-gray-900"></div>
          <div className="absolute inset-y-0 right-0 w-6 sm:w-8 md:w-12 bg-gradient-to-l from-background to-transparent dark:from-gray-900"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
