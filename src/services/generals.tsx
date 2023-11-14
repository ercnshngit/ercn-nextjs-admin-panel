import axiosClient from '@/lib/axios'
import { Generals } from '@/types/generals'


export const getGenerals = async () => {
    const { data } = await axiosClient.get('/generals')
    return data
}
export const getGeneralsById = async ({ generalId }: { generalId: number }) => {
    const { data } = await axiosClient.get('/generals/get/' + generalId)
    return data
}
export const getGeneralsBySlug = async ({ generalSlug }: { generalSlug: string }) => {
    const { data } = await axiosClient.get('/generals/getbyslug/' + generalSlug)
    return data
}

export const createGenerals = async ({
    title,
    description,
    slug,
    img,
    
  }: Generals) => {
    return axiosClient.post('/generals/create', {
        title,
        description,
        slug,
        img,
        
    })
}

export const updateGenerals = async ({
    id, 
    title,
    description,
    slug,
    img,
}: Generals) => {
    return axiosClient.post(`/generals/update/${id}`, {
        title,
        description,
        slug,
        img,
    })
}
  