import { axiosFileClient } from "@/lib/axios";

export const getMedia = async ({ directory }: { directory: string }) => {
  const { data: responseData } = await axiosFileClient.get(
    "/media/" + directory
  );
  return responseData;
};

export const uploadMedia = async ({
  file,
  route,
}: {
  file: File;
  route: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosFileClient.post("/media/upload/" + route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
