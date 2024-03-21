import fileAPI from "../../services/api/fileAPI";

const handleSendFile = async (files) => {
    console.log(files);
    let result = await fileAPI.uploadMultiple(files);
    // console.log(result);
    if(result) {
        console.log(result);
        return result;
    }

}

export default handleSendFile;