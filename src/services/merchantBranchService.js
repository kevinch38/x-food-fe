import axiosInstance from '../api/axiosInstance';

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
		const { data } = await axiosInstance.get(
			`/api/merchants/branches/${id}`
		);
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
    branchWorkingHours.push({
			openHour: merchantBranch.openHourMonday,
			closeHour: merchantBranch.closeHourMonday,
			days: 'MONDAY',
		},{
			openHour: merchantBranch.openHourTuesday,
			closeHour: merchantBranch.closeHourTuesday,
			days: 'TUESDAY',
		},{
			openHour: merchantBranch.openHourWednesday,
			closeHour: merchantBranch.closeHourWednesday,
			days: 'WEDNESDAY',
		},{
			openHour: merchantBranch.openHourThursday,
			closeHour: merchantBranch.closeHourThursday,
			days: 'THURSDAY',
		},{
			openHour: merchantBranch.openHourFriday,
			closeHour: merchantBranch.closeHourFriday,
			days: 'FRIDAY',
		},{
			openHour: merchantBranch.openHourSaturday,
			closeHour: merchantBranch.closeHourSaturday,
			days: 'SATURDAY',
		},{
			openHour: merchantBranch.openHourSunday,
			closeHour: merchantBranch.closeHourSunday,
			days: 'SUNDAY',
		},);
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
		formData.append('image', image);
		const { data } = await axiosInstance.put(
			`/api/merchants/branches/${id}`,
			formData
		);
		return data;
	};

	const updateMerchantBranch = async (merchantBranch) => {
		const branchWorkingHours = [];
		branchWorkingHours.push({
      branchWorkingHoursID:merchantBranch.mondayID,
			openHour: merchantBranch.openHourMonday,
			closeHour: merchantBranch.closeHourMonday,
			days: 'MONDAY',
		},{
      branchWorkingHoursID:merchantBranch.tuesdayID,
			openHour: merchantBranch.openHourTuesday,
			closeHour: merchantBranch.closeHourTuesday,
			days: 'TUESDAY',
		},{
      branchWorkingHoursID:merchantBranch.wednesdayID,
			openHour: merchantBranch.openHourWednesday,
			closeHour: merchantBranch.closeHourWednesday,
			days: 'WEDNESDAY',
		},{
      branchWorkingHoursID:merchantBranch.thursdayID,
			openHour: merchantBranch.openHourThursday,
			closeHour: merchantBranch.closeHourThursday,
			days: 'THURSDAY',
		},{
      branchWorkingHoursID:merchantBranch.fridayID,
			openHour: merchantBranch.openHourFriday,
			closeHour: merchantBranch.closeHourFriday,
			days: 'FRIDAY',
		},{
      branchWorkingHoursID:merchantBranch.saturdayID,
			openHour: merchantBranch.openHourSaturday,
			closeHour: merchantBranch.closeHourSaturday,
			days: 'SATURDAY',
		},{
      branchWorkingHoursID:merchantBranch.sundayID,
			openHour: merchantBranch.openHourSunday,
			closeHour: merchantBranch.closeHourSunday,
			days: 'SUNDAY',
		},);
		const request = {
			branchID: merchantBranch.branchID,
			branchName: merchantBranch.branchName,
			address: merchantBranch.address,
			timezone: merchantBranch.timezone,
			branchWorkingHours: branchWorkingHours,
			cityID: merchantBranch.cityID,
			picName: merchantBranch.picName,
			picNumber: merchantBranch.picNumber,
			picEmail: merchantBranch.picEmail,
		};

		const { data } = await axiosInstance.put(
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
