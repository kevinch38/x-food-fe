import PropTypes from 'prop-types';

MerchantBranchItem.propTypes = {
	merchantBranchs: PropTypes.any,
	idx: PropTypes.number,
};

function MerchantBranchItem({ merchantBranchs, idx }) {
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
		<tr key={idx}>
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
			<td>{address}</td>
			<td>{branchWorkingHoursID}</td>
			<td>{cityID}</td>
			<td>{timezone}</td>
			<td>{createdAt}</td>
			<td>{updatedAt}</td>

			<td>Bootstrap 4 CDN and Starter Template</td>
			<td>Cristina</td>
			<td>913</td>
			<td>2.846</td>
		</tr>
	);
}

export default MerchantBranchItem;
