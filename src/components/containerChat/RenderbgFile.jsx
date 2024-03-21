// import imgIcon from './imgbgfile/icon-photo.svg';
// import excelIcon from './imgbgfile/icon-excel.svg';
// import pdfIcon from './imgbgfile/icon-pdf.svg';
// import powerpointIcon from './imgbgfile/icon-powerpoint.svg';
// import videoIcon from './imgbgfile/icon-video.svg';
// import wordIcon from './imgbgfile/icon-word.svg';
// import zipIcon from './imgbgfile/icon-word.svg';
// import fileIcon from './imgbgfile/icon-file.svg';

const RenderbgFile = (filePath,fileName,fileExtension) => {
    // console.log(fileExtension);

    const lowerCaseExtension = fileExtension.toLowerCase();
    //is img
    const imgExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'webp'];

    // Kiểm tra xem đuôi file có trong danh sách được hỗ trợ hay không
    if (imgExtensions.includes(lowerCaseExtension)) {
        // Xử lý khi đuôi file thuộc danh sách được hỗ trợ
        // console.log('File là một loại ảnh được hỗ trợ');
        return (
            <div className='box-file'>
                <div className="bg-file-common bg-common-img">
                    hello
                </div>
            </div>
        )
    }
    switch (fileExtension) {
        case 'docx':
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-docx">
                        {/* {fileExtension} */}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )
        case 'xlsx':
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-xlsx">
                        {/* {fileExtension} */}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )
        case 'mp4':
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-video">
                        {/* {fileExtension} */}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )

        case 'pdf':
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-pdf">
                        {/* {fileExtension} */}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )

        case 'pptx':
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-pptx">
                        {/* {fileExtension} */}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )
        default:
            return (
                <div className="box-file">
                    <div className="bg-file-common bg-common-file-other">
                        {fileExtension}
                    </div>
                    <div className="file-name">
                        {fileName}
                    </div>
                    <div className="action-download">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
            )
    }
};

export default RenderbgFile;