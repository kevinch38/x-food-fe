import axiosInstance from "../api/axiosInstance";

const MerchantBranchService = () => {
  // const fetchMerchantBranchById = async (id, name) => {
  // 	const { data } = await axiosInstance.get(`/api/merchants/branches`, {
  // 		params: { merchantID: id, branchName: name },
  // 	});
  // 	return data;
  // };
  const fetchMerchantBranchById = async (queryParams) => {
    const { data } = await axiosInstance.get(`/api/merchants/branches`, {
      params: queryParams,
    });
    return data;
  };
  const fetchMerchantBranchByBranchId = async (id) => {
    const { data } = await axiosInstance.get(`/api/merchants/branches/${id}`);
    return data;
  };
  const fetchCities = async () => {
    const { data } = await axiosInstance.get(`/api/cities`);
    return data;
  };

  const approveMerchantBranch = async (id) => {
    const { data } = await axiosInstance.put(
      `/api/merchants/branches/approve/active/${id}`
    );
    return data;
  };

  const approveInactiveMerchantBranch = async (id) => {
    const { data } = await axiosInstance.put(
      `/api/merchants/branches/approve/inactive/${id}`
    );
    return data;
  };

  const rejectUpdateMerchantBranch = async (id) => {
    const { data } = await axiosInstance.put(
      `/api/merchants/branches/reject/update/${id}`
    );
    return data;
  };

  const saveMerchantBranch = async (merchantBranch) => {
    const branchWorkingHours = [];
    const request = {
      merchantID: merchantBranch.merchantID,
      branchName: merchantBranch.branchName,
      address: merchantBranch.address,
      timezone: merchantBranch.timezone,
      branchWorkingHours: branchWorkingHours,
      cityID: merchantBranch.cityID,
      picName: merchantBranch.picName,
      picNumber: merchantBranch.picNumber,
      picEmail: merchantBranch.picEmail,
    };

    const { data } = await axiosInstance.post(
      `/api/merchants/branches`,
      request
    );
    return data;
  };

  const saveMerchantBranchImage = async (image, id) => {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axiosInstance.put(
      `/api/merchants/branches/${id}`,
      formData
    );
    return data;
  };

  const updateMerchantBranch = async (merchantBranch) => {
    const branchWorkingHours = [];
    const request = {
      merchantID: merchantBranch.merchantID,
      branchName: merchantBranch.branchName,
      address: merchantBranch.address,
      timezone: merchantBranch.timezone,
      branchWorkingHours: branchWorkingHours,
      cityID: merchantBranch.cityID,
      picName: merchantBranch.picName,
      picNumber: merchantBranch.picNumber,
      picEmail: merchantBranch.picEmail,
    };

    const { data } = await axiosInstance.post(
      `/api/merchants/branches`,
      request
    );

    return data;
  };

  const deleteMerchantBranch = async (id) => {
    const { data } = await axiosInstance.delete(
      `/api/merchants/branches/${id}`
    );
    return data;
  };

  return {
    fetchMerchantBranchById,
    fetchMerchantBranchByBranchId,
    saveMerchantBranch,
    updateMerchantBranch,
    deleteMerchantBranch,
    fetchCities,
    approveMerchantBranch,
    approveInactiveMerchantBranch,
    rejectUpdateMerchantBranch,
    saveMerchantBranchImage,
  };
};

export default MerchantBranchService;
