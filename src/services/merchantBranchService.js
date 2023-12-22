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
    
    const saveMerchantBranch = async (merchantBranch) => {
        console.log(merchantBranch);
        const formData = new FormData();
        formData.append('merchantID', merchantBranch.merchantID);
        formData.append('branchName', merchantBranch.branchName);
        formData.append('address', merchantBranch.address);
        formData.append('timezone', merchantBranch.timezone);
        formData.append('branchWorkingHoursID', merchantBranch.branchWorkingHoursID);
        formData.append('cityID ', merchantBranch.cityID );
        formData.append('picName', merchantBranch.picName);
        formData.append('picNumber', merchantBranch.picNumber);
        formData.append('picEmail', merchantBranch.picEmail);
        formData.append('image', merchantBranch.image);
        formData.append('joinDate', merchantBranch.joinDate);
        const { data } = await axiosInstance.post(`/api/merchants/branches`, formData);
        return data;
    }

    
    const updateMerchantBranch = async (merchantBranch) => {
        console.log(merchantBranch);
        const formData = new FormData();
        formData.append('merchantBranchID', merchantBranch.merchantBranchID);
        formData.append('merchantBranchName', merchantBranch.merchantBranchName);
        formData.append('merchantBranchDescription', merchantBranch.merchantBranchDescription);
        formData.append('picName', merchantBranch.picName);
        formData.append('picNumber', merchantBranch.picNumber);
        formData.append('picEmail', merchantBranch.picEmail);
        formData.append('image', merchantBranch.image);
        formData.append('logoImage', merchantBranch.logoImage);
        formData.append('notes', merchantBranch.notes);
        const { data } = await axiosInstance.put('/api/merchantBranchs', formData);
        return data;
    }

    const deleteMerchantBranch = async (id) => {
        const { data } = await axiosInstance.delete(`/api/merchantBranchs/${id}`);
        return data;
    }


    return {
        fetchMerchantBranchById,
        fetchMerchantBranchs,
        saveMerchantBranch,
        updateMerchantBranch,
        deleteMerchantBranch,
    }
}

export default MerchantBranchService;