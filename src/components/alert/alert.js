import swal from "sweetalert";

export const Alert = (message) => {
    swal({
        html: true,
        title: "ERROR",
        text: message,
        icon: "error",
      });
}