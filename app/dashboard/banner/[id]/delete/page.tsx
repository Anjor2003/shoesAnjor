import { deleteBanner } from "@/app/actions.ts";
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

export default function DeleteBannerRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Estas seguro de eliminar el Banner?</CardTitle>
          <CardDescription>
            Esta acción no se puede deshacer, por favor confirma si deseas
            eliminar el banner.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flez justify-between">
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            <SubmitButton variant={"destructive"} text="Eliminar Banner" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
