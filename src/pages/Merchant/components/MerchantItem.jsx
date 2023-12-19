import PropTypes from 'prop-types';
import MerchantBranchItem from '../../Merchant Branch/components/MerchantBranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { ServiceContext } from '../../../context/ServiceContext';
import { merchantBranchAction } from '../../../slices/merchantBranchSlice';

MerchantItem.propTypes = {
	merchant: PropTypes.any,
	idx: PropTypes.number,
};

function MerchantItem({ merchant, idx }) {
	const {
		merchantID,
		merchantName,
		picName,
		merchantDescription,
		picNumber,
		picEmail,
		joinDate,
		merchantStatusID,
		note,
		createdAt,
		updatedAt,
	} = merchant;

	const { merchantBranchs } = useSelector((state) => state.merchantBranch);
	const { merchantBranchService } = useContext(ServiceContext);
	const dispatch = useDispatch();
	const onGetMerchantBranchs = (id) => {
		dispatch(
			merchantBranchAction(async () => {
				const result =
					await merchantBranchService.fetchMerchantBranchById(id);
				return result;
			})
		);
	};

	return (
		<>
			<tr>
				<td>{idx}</td>
				<td>{merchantID}</td>
				<td>{merchantName}</td>
				<td>{picName}</td>
				<td>{picNumber}</td>
				<td>{picEmail}</td>
				<td>{merchantDescription}</td>
				<td>{merchantStatusID}</td>
				<td>{joinDate}</td>
				<td>{createdAt}</td>
				<td>{updatedAt}</td>
				<td>
					<div className='p-2 row'>
						<div className='btn-group justify-content-center text-normal fw-bold'>
							<button className='btn btn-primary text-white'>
								Update
							</button>
							<button className='btn btn-danger text-white'>
								Delete
							</button>
						</div>
					</div>
				</td>
				<td className='cursor-pointer center'>
					<div className='p-2 row'>
						<div className='d-flex align-items-center justify-content-center'>
							<i
								className='bi bi-list-ul h3'
								onClick={() => onGetMerchantBranchs(merchantID)}
								data-bs-toggle='modal'
								data-bs-target={`#exampleModal${idx}`}
							></i>
						</div>
					</div>
				</td>
			</tr>
			<div
				className='modal fade'
				id={`exampleModal${idx}`}
				tabIndex='-1'
				aria-labelledby={`exampleModal${idx}`}
				aria-hidden='true'
				style={{
					borderRadius: '50px',
					marginTop: '5%',
				}}
			>
				<div className='modal-dialog modal-xl rounded-5'>
					<div className='modal-content border-0'>
						<button
							type='button'
							className='btn-close align-self-end m-4'
							data-bs-dismiss='modal'
							aria-label='Close'
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
							<table
								className='table'
								style={{
								}}
							>
								<tr>
									<td>ID:</td>

									<td> | {merchantID}</td>
								</tr>
								<tr>
									<td>Merchant Name:</td>

									<td> | {merchantName}</td>
								</tr>
								<tr>
									<td>Description:</td>

									<td> | {merchantDescription}</td>
								</tr>
								<tr>
									<td>PIC:</td>

									<td> | {picName}</td>
								</tr>
								<tr>
									<td>Status:</td>

									<td> | {merchantStatusID}</td>
								</tr>
								<tr>
									<td className='pb-4'>Note:</td>

									<td className='pb-4'> | {note}</td>
								</tr>
								<tr>
									<td>Branch(es)</td>
									<td rowSpan={4} className='align-top'>
										<div
											className='table-responsive'
											style={{
												overflow: 'scroll',
												maxWidth: '75vw',
												display: 'block',
												maxHeight: '40vh',
												overflowY:'scroll'
											}}
										>
											<div className='row'>
												<table className='table text-center'>
													<thead>
														<tr>
															<th>
																<div className='custom-control custom-checkbox'>
																	<input
																		type='checkbox'
																		className='custom-control-input'
																		id={`customCheck0`}
																	/>
																	<label
																		className='custom-control-label'
																		htmlFor={`customCheck0`}
																	></label>
																</div>
															</th>
															<th scope='col'>
																NO
															</th>
															<th scope='col'>
																ID
															</th>
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
																Status
															</th>
															<th scope='col'>
																Join Date
															</th>
															<th scope='col'>
																Created At
															</th>
														</tr>
													</thead>
													<tbody className='table-group-divider'>
														{merchantBranchs &&
															merchantBranchs.length !==
																0 &&
															merchantBranchs.map(
																(
																	merchantbranchs,
																	idx
																) => {
																	return (
																		<MerchantBranchItem
																			key={
																				merchantbranchs.merchantbranchID
																			}
																			merchantBranchs={
																				merchantbranchs
																			}
																			idx={
																				++idx
																			}
																		/>
																	);
																}
															)}
													</tbody>
												</table>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>Filter By</td>
								</tr>
								<tr>
									<td>Search</td>
								</tr>
								<tr>
									<td>
										<div className='p-2 row'>
											<div className='btn-group  text-normal fw-bold w-50'>
												<button className='btn btn-primary text-white'>
													Update
												</button>
												<button className='btn btn-danger text-white'>
													Delete
												</button>
											</div>
										</div>
									</td>
								</tr>
							</table>
							{/* <form
								className='form'
								onSubmit={(e) => handleOnSubmit(e)}
							>
								<label htmlFor='comment'>Leave a comment</label>
								<textarea
									name='comment'
									id=''
									className='w-100 h-25'
									onChange={(e) => handleChange(e)}
								></textarea>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Add Comment
								</button>
							</form> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MerchantItem;
