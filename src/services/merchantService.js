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

    const saveMerchant = async (merchant) => {
        const { data } = await axiosInstance.post('/api/merchants', merchant);
        return data;
    }

    
    const updateMerchant = async (merchant) => {
        const { data } = await axiosInstance.put('/api/merchants', merchant);
        return data;
    }


    return {
        fetchMerchantById,
        fetchMerchants,
        saveMerchant,
        updateMerchant,
    }
}

export default MerchantService;