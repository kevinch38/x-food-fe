import PropTypes from 'prop-types';

PromotionItem.propTypes = {
	promotion: PropTypes.any,
	idx: PropTypes.number,
};

function PromotionItem({ promotion, idx }) {
	const {
		promotionID,
		merchantID,
		cost,
		maxRedeem,
		promotionValue,
		promotionDescription,
		promotionName,
		quantity,
		expiredDate,
		adminID,
		promotionStatusID,
		createdAt,
		updatedAt,
		notes,
	} = promotion;

	return (
		<tr>
			<td>{idx}</td>
			<td>{promotionID}</td>
			<td>{merchantID}</td>
			<td>{promotionName}</td>
			<td>{promotionValue}</td>
			<td>{promotionStatusID}</td>
			<td>{cost}</td>
			<td>{quantity}</td>
			<td>{createdAt}</td>
			<td>{updatedAt}</td>
			<td>{expiredDate}</td>
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

export default PromotionItem;
