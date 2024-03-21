import fileAPI from "../../../services/api/fileAPI";
import postAPI from "../../../services/api/postAPI";

const handleSubmitPost = async(imgFile, videoFile, ortherFile, userTagged, newPostValue)=>{
    let fileUploaded = null;
    console.log(videoFile);
    if(imgFile){
        const uploadFile = await fileAPI.uploadMultiple1(imgFile)
        console.log(uploadFile);
        fileUploaded = uploadFile.map((file) => {return {"url": file, "type": "img"}})
    }
    else
    if(videoFile){
        console.log("test");
        const uploadFile = await fileAPI.uploadSingle(videoFile)
        console.log(uploadFile);
        fileUploaded = uploadFile.map((file) => {return {"url": file, "type": "video"}})
    }
    else
    if(ortherFile) {
        const uploadFile = await fileAPI.uploadMultiple1(videoFile)
        console.log(uploadFile);
        fileUploaded = uploadFile.map((file) => {return {"url": file, "type": "file"}})
    }

    console.log(fileUploaded);
    console.log(userTagged);
    console.log(newPostValue);

    let user_tag_id = null;
    if(userTagged.length > 0){
       user_tag_id = userTagged.map((user) => user.id)
    }
    console.log(user_tag_id);
     

    let data = {
        "caption": newPostValue,
        "user_tag_id": user_tag_id,
        "content": fileUploaded
    }

    let result = await postAPI.create(data);
    

    
}


export default handleSubmitPost;