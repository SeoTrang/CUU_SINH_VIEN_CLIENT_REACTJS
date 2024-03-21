import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const addressAPI = {
    getAll: async () =>{
        try {
            let result = null;
            await axiosCustom.get('/api/all-address')
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            })
            if(result) return result;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default addressAPI;