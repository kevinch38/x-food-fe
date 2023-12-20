import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../../context/ServiceContext';
import { useContext } from 'react';
import {
	merchantAction,
	selectMerchantAction,
} from '../../../slices/merchantSlice';
import { useEffect } from 'react';
import validationSchema from './validationSchema';
import { useFormik } from 'formik';

export default function CreateMerchantModal({ merchantID }) {
	const dispatch = useDispatch();
	const { merchantService } = useContext(ServiceContext);
	const { merchants } = useSelector((state) => state.merchant);

	const {
		values: {
			merchantName,
			picName,
			merchantDescription,
			picNumber,
			picEmail,
		},
		errors,
		dirty,
		isValid,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
		setValues,
	} = useFormik({
		initialValues: {
			merchantID: null,
			merchantName: '',
			picName: '',
			merchantDescription: '',
			picNumber: '',
			picEmail: '',
		},
		onSubmit: async (values) => {
			if (!isValid) return;

			if (!merchantID) {
				const data = {
					...values,
				};
				delete data.merchantID;
				dispatch(
					merchantAction(async () => {
						const result = await merchantService.saveMerchant({
							...data,
							joinDate: '1999-07-05',
						});
						const a = [...merchants, result.data];
						return {data:a};
					})
				);
				handleReset();
				return;
			}

			dispatch(
				merchantAction(async () => {
					await merchantService.updateMerchant(values);
					// if (result.statusCode === 200) {
					// 	navigate('/backoffice/menus');
					// }
					return null;
				})
			);
			handleReset();
		},
		validationSchema: validationSchema(),
	});

	useEffect(() => {
		if (merchantID) {
			const onGetMerchantById = async () => {
				const result = await dispatch(
					selectMerchantAction(() =>
						merchantService.fetchMerchantById(merchantID)
					)
				);

				if (result.payload) {
					const {
						merchantID,
						merchantName,
						picName,
						merchantDescription,
						picNumber,
						picEmail,
					} = result.payload.data;
					setValues({
						id: merchantID,
						merchantName: merchantName,
						picName: picName,
						merchantDescription: merchantDescription,
						picNumber: picNumber,
						picEmail: picEmail,
					});
				}
			};
			onGetMerchantById();
		}
	}, [dispatch, setValues, merchantID, merchantService]);

	return (
		<div
			className='modal fade'
			id={`createMerchantModal`}
			tabIndex='-1'
			aria-labelledby={`createMerchantModal`}
			aria-hidden='true'
			style={{
				borderRadius: '50px',
				marginTop: '5%',
			}}
		>
			<div
				className='modal-dialog rounded-5'
				style={{
					maxWidth: '90vw',
				}}
			>
				<div className='p-5 modal-content border-0'>
					<div className='row'>
						<div className='d-flex justify-content-between'>
							<h1 className='modal-title fw-bold'>Merchant</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={handleReset}
							></button>
						</div>
					</div>
					<div
						className='modal-body h-auto p-0 mt-4'
						style={{
							textAlign: 'left',
						}}
					>
						<div className='alert alert-dark fw-bold' role='alert'>
							<i
								id='boot-icon'
								className='bi bi-exclamation-circle-fill me-2'
								style={{
									color: 'rgb(84, 84, 84)',
								}}
							></i>
							Create New Merchant
						</div>
						<h3 className='fw-bold mt-5 position-relative mb-0'>
							Personal Information
							<span className='position-absolute'>
								<i
									className='bi bi-asterisk'
									style={{ color: 'red', width: '1px' }}
								></i>
							</span>
						</h3>
						<div
							style={{
								marginLeft: '-20px',
								marginRight: '-20px',
							}}
						>
							<form onSubmit={handleSubmit}>
								<table
									className='table'
									style={{
										borderSpacing: '20px',
										borderCollapse: 'separate',
									}}
								>
									<tr>
										<td>
											<input
												className={`form-control`}
												type='text'
												placeholder='ID (Generated)'
												name='merchantID'
												disabled
											/>
										</td>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={picName}
												id='picName'
												className={`form-control  ${
													touched.picName &&
													errors.picName &&
													'is-invalid'
												}`}
												type='text'
												placeholder='PIC Name'
												name='picName'
											/>
										</td>
									</tr>
									<tr>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={merchantName}
												id='merchantName'
												className={`form-control  ${
													touched.merchantName &&
													errors.merchantName &&
													'is-invalid'
												}`}
												type='text'
												placeholder='Name'
												name='merchantName'
											/>
										</td>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={picNumber}
												id='picNumber'
												className={`form-control  ${
													touched.picNumber &&
													errors.picNumber &&
													'is-invalid'
												}`}
												type='text'
												placeholder='PIC Number'
												name='picNumber'
											/>
										</td>
									</tr>
									<tr>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={merchantDescription}
												id='merchantDescription'
												className={`form-control  ${
													touched.merchantDescription &&
													errors.merchantDescription &&
													'is-invalid'
												}`}
												type='text'
												placeholder='Description'
												name='merchantDescription'
											/>
										</td>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={picEmail}
												id='picEmail'
												className={`form-control  ${
													touched.picEmail &&
													errors.picEmail &&
													'is-invalid'
												}`}
												type='text'
												placeholder='PIC Email'
												name='picEmail'
											/>
										</td>
									</tr>
									<tr>
										<td>
											<button
												disabled={!isValid || !dirty}
												className='btn bg-dark text-white pe-3 ps-3'
												type='submit'
												data-bs-dismiss='modal'
											>
												Submit
											</button>
										</td>
									</tr>
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
