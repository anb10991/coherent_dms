import {
    AUTH_GET_PERMISSIONS,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CHECK,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import jwtDecode from 'jwt-decode';

// Authenticatd by default
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('/auth/obtain-auth-token/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token, role }) => {
                localStorage.setItem('not_authenticated', false);
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.setItem('not_authenticated', true);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        const token = localStorage.getItem('token');
        const jsonToken = jwtDecode(token);

        if (Date.now() >= (jsonToken.exp - 120) * 1000) {
        
            const request = new Request('/auth/refresh-auth-token/', {
                method: 'POST',
                body: JSON.stringify({ "token": token }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(({ token, role }) => {
                    localStorage.setItem('not_authenticated', false);
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
                }).then(() => {
                    return localStorage.getItem('token')
                    ? Promise.resolve()
                    : Promise.reject();            
                });
        }

        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    }

    return Promise.reject('Unknown method');
};
