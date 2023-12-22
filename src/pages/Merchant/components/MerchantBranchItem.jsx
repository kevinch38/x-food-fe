import PropTypes from 'prop-types';

MerchantBranchItem.propTypes = {
	merchantBranchs: PropTypes.any,
	idx: PropTypes.number,
};

function MerchantBranchItem({ key, merchantBranchs, idx }) {
	const {
		branchID,
		branchName,
		address,
		timezone,
		branchWorkingHoursID,
		cityID,
		createdAt,
		updatedAt,
	} = merchantBranchs;

	return (
		<tr key={key}>
			<td>
				<div className='custom-control custom-checkbox'>
					<input
						type='checkbox'
						className='custom-control-input'
						id={`customCheck${idx}`}
					/>
					<label
						className='custom-control-label'
						htmlFor={`customCheck${idx}`}
					></label>
				</div>
			</td>
			<td>{idx}</td>
			<td>{branchID}</td>
			<td>{branchName}</td>
			<td>{cityID}</td>
			<td>{branchWorkingHoursID}</td>
			<td>{cityID}</td>
			<td>{timezone}</td>
			<td>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</td>
		</tr>
	);
}

export default MerchantBranchItem;
