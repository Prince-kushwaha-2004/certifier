import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
export const AuthenticatedRoute = () => {
    const { userData } = useSelector(state => state.user)
    return (
        userData.name ? <Outlet /> : <Outlet />
    )
}
