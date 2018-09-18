import axios from 'axios/index';

function updateBillingInfo(userId, token, formObj) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: formObj,
        url: `/api/users/${userId}/billing/edit/`,
    };
    return axios(options)
        .then(response => response.data);
}

export default updateBillingInfo;
