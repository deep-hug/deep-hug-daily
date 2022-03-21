import { get, post } from '../utils/httpServer';
import { BASE_URL_CONSTANT } from '../utils/constant.js';

class requestsTest {
    constructor() {

    }
    getAddressList(params) {
        return get(BASE_URL_CONSTANT+'/api/v1/topics', { params });
    }
    getMockData(data) {
        return post(BASE_URL_CONSTANT + '/api/mock/data', { data });
    }
    login(data) {
        return post(BASE_URL_CONSTANT + '/proxy/fdapp/oauth/v1/token', { data, headers: { 'Resource-type': 'bigscreen-maternalchild', }, } );
    }
    getPresignhosBylevel(level) {
        return get(`${BASE_URL_CONSTANT}/fdapp/api/rehabilitation-home/v1/hospital/level/${level}`);
    }
}

export default new requestsTest();