import * as Yup from 'yup';
const maxSize = 1024 * 1024 * 2;
const numberRegexG = (value) => /^\d+$/.test(value);

const validationSchemaBranch = () =>
	Yup.object({
		branchName: Yup.string().required('Merchant name is required'),
		picName: Yup.string().required('PIC name is required'),
		cityID: Yup.string().required('City is required'),
		picNumber: Yup.string()
			.required('PIC Number is required')
			.matches(/^[0-9]+$/, 'PIC Number must be numbers')
			.test(
				'Digits only',
				'The field should have digits only',
				numberRegexG
			)
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
		timezone: Yup.string().required('Timezone is required'),
	});

export default validationSchemaBranch;
