import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";

export function CategorySelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Comprar por Categoria
        </h2>
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all">
          Explorar todos los productos &rarr;
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={all}
            alt="imagen de todos los productos"
            className="object-cover object-right"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="flex items-end p-6">
            <Link href={"/products/all"} className="">
              <h3 className="text-white font-semibold">Todos los Productos</h3>
              <p className="mt-1 text-sm text-white">Compra Ahora</p>
            </Link>
          </div>
        </div>
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={men}
            alt="imagen de productos para hombres"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-65 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href={"/products/men"}>
              <h3 className="text-white font-semibold">Productos de Hombre</h3>
              <p className="mt-1 text-sm text-white">Compra Ahora</p>
            </Link>
          </div>
        </div>
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={women}
            alt="imagen de productos para mujeres"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href={"/products/women"} className="">
              <h3 className="text-white font-semibold">Productos de Mujer</h3>
              <p className="mt-1 text-sm text-white">Compra Ahora</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
