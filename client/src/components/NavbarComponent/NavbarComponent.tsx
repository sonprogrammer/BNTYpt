import { StyledNavbar, NavItem } from './style'
import { NavLink } from 'react-router-dom'
import { Images, CalendarDays, MessageSquareText, ClipboardList } from 'lucide-react';
const NavbarComponent = () => {
  return (
    <StyledNavbar>
      <NavLink to="/bodycheck" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <Images size={20} />
          <span>앨범</span>
        </NavItem>
      </NavLink>

      <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <CalendarDays size={20} />
          <span>일지</span>
        </NavItem>
      </NavLink>

      <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <MessageSquareText size={20} />
          <span>채팅</span>
        </NavItem>
      </NavLink>

      <NavLink to="/note" className={({ isActive }) => (isActive ? 'active' : '')}>
        <NavItem>
          <ClipboardList size={20} />
          <span>노트</span>
        </NavItem>
      </NavLink>
    </StyledNavbar>
  )
}

export default NavbarComponent;