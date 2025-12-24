import { StyledNavbar, NavItem } from './style'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClipboardList, faCommentDots, faImages } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  return (
    <StyledNavbar>
      <NavLink to="/bodycheck" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <FontAwesomeIcon icon={faImages} />
          <span>앨범</span>
        </NavItem>
      </NavLink>

      <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>일지</span>
        </NavItem>
      </NavLink>

      <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <FontAwesomeIcon icon={faCommentDots} />
          <span>채팅</span>
        </NavItem>
      </NavLink>

      <NavLink to="/note" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>노트</span>
        </NavItem>
      </NavLink>
    </StyledNavbar>
  )
}

export default NavbarComponent;