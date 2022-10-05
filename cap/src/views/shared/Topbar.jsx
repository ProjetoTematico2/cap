import { useContext } from "react";
import { AuthContext } from '../contexts/auth';
const Topbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <>
            <div className="top-menu">
                <div className="pull-right" id="user-info">
                    <span>{user.name}</span>
                    <i className="icon fa-regular fa-user-circle"></i>
                    <button type="button" className="btn btn-logout" onClick={() => { logout() }}>Sair</button>
                </div>
            </div>
        </>
    );
}

export default Topbar;