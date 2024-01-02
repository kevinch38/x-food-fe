import axiosInstance from '../api/axiosInstance';

const AccountService = () => {
    const fetchAccountById = async (id) => {
        const { data } = await axiosInstance.get(`/api/users/${id}`);
        return data;
    }

    const fetchAccounts = async (queryParams) => {
        console.log(queryParams);
        const { data } = await axiosInstance.get(`/api/users`, { params: queryParams });
        return data;
    }


    return {
        fetchAccountById,
        fetchAccounts,
    }
}

export default AccountService;