import axiosClient from "@/lib/axios";
import {
  ComponentType,
  CreatePage,
  Page,
  PageConfig,
  UpdatePage,
} from "@/types/pages";

export const getPages = async (): Promise<Page[]> => {
  const { data } = await axiosClient.get("/page");
  return data;
};

export const getPage = async ({ id }: { id: number }): Promise<Page> => {
  const { data } = await axiosClient.get("/page/get/" + id);
  return data;
};

export const updatePage = async ({
  id,
  data,
}: {
  id: number;
  data: UpdatePage;
}) => {
  const { data: responseData } = await axiosClient.post(
    "/page/update/" + id,
    data
  );
  return responseData;
};

export const deletePage = async ({ id }: { id: number }) => {
  const { data: responseData } = await axiosClient.post("/page/delete/" + id);
  return responseData;
};

export const createPage = async ({ data }: { data: CreatePage }) => {
  const { data: responseData } = await axiosClient.post("/page/create", data);
  return responseData;
};

export const getComponentTypes = async (): Promise<ComponentType[]> => {
  const { data } = await axiosClient.get("/page/componenttypes");
  return data;
};

export const getPageConfigs = async (): Promise<PageConfig[]> => {
  const { data } = await axiosClient.get("/page/configs");
  return data;
};
