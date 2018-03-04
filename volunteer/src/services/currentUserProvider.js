import Vue from 'vue'
import config from '../services/config'

let _data;

const init = async () => {
    const { body: { name, role } } = await Vue.http.get(`${config.SERVER_BASE_URL}/me`);
    _data = { name, role };
};

const get = () => _data;

export default {
    init,
    get
};