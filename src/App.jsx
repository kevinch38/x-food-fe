import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';
import ErrorMessageBox from './components/ErrorMessageBox';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import SuccessMessageBox from './components/SuccessMessageBox';

const App = () => {
	const { isLoading, error, errorKey, success, successKey } = useSelector(
		(state) => state.ui
	);
	return (
		<>
			{isLoading && <Loading />}
			{error && <ErrorMessageBox key={errorKey} message={error} />}
			{success && (
				<SuccessMessageBox key={successKey} message={success} />
			)}
			{/* <Header /> */}
			<Outlet />
		</>
	);
};

export default App;
