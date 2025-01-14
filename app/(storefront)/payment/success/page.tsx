import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPayment() {
  return (
    <section className="flex items-center justify-center w-full min-h-[80vh]">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg font-medium leading-6">
              El pago ha sido realizado
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Felicidades por tu compra. Gracias por confiar en nosotros.
              Esperamos que disfrutes de tu compra.
            </p>
            <Button asChild className="mt-5 w-full sm:mt-6">
              <Link href="/">Volver a la tienda</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
