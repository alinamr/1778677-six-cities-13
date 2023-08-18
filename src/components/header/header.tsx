import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectors } from '../../store/middlewares';
import { MouseEvent } from 'react';

function Header() {

  const dispatch = useAppDispatch();

  const userStatus = useAppSelector(selectors.authorizationStatus);
  const isLoggedIn = userStatus === AuthorizationStatus.Auth;

  const userInfo = useAppSelector(selectors.userInfo);

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      {isLoggedIn ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Favorites }>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                {userInfo?.avatarUrl && <img src={userInfo?.avatarUrl} width={20} height={20} style={{borderRadius:'50%'}}/>}
              </div>
              <span className="header__user-name user__name">{userInfo?.email}</span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={handleLogout}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.Login }>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export { Header };
