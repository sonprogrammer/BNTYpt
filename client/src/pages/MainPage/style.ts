import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled.div`
    ${tw`
        fixed inset-0
        w-full h-full
        flex justify-center items-center
        z-[100]
        p-4
    `}
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
`

export const StyledBox = styled.div`
    ${tw`
        relative
        w-full max-w-[450px]
        bg-[#111827]
        rounded-[2rem]
        p-8 md:p-10
        flex flex-col
        gap-8
        border border-white/10
    `}
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);

    .title-section {
        ${tw`text-center`}
        h2 { ${tw`text-2xl font-black text-white mb-1`} }
        p { ${tw`text-gray-500 text-sm`} }
    }

    .input-label {
        ${tw`flex items-center gap-2 text-xs font-bold text-red-500 mb-2 uppercase tracking-wider`}
    }
`

export const StyledXIcon = styled.div`
    ${tw`
        absolute right-6 top-6
        text-gray-500 hover:text-white
        text-2xl cursor-pointer transition-all
    `}
`

export const StyledMember = styled.div`
    ${tw`flex flex-col w-full`}
`

export const StyledSelect = styled.select`
    ${tw`
        w-full p-4
        bg-white/5 border border-white/10
        rounded-xl text-white font-medium
        focus:outline-none focus:border-red-600
        appearance-none
    `}
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2em;
`

export const StyledInput = styled.div`
    ${tw`flex flex-col w-full`}
    
    input {
        ${tw`
            w-full p-4
            bg-white/5 border border-white/10
            rounded-xl text-white text-xl font-bold
            placeholder:text-gray-700
            focus:outline-none focus:border-red-600
            transition-all
        `}
    }
`

export const StyledBtn = styled.button`
    ${tw`
        w-full py-4 mt-2
        bg-red-700 hover:bg-red-600
        text-white font-black text-lg
        rounded-xl transition-all
        shadow-lg shadow-red-900/20
        active:scale-95
    `}
`

export const StyledMainContainer = styled.div`
  ${tw`
    flex flex-col items-center justify-center 
    h-full w-full 
    bg-gray-950 p-6
  `}
`;

export const StyledDashboardCard = styled.div`
  ${tw`
    relative w-full max-w-[400px]
    p-8 rounded-[2.5rem]
    flex flex-col items-center
    border border-white/10
  `}
  background: rgba(23, 23, 23, 0.6);
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);

  .pt-count-badge {
    ${tw`
      flex flex-col items-center justify-center
      w-40 h-40 rounded-full
      border-4 border-red-700/30
      my-4
    `}
    background: radial-gradient(circle, rgba(185, 28, 28, 0.1) 0%, transparent 70%);
    box-shadow: 0 0 20px rgba(185, 28, 28, 0.2);

    .label { ${tw`text-gray-400 text-xs font-medium mb-1`} }
    .count { ${tw`text-5xl font-black text-red-600`} }
  }

  .hint-text { ${tw`text-gray-500 text-xs mt-4`} }
`;

export const StyledInfoText = styled.div`
  ${tw`text-center mb-2`}
  
  .role {
    ${tw`
      inline-block px-3 py-1 rounded-full 
      text-[10px] font-black tracking-widest mb-3
      bg-red-700/20 text-red-500 border border-red-700/30
    `}
    &.member {
      ${tw`bg-blue-700/20 text-blue-500 border border-blue-700/30`}
    }
  }

  h2 {
    ${tw`text-2xl font-bold text-white`}
    span { ${tw`font-light text-gray-400`} }
  }

  p { ${tw`text-gray-400 text-sm mt-2 leading-relaxed`} }
`;

export const StyledPtAddBtn = styled.button`
  ${tw`
    w-full py-4 mt-4
    bg-red-700 hover:bg-red-600
    text-white font-bold text-lg
    rounded-2xl transition-all
    shadow-lg shadow-red-900/20
    active:scale-95
  `}
`;