import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { ChatMsg } from "./useGetChatMsgs";
import socket from "../socket";

const apiUrl = process.env.REACT_APP_API_URL;

interface SendMSgParams {
    chatRoomId: string;
    senderId: string;
    text: string;
    file?: File | null;
}

const uploadMedia = async (file: File): Promise<string> => {
    const formData = new FormData()

    formData.append('file', file)

    const res = await axiosInstance.post(`${apiUrl}/api/chat/upload`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        })

    return res.data.url
}

const sendChatMsg = async ({ chatRoomId, senderId, text, file }: SendMSgParams) => {
    let mediaUrl: string | undefined

    if (file) {
        mediaUrl = await uploadMedia(file)
    }

    const newMsg: ChatMsg = {
        text,
        sender: senderId,
        isMine: true,
        type: mediaUrl ? 'media' : 'text',
        data: mediaUrl,
        readBy: [senderId]
    }

    await axiosInstance.post(`${apiUrl}/api/chat/send`,
        {
            chatRoomId,
            sender: senderId,
            message: text,
            type: newMsg.type,
            data: mediaUrl,
        })

    socket.emit("sendMessage", {
        ...newMsg,
        chatRoomId,
    });


    return newMsg;
}

export function useSendChatMsg(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sendChatMsg,
        onSuccess: (newMsg, variables) => {
            queryClient.setQueryData<ChatMsg[]>(
                ['chatMessages', variables.chatRoomId],
                (prev = []) => [...prev,newMsg]
            )
        }
    })
}