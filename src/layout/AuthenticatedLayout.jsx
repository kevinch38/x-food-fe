import { Outlet } from 'react-router-dom';

function AuthenticatedLayout() {
  return (
    <div className="d-flex">
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
