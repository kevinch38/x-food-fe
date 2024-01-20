import * as Yup from 'yup';
const maxSize = 1024 * 1024 * 2;

const validationSchema = () =>
	Yup.object({
		merchantName: Yup.string().required('Merchant name is required'),
		picName: Yup.string().required('PIC name is required'),
		merchantDescription: Yup.string()
			.required('Merchant description is required')
			.max(150, 'Description too long, maximum is 150 characters'),
		picNumber: Yup.string()
			.matches(/^[0-9]+$/, 'PIC Number must be numbers')
			.required('PIC Number is required')
			.min(10, 'Minimum PIC Number length is 10')
			.max(15, 'Minimum PIC Number length is 15'),
		picEmail: Yup.string().required('PIC email is required').email(),
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
		logoImage: Yup.mixed()
			.required('Logo image is required')
			.test('fileType', 'Unsupported File Format', (value) => {
				return ['image/jpeg', 'image/png', 'image/jpg'].includes(
					value.type
				);
			})
			.test('fileSize', 'Image size is too large', (value) => {
				return value.size <= maxSize;
			}),
	});

export default validationSchema;
