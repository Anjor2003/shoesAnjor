import { Checkout, removeItem } from "@/app/actions.ts";
import {
  CheckoutButton,
  DeleteItem,
} from "@/app/components/dashboard/SubmitButton";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function BagRoute() {
  noStore()
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 p-8 text-center mt-20">
          <div className="flex size-20 items-center justify-center rounded-full bg-blue-500/10">
            <ShoppingBag className="size-10 text-blue-500" />
          </div>
          <h2 className="mt-6 font-semibold text-gray-900 text-xl">
            Tu carrito está vacío
          </h2>
          <p className="mb-8 mt-1 text-sm text-muted-foreground leading-6 max-w-lg mx-auto">
            Agrega productos a tu carrito para verlos aquí después de la compra
            de tu pedido.
          </p>
          <Button asChild className="bg-blue-500">
            <Link href="/products/all">Explorar Productos</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex border-b border-primary">
              <div className="w-24 h-16 sm:w-32 sm:h-24 relative">
                <Image
                  src={item.imageString}
                  alt={item.name}
                  width={128}
                  height={90}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p className="text-xl font-semibold">{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>
                      {item.quantity} <span className="ml-2 mr-1">x</span>
                    </p>
                    <p>{item.price} €</p>
                  </div>
                  <form action={removeItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <div className="flex items-center justify-between font-medium text-lg">
              <p>Subtotal:</p>
              <p>{new Intl.NumberFormat("es-ES").format(totalPrice)} €</p>
            </div>
            <form action={Checkout}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
