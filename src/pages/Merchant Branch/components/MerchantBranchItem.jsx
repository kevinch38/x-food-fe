import PropTypes from 'prop-types';

MerchantBranchItem.propTypes = {
	merchantBranch: PropTypes.any,
	idx: PropTypes.number,
};

function MerchantBranchItem({ merchantBranch, idx }) {
	const {
		branchID,
		branchName,
		address,
		timezone,
		branchWorkingHoursID,
		cityID,
		createdAt,
		updatedAt,
	} = merchantBranch;

	return (
		<tr>
			<td>{idx}</td>
			<td>{branchID}</td>
             <td>{branchName}</td>
             <td>{address}</td>
             <td>{branchWorkingHoursID}</td>
             <td>{cityID}</td>
             <td>{timezone}</td>
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
		</tr>
	);
}

export default MerchantBranchItem;
