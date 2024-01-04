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

  return (
    <tr style={{ height: '50px' }} className="align-middle">
      <td>{idx}</td>
      <td>{accountID}</td>
      <td>{ktpID}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td>{accountEmail}</td>
      <td>{dateOfBirth}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>{new Date(updatedAt).toLocaleDateString()}</td>
    </tr>
  );
}

export default AccountItem;
