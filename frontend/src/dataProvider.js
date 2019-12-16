import drfProvider from 'ra-data-drf';

import { fetchUtils } from 'react-admin';

import addUploadFeature from './addUploadFeature';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = drfProvider('/api/v1', httpClient);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const sometimesFailsDataProvider = (type, resource, params) =>
    new Promise((resolve, reject) => {
        // add rejection by type or resource here for tests, e.g.
        // if (type === 'DELETE' && resource === 'posts') {
        //     return reject('deletion error');
        // }
        return resolve(uploadCapableDataProvider(type, resource, params));
    });
const delayedDataProvider = (type, resource, params) => {
    if (resource === 'documents' || resource === 'textentries' || resource === 'forms' || resource === 'master-documents') {
        resource = 'articles';
    }
    return new Promise(resolve =>
        setTimeout(
            () => resolve(sometimesFailsDataProvider(type, resource, params)),
            100
        )
    );
}

export default delayedDataProvider;
