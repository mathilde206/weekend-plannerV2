import axios from 'axios/index';

function updateUserProfile(userId, token, formObj) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: formObj,
        url: `/api/users/${userId}/profile/edit/`,
    };
    return axios(options)
        .then(response => response.data);
}

export default updateUserProfile;
