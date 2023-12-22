import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';
import { useSelector } from 'react-redux';

const App = () => {
	const { isLoading, error, errorKey } = useSelector((state) => state.ui);
	return (
		<>
			{isLoading && <Loading />}
			{error && <MessageBox key={errorKey} message={error} />}
			<Outlet />
		</>
	);
};

export default App;
