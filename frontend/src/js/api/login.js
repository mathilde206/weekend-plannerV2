import axios from 'axios/index';
import jwtDecode from 'jwt-decode';

function login(username, password) {
    return axios.post('/api/auth/token/obtain/', { username, password })
        .then(({ data }) => {
            const decoded = jwtDecode(data.access);
            return {
                access: {
                    token: data.access,
                    ...jwtDecode(data.access)
                },
                refresh: {
                    token: data.refresh,
                    ...jwtDecode(data.refresh)
                },
                errors: {}
            };
        });
}

export default login;
