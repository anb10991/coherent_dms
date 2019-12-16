
import axios from 'axios';

const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if (type === 'CREATE' && resource === 'revisions') {
        if (params.data.revision_type === 'document') {
            var formData = new FormData();
            formData.append("file", params.data.content.rawFile);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            
            return axios.post("/api/v1/upload/", formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(result => requestHandler(type, resource, {
                ...params,
                data: {
                    ...params.data,
                    content: result.data.file,
                },
            }));                
        }
    }

    return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
