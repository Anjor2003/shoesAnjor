"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainIndex, setMainIndex] = useState(0);

  function HandlePreviousClick() {
    setMainIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }
  function HandleNextClick() {
    setMainIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }
  function handleImageClick(index: number) {
    setMainIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg bg-gray-300/10 rounded-lg">
        <Image
          width={600}
          height={400}
          src={images[mainIndex]}
          alt="Imagen Producto"
          loading="lazy"
          className="object-contain w-[600px] h-[400px]"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={HandlePreviousClick} variant={"ghost"} size={"icon"}>
            <ChevronLeft className="size-6" />
          </Button>
          <Button onClick={HandleNextClick} variant={"ghost"} size={"icon"}>
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4]">
        {images.map((image, index) => (
          <div
            onClick={() => handleImageClick(index)}
            key={index}
            className={cn(
              index === mainIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "bg-gray-300/10 px-2 rounded-lg cursor-pointer",
            )}>
            <Image
              src={image}
              alt="Imagen Producto"
              width={100}
              height={100}
              className="object-contain h-full inset-0 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
