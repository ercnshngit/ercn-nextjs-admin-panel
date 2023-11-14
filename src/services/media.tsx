import axiosClient from "@/lib/axios";

export const getMedia = async ({ directory }: { directory: string }) => {
  const { data: responseData } = await axiosClient.get("/media/" + directory);
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
  return axiosClient.post("/media/upload/" + route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
