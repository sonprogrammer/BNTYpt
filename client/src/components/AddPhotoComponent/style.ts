import styled from "styled-components";
import tw from "twin.macro";

export const StyledAdd = styled.div`
  ${tw`
    fixed
    bottom-20
    right-8
    w-16 h-16 md:w-20 md:h-20
    flex items-center justify-center
    bg-red-700
    text-white
    rounded-full
    cursor-pointer
    shadow-2xl
    z-[1000]
  `}
  
  box-shadow: 0 10px 25px -5px rgba(225, 29, 72, 0.6), 
              0 0 15px rgba(225, 29, 72, 0.4);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .icon-wrapper {
    ${tw`relative flex items-center justify-center`}
  }

  .camera-icon {
    ${tw`text-2xl md:text-3xl`}
  }

  .plus-icon {
    ${tw`absolute -top-1 -right-1 text-sm md:text-base bg-white text-red-700 rounded-full p-0.5`}
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  &:hover {
    ${tw`bg-red-600 scale-110`}
    box-shadow: 0 15px 30px -5px rgba(225, 29, 72, 0.8), 
                0 0 20px rgba(225, 29, 72, 0.6);
  }

  &:active {
    ${tw`scale-95`}
  }

  @media (max-width: 640px) {
    bottom: 5rem; 
    right: 1.5rem;
  }
`;