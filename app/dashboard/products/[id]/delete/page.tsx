import { deleteProduct } from "@/app/actions.ts";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Estas seguro de eliminar el producto?</CardTitle>
          <CardDescription>
            Esta acción no se puede deshacer una vez realizada y se eliminarán
            todos los datos de la base de datos.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flez justify-between">
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard/products">Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={params.id} />
            <SubmitButton variant={"destructive"} text="Eliminar Producto" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
