import axiosInstance from '../api/axiosInstance';

const PromotionService = () => {
    const fetchPromotionById = async (id) => {
        const { data } = await axiosInstance.get(`/api/promotions/${id}`);
        return data;
    }

    const fetchPromotions = async (queryParams) => {
        const { data } = await axiosInstance.get(`/api/promotions`, { params: queryParams });
        return data;
    }


    return {
        fetchPromotionById,
        fetchPromotions,
    }
}

export default PromotionService;