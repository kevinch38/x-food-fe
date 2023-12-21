import axiosInstance from '../api/axiosInstance';

const MerchantBranchService = () => {
    const fetchMerchantBranchById = async (id) => {
        const { data } = await axiosInstance.get(`/api/merchants/branches`,{params:{merchantID:id}});
        return data;
    }

    const fetchMerchantBranchs = async (queryParams) => {
        const { data } = await axiosInstance.get(`/api/merchants/branches`, { params: queryParams });
        return data;
    }


    return {
        fetchMerchantBranchById,
        fetchMerchantBranchs,
    }
}

export default MerchantBranchService;