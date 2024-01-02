import * as Yup from 'yup';

const validationSchema = () =>
	Yup.object({
		merchantname: Yup.string().required('Merchant name is required'),
		maxRedeem: Yup.string().required('Max redeem is required'),
		promotionValue: Yup.string().required('Value is required'),
		promotionDescription: Yup.string().required('Description is required'),
		cost: Yup.string().required('Cost is required'),
		quantity: Yup.string().required('Quantity is required'),
		expiredDate: Yup.string().required('Expired date is required'),
	});

export default validationSchema;