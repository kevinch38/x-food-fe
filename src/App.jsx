import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';
import ErrorMessageBox from './components/ErrorMessageBox';
import { useDispatch, useSelector } from 'react-redux';
import SuccessMessageBox from './components/SuccessMessageBox';
import { clear } from "./slices/uiSlice";

const App = () => {
	const { isLoading, error, errorKey, success, successKey } = useSelector(
		(state) => state.ui
	);
	const dispatch = useDispatch();
	const onClear=()=>{
		dispatch(clear());
	}
	return (
		<>
			{isLoading && <Loading />}
			{error && <ErrorMessageBox key={errorKey} message={error}  clear={onClear}/>}
			{success && (
				<SuccessMessageBox key={successKey} message={success} clear={onClear}/>
			)}
			{/* <Header /> */}
			<Outlet />
		</>
	);
};

export default App;
