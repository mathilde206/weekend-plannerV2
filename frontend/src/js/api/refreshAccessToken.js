import axios from 'axios/index';
import jwtDecode from 'jwt-decode';

function refreshAccessToken(token) {
    return axios.post('/api/auth/token/refresh/', { refresh: token })
        .then(({ data }) => {
            return ({
                access: {
                    token: data.access,
                    ...jwtDecode(data.access)
                }
            }
            );
        });
}

export default refreshAccessToken;