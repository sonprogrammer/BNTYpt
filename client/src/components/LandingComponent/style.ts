import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`
        flex
        justify-center
        items-center
        p-0
        bg-transparent
        w-full
        lg:w-[70%]
    `}

`;

export const StyledBox = styled.div`
  ${tw`
        relative
        p-7
        md:p-12
        rounded-2xl
        w-full
        max-w-[450px]
        border-[2px]
        border-red-950/50
        flex
        flex-col
        items-center
        gap-6
    `}
  background-color: rgba(38, 38, 38, 0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0px 0px 20px rgba(0, 0, 0, 0.3);

  
  h1 {
    ${tw`
            font-bold
            text-5xl
            md:text-6xl
            text-red-700
            mb-2
        `}
    font-family: "rippedFont";
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  }

  img {
    ${tw`w-20 md:w-24`}
  }

  @media (max-width: 768px) {
    ${tw`p-8 gap-5`}
    width: 90%;
  }
`;

export const StyledLoginInput = styled.div`
  ${tw`
        flex
        flex-col
        gap-3
        w-full
    `}
  input {
    ${tw`
            p-3.5
            rounded-lg
            bg-gray-900/80
            text-white
            border
            border-gray-700
            focus:border-red-800
            focus:outline-none
            transition-all
        `}
  }
`;

export const StyledRadios = styled.div`
  ${tw`
        flex
        justify-center
        items-center
        gap-4
        w-full
        my-2
    `}
  label {
    ${tw`
            flex-1
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            text-sm
            font-bold
            cursor-pointer
            transition-all
            border
        `}
    input {
      ${tw`hidden`} 
    }
    
    &:hover {
      ${tw`scale-[1.02]`}
    }
    &:active {
      ${tw`scale-[0.98]`}
    }
  }
`;

export const StyledLoginBtn = styled.button`
  ${tw`
        bg-red-800
        hover:bg-red-700
        text-white
        font-bold
        py-3
        px-10
        rounded-lg
        w-full
        transition-all
        shadow-lg
    `}
`;

export const StyledSignUpBtn = styled.button`
  ${tw`
        text-gray-400
        text-sm
        hover:text-white
        transition-colors
        mt-2
    `}
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledBackBtn = styled.div`
  ${tw`
        absolute
        left-6
        top-6
        text-2xl
        text-gray-400
        cursor-pointer
        transition-all
    `}
  &:hover {
    ${tw`text-red-600 scale-110`}
  }
`;
export const StyledEmail = styled.div`
  ${tw`relative w-full`}
  
  input {
    ${tw`
      w-full p-3.5 pr-[85px] md:pr-[100px]
      rounded-xl bg-white/5 text-white 
      border border-white/10 
      focus:border-red-600 focus:bg-white/10 focus:outline-none 
      transition-all duration-200
    `}
  }
`;

export const StyledCheckBtn = styled.button`
  ${tw`
    absolute 
    right-2.5 
    top-1/2 
    -translate-y-1/2
    bg-red-800 hover:bg-red-700
    text-white 
    text-[11px] md:text-xs 
    font-bold 
    px-3 py-2 
    rounded-lg
    transition-all
    shadow-lg
    active:scale-95
  `}

  .icon {
    display: none;
  }

  @media (max-width: 500px) {
    ${tw`right-1.5 px-2.5`}
    .text {
      display: none;
    }
    .icon {
      ${tw`block text-sm`}
    }
  }
`;

export const StyledPassword = styled.div`
  ${tw`flex flex-col gap-3.5 w-full`}
  
  input {
    ${tw`
      w-full p-3.5 
      rounded-xl bg-white/5 text-white 
      border border-white/10 
      focus:border-red-600 focus:bg-white/10 focus:outline-none 
      transition-all duration-200
    `}
  }
`;

export const StyledSignUp = styled.button`
  ${tw`
    w-full
    mt-6
    bg-red-700 
    hover:bg-red-600 
    text-white 
    font-black 
    text-lg 
    py-4 
    rounded-xl 
    transition-all 
    transform 
    active:scale-[0.98]
    shadow-xl shadow-red-900/20
  `}
  
  &:hover {
    box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.4);
  }
`;