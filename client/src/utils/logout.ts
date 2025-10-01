import Swal from "sweetalert2";

export const handleLogout = async () => {
  const result = await Swal.fire({
    title: "로그아웃 하시겠습니까?",
    text: "다시 로그인해야 이용할 수 있습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "로그아웃",
    cancelButtonText: "취소",
  });

  if(result.isConfirmed){

      await Swal.fire({
          title: "로그아웃 중",
          text: "다음에 다시 만나요!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        
    }
    return result.isConfirmed

  
};
