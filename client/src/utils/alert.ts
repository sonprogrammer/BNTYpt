import Swal from "sweetalert2";

export const confirmDelete = async (message?: string) => {
    const result = await Swal.fire({
      title: '삭제 하시겠습니까?',
      text: message || "복구할 수 없습니다",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    })
  
    return result.isConfirmed
  }

  export const showSuccess = (message?: string) => {
    Swal.fire({
      title: 'Deleted!',
      text: message || 'Your file has been deleted.',
      icon: 'success'
    })
  }