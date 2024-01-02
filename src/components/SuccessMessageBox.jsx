import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function SuccessMessageBox({ message }) {
	const [showAlert, setShowAlert] = useState(!!message);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAlert(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		showAlert && (
			<div className='box-wrapper d-flex justify-content-end sticky-top' style={{zIndex:'9998'}}>
				<div
					className='d-flex position-absolute m-4 alert border border-success alert-light alert-dismissible fade show'
					role='alert'
				>
					<ul className='pagination d-flex align-items-center m-0'>
						<li>
							<i
								className='bi bi-check-circle-fill h1 me-2'
								style={{
									color: 'rgb(0, 128, 55)',
								}}
							/>{' '}
						</li>
						<li>{message}</li>
						<li>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='alert'
								aria-label='Close'
							></button>
						</li>
					</ul>
				</div>
			</div>
		)
	);
}

SuccessMessageBox.propTypes = {
	message: PropTypes.any,
};
