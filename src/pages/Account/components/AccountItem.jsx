import PropTypes from "prop-types";

AccountItem.propTypes = {
  account: PropTypes.any,
  idx: PropTypes.number,
};

function AccountItem({ account, idx }) {
  const {
    accountID,
    ktpID,
    firstName,
    lastName,
    phoneNumber,
    accountEmail,
    dateOfBirth,
    createdAt,
    updatedAt,
  } = account;

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
    <tr key={idx} style={{ height: '50px' }} className="align-middle">
      <td>{idx}</td>
      <td>{accountID}</td>
      <td>{ktpID}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td>{accountEmail}</td>
      <td>{dateOfBirth}</td>
      <td>{fixDate(createdAt)}</td>
      <td>{fixDate(updatedAt)}</td>
    </tr>
  );
}

export default AccountItem;
