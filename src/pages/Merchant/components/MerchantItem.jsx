/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import MerchantBranchItem from './MerchantBranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { ServiceContext } from '../../../context/ServiceContext';
import ApproveRejectMerchantBranchModal from './ApproveRejectMerchantBranchModal';
import ApproveRejectMerchantModal from './ApproveRejectMerchantModal';

import {
	citiesAction,
	merchantBranchAction,
} from '../../../slices/merchantBranchSlice';
import EmptyState from '../../../components/EmptyState';
import CreateMerchantBranchModal from './CreateMerchantBranchModal';
import { useState } from 'react';
import DeleteMerchantBranchModal from './DeleteMerchantBranchModal';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import React from 'react';
import { jwtDecode } from 'jwt-decode';

MerchantItem.propTypes = {
	merchant: PropTypes.any,
	setMerchantID: PropTypes.func,
	idx: PropTypes.number,
	onGetMerchantBranches: PropTypes.any,
	merchantAction: PropTypes.any,
	merchantService: PropTypes.any,
};

function MerchantItem({ merchant, idx, setMerchantID }) {
	const [merchantBranchID, setMerchantBranchID] = useState();
	const {
		merchantID,
		merchantName,
		picName,
		merchantDescription,
		picNumber,
		picEmail,
		joinDate,
		status,
		notes,
		createdAt,
		updatedAt,
	} = merchant;
	const [actionBranch, setActionBranch] = useState('');
	const [actionMerchant, setActionMerchant] = useState('');
	const { authService } = useContext(ServiceContext);
	const { merchantBranches } = useSelector((state) => state.merchantBranch);
	const { cities } = useSelector((state) => state.merchantBranch);
	const { merchantBranchService } = useContext(ServiceContext);
	const dispatch = useDispatch();

	const getCities = () => {
		dispatch(
			citiesAction(async () => {
				const result = await merchantBranchService.fetchCities();
				return result;
			})
		);
	};
	useEffect(() => {
		getCities();
	}, []);
	const jabodetabek = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];

	const token = authService.getTokenFromStorage();
	if (token) {
		const decodedToken = jwtDecode(token);
		var adminRole = decodedToken.role;
	}

	let filteredCities = [];
	jabodetabek.map((kota) => {
		const temp = cities.filter((city) => city.cityName.includes(kota));
		temp.map((a) => {
			filteredCities.push(a);
		});
	});

	filteredCities = filteredCities.sort();

	const onGetMerchantBranches = (id, messageBox) => {
		dispatch(
			merchantBranchAction(async () => {
				const result =
					await merchantBranchService.fetchMerchantBranchById({
						merchantID: id,
						branchName: debounceSearch,
						...debounceSearch2,
					});
				return { messageBox, ...result };
			})
		);
	};
	// const onGetMerchantBranches2 = (id) => {
	// 	dispatch(
	// 		merchantBranchAction(async () => {
	// 			const result =
	// 				await merchantBranchService.fetchMerchantBranchById(id);
	// 			return result;
	// 		})
	// 	);
	// };
	// merchantName: debounceSearch,

	const [searchParam, setSearchParam] = useSearchParams();

	const [searchState, setSearchState] = useState(
		searchParam.get('searchBranch') || ''
	);
	const debounceSearch = useDebounce(searchState, 1000);

	const [searchParam2, setSearchParam2] = useSearchParams();
	const [searchState2, setSearchState2] = useState({
		status: searchParam2.get('status') || null,
		city: searchParam2.get('city') || null,
		startJoinDate: searchParam2.get('startJoinDate') || null,
		endJoinDate: searchParam2.get('endJoinDate') || null,
	});
	const debounceSearch2 = useDebounce(searchState2, 300);

	const handleChange = (e) => {
		const { value } = e.target;
		setSearchState(value);

		if (value.trim() === '') {
			searchParam.delete('searchBranch');
			setSearchParam(searchParam);
		}
	};

	const handleChange2 = (value, field) => {
		setSearchState2({ ...searchState2, [field]: value });

		if (value.trim() === '') {
			clear();
		}
	};

	const clear = () => {
		searchParam2.delete('status');
		searchParam2.delete('city');
		searchParam2.delete('startJoinDate');
		searchParam2.delete('endJoinDate');
		setSearchParam2(searchParam2);
		setSearchState2({
			merchantStatus: searchParam2.get('status') || null,
			startCreatedAt: searchParam2.get('city') || null,
			startJoinDate: searchParam2.get('startJoinDate') || null,
			endJoinDate: searchParam2.get('endJoinDate') || null,
		});
	};

	useEffect(() => {
		onGetMerchantBranches(merchantID);
	}, [debounceSearch, debounceSearch2]);

	const fixDate = (date) => {
		let dateLocal = new Date(date);
		let newDate = new Date(
			dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
		);
		const year = newDate.getFullYear();
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
		const day = newDate.getDate().toString().padStart(2, '0');
		const hours = newDate.getHours().toString().padStart(2, '0');
		const minutes = newDate.getMinutes().toString().padStart(2, '0');
		const seconds = newDate.getSeconds().toString().padStart(2, '0');
		const miliSeconds = newDate.getMilliseconds().toString().padStart(3, '0');
		const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${miliSeconds}`;

		return result;
	};

	return (
		<tr key={idx}>
			<td>{idx}</td>
			<td>{merchantID}</td>
			<td>{merchantName}</td>
			<td>{picName}</td>
			<td>{picNumber}</td>
			<td>{picEmail}</td>
			<td>{merchantDescription}</td>
			<td
				style={{
					color:
						status === 'ACTIVE'
							? 'green'
							: status === 'INACTIVE'
							? 'red'
							: 'none',
				}}
			>
				{status}
			</td>
			<td>{joinDate ? fixDate(joinDate) : ''}</td>
			<td>{fixDate(createdAt)}</td>
			<td>{fixDate(updatedAt)}</td>
			{(adminRole === 'ROLE_PARTNERSHIP_STAFF' ||
				adminRole === 'ROLE_PARTNERSHIP_HEAD') && (
				<td className='visible'>
					{status == 'INACTIVE' ? (
						''
					) : (
						<div className='p-2 d-flex justify-content-between w-100'>
							<div className='btn-group justify-content-between'>
								{/* {(adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_PARTNERSHIP_STAFF" ||
                  adminRole === "ROLE_PARTNERSHIP_HEAD") && (
                  <i
                    className="bi bi-pencil-fill h3 cursor-pointer m-2"
                    style={{
                      color: "rgb(255, 210, 48)",
                    }}
                    onClick={() => setMerchantID(merchantID)}
                    data-bs-toggle="modal"
                    data-bs-target={`#createMerchantModal`}
                  ></i>
                )} */}
								{adminRole === 'ROLE_PARTNERSHIP_STAFF' &&
									status === 'ACTIVE' && (
										<i
											className='bi bi-trash-fill h3 cursor-pointer m-2'
											style={{
												color: 'rgb(255, 0, 0)',
											}}
											onClick={() =>
												setMerchantID(merchantID)
											}
											data-bs-toggle='modal'
											data-bs-target={`#deleteMerchantModal`}
										></i>
									)}
								{status !== 'INACTIVE' &&
									status !== 'ACTIVE' &&
									adminRole === 'ROLE_PARTNERSHIP_HEAD' && (
										<div className='dropdown'>
											<button
												className='btn btn-light dropdown-toggle'
												type='button'
												id='dropdownMenuButton'
												data-bs-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'
												style={{ width: 'auto' }}
											>
												<i
													className='bi bi-list-ul h3 cursor-pointer'
													style={{
														color: 'rgb(128, 128, 128)',
													}}
												/>
											</button>

											<div
												className='dropdown-menu'
												aria-labelledby='dropdownMenuButton'
											>
												{['Approve', 'Reject'].map(
													(action, idx, array) => {
														return (
															<React.Fragment
																key={idx}
															>
																<button
																	className='dropdown-item'
																	href='#'
																	data-bs-toggle='modal'
																	data-bs-target={`#approveRejectMerchantModal${merchantID}`}
																	onClick={() => {
																		setActionMerchant(
																			action
																		);
																	}}
																>
																	<span className='text-capitalize'>
																		{action
																			.toLowerCase()
																			.replace(
																				/_/g,
																				' '
																			)}
																	</span>
																</button>
																{idx !==
																	array.length -
																		1 && (
																	<div className='dropdown-divider'></div>
																)}
															</React.Fragment>
														);
													}
												)}
											</div>
										</div>
									)}
							</div>
						</div>
					)}
				</td>
			)}
			<td className=' ms-5'>
				<div className='p-2'>
					<div className='d-flex flex-column align-items-center justify-content-center pt-2'>
						<i
							className='bi bi-info-circle-fill h3 cursor-pointer'
							style={{ color: 'rgb(128, 128, 128)' }}
							onClick={() => onGetMerchantBranches(merchantID)}
							data-bs-toggle='modal'
							data-bs-target={`#exampleModal${idx}`}
						></i>
					</div>
				</div>
			</td>
			<td>
				<ApproveRejectMerchantBranchModal
					idx={idx}
					merchantID={merchantID}
					merchantBranchID={merchantBranchID}
					onGetMerchantBranches={onGetMerchantBranches}
					action={actionBranch}
				/>
				<ApproveRejectMerchantModal
					idx={idx}
					merchantID={merchantID}
					onGetMerchantBranches={onGetMerchantBranches}
					action={actionMerchant}
				/>
				<CreateMerchantBranchModal
					onGetMerchantBranches={onGetMerchantBranches}
					setMerchantBranchID={setMerchantBranchID}
					idx={idx}
					merchantID={merchantID}
					merchantBranchID={merchantBranchID}
					cities={filteredCities}
				/>
				<DeleteMerchantBranchModal
					idx={idx}
					merchantID={merchantID}
					merchantBranchID={merchantBranchID}
					onGetMerchantBranches={onGetMerchantBranches}
				/>
			</td>
			<td>
				<div
					className='modal fade'
					id={`exampleModal${idx}`}
					tabIndex='-1'
					aria-labelledby={`exampleModal${idx}`}
					aria-hidden='true'
					style={{
						borderRadius: '50px',
						marginTop: '20px',
					}}
				>
					<div
						className='modal-dialog rounded-5'
						style={{
							maxWidth: '90vw',
						}}
					>
						<div className='modal-content border-0'>
							<button
								type='button'
								className='btn-close align-self-end m-4'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => setSearchState('')}
							></button>
							<h1 className='modal-title fw-bold text-center'>
								Merchant Details
							</h1>
							<div
								className='modal-body h-auto'
								style={{
									textAlign: 'left',
								}}
							>
								<div className='d-flex mt-5'>
									<div style={{ width: '250px' }}>
										<p>ID:</p>
										<p>Merchant Name:</p>
										<p>Description:</p>
										<p>PIC Name:</p>
										<p>PIC Email:</p>
										<p>Status:</p>
										<p>Note:</p>
										<p>Branch(es):</p>
										<div className='mb-4 mt-5 dropdown'>
											<button
												className='btn btn-light dropdown-toggle'
												type='button'
												id='dropdownMenuButton'
												data-bs-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'
												style={{ width: 'auto' }}
												onClick={() => clear()}
											>
												Filter By Status
											</button>
											<div
												className='dropdown-menu'
												aria-labelledby='dropdownMenuButton'
											>
												{[
													'ACTIVE',
													'INACTIVE',
													'WAITING_FOR_DELETION_APPROVAL',
													'WAITING_FOR_CREATION_APPROVAL',
													'WAITING_FOR_UPDATE_APPROVAL',
												].map((status, idx) => {
													return (
														<React.Fragment
															key={idx}
														>
															<button
																className='dropdown-item'
																href='#'
																onClick={() =>
																	handleChange2(
																		status,
																		'status'
																	)
																}
															>
																<span className='text-capitalize'>
																	{status
																		.toLowerCase()
																		.replace(
																			/_/g,
																			' '
																		)}
																</span>
															</button>
															<div className='dropdown-divider'></div>
														</React.Fragment>
													);
												})}
											</div>
										</div>
										<div className='mb-4 dropdown'>
											<button
												className='btn btn-light dropdown-toggle'
												type='button'
												id='dropdownMenuButton'
												data-bs-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'
												style={{ width: 'auto' }}
												onClick={() => clear()}
											>
												Filter By City
											</button>
											<div
												className='dropdown-menu'
												aria-labelledby='dropdownMenuButton'
												style={{
													maxHeight: '200px',
													overflowY: 'auto',
												}}
											>
												{filteredCities.map(
													({ cityName, cityID }) => {
														return (
															<React.Fragment
																key={cityID}
															>
																<button
																	className='dropdown-item'
																	href='#'
																	onClick={() =>
																		handleChange2(
																			cityName,
																			'city'
																		)
																	}
																>
																	{cityName}
																</button>
																<div className='dropdown-divider'></div>
															</React.Fragment>
														);
													}
												)}
											</div>
										</div>
										<div className='mb-4 dropdown '>
											<a
												className='btn btn-light dropdown-toggle'
												href='#'
												role='button'
												id='dropdownMenuLink'
												data-bs-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'
												onClick={() => clear()}
											>
												Filter By Join Date
											</a>

											<div
												className='dropdown-menu'
												aria-labelledby='dropdownMenuLink'
											>
												<form action=''>
													<label
														htmlFor='startJoinDate'
														className='ms-3'
													>
														Start Date
													</label>
													<center>
														<input
															className='form-control'
															style={{
																width: '90%',
															}}
															type='date'
															name='startJoinDate'
															id='startJoinDate'
															onChange={(e) =>
																handleChange2(
																	e.target
																		.value,
																	e.target
																		.name
																)
															}
														/>
													</center>
													<h6 className='text-center'>
														Month/Day/Year
													</h6>

													<label
														htmlFor='startJoinDate'
														className='ms-3'
													>
														End Date
													</label>
													<center>
														<input
															className='form-control'
															style={{
																width: '90%',
															}}
															type='date'
															name='endJoinDate'
															id='endJoinDate'
															onChange={(e) =>
																handleChange2(
																	e.target
																		.value,
																	e.target
																		.name
																)
															}
														/>
													</center>
													<h6 className='text-center'>
														Month/Day/Year
													</h6>
												</form>
											</div>
										</div>

										<div
											className='m-0 ps-0'
											style={{ maxWidth: '80px' }}
										>
											<input
												onChange={handleChange}
												className='form-control m-0'
												type='text'
												name='searchBranch'
												id='searchBranch'
												value={searchState}
												placeholder='Search By Merchant Name'
												style={{ width: 'auto' }}
											/>
										</div>
									</div>
									<div className='w-100'>
										<p>| {merchantID}</p>
										<p>| {merchantName}</p>
										<p>| {merchantDescription}</p>
										<p>| {picName}</p>
										<p>| {picEmail}</p>
										<p>| {status}</p>
										<div className='d-flex justify-content-between'>
											<span>| {notes}</span>
											{adminRole ===
												'ROLE_PARTNERSHIP_STAFF' && (
												<span className='text-end'>
													{status == 'ACTIVE' ? (
														<i
															className='bi bi-plus-circle-fill h2 cursor-pointer'
															style={{
																color: 'rgb(101, 213, 26)',
															}}
															onClick={() => {
																setMerchantBranchID(
																	null
																);
																setSearchState(
																	''
																);
															}}
															data-bs-toggle='modal'
															data-bs-target={`#createMerchantBranchModal${merchantID}`}
														></i>
													) : status == 'INACTIVE' ? (
														''
													) : (
														<i
															className='bi bi-plus-circle-fill h2 cursor-pointer'
															style={{
																color: 'rgb(101, 213, 26)',
															}}
															onClick={() => {
																setMerchantBranchID(
																	null
																);
																setSearchState(
																	''
																);
															}}
															data-bs-toggle='modal'
															data-bs-target={`#createMerchantBranchModal${merchantID}`}
														></i>
													)}
												</span>
											)}
										</div>

										{merchantBranches &&
										merchantBranches.length !== 0 ? (
											<table
												className='table text-center table-responsive w-100 align-middle'
												style={{
													display: 'block',
													maxHeight: '300px',
													overflowY: 'scroll',
												}}
											>
												<thead>
													<tr>
														<th scope='col'>NO</th>
														<th scope='col'>ID</th>
														<th scope='col'>
															Branch
														</th>
														<th scope='col'>
															City
														</th>
														<th scope='col'>
															PIC Name
														</th>
														<th scope='col'>
															PIC Number
														</th>
														<th scope='col'>
															PIC Email
														</th>
														<th scope='col'>
															Status
														</th>
														<th scope='col'>
															Join Date
														</th>
														<th scope='col'>
															Created At
														</th>
														<th scope='col'>
															Action
														</th>
													</tr>
												</thead>
												<tbody className='table-group-divider'>
													{merchantBranches.map(
														(
															merchantBranch,
															idx
														) => {
															return (
																<React.Fragment
																	key={idx}
																>
																	<MerchantBranchItem
																		key={
																			merchantBranch.merchantbranchID
																		}
																		merchantBranch={
																			merchantBranch
																		}
																		idx={
																			++idx
																		}
																		setMerchantBranchID={
																			setMerchantBranchID
																		}
																		merchantBranchAction={
																			merchantBranchAction
																		}
																		merchantBranchService={
																			merchantBranchService
																		}
																		onGetMerchantBranches={
																			onGetMerchantBranches
																		}
																		setAction={
																			setActionBranch
																		}
																		action={
																			actionBranch
																		}
																	/>
																</React.Fragment>
															);
														}
													)}
												</tbody>
											</table>
										) : (
											<div className='w-100'>
												<EmptyState />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default MerchantItem;
