import { useDispatch } from 'react-redux';
import { ServiceContext } from '../../../context/ServiceContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
	merchantBranchAction,
	selectMerchantBranchAction,
} from '../../../slices/merchantBranchSlice';
import { useEffect } from 'react';
import validationSchema from './validationSchema';
import { useFormik } from 'formik';

export default function CreateMerchantBranchModal({merchantBranchID}) {
	const dispatch = useDispatch();
	const { merchantBranchService } = useContext(ServiceContext);

	const {
		values: {
			merchantBranchName,
			picName,
			merchantBranchDescription,
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
			merchantBranchID: null,
			merchantBranchName: '',
			picName: '',
			merchantBranchDescription: '',
			picNumber: '',
			picEmail: '',
		},
		onSubmit: async (values) => {
			if (!isValid) return;

			if (!merchantBranchID) {
				const data = {
					...values,
				};
				delete data.merchantBranchID;
				dispatch(
					merchantBranchAction(async () => {
						await merchantBranchService.saveMerchantBranch({
							...data,
							joinDate: '1999-07-05',
						});
						// if (result.statusCode === 201) {
						// 	navigate('/backoffice/menus');
						// }
						return null;
					})
				);
				handleReset();
				return;
			}

			dispatch(
				merchantBranchAction(async () => {
					await merchantBranchService.updateMerchantBranch(values);
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
		if (merchantBranchID) {
			const onGetMerchantBranchById = async () => {
				const result = await dispatch(
					selectMerchantBranchAction(() =>
						merchantBranchService.fetchMerchantBranchById(merchantBranchID)
					)
				);

				if (result.payload) {
					const {
						merchantBranchID,
						merchantBranchName,
						picName,
						merchantBranchDescription,
						picNumber,
						picEmail,
					} = result.payload.data;
					setValues({
						id: merchantBranchID,
						merchantBranchName: merchantBranchName,
						picName: picName,
						merchantBranchDescription: merchantBranchDescription,
						picNumber: picNumber,
						picEmail: picEmail,
					});
				}
			};
			onGetMerchantBranchById();
		}
	}, [dispatch, setValues, merchantBranchID, merchantBranchService]);

	return (
		<div
			className='modal fade'
			id={`createMerchantBranchModal`}
			tabIndex='-1'
			aria-labelledby={`createMerchantBranchModal`}
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
							<h1 className='modal-title fw-bold'>MerchantBranch</h1>
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
							Create New MerchantBranch
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
												name='merchantBranchID'
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
												value={merchantBranchName}
												id='merchantBranchName'
												className={`form-control  ${
													touched.merchantBranchName &&
													errors.merchantBranchName &&
													'is-invalid'
												}`}
												type='text'
												placeholder='Name'
												name='merchantBranchName'
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
												value={merchantBranchDescription}
												id='merchantBranchDescription'
												className={`form-control  ${
													touched.merchantBranchDescription &&
													errors.merchantBranchDescription &&
													'is-invalid'
												}`}
												type='text'
												placeholder='Description'
												name='merchantBranchDescription'
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
