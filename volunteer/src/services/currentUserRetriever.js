import Vue from 'vue'
import config from '../services/config'

const retrieve = async () => {
  const { body: { name, role } } = await Vue.http.get(`${config.SERVER_BASE_URL}/me`)
  return { name, role }
}

export { retrieve }
