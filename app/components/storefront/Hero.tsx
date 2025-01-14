import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getBanners() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function Hero() {
  const data = await getBanners();
  return (
    <Carousel>
      <CarouselContent>
        {data.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-[60vh] lg:h-[80vh] inset-0 py-6 sm:py-0">
              <Image
                alt="Banner Image"
                src={banner.imageString}
                fill
                className="object-scale-down lg:object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-6 left-4 bg-black bg-opacity-75 text-white p-4 sm:p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-4xl font-bold">
                  {banner.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
