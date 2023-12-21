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
        console.log(merchant.joinDate);
        // const formData = new FormData();
        // formData.append('id', merchant.id);
        // formData.append('name', merchant.name);
        // formData.append('price', merchant.price);
        // formData.append('category', merchant.category);
        // formData.append('image', merchant.image);
        // const { data } = await axiosInstance.post('/api/merchants', formData);
        // return data;
    }

    
    const updateMerchant = async (merchant) => {
        const { data } = await axiosInstance.put('/api/merchants', merchant);
        return data;
    }

    const deleteMerchant = async (id) => {
        const { data } = await axiosInstance.delete(`/api/merchants/${id}`);
        return data;
    }


    return {
        fetchMerchantById,
        fetchMerchants,
        saveMerchant,
        updateMerchant,
        deleteMerchant,
    }
}

export default MerchantService;