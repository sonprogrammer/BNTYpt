import { BeatLoader } from "react-spinners";
import { useGetEachMemberNote } from "../../hooks/useGetEachMemberNote";
import { PostListComponent } from "../PostListComponent";
import { StyledNoteContainer } from "./style";
import { AlertCircle, NotebookPen } from "lucide-react";

export function MemberNoteComponent() {
    const { data: notes, isPending, isError } = useGetEachMemberNote();

    return (
        <StyledNoteContainer>
            <div className="content-area">
                {isPending ? (
                    <div role="status" className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                        <BeatLoader color="#3b82f6" size={8} />
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-300">운동 일지를 불러오고 있어요</p>
                            <p className="mt-1 text-xs text-gray-500">나의 운동 기록을 확인하고 있어요.</p>
                        </div>
                    </div>
                ) : isError ? (
                    <div role="alert" className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5 px-4 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                            <AlertCircle size={26} className="text-red-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-300">운동 일지를 불러오지 못했어요</p>
                        <p className="mt-2 text-xs text-gray-500">잠시 후 다시 방문해주세요.</p>
                    </div>
                ) : notes.length > 0 ? (
                    <PostListComponent eachMember={notes} />
                ) : (
                    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
                            <NotebookPen size={26} className="text-blue-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-300">아직 작성된 일지가 없어요</p>
                        <p className="mt-2 max-w-xs text-xs leading-relaxed text-gray-500">
                            트레이너가 일지를 작성하면 운동 내용과 피드백을 여기에서 확인할 수 있어요.
                        </p>
                    </div>
                )}
            </div>
        </StyledNoteContainer>
    )
}