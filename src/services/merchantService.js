import axiosInstance from '../api/axiosInstance';

const MerchantService = () => {
    const fetchMerchantById = async (id) => {
        const { data } = await axiosInstance.get(`/api/merchants/${id}`);
        return data;
    }

    const fetchMerchants = async (queryParams) => {
        const { data } = await axiosInstance.get(`/api/merchants`, { params: queryParams });
        return data;
    }


    return {
        fetchMerchantById,
        fetchMerchants,
    }
}

export default MerchantService;