import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const friendAPI = {
    getAll: async () => {
        try {
            let result = null;
            await axiosCustom.get('/api/friend/get-all')
            .then(res => {
                // console.log(res);
                result = res.data;
            })
            .catch(err => {
                throw new Error(err);
            })
            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default friendAPI;