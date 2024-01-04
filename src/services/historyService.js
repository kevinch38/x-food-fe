import axiosInstance from '../api/axiosInstance';

const HistoryService = () => {
    const fetchHistoryById = async (id) => {
        const { data } = await axiosInstance.get(`/api/histories/${id}`);
        return data;
    }

    const fetchHistories = async (queryParams) => {
        const { data } = await axiosInstance.get(`/api/histories` , { params: queryParams });
        return data;
      };


    return {
        fetchHistoryById,
        fetchHistories,
    }
}

export default HistoryService;