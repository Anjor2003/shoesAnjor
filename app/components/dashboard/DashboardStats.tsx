import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

async function getData() {
  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    await prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, products, order };
}

export async function DashboardStats() {
  const { user, products, order } = await getData();
  const totalAmount = order.reduce((acc, item) => acc + item.amount, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-1 text-center">
            {new Intl.NumberFormat("es-ES").format(totalAmount / 100)} €
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-6 w-6 text-blue-500" />
        </CardHeader>
        <CardContent className="gap-2">
          <p className="text-2xl font-bold mb-1 text-center">+{order.length}</p>
          <p className="text-xs text-muted-foreground">Total sales increase</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-6 w-6 text-indigo-500" />
        </CardHeader>
        <CardContent className="gap-2">
          <p className="text-2xl font-bold mb-1 text-center">
            {products.length}
          </p>
          <p className="text-xs text-muted-foreground">Total products added</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-6 w-6 text-orange-500" />
        </CardHeader>
        <CardContent className="gap-2">
          <p className="text-2xl font-bold mb-1 text-center">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total users signed up</p>
        </CardContent>
      </Card>
    </div>
  );
}
