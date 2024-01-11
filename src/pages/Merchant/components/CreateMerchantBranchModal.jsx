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
	cities: PropTypes.any,
	merchantID: PropTypes.any,
	merchantBranchID: PropTypes.any,
	idx: PropTypes.any,
	onGetMerchantBranches: PropTypes.func,
	setMerchantBranchID: PropTypes.func,
};

export default function CreateMerchantBranchModal({
	merchantID,
	merchantBranchID,
	idx,
	onGetMerchantBranches,
	setMerchantBranchID,
	cities,
}) {
	const dispatch = useDispatch();
	const { merchantBranchService } = useContext(ServiceContext);
	const [key, setKey] = useState();

	const gmt = [
		'GMT-11',
		'GMT-10',
		'GMT-9',
		'GMT-8',
		'GMT-7',
		'GMT-6',
		'GMT-5',
		'GMT-4',
		'GMT-3',
		'GMT-2',
		'GMT-1',
		'GMT+0',
		'GMT+1',
		'GMT+2',
		'GMT+3',
		'GMT+4',
		'GMT+5',
		'GMT+6',
		'GMT+7',
		'GMT+8',
		'GMT+9',
		'GMT+10',
		'GMT+11',
		'GMT+12',
		'GMT+13',
		'GMT+14',
	];

	const hour = [
		{
			value: '07:00:00',
			show: '07:00',
		},
		{
			value: '08:00:00',
			show: '08:00',
		},
		{
			value: '09:00:00',
			show: '09:00',
		},
		{
			value: '10:00:00',
			show: '10:00',
		},
		{
			value: '11:00:00',
			show: '11:00',
		},
		{
			value: '12:00:00',
			show: '12:00',
		},
		{
			value: '13:00:00',
			show: '13:00',
		},
		{
			value: '14:00:00',
			show: '14:00',
		},
		{
			value: '15:00:00',
			show: '15:00',
		},
		{
			value: '16:00:00',
			show: '16:00',
		},
		{
			value: '17:00:00',
			show: '17:00',
		},
		{
			value: '18:00:00',
			show: '18:00',
		},
		{
			value: '19:00:00',
			show: '19:00',
		},
		{
			value: '20:00:00',
			show: '20:00',
		},
		{
			value: '21:00:00',
			show: '21:00',
		},
	];
	const {
		values: {
			branchName,
			cityID,
			address,
			timezone,
			picName,
			picNumber,
			picEmail,
			openHourMonday,
			closeHourMonday,
			openHourTuesday,
			closeHourTuesday,
			openHourWednesday,
			closeHourWednesday,
			openHourThursday,
			closeHourThursday,
			openHourFriday,
			closeHourFriday,
			openHourSaturday,
			closeHourSaturday,
			openHourSunday,
			closeHourSunday,
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
		setFieldValue,
	} = useFormik({
		initialValues: {
			branchID: null,
			merchantID: merchantID,
			branchName: '',
			cityID: '',
			address: '',
			timezone: '',
			picName: '',
			picNumber: '',
			picEmail: '',
			image: null,
			// branchWorkingHours: [{ openHour: "", closeHour: "", days: "" }],
			// branchWorkingHours: [],
			openHourMonday: '07:00:00',
			closeHourMonday: '07:00:00',
			openHourTuesday: '07:00:00',
			closeHourTuesday: '07:00:00',
			openHourWednesday: '07:00:00',
			closeHourWednesday: '07:00:00',
			openHourThursday: '07:00:00',
			closeHourThursday: '07:00:00',
			openHourFriday: '07:00:00',
			closeHourFriday: '07:00:00',
			openHourSaturday: '07:00:00',
			closeHourSaturday: '07:00:00',
			openHourSunday: '07:00:00',
			closeHourSunday: '07:00:00',
			mondayID: null,
			tuesdayID: null,
			wednesdayID: null,
			thursdayID: null,
			fridayID: null,
			saturdayID: null,
			sundayID: null,
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
						const result =
							await merchantBranchService.saveMerchantBranch({
								...data,
							});
						await merchantBranchService.saveMerchantBranchImage(
							data.image,
							result.data.branchID
						);
						await onGetMerchantBranches(
							merchantID,
							'Branch Data Successfully Inserted'
						);
					})
				);
				setMerchantBranchID(null);
				handleReset();
				clearImage();
				return;
			}

			dispatch(
				merchantBranchAction(async () => {
					const result =
						await merchantBranchService.updateMerchantBranch({
							...values,
						});
					console.log(result);
					await onGetMerchantBranches(
						merchantID,
						'Branch Data Successfully Updated'
					);
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
						city,
						picName,
						picNumber,
						picEmail,
						branchWorkingHours,
						// openHourMonday,
						// closeHourMonday,
						// openHourTuesday,
						// closeHourTuesday,
						// openHourWednesday,
						// closeHourWednesday,
						// openHourThursday,
						// closeHourThursday,
						// openHourFriday,
						// closeHourFriday,
						// openHourSaturday,
						// closeHourSaturday,
						// openHourSunday,
						// closeHourSunday,
					} = result.payload.data;

					let openHourMonday = null;
					let closeHourMonday = null;
					let openHourTuesday = null;
					let closeHourTuesday = null;
					let openHourWednesday = null;
					let closeHourWednesday = null;
					let openHourThursday = null;
					let closeHourThursday = null;
					let openHourFriday = null;
					let closeHourFriday = null;
					let openHourSaturday = null;
					let closeHourSaturday = null;
					let openHourSunday = null;
					let closeHourSunday = null;
					let mondayID = null;
					let tuesdayID = null;
					let wednesdayID = null;
					let thursdayID = null;
					let fridayID = null;
					let saturdayID = null;
					let sundayID = null;

					branchWorkingHours.map((branchWorkingHour) => {
						switch (branchWorkingHour.days) {
							case 'MONDAY':
								openHourMonday = branchWorkingHour.openHour;
								closeHourMonday = branchWorkingHour.closeHour;
								mondayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'TUESDAY':
								openHourTuesday = branchWorkingHour.openHour;
								closeHourTuesday = branchWorkingHour.closeHour;
								tuesdayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'WEDNESDAY':
								console.log(branchWorkingHour);
								openHourWednesday = branchWorkingHour.openHour;
								closeHourWednesday =
									branchWorkingHour.closeHour;
								wednesdayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'THURSDAY':
								openHourThursday = branchWorkingHour.openHour;
								closeHourThursday = branchWorkingHour.closeHour;
								thursdayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'FRIDAY':
								openHourFriday = branchWorkingHour.openHour;
								closeHourFriday = branchWorkingHour.closeHour;
								fridayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'SATURDAY':
								openHourSaturday = branchWorkingHour.openHour;
								closeHourSaturday = branchWorkingHour.closeHour;
								saturdayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
							case 'SUNDAY':
								openHourSunday = branchWorkingHour.openHour;
								closeHourSunday = branchWorkingHour.closeHour;
								sundayID =
									branchWorkingHour.branchWorkingHoursID;
								break;
						}
					});
					setValues((preValues) => ({
						...preValues,
					}));
					setValues({
						branchID: branchID,
						branchName: branchName,
						address: address,
						timezone: timezone,
						cityID: city.cityID,
						picName: picName,
						picNumber: picNumber,
						picEmail: picEmail,
						// openHourMonday: branchWorkingHours[0].openHour,
						// closeHourMonday: branchWorkingHours[0].closeHour,
						// openHourTuesday: branchWorkingHours[1].openHour,
						// closeHourTuesday: branchWorkingHours[1].closeHour,
						// openHourWednesday: branchWorkingHours[2].openHour,
						// closeHourWednesday: branchWorkingHours[2].closeHour,
						// openHourThursday: branchWorkingHours[3].openHour,
						// closeHourThursday: branchWorkingHours[3].closeHour,
						// openHourFriday: branchWorkingHours[4].openHour,
						// closeHourFriday: branchWorkingHours[4].closeHour,
						// openHourSaturday: branchWorkingHours[5].openHour,
						// closeHourSaturday: branchWorkingHours[5].closeHour,
						// openHourSunday: branchWorkingHours[6].openHour,
						// closeHourSunday: branchWorkingHours[6].closeHour,
						openHourMonday: openHourMonday,
						closeHourMonday: closeHourMonday,
						openHourTuesday: openHourTuesday,
						closeHourTuesday: closeHourTuesday,
						openHourWednesday: openHourWednesday,
						closeHourWednesday: closeHourWednesday,
						openHourThursday: openHourThursday,
						closeHourThursday: closeHourThursday,
						openHourFriday: openHourFriday,
						closeHourFriday: closeHourFriday,
						openHourSaturday: openHourSaturday,
						closeHourSaturday: closeHourSaturday,
						openHourSunday: openHourSunday,
						closeHourSunday: closeHourSunday,
						mondayID: mondayID,
						tuesdayID: tuesdayID,
						wednesdayID: wednesdayID,
						thursdayID: thursdayID,
						fridayID: fridayID,
						saturdayID: saturdayID,
						sundayID: sundayID,
					});
				}
			};
			onGetMerchantBranchById();
		} else {
			setValues({
				branchID: null,
				merchantID: merchantID,
				branchName: '',
				address: '',
				timezone: '',
				cityID: '',
				picName: '',
				picNumber: '',
				picEmail: '',
				image: null,
				openHourMonday: '07:00:00',
				closeHourMonday: '07:00:00',
				openHourTuesday: '07:00:00',
				closeHourTuesday: '07:00:00',
				openHourWednesday: '07:00:00',
				closeHourWednesday: '07:00:00',
				openHourThursday: '07:00:00',
				closeHourThursday: '07:00:00',
				openHourFriday: '07:00:00',
				closeHourFriday: '07:00:00',
				openHourSaturday: '07:00:00',
				closeHourSaturday: '07:00:00',
				openHourSunday: '07:00:00',
				closeHourSunday: '07:00:00',
				mondayID: null,
				tuesdayID: null,
				wednesdayID: null,
				thursdayID: null,
				fridayID: null,
				saturdayID: null,
				sundayID: null,
			});
		}
	}, [
		dispatch,
		setValues,
		merchantBranchService,
		merchantBranchID,
		merchantID,
		setFieldValue,
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
				marginTop: '4vh',
				overflowY: 'auto',
				maxHeight: '90vh',
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
								aria-label='Close'
								onClick={() => {
									clearImage();
									setMerchantBranchID(null);
									handleReset();
									onGetMerchantBranches(merchantID);
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
									<tbody>
										<tr>
											<td>
												<input
													className={`form-control`}
													type='text'
													placeholder=''
													name='merchantID'
													value={`Merchant ID: ${
														merchantID
															? merchantID
															: ''
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
												{/* <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={cityID}
                          id="cityID"
                          className={`form-control  ${
                            touched.cityID && errors.cityID && "is-invalid"
                          }`}
                          type="text"
                          placeholder="City"
                          name="cityID"
                        /> */}
												<select
													name='cityID'
													id='cityID'
													onChange={handleChange}
													value={
														cityID
															? cityID
															: `abcde`
													}
													// value={'8a8ae47e8cd256be018cd2570983011a'}
													onBlur={handleBlur}
													className={`form-control  ${
														touched.cityID &&
														errors.cityID &&
														'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
													}`}
												>
													<option
														hidden
														disabled
														value='abcde'
													>
														City
													</option>

													{cities.map(
														(city, index) => (
															<option
																key={index}
																value={
																	city.cityID
																}
															>
																{city.cityName}
															</option>
														)
													)}
												</select>
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
												<input
													className={`form-control ${
														touched.address &&
														errors.address &&
														'is-invalid'
													}`}
													key={key}
													type='text'
													name='address'
													id='address'
													value={address}
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder='Address'
												/>
											</td>
											<td>
												<select
													name='timezone'
													id='timezone'
													onChange={handleChange}
													value={
														timezone
															? timezone
															: `abcde`
													}
													onBlur={handleBlur}
													className={`form-control  ${
														touched.timezone &&
														errors.timezone &&
														'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
													}`}
												>
													<option
														hidden
														disabled
														value='abcde'
													>
														Timezone
													</option>

													{gmt.map((gmt, index) => (
														<option
															key={index}
															value={gmt.gmtID}
														>
															{gmt}
														</option>
													))}
												</select>
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
														onChange={
															handleChangeFile
														}
														onBlur={handleBlur}
													/>
												</div>
											</td>
										</tr>
										{/* First Row here */}
										<tr>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Monday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourMonday'
																id='openHourMonday'
																onChange={
																	handleChange
																}
																value={
																	openHourMonday
																		? openHourMonday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourMonday &&
																	errors.openHourMonday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourMonday'
																id='closeHourMonday'
																onChange={
																	handleChange
																}
																value={
																	closeHourMonday
																		? closeHourMonday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourMonday &&
																	errors.closeHourMonday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Tuesday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourTuesday'
																id='openHourTuesday'
																onChange={
																	handleChange
																}
																value={
																	openHourTuesday
																		? openHourTuesday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourTuesday &&
																	errors.openHourTuesday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourTuesday'
																id='closeHourTuesday'
																onChange={
																	handleChange
																}
																value={
																	closeHourTuesday
																		? closeHourTuesday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourTuesday &&
																	errors.closeHourTuesday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
										</tr>

										{/* Second Row here */}
										<tr>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Wednesday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourWednesday'
																id='openHourWednesday'
																onChange={
																	handleChange
																}
																value={
																	openHourWednesday
																		? openHourWednesday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourWednesday &&
																	errors.openHourWednesday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
															<select
																name='closeHourWednesday'
																id='closeHourWednesday'
																onChange={
																	handleChange
																}
																value={
																	closeHourWednesday
																		? closeHourWednesday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourWednesday &&
																	errors.closeHourWednesday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Thursday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourThursday'
																id='openHourThursday'
																onChange={
																	handleChange
																}
																value={
																	openHourThursday
																		? openHourThursday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourThursday &&
																	errors.openHourThursday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourThursday'
																id='closeHourThursday'
																onChange={
																	handleChange
																}
																value={
																	closeHourThursday
																		? closeHourThursday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourThursday &&
																	errors.closeHourThursday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
										</tr>
										{/* Third Row Here */}
										<tr>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Friday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourFriday'
																id='openHourFriday'
																onChange={
																	handleChange
																}
																value={
																	openHourFriday
																		? openHourFriday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourFriday &&
																	errors.openHourFriday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourFriday'
																id='closeHourFriday'
																onChange={
																	handleChange
																}
																value={
																	closeHourFriday
																		? closeHourFriday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourFriday &&
																	errors.closeHourFriday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Saturday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourSaturday'
																id='openHourSaturday'
																onChange={
																	handleChange
																}
																value={
																	openHourSaturday
																		? openHourSaturday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourSaturday &&
																	errors.openHourSaturday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourSaturday'
																id='closeHourSaturday'
																onChange={
																	handleChange
																}
																value={
																	closeHourSaturday
																		? closeHourSaturday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourSaturday &&
																	errors.closeHourSaturday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
										</tr>
										{/* Fourth Row Here */}
										<tr>
											<td className='w-50'>
												<div className='d-flex justify-content-between ps-0 pe-0'>
													<label
														htmlFor='workingHour'
														className='h-auto'
													>
														Sunday:
													</label>
													<td className='w-100'>
														<div className='d-flex justify-content-center w-100'>
															<select
																name='openHourSunday'
																id='openHourSunday'
																onChange={
																	handleChange
																}
																value={
																	openHourSunday
																		? openHourSunday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.openHourSunday &&
																	errors.openHourSunday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>

															<select
																name='closeHourSunday'
																id='closeHourSunday'
																onChange={
																	handleChange
																}
																value={
																	closeHourSunday
																		? closeHourSunday
																		: `07:00:00`
																}
																onBlur={
																	handleBlur
																}
																className={`form-control  ${
																	touched.closeHourSunday &&
																	errors.closeHourSunday &&
																	'is-invalid p-2 w-100 border-1 border-dark-subtle rounded'
																}`}
															>
																{hour.map(
																	(
																		hour,
																		index
																	) => (
																		<option
																			key={
																				index
																			}
																			value={
																				hour.value
																			}
																		>
																			{
																				hour.show
																			}
																		</option>
																	)
																)}
															</select>
														</div>
													</td>
												</div>
											</td>
										</tr>
										<tr className='w-100 bg-dark'>
											<td
												className='text-center'
												colSpan={2}
											>
												<button
													disabled={
														!isValid || !dirty
													}
													className='btn bg-dark text-white pe-3 ps-3'
													type='submit'
													data-bs-toggle='modal'
													data-bs-target={`#exampleModal${idx}`}
												>
													Submit
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
