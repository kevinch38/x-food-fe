import PropTypes from 'prop-types';

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
		createdAt,
		updatedAt,
	} = merchant;

	return (
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
		</tr>
	);
}

export default MerchantItem;
