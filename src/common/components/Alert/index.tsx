import Swal from "sweetalert2";

interface Props {
  name: string;
  icon?: "success" | "error" | "warning" | "info" | "question" | undefined;
}

function Alert({ name, icon = "success" }: Props) {
  return Swal.fire({
    title: name,
    icon: icon,
    toast: true,
    showConfirmButton: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
}

export { Alert };
