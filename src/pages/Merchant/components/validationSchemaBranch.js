import * as Yup from 'yup';
const maxSize = 1024 * 1024 * 2;

const validationSchemaBranch = () =>
	Yup.object({
		branchName: Yup.string().required('Merchant name is required'),
		picName: Yup.string().required('PIC name is required'),
		cityID: Yup.string().required('City is required'),
		picNumber: Yup.string().required('PIC Number is required'),
		picEmail: Yup.string().required('PIC email is required'),
		image: Yup.mixed()
			.required('Image is required')
			.test('fileType', 'Unsupported File Format', (value) => {
				return ['image/jpeg', 'image/png', 'image/jpg'].includes(
					value.type
				);
			})
			.test('fileSize', 'Image size is too large', (value) => {
				return value.size <= maxSize;
			}),
	});

export default validationSchemaBranch;
