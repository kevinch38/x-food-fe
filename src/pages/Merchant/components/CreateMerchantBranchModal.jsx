import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ServiceContext } from '../../../context/ServiceContext';
import { useContext } from 'react';
import {
	merchantBranchAction,
	selectMerchantBranchAction,
} from '../../../slices/merchantBranchSlice';
import { useEffect } from 'react';
import validationSchemaBranch from './validationSchemaBranch';
import { useFormik } from 'formik';
import { useState } from 'react';

CreateMerchantBranchModal.propTypes = {
	merchantID: PropTypes.any,
	merchantBranchID: PropTypes.any,
	idx: PropTypes.any,
	onGetMerchantBranchs: PropTypes.func,
	setMerchantBranchID: PropTypes.func,
};

export default function CreateMerchantBranchModal({
	merchantID,
	merchantBranchID,
	idx,
	onGetMerchantBranchs,
	setMerchantBranchID,
}) {
	const dispatch = useDispatch();
	const { merchantBranchService } = useContext(ServiceContext);
	const [key, setKey] = useState();

	const {
		values: { branchName, cityID, picName, picNumber, picEmail },
		errors,
		dirty,
		isValid,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
		setValues,
		setFieldValue,
	} = useFormik({
		initialValues: {
			branchID: null,
			merchantID: merchantID,
			branchName: '',
			branchWorkingHoursID: '1',
			cityID: '8a8ae47a8cae650a018cae6535c00010',
			picName: '',
			picNumber: '',
			picEmail: '',
			image: null,
		},
		onSubmit: async (values) => {
			if (!isValid) return;

			if (!merchantBranchID) {
				const data = {
					...values,
				};
				delete data.branchID;
				dispatch(
					merchantBranchAction(async () => {
						const now = new Date();
						const year = now.getFullYear();
						const month = (now.getMonth() + 1)
							.toString()
							.padStart(2, '0');
						const day = now.getDate().toString().padStart(2, '0');
						const hours = now
							.getHours()
							.toString()
							.padStart(2, '0');
						const minutes = now
							.getMinutes()
							.toString()
							.padStart(2, '0');
						const seconds = now
							.getSeconds()
							.toString()
							.padStart(2, '0');
						const joinDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

						await merchantBranchService.saveMerchantBranch({
							...data,
							joinDate: joinDate,
						});
						await onGetMerchantBranchs(merchantID,'Branch Data Successfully Inserted');
					})
				);
				setMerchantBranchID(null);
				handleReset();
				clearImage();
				return;
			}

			dispatch(
				merchantBranchAction(async () => {
					await merchantBranchService.updateMerchantBranch({
						...values,
					});
					await onGetMerchantBranchs(merchantID,'Branch Data Successfully Updated');
				})
			);
			setMerchantBranchID(null);
			handleReset();
			clearImage();
			return;
		},
		validationSchema: validationSchemaBranch(),
	});
	const clearImage = () => {
		let randomString = Math.random().toString(36);
		setKey(randomString);
	};

	useEffect(() => {
		if (merchantBranchID) {
			const onGetMerchantBranchById = async () => {
				const result = await dispatch(
					selectMerchantBranchAction(() =>
						merchantBranchService.fetchMerchantBranchByBranchId(
							merchantBranchID
						)
					)
				);
				if (result.payload) {
					const {
						branchID,
						branchName,
						address,
						timezone,
						branchWorkingHoursID,
						city,
						picName,
						picNumber,
						picEmail,
					} = result.payload.data;
					setValues({
						branchID: branchID,
						branchName: branchName,
						address: address,
						timezone: timezone,
						branchWorkingHoursID: branchWorkingHoursID,
						cityID: city.cityID,
						picName: picName,
						picNumber: picNumber,
						picEmail: picEmail,
					});
				}
			};
			onGetMerchantBranchById();
		} else {
			setValues({
				branchID: null,
				merchantID: merchantID,
				branchName: '',
				branchWorkingHoursID: '1',
				cityID: '8a8ae47a8cae650a018cae6535c00010',
				picName: '',
				picNumber: '',
				picEmail: '',
				image: null,
			});
		}
	}, [
		dispatch,
		setValues,
		merchantBranchService,
		merchantBranchID,
		merchantID,
	]);

	const handleChangeFile = (e) => {
		setFieldValue(e.currentTarget.name, e.currentTarget.files[0]);
	};
	return (
		<div
			className='modal fade'
			id={`createMerchantBranchModal${merchantID}`}
			tabIndex='-1'
			aria-labelledby={`createMerchantBranchModal${merchantID}`}
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
							<h1 className='modal-title fw-bold'>Branch</h1>
							<button
								type='button'
								className='btn-close'
								// data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => {
									clearImage();
									setMerchantBranchID(null);
									handleReset();
									onGetMerchantBranchs(merchantID);
								}}
								data-bs-toggle='modal'
								data-bs-target={`#exampleModal${idx}`}
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
							{`${merchantBranchID ? 'Update' : 'Create New'}`}{' '}
							Branch
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
												placeholder=''
												name='merchantID'
												value={`Merchant ID: ${
													merchantID ? merchantID : ''
												}`}
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
												placeholder='PIC Name:'
												name='picName'
											/>
										</td>
									</tr>
									<tr>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={branchName}
												id='branchName'
												className={`form-control  ${
													touched.branchName &&
													errors.branchName &&
													'is-invalid'
												}`}
												type='text'
												placeholder='Branch Name:'
												name='branchName'
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
												placeholder='PIC Number:'
												name='picNumber'
											/>
										</td>
									</tr>
									<tr>
										<td>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={cityID}
												id='cityID'
												className={`form-control  ${
													touched.cityID &&
													errors.cityID &&
													'is-invalid'
												}`}
												type='text'
												placeholder='City'
												name='cityID'
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
										<td className='w-50'>
											<div className='d-flex justify-content-between ps-0 pe-0'>
												<label
													htmlFor='image'
													className='h-auto'
												>
													Merchant Branch Image:
												</label>

												<input
													className={`form-control text-normal w-50 ${
														touched.image &&
														errors.image &&
														'is-invalid'
													}`}
													key={key}
													type='file'
													accept='.png,.jpeg,.jpg'
													name='image'
													id='image'
													onChange={handleChangeFile}
													onBlur={handleBlur}
												/>
											</div>
										</td>
										<td>
											<button
												disabled={!isValid || !dirty}
												className='btn bg-dark text-white pe-3 ps-3'
												type='submit'
												data-bs-toggle='modal'
												data-bs-target={`#exampleModal${idx}`}
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
