import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'
import ErrorHandling from '../../error-handling/error-handling';

const userAPI = {
    search: async (search) => {
        try {
            let result = null;
            await axiosCustom.get('/api/search/' + search)
            .then(res => {
                console.log(res);
                result = res.data;
            })
            .catch(err => {
                console.log(err);
                ErrorHandling(err.response.statusText);
                return false;
            })

            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getUser: async () => {
        try {
            let result = null;
            await axiosCustom.get('/api/profile')
            .then(res=>{
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
                ErrorHandling(err.response.statusText);
            });

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getAllFriends: async() => {
        try {
            let result = null;
            await axiosCustom.get('/api/friend/get-all')
            .then(res=>{
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
                ErrorHandling(err.response.statusText);
            });

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getFriendRequestToYou: async () => {
        try {
            let result = null;
            await axiosCustom.get('/api/friend/get-received-request')
            .then(res=>{
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
                ErrorHandling(err.response.statusText);
            });

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            ErrorHandling(err.response.statusText);
            return false;
        }
    },

    getFriendYouRequestToThem: async () => {
        try {
            let result = null;
            await axiosCustom.get('/api/friend/get-sent-request')
            .then(res=>{
                result = res.data;
            })
            .catch(err=>{
                console.log(err);
                ErrorHandling(err.response.statusText);
            });

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default userAPI;