import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";

async function getProductData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return data;
}

export function FeaturedProducts() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadignFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadignFeaturedProducts() {
  const data = await getProductData();
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {data.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  );
}
function LoadingRows() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
