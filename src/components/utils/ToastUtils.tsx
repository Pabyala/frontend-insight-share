import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
    ) => {
    if (!message) return; // Prevent empty messages

    toast[type](message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true, // Allow clicking to close
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
    });
};


export const showLoadingToast = (message: string) => {
    return toast.loading(message, {
        position: "bottom-right",
        theme: "dark",
    });
};

export const showErrorToast = (defaultMessage: string) => {
    toast.error(defaultMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
    });
};