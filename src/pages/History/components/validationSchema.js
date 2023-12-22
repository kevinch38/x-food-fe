import * as Yup from 'yup';

const validationSchema = () =>
	Yup.object({
		merchantName: Yup.string().required('Merchant name is required'),
		picName: Yup.string().required('PIC name is required'),
		merchantDescription: Yup.string().required('Merchant description is required'),
		picNumber: Yup.string().required('PIC Number is required'),
		picEmail: Yup.string().required('PIC email is required'),
	});

export default validationSchema;
