import toast from 'react-hot-toast';
const ErrorHandling = (err) => {
    switch (err) {
        case "Unauthorized":
            toast.error('Phiên đăng nhập hết hạn vui lòng đăng nhập lại !')
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            
            break;
    
        default:
            break;
    }
}

export default ErrorHandling;