"use client";
import { DATABASE_TABLE } from "@/config/general";
import { translate } from "@/langs";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTableItem } from "@/services/panel";
import { toast } from "react-toastify";
import BaseForm from "@/components/base-form";
import { createPage, updatePage } from "@/services/pages";
import { CreatePage, UpdatePage } from "@/types/pages";
import { useRouter } from "next/navigation";
import UpdatePageRelationInputType from "./components/update-page-relation-input-type";

export default function Form({
  id,
  table,
}: {
  id: number;
  table: DATABASE_TABLE;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm<any>({});
  const [isDragging, setIsDragging] = useState(false);
  const type_id = watch("type_id");

  const queryClient = useQueryClient();
  const router = useRouter();
  const createMutation = useMutation(
    (data: UpdatePage) => updatePage({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table.name]);
        toast.success("Kayıt başarıyla güncellendi");
        router.push(`/admin/page`);
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.message);
      },
    }
  );

  type FormValues = {
    config_id: string;
    content: { component_id: number; index: number; value: string }[];
    slug: string;
    title: string;
    description: string;
    image: string;
    [key: string]: any;
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const parsedData = {
      ...data,
      content: data.content.map((item) => {
        console.log("item value", item.value);
        console.log("item value", data[item.value as keyof FormValues]);
        return {
          ...item,
          value: data[item.value as keyof FormValues],
        };
      }),
    };

    console.log(parsedData);

    createMutation.mutate({
      title: parsedData.title,
      slug: parsedData.slug,
      content: parsedData.content,
      description: parsedData.description,
      image: parsedData.image,
      config_id: Number(parsedData.config_id),
    });
  };

  return (
    <>
      <BaseForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        table={table}
        id={Number(id)}
        errors={errors}
        register={register}
        formType="update"
        setValue={setValue}
        watch={watch}
        customInput={[
          {
            for: "relation",
            component: UpdatePageRelationInputType,
          },
        ]}
      />
    </>
  );
}
