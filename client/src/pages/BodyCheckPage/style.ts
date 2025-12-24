import tw from "twin.macro";
import styled from "styled-components";

export const StyledPageContainer = styled.div`
    ${tw`
        relative
        min-h-screen
        w-full
        bg-gray-950
        pb-20 
    `}
`

export const StyledModalOverlay = styled.div`
    ${tw`
        fixed inset-0
        w-full h-full
        flex items-center justify-center
        z-[100]
        p-4 md:p-6
    `}
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
`

export const StyledPostFormContainer = styled.div`
    ${tw`
        relative
        bg-[#171717]
        p-6 md:p-10
        rounded-[2rem]
        w-full max-w-[600px]
        max-h-[90vh]
        overflow-y-auto
        border border-white/10
        flex flex-col
    `}
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);

    .modal-header {
        ${tw`mb-6 text-center lg:text-left`}
        h2 { ${tw`text-2xl font-black text-white mb-1`} }
        p { ${tw`text-gray-500 text-sm`} }
    }

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        ${tw`bg-gray-800 rounded-full`}
    }

    @media (max-width: 700px) {
        ${tw`w-full h-auto max-h-[95vh] rounded-[1.5rem] p-6`}
    }
`

export const StyledCloseBtn = styled.div`
    ${tw`
        absolute
        right-6 top-6
        w-10 h-10
        flex items-center justify-center
        rounded-full bg-white/5
        text-gray-400 text-xl
        cursor-pointer
        transition-all
        z-10
    `}
    &:hover {
        ${tw`bg-red-600/20 text-red-500 scale-110`}
    }
`