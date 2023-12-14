import AccountService from "./accountService";
import MerchantBranchService from "./merchantBranchService";
import MerchantService from "./merchantService";
import PromotionService from "./promotionService";

const ServiceFactory = () => {
  return {
    accountService: AccountService(),
    promotionService:PromotionService(),
    merchantService:MerchantService(),
    merchantBranchService:MerchantBranchService(),
  };
};

export default ServiceFactory;
