import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ErrorMessageBox({ message, clear }) {
	const [showAlert, setShowAlert] = useState(!!message);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAlert(false);
      clear()
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		showAlert && (
			<div className='box-wrapper d-flex justify-content-end sticky-top' style={{zIndex:'9998'}}>
				<div
					className='d-flex position-absolute m-4 alert border border-danger alert-light alert-dismissible fade show'
					role='alert'
				>
					{/* <svg className='d-none'>
						<symbol id='bi-x-circle' className='bi bi-x-circle' viewBox='0 0 16 16'>
							<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
						</symbol>
            
					</svg>
          <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlinkHref="#bi-x-circle"/></svg> */}
					{/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
            width={24}
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg> */}
					{/*<div className='d-flex align-items-center'>*/}
					<ul className='pagination d-flex align-items-center m-0'>
						<li>
							<i
								className='bi bi-x-circle h1 me-2'
								style={{
									color: 'rgb(255, 0, 0)',
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
                onClick={()=>clear()}
							></button>
						</li>
					</ul>
					{/* </div> */}
				</div>
			</div>
		)
	);
}

ErrorMessageBox.propTypes = {
	message: PropTypes.any,
	clear: PropTypes.func,
};
