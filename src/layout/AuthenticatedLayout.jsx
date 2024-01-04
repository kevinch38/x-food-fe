import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../context/ServiceContext';
import { useEffect } from 'react';
import { authAction } from '../slices/authSlice';

function AuthenticatedLayout() {
	const { authService } = useContext(ServiceContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const onGetUserInfo = async () => {
			try {
				dispatch(
					authAction(async () => {
						try {
							const token =
								await authService.getTokenFromStorage();
							const check = await authService.verifyToken({
								token,
							});
							if (!check) {
								navigate('/login');
							}
							return check;
						} catch (error) {
							console.log(error);
							navigate('/login');
						}
					})
				);
			} catch (error) {
				console.log(error);
				navigate('/login');
			}
		};
		onGetUserInfo();
	}, [authService, dispatch, navigate]);
	return (
		<div className='d-flex' style={{ minHeight: '100vh' }}>
			<Sidebar />
			<div className='flex-grow-1'>
				<Header />
				<Outlet />
			</div>
		</div>
	);
}

export default AuthenticatedLayout;
