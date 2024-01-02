import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../../context/ServiceContext';
import { useContext } from 'react';
import {
	merchantAction,
} from '../../../slices/merchantSlice';

DeleteMerchantModal.propTypes = {
	merchantID: PropTypes.any,
};

export default function DeleteMerchantModal({ merchantID }) {
	const dispatch = useDispatch();
	const { merchantService } = useContext(ServiceContext);
	const { merchants } = useSelector((state) => state.merchant);

	const onDeleteMerchant = (id) => {
		dispatch(
			merchantAction(async () => {
				await merchantService.deleteMerchant(id);

				// const a = [...merchants];
				const a = merchants.filter(
					(merchant) => merchant.merchantID !== merchantID
				);
				return { messageBox : 'Merchant Data Successfully Deleted',data: a };
			})
		);
	};

	return (
		<div
			className='modal fade'
			id={`deleteMerchantModal`}
			tabIndex='-1'
			aria-labelledby={`deleteMerchantModal`}
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
									data-bs-dismiss='modal'
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
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={() => onDeleteMerchant(merchantID)}
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
