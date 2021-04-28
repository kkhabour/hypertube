import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export default function Message(variant, message){	
	if (variant && message) {
		message = message.charAt(0).toUpperCase() + message.substr(1);
		message = message + ".";
		if (variant === "success")
			toast.success(message);
		if (variant === "error")
			toast.error(message);
    }
}