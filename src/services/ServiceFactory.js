import AccountService from "./accountService";
import PromotionService from "./promotionService";

const ServiceFactory = () => {
  return {
    accountService: AccountService(),
    promotionService:PromotionService(),
  };
};

export default ServiceFactory;
