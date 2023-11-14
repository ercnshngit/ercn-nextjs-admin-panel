"use client";
import React from "react";
import Image from "next/image";
import LoginImage from "@/assets/images/login-image.png";
import Input from "@/components/Input";
import Password from "@/components/Password";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { Login } from "@/types/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import Cookies from "universal-cookie";
import Link from "next/link";

export default function Home() {
  const cookies = new Cookies();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (response) => {
        cookies.set("accessToken", response.data.accessToken, { path: "/" });
        cookies.set("user", JSON.stringify(response.data.user), { path: "/" });
        router.push("/admin");
        router.refresh();
    
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
  } = useForm<Login>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:w-[860px] w-[480px] h-[520px] border-2 flex flex-row items-center rounded-lg shadow-lg">
        <div
          className="flex  flex-col md:w-[380px] w-0 h-[520px] md:p-12 rounded-md"
          style={{ backgroundColor: "#3040D6" }}
        >
          <div className="mt-1 mb-8 font-sans text-3xl text-white">
            Hoş Geldiniz
          </div>
          <p className="mt-8 mb-8 font-sans text-sm text-white">
            Uygulamanız için tüm verilerinizi tek bir yerden yönetmenizi
            sağlayan yönetici paneli .
          </p>
          <Image src={LoginImage} alt="Login Image" className="w-96 h-80" />
        </div>
        <div className="flex flex-col justify-start items-start w-[480px] h-[520px] p-12 rounded-md text-black">
          <div className="flex flex-row w-[200px] justify-between items-center mb-14">
            
            <div className="items-center text-2xl">AdminPaneli</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Username" label="* Username" {...field} />
              )}
            />

            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => <Input {...field} placeholder="Password" type="password" label="* Password" />}
            />

          
              <button
                type="submit"
                className="m-28 mt-5 w-[125px] h-[34px] text-white rounded-sm py-1"
                style={{ backgroundColor: "#3040D6" }}
              >
                Giriş
              </button>
           
          </form>
        </div>
      </div>
    </div>
  );
}
