import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPayment() {
  return (
    <section className="flex items-center justify-center w-full min-h-[80vh]">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className="size-12 rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg font-medium leading-6">
              El pago ha sido cancelado
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Algo paso con tu pago. No se pago nada. Por favor intentalo de
              nuevo
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
