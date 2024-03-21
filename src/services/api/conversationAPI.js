import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'
import ErrorHandling from '../../error-handling/error-handling';

const conversationAPI = {
    CreateGroup: async(params) => {
        try {
            let result = null;
            let data = {
                address_id: params.address,
                school_id: params.school,
                name: params.groupName,

            }
            await axiosCustom.post(`/api/conversation/group-chat`,{data:data})
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getPrivateConversation: async (user_id) =>{
        try {
            let result = null;
            await axiosCustom.get(`/api/conversation/private-chat-from-user/${user_id}`)
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })

            if(result) return result;
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getUserFromConversationID: async(conversation_id)=> {
        try {
            let result = null;
            await axiosCustom.get(`/api/conversation/get-user/${conversation_id}`)
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getAllConversationFromUser: async()=> {
        try {
            let result = null;
            await axiosCustom.get(`/api/conversation/get-all-conversation`)
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getAllConversationGroupFromUser: async()=> {
        try {
            let result = null;
            await axiosCustom.get(`/api/conversation/get-all-conversation-group`)
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
}

export default conversationAPI;