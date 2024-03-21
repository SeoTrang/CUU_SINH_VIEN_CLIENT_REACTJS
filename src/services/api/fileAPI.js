import axiosCustom from '../../config/axiosBaseUrl/axiosCustom'

const fileAPI = {
    uploadMultiple: async (files) => {
        try {
            console.log(files);
            const formData = new FormData();

            // Thêm các tệp tin vào FormData với cùng một tên trường 'files'
            files.forEach((file, index) => {
                formData.append('files', file);
            });

            let result = null;

            // Gửi yêu cầu POST sử dụng Axios
            await axiosCustom.post('/api/file/files', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log(response.data);
                result = response.data;
            })
            .catch(error => {
                console.error('Error uploading files:', error);
            });

            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    uploadMultiple1: async (filesP) => {
        try {
            console.log(filesP);
            const files = Array.prototype.slice.call(filesP);
            const formData = new FormData();

            // Thêm các tệp tin vào FormData với cùng một tên trường 'files'
            files.forEach((file, index) => {
                formData.append('files', file);
            });

            let result = null;

            // Gửi yêu cầu POST sử dụng Axios
            await axiosCustom.post('/api/file/files', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log(response.data);
                result = response.data;
            })
            .catch(error => {
                console.error('Error uploading files:', error);
            });

            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    uploadSingle: async (file) => {
        try {
            
            
            const formData = new FormData();

            // Thêm các tệp tin vào FormData với cùng một tên trường 'files'
    
            formData.append('files', file);


            let result = null;

            // Gửi yêu cầu POST sử dụng Axios
            await axiosCustom.post('/api/file/files', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log(response.data);
                result = response.data;
            })
            .catch(error => {
                console.error('Error uploading files:', error);
            });

            if(result) return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


export default fileAPI;