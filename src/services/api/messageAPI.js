import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const messageAPI = {
    create: async(param) => {
        try {
            let data = {
                'conversation_id': param.conversation_id,
                'user_id': param.user_id,
                'reply_to': param.reply_to,
                'type': param.type,
                'content': param.content,
            }
            let result = null;
            axiosCustom.post('/api/message/create',{data: data})
            .then(res=> {
                result = res.status
            })
            .catch(err => {
                console.log(err);
            })

            if(result == 200) return true;
            return false;


        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getMessageFromConversation: async (conversation_id)=> {
        try {
            let result = null;
            await axiosCustom.get('/api/message/get-messages/'+conversation_id)
            .then(res=> {
                
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })

            if(!result) return false;
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default messageAPI;