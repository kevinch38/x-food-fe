import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../../context/ServiceContext';
import { useContext } from 'react';
import { merchantAction } from '../../../slices/merchantSlice';

DeleteMerchantBranchModal.propTypes = {
	merchantID: PropTypes.any,
	merchantBranchID: PropTypes.any,
	idx: PropTypes.any,
	onGetMerchantBranches: PropTypes.func,
};

export default function DeleteMerchantBranchModal({
	onGetMerchantBranches,
	merchantID,
	merchantBranchID,
	idx,
}) {
	const dispatch = useDispatch();
	const { merchantBranchService } = useContext(ServiceContext);
	const { merchantBranches } = useSelector((state) => state.merchantBranch);

	const onDeleteMerchantBranch = (id) => {
		dispatch(
			merchantAction(async () => {
				await merchantBranchService.deleteMerchantBranch(id);

				merchantBranches.filter(
					(merchantBranch) => merchantBranch.branchID !== id
				);
				await onGetMerchantBranches(merchantID,'Branch Data Successfully Deleted');
			})
		);
	};

	return (
		<div
			className='modal fade'
			id={`deleteMerchantBranchModal${merchantID}`}
			tabIndex='-1'
			aria-labelledby={`deleteMerchantBranchModal${merchantID}`}
			aria-hidden='true'
			style={{
				borderRadius: '50px',
				marginTop: '10%',
			}}
		>
			<div
				className='modal-dialog rounded-5'
				style={{
					maxWidth: '50vw',
				}}
			>
				<div className='p-4 modal-content border-0'>
					<div className='row'>
						<div className='d-flex justify-content-center row'>
							<span
								id='boot-icon'
								className='bi bi-x-square-fill text-center'
								style={{
									fontSize: '4rem',
									color: 'rgb(255, 0, 0)',
								}}
							></span>
							<h1 className='modal-title fw-bold text-center mt-2'>
								Are You Sure?
							</h1>
							<h4
								className='modal-title fw-bold text-center mt-3'
								style={{ color: 'grey' }}
							>
								Do you really want to delete these records? This
								process cannot be undone
							</h4>

							<div className='d-flex justify-content-around mt-5 w-75 '>
								<button
									className='btn btn-primary w-25 rounded-pill'
									style={{
										color: 'white',
										borderColor: 'rgb(217,217,217)',
										backgroundColor: 'rgb(217,217,217)',
									}}
									data-bs-toggle='modal'
									data-bs-target={`#exampleModal${idx}`}
									aria-label='Close'
								>
									Cancel
								</button>
								<button
									className='btn btn-danger w-25 rounded-pill'
									style={{
										color: 'white',
										borderColor: 'rgb(245,5,5)',
										backgroundColor: 'rgb(245,5,5)',
									}}
									data-bs-toggle='modal'
									data-bs-target={`#exampleModal${idx}`}
									aria-label='Close'
									onClick={() => {
										onDeleteMerchantBranch(
											merchantBranchID
										);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
