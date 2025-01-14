"use client";

import { createBanner } from "@/app/actions.ts";
import { SubmitButton } from "@/app/components/dashboard/SubmitButton";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useState } from "react";

export default function BannerRoute() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(createBanner, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href="/dashboard/banner">
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Nuevo Banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Detalle del Banner</CardTitle>
          <CardDescription>Crea un banner para tu tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Nombre</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Crea el titulo para el banner"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Imagen</Label>
              <input
                type="hidden"
                value={image}
                name={fields.imageString.name}
                key={fields.imageString.key}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="Banner Image"
                  width={200}
                  height={100}
                  className="w-[200px] h-[100px] object-cover border rounded-lg"
                />
              ) : (
                <UploadDropzone
                  endpoint="bannerImageRoute"
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={(err) => {
                    alert("Upload Failed");
                    console.log(err);
                  }}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Crear Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
