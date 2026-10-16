import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { ChatMsg } from "./useGetChatMsgs";
import socket from "../socket";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";


interface SendMSgParams {
    chatRoomId: string;
    text: string;
    file?: File | null;
}

interface SendMsgRes {
    success: boolean
    message: {
        message: string
        sender: string
        type: 'text' | 'media'
        data?: string
        readBy?: string[]
        timestamp: string
    }
}

const uploadMedia = async (file: File): Promise<string> => {
    const formData = new FormData()

    formData.append('file', file)

    const res = await axiosInstance.post(`/chat/upload`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        })

    return res.data.url
}

const sendChatMsg = async ({ chatRoomId, text, file }: SendMSgParams): Promise<ChatMsg> => {
    const mediaUrl = file ? await uploadMedia(file) : undefined

    const res = await axiosInstance.post<SendMsgRes>(`/chat/send`,
        {
            chatRoomId,
            message: text,
            type: mediaUrl ? 'media' : 'text',
            data: mediaUrl,
        })

    if (!res.data.success) {
        throw new Error('메시지 전송 실패')
    }

    const savedMsg = res.data.message

    const newMsg: ChatMsg = {
        text: savedMsg.message,
        sender: savedMsg.sender,
        isMine: true,
        type: savedMsg.type,
        data: savedMsg.data,
        readBy: savedMsg.readBy ?? []
    }
    socket.emit("sendMessage", {
        ...newMsg,
        chatRoomId,
        text: newMsg.text,
        type: newMsg.type,
        data: newMsg.data,
        timestamp: savedMsg.timestamp
    });


    return newMsg;
}

export function useSendChatMsg() {
    const { objectId} = useRecoilValue(userState)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sendChatMsg,
        onSuccess: (newMsg, variables) => {
            queryClient.setQueryData<ChatMsg[]>(
                ['chatMessages', variables.chatRoomId, objectId],
                prev => prev ? [...prev, newMsg] : undefined
            )
        }
    })
}