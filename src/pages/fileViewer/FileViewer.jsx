import React from 'react';
import { DocumentViewer } from 'react-documents';

const FileViewer = () => {
    return (
        <div>
            <DocumentViewer
                queryParams="hl=Nl"
                // url={selectedDoc}
                viewerUrl={'http://localhost:3000/test.docx'}
                // viewer={selectedViewer.name}
                overrideLocalhost="https://react-doc-viewer.firebaseapp.com/">
            </DocumentViewer>
        </div>
    );
};

export default FileViewer;