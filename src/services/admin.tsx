import axiosClient from '@/lib/axios'

export const getUser = async () => {
  const {data} = await axiosClient.get('/users')
  return data
}
export const getProduct = async () => {
  const {data} = await axiosClient.get('/products')
  return data
}

export const getCategory = async () => {
  const {data} = await axiosClient.get('/products/categories')
  return data
}

export const getOrder = async () => {
  const {data} = await axiosClient.get("")   //istendiğinde order eklenebilir.
  return data
}


export const getUserId = async ({userId}:{userId:string}) => {
  const {data} = await axiosClient.get('/users/'+userId) 
  return data
}

