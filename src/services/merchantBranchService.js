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
    const formData = new FormData();
    formData.append("merchantID", merchantBranch.merchantID);
    formData.append("branchName", merchantBranch.branchName);
    formData.append("address", merchantBranch.address);
    formData.append("timezone", merchantBranch.timezone);
    formData.append(
      "branchWorkingHoursID",
      merchantBranch.branchWorkingHoursID
    );
    formData.append("cityID ", merchantBranch.cityID);
    formData.append("picName", merchantBranch.picName);
    formData.append("picNumber", merchantBranch.picNumber);
    formData.append("picEmail", merchantBranch.picEmail);
    formData.append("image", merchantBranch.image);
    const { data } = await axiosInstance.post(
      `/api/merchants/branches`,
      formData
    );
    return data;
  };

  const updateMerchantBranch = async (merchantBranch) => {
    const formData = new FormData();
    formData.append("branchID", merchantBranch.branchID);
    formData.append("branchName", merchantBranch.branchName);
    formData.append("address", merchantBranch.address);
    formData.append("timezone", merchantBranch.timezone);
    formData.append(
      "branchWorkingHoursID",
      merchantBranch.branchWorkingHoursID
    );
    formData.append("picName", merchantBranch.picName);
    formData.append("picNumber", merchantBranch.picNumber);
    formData.append("picEmail", merchantBranch.picEmail);
    formData.append("image", merchantBranch.image);
    formData.append("cityID", merchantBranch.cityID);
    const { data } = await axiosInstance.put(
      "/api/merchants/branches",
      formData
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
  };
};

export default MerchantBranchService;
