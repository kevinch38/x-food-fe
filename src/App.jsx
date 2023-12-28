import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';
import MessageBox from './components/MessageBox';
import { useSelector } from 'react-redux';
import Header from './components/Header';

const App = () => {
	const { isLoading, error, errorKey } = useSelector((state) => state.ui);
	return (
		<>
			{isLoading && <Loading />}
			{error && <MessageBox key={errorKey} message={error} />}
			<Header/>
			<Outlet />
		</>
	);
};

export default App;
