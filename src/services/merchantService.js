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
        const formData = new FormData();
        formData.append('merchantName', merchant.merchantName);
        formData.append('merchantDescription', merchant.merchantDescription);
        formData.append('picName', merchant.picName);
        formData.append('picNumber', merchant.picNumber);
        formData.append('picEmail', merchant.picEmail);
        formData.append('image', merchant.image);
        formData.append('logoImage', merchant.logoImage);
        formData.append('notes', merchant.notes);
        const { data } = await axiosInstance.post('/api/merchants', formData);
        return data;
    }

    const approveMerchant = async (id) => {
      const { data } = await axiosInstance.put(
        `/api/merchants/approve/active/${id}`
      );
      return data;
    };

    const approveInactiveMerchant = async (id) => {
      const { data } = await axiosInstance.put(
        `/api/merchants/approve/inactive/${id}`
      );
      return data;
    };
    
    const updateMerchant = async (merchant) => {
        const formData = new FormData();
        formData.append('merchantID', merchant.merchantID);
        formData.append('merchantName', merchant.merchantName);
        formData.append('merchantDescription', merchant.merchantDescription);
        formData.append('picName', merchant.picName);
        formData.append('picNumber', merchant.picNumber);
        formData.append('picEmail', merchant.picEmail);
        formData.append('image', merchant.image);
        formData.append('logoImage', merchant.logoImage);
        formData.append('notes', merchant.notes);
        const { data } = await axiosInstance.put('/api/merchants', formData);
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
        approveMerchant,
        approveInactiveMerchant,
    }
}

export default MerchantService;