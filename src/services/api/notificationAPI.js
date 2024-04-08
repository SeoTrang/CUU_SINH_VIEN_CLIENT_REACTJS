import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'


const notificationAPI = {
    getAllNotifications: async () => {
        try {
            let result = false;
            await axiosCustom.get('/api/notifications')
            .then((res) => {
                result = res.data;
            })
            .catch((err) => {
                console.log(err);
                result = false;
            })

            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default notificationAPI;