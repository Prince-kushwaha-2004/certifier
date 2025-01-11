import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
export const AuthenticatedRoute = () => {

    const { userData } = useSelector(state => state.user)
    return (
        // userData && userData.name ? <Outlet /> : <Outlet />
        userData && userData.name ? <Outlet /> : <Navigate to='/' />
    )
}
