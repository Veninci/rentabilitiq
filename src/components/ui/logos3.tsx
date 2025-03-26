
"use client";

import AutoScroll from "embla-carousel-auto-scroll";

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
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "GitHub",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/320px-Octicons-mark-github.svg.png",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Orpi",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Orpi_logo.svg/320px-Orpi_logo.svg.png",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Foncia",
      image: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d0/Foncia_logo.svg/320px-Foncia_logo.svg.png",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Guy Hoquet",
      image: "https://upload.wikimedia.org/wikipedia/fr/thumb/e/e5/Guy_Hoquet_logo.svg/320px-Guy_Hoquet_logo.svg.png",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-16 md:py-24 dark:bg-gray-900">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl dark:text-white">
          {heading}
        </h2>
      </div>
      <div className="pt-6 md:pt-10 lg:pt-12">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, direction: "forward", speed: 0.5 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
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
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent dark:from-gray-900"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent dark:from-gray-900"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
