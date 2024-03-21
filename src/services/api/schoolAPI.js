import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const schoolAPI = {
    create: async(param) => {
        try {
            const data = {
                name: param.school,
                address_id: param.address
            }
            let result = null;
            await axiosCustom.post('/api/school',{data: data})
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
                ErrorHandling(err.response.statusText);
            })
            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getByAddress: async (address_id) => {
        try {
            let result = null;
            await axiosCustom.get('/api/school/all-school?address='+address_id)
            .then(response => {
                result = response.data;
                console.log(response);
            })
            .catch (error => {
                console.log(error);
            })

            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default schoolAPI;