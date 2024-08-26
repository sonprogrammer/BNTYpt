import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
       bg-white
       flex
       flex-col
       h-[50%]
       w-[50%]
       absolute
       left-[25%]
       top-[30%]
       p-4
       rounded-2xl
    `}

`

export const StyledTitle = styled.div`
    ${tw`
        flex
        items-center
        font-bold
        text-2xl
        p-[10px]
    `}
    h1{
        flex: 1;
        text-align: center;
        margin: 0;
    }
    p{
        ${tw`
            cursor-pointer
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
        `}
        &:hover{
            color: red;
            background-color: gray;

        }
    }
`
// export const StyledCloseBtn = styled.div`
//     ${tw`
        
//         // font-bold
//         // text-2xl
//     `}
// `

export const StyledInput = styled.div`
    ${tw`
        flex
        flex-col
        gap-4

    `}

    textarea{
        ${tw`
            p-2
            border
            rounded
            resize-none
            w-full
        `}
        min-width: 300px;
    }
    
    input[type="file"]{
        ${tw`
            mb-4
        `}
    }
    
    button{
        ${tw`
            p-2
            bg-blue-950
            text-red-600
            font-bold
            border
            rounded-xl

        `}
        &:hover{
            background-color: rgb(30 58 138);
        }
    }

`