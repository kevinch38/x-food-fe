import AuthService from "./AuthService";
import AccountService from "./accountService";
import AdminMonitoringService from "./adminMonitoringService";
import HistoryService from "./historyService";
import MerchantBranchService from "./merchantBranchService";
import MerchantService from "./merchantService";
import PromotionService from "./promotionService";

const ServiceFactory = () => {
  return {
    accountService: AccountService(),
    promotionService: PromotionService(),
    merchantService: MerchantService(),
    merchantBranchService: MerchantBranchService(),
    historyService: HistoryService(),
    adminMonitoringService: AdminMonitoringService(),
    authService:AuthService(),
  };
};

export default ServiceFactory;
