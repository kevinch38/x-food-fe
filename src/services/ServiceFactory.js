import AccountService from "./accountService";

const ServiceFactory = () => {
  return {
    accountService: AccountService(),
  };
};

export default ServiceFactory;
