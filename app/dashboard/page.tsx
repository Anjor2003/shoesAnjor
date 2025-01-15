import prisma from "../lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecentSales";
import { Chart } from "../components/dashboard/Chart";
import { unstable_noStore as noStore } from "next/cache";

async function getChartData() {
  const now = new Date();
  const seventDaysAgo = new Date();
  seventDaysAgo.setDate(now.getDate() - 7);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: seventDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("es-ES").format(item.createdAt),
    revenue: item.amount / 100,
  }));
  return result;
}

export default async function Dashboard() {
  noStore();
  const data = await getChartData();
  return (
    <>
      <DashboardStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Ventas recientes de los ultimos 7 dias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>
        <RecentSales />
      </div>
    </>
  );
}
