import tw from 'twin.macro'
import styled from 'styled-components'

export const StyledNavbar = styled.nav`
  ${tw`
    flex justify-around items-center
    w-full py-3 px-2
    bg-[#0a0a0a] 
    border-t border-white/5
  `}
  
  .active .nav-item-inner {
    ${tw`text-red-600 scale-105`}
    
    span {
      ${tw`opacity-100 translate-y-0`}
    }
    
    svg {
      filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.5));
    }
  }
`;

export const NavItem = styled.div.attrs({ className: 'nav-item-inner' })`
  ${tw`
    flex flex-col items-center justify-center
    gap-1 w-16 py-1
    text-gray-600
    transition-all duration-300
    cursor-pointer
  `}

  svg {
    ${tw`text-xl md:text-2xl transition-transform duration-300`}
  }

  span {
    ${tw`
      text-[10px] font-black uppercase tracking-tighter
      opacity-0 -translate-y-1 transition-all duration-300
    `}
  }

  &:hover {
    ${tw`text-gray-300`}
    svg { ${tw`scale-110`} }
  }
`;