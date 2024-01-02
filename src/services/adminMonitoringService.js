import axiosInstance from '../api/axiosInstance';

const AdminMonitoringService = () => {
    const fetchAdminMonitoringById = async (id) => {
        const { data } = await axiosInstance.get(`/api/admin-monitoring/${id}`);
        return data;
    }

    const fetchAdminMonitorings = async (queryParams) => {
        const { data } = await axiosInstance.get(`/api/admin-monitoring`, { params: queryParams });
        return data;
    }


    return {
        fetchAdminMonitoringById,
        fetchAdminMonitorings,
    }
}

export default AdminMonitoringService;