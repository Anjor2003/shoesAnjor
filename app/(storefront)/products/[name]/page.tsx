import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getAllProducts(productsCategory: string) {
  switch (productsCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "Todos los productos",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "man",
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });
      return {
        title: "Productos para hombres",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "woman",
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });
      return {
        title: "Productos para mujeres",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });
      return {
        title: "Productos para niños",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}
export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  noStore();
  const { name } = await params;
  const data = await getAllProducts(name);
  return (
    <section>
      <h1 className="text-3xl sm:text-4xl font-semibold my-5">{data.title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.data.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
}
