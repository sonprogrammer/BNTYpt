import React from 'react'
import { StyledMenus } from './style'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faComment } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const NavbarComponent = () => {
  return (
      <StyledMenus>
        <Link to="/bodycheck">
          <button>
          <FontAwesomeIcon icon={faImage} />
          </button>
        </Link>
        <Link to="/calendar">
          <button>
            <FontAwesomeIcon icon={faCalendar} />
          </button>
        </Link>
        <Link to="/chat">
          <button>
            <FontAwesomeIcon icon={faComment} />
          </button>
        </Link>
        <Link to="/note">
          <button>
            <FontAwesomeIcon icon={faClipboard}/>
          </button>
        </Link>
      </StyledMenus>
  )
}

export default NavbarComponent
