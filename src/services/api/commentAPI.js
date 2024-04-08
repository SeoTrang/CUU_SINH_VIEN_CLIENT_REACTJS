import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'
import ErrorHandling from '../../error-handling/error-handling';

const commentAPI = {
    getCommentByPostID: async (post_id)=> {
        try {
            let result = null;
            await axiosCustom.get('/api/comment/get-by-post/'+post_id)
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

    create: async (post_id,comment,parent_id,content)=> {
        
        try {
            let data = {
                post_id,comment,parent_id,
                content: []
            }
            let result = null;
            if(content){
                data.content = [content]
            }
            
            await axiosCustom.post('/api/comment/create',{ data: data})
            .then(response => {
                result = response.status;
            })
            .catch(error => {
                throw new Error(error);
            })

            if(result >= 200 || result < 300) return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

export default commentAPI;