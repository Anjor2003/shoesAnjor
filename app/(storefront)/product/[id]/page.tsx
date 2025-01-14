import { addItem } from "@/app/actions.ts";
import { ShoppingBagButton } from "@/app/components/dashboard/SubmitButton";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getProductDetail(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return product;
}

export default async function ProductDetailRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProductDetail(params.id);
  const addProductToSoppingCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 ">
        <ImageSlider images={data.images} />
        <div className="">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="mt-2 text-3xl text-gray-900">{data.price} €</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="size-6 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-6 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-6 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-6 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-6 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addProductToSoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
