"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Espere por favor....
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size={"lg"} className="w-full mt-6">
          <Loader2 className="size-6 mr-2 animate-spin" />
          Espere por favor...
        </Button>
      ) : (
        <Button size={"lg"} className="w-full mt-6" type="submit">
          <ShoppingBag className="size-6 mr-2" />
          Añadir al carrito
        </Button>
      )}
    </>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          Eliminando...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end">Eliminar</button>
      )}
    </>
  );
}

export function CheckoutButton () {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size={"lg"} className="w-full mt-6">
          <Loader2 className="size-6 mr-2 animate-spin" />
          Espere por favor...
        </Button>
      ) : (
        <Button size={"lg"} className="w-full mt-6" type="submit">
          <ShoppingBag className="size-6 mr-2" />
          Ckeckout
        </Button>
      )}
    </>
  );
} 
