import { AlertCircle, NotebookPen, Plus, QrCode, RotateCcw, Users, X } from "lucide-react";
import { StyledClose, StyledMember, StyledMembersGroup, StyledNavText, StyledNoteContainer, StyledNothing, StyledPostBox, StyledPostForm, StyledRecordBtn } from "./style";
import { PostListComponent } from "../PostListComponent";
import { NotePostFormComponent } from "../NotePostFormComponent";
import useGetMembers from "../../hooks/useGetMemers";

import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useGetTrainerMemberNote } from "../../hooks/useGetTrainerMemberNote";

export function TrainerNoteComponent() {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
    const {
        data: members = [],
        isLoading: isMembersLoading,
        isError: isMembersError,
        refetch: refetchMembers,
        isFetching: isMembersFetching
    } = useGetMembers()
    const {
        data: memberNotes = [],
        isPending,
        isError,
        isFetching,
        refetch
    } = useGetTrainerMemberNote(selectedMemberId)
    const selectedMember = members.find(member => member.memberId === selectedMemberId)

    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
        void refetch()
    }

    if (isMembersLoading) {
        return (
            <StyledNoteContainer>
                <div role="status" className="flex min-h-[320px] flex-col items-center justify-center gap-4">
                    <BeatLoader color="#ef4444" size={10} />
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-300">회원 목록을 불러오고 있어요</p>
                        <p className="mt-1 text-xs text-gray-500">잠시만 기다려주세요.</p>
                    </div>
                </div>
            </StyledNoteContainer>
        )
    }

    if (isMembersError) {
        return (
            <StyledNoteContainer>
                <div role="alert" className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                        <AlertCircle size={26} className="text-red-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-300">회원 목록을 불러오지 못했어요</p>
                    <p className="mt-2 text-xs text-gray-500">잠시 후 다시 시도해주세요.</p>
                    <button
                        type="button"
                        onClick={() => void refetchMembers()}
                        disabled={isMembersFetching}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50"
                    >
                        <RotateCcw size={14} className={isMembersFetching ? 'animate-spin' : ''} />
                        {isMembersFetching ? '불러오는 중...' : '다시 시도'}
                    </button>
                </div>
            </StyledNoteContainer>
        )
    }

    return (
        <StyledNoteContainer>
            {members.length > 0 ? (
                <>
                    <StyledMembersGroup>
                        <div className="label">
                            <Users size={18} className="mr-2 inline-block align-text-bottom" />
                            회원 목록
                        </div>
                        <div className="member-list">
                            {members.map(member => (
                                <StyledMember
                                    key={member.memberId}
                                    active={selectedMemberId === member.memberId}
                                    onClick={() => setSelectedMemberId(member.memberId)}
                                >
                                    {member.membersName}
                                </StyledMember>
                            ))}
                        </div>
                    </StyledMembersGroup>
                    {selectedMember && (
                        <StyledRecordBtn onClick={handleModalOpen}>
                            <Plus size={16} className="mr-2 inline-block align-middle" />
                            운동 일지 기록 추가
                        </StyledRecordBtn>
                    )}
                    {selectedMemberId === null ? (
                        <StyledNavText>
                            기록을 확인할 회원을 상단에서 선택해주세요.
                        </StyledNavText>
                    ) : (
                        <div className="content-area">
                            {isPending ? (
                                <div role="status" className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                                    <BeatLoader color="#ef4444" size={8} />
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-300">운동 일지를 불러오고 있어요</p>
                                        <p className="mt-1 text-xs text-gray-500">회원의 기록을 확인하고 있어요.</p>
                                    </div>
                                </div>
                            ) : isError ? (
                                <div role="alert" className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5 px-4 text-center">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                                        <AlertCircle size={24} className="text-red-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-300">운동 일지를 불러오지 못했어요</p>
                                    <p className="mt-2 text-xs text-gray-500">잠시 후 다시 시도해주세요.</p>
                                    <button
                                        type="button"
                                        onClick={() => void refetch()}
                                        disabled={isFetching}
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50"
                                    >
                                        <RotateCcw size={14} className={isFetching ? 'animate-spin' : ''} />
                                        {isFetching ? '불러오는 중...' : '다시 시도'}
                                    </button>
                                </div>
                            ) : memberNotes.length > 0 ? (
                                <PostListComponent eachMember={memberNotes} />
                            ) : (
                                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 text-center">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                                        <NotebookPen size={26} className="text-gray-500" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-300">아직 기록된 일지가 없어요</p>
                                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                                        {selectedMember?.membersName ?? '선택한 회원'}님의 첫 운동 기록을 남겨보세요.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleModalOpen}
                                        disabled={!selectedMember}
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
                                    >
                                        <Plus size={14} />
                                        첫 일지 작성하기
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <StyledNothing>
                    <QrCode size={48} className="mx-auto mb-4 opacity-20" />
                    <p>QR코드를 통해 회원을 등록 후 사용하세요.</p>
                </StyledNothing>
            )}
            {modalOpen && selectedMember && (
                <StyledPostBox onClick={handleCloseModal}>
                    <StyledPostForm onClick={event => event.stopPropagation()}>
                        <StyledClose onClick={handleCloseModal} aria-label="일지 작성 닫기">
                            <X size={20} />
                        </StyledClose>
                        <NotePostFormComponent selectedMember={selectedMember} closeModal={handleCloseModal} />
                    </StyledPostForm>
                </StyledPostBox>
            )}
        </StyledNoteContainer>
    )
}