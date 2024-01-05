import axiosInstance from "../api/axiosInstance";

const PromotionService = () => {
  const fetchPromotionById = async (id) => {
    const { data } = await axiosInstance.get(`/api/promotions/${id}`);
    return data;
  };

  const fetchPromotions = async () => {
    const { data } = await axiosInstance.get(`/api/promotions`);
    return data;
  };

  const savePromotion = async (promotion) => {
    const request = {
      merchantID: promotion.merchantID,
      promotionName: promotion.promotionName,
      maxRedeem: promotion.maxRedeem,
      promotionValue: promotion.promotionValue,
      promotionDescription: promotion.promotionDescription,
      cost: promotion.cost,
      quantity: promotion.quantity,
      expiredDate: promotion.expiredDate,
      notes: "notes",
    };

    const { data } = await axiosInstance.post("/api/promotions", request);
    return data;
  };

  const updatePromotion = async (promotion) => {
    const request = {
      promotionID: promotion.promotionID,
      merchantID: promotion.merchantID,
      promotionName: promotion.promotionName,
      maxRedeem: promotion.maxRedeem,
      promotionValue: promotion.promotionValue,
      promotionDescription: promotion.promotionDescription,
      cost: promotion.cost,
      quantity: promotion.quantity,
      expiredDate: promotion.expiredDate,
      notes: "notes",
    };
    const { data } = await axiosInstance.put("/api/promotions", request);
    return data;
  };

  const deletePromotion = async (id) => {
    const { data } = await axiosInstance.delete(`/api/promotions/${id}`);
    return data;
  };

  return {
    fetchPromotionById,
    fetchPromotions,
    savePromotion,
    updatePromotion,
    deletePromotion,
  };
};

export default PromotionService;
