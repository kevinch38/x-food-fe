import axiosInstance from '../api/axiosInstance';

const HistoryService = () => {
    const fetchHistoryById = async (id) => {
        const { data } = await axiosInstance.get(`/api/histories/${id}`);
        console.log(data)
        return data;
    }

    const fetchHistories = async () => {
        const { data } = await axiosInstance.get(`/api/histories?paging=true`);
        return data;
    }


    return {
        fetchHistoryById,
        fetchHistories,
    }
}

export default HistoryService;