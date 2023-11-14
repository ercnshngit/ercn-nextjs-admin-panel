"use client";
import DescriptionInput from "@/components/DescriptionInput";
import DropdownMenu from "@/components/DropdownMenu";
import Input from "@/components/Input";
import {getGenerals, updateGenerals } from "@/services/generals";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import { Generals } from "@/types/generals";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";


export default function GeneralsCard({general}:any) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [file, setFile] = useState<{
    name: string
    size: number
    type: string
    lastModified: number
    lastModifiedDate: Date
    webkitRelativePath: string
  }|null>(null)
  const [status, setStatus] = useState('idle')

  const mutation = useMutation({
    mutationFn: (data: Generals) => updateGenerals(data),
    onSuccess: (response) => {
      
     
      
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Generals>({
    defaultValues: {
      id:0,
      title: general.title,
    description: general.description,
    slug: general.slug,
    img : general.img,
    },
  });

  const onSubmit: SubmitHandler<Generals> = (data) => {
    setIsLoading(true);
    data.id = general.id;
    
    mutation.mutate(data);
  };
  

  return (
    <div className="w-[30vw] h-auto p-8  bg-white flex flex-col justify-evenly border-[1px] shadow-lg m-2">

<form onSubmit={handleSubmit(onSubmit)}>      
     

     <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input label="Title" {...field}/> 
              )}
            />

<Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input label="Description"  {...field}/> 
              )}
            />


<Controller
              name="img"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input label="Image"  {...field}/> 
              )}
            />

{/* <FileUpload setFile={setFile} status={status} file={file} /> */}
      
       
      
     
      <button  type="submit" className="flex items-center justify-center px-5 py-1 text-sm text-white rounded-xl bg-[#3040D6]">
          Güncelle
        </button>
     </form>
    </div>
  );
}
