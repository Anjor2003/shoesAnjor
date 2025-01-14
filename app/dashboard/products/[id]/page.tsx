import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return <EditForm data={product} />;
}
