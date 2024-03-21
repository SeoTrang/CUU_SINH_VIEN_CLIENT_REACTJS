import Cookies from 'js-cookie';
import axiosCustom from '../../../config/axiosBaseUrl/axiosCustom'

const authAPI = {
    register: async(param)=> {
        try {
            const data = {
                user_name: param.userName,
                phone: param.phone,
                pass: param.pass
            }

            let result = null;
            await axiosCustom.post('/api/auth/register',{
                data: data
            })
            .then(res => {
                // console.log(res);
                console.log(res.status);
                if(res.status == 200) result = true;
            })
            .catch(err => {
                // console.log(err);
                throw new Error(err.message);
            })

            if(result) return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    },
    login: async(param)=>{
        try {
            
            let result = null;
            await axiosCustom.post('/api/auth/login', {data: param})
            .then(res=>{
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
            })
            console.log(result);
            
            if(result) {
                let accessToken = result.accessToken;
                let refreshToken = result.refreshToken;
                Cookies.set("accessToken",accessToken);
                Cookies.set("refreshToken",refreshToken);
                return true;
            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    },

    logout: async () => {
        try {
            let result = null;
            await axiosCustom.post('/auth/logout')
            .then(res=>{
                result = res.status;
            })
            .catch(err=>{
                console.log(err);
            })
            if(result == 200) return true;
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default authAPI;