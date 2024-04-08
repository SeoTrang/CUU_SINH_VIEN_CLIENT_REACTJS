import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'
import ErrorHandling from '../../error-handling/error-handling';

const postAPI = {
    getFeed: async () => {
        try {
            const response = await axiosCustom.get('/api/post/feed');
            return response.data;
        } catch (error) {

            ErrorHandling(error.response.statusText);
            console.error('Error fetching feed:', error);
            return null;
        }
    },
    
    create: async (dataP) => {
        try {
            let data = {
                ...dataP
            }
            const response = await axiosCustom.post('/api/post/create',{ data: data});
            return response.data;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    },

    createReaction: async (post_id) => {
        try {
            let data = {
                post_id: post_id
            }
            let result = null;
            await axiosCustom.post('/api/post/reaction',{ data: data})
            .then(response => {
                result = response.data;
            })
            .catch(error => {
                throw new Error(error);
            })

            if(result) return result;

        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
    deleteReaction: async (post_id) => {
        try {
            
            let result = null;
            await axiosCustom.delete('/api/post/delete-reaction/'+post_id)
            .then(response => {
                result = response.data;
            })
            .catch(error => {
                throw new Error(error);
            })

            if(result) return result;

        } catch (error) {
            console.log(error.message);
            return false;
        }
    },

    getReactionByPost: async (post_id) => {
        try {
            let result = null;
            await axiosCustom.get('/api/post/reacion-by-post/'+post_id)
            .then(response => {
                result = response.data;
            })
            .catch(error => {
                throw new Error(error);
            })

            if(result) return result;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },

    getPostById: async(post_id) => {
        try {
            let result = null;
            await axiosCustom.get('/api/post/get-post/'+post_id)
            .then(response => {
                result = response.data;
            })
            .catch(error => {
                throw new Error(error);
            })

            if(result) return result;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

export default postAPI;