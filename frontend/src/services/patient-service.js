import {
  instance
} from './axios-config'

const BASE_URI = '/patient'

const getAll = async (value) => {
  return instance
    .get(`${BASE_URI}${value || ''}`)
}

const getById = async (id) => {
  return instance
    .get(`${BASE_URI}/${id}`)
}

const save = async (patient) => {
  return instance
    .post(`${BASE_URI}`, patient)
}

const update = async (patient) => {
  return instance
    .put(`${BASE_URI}/${patient.id}`, patient)
}

const remove = async (id) => {
  return instance
    .delete(`${BASE_URI}/${id}`)
}

export default {
  getAll,
  getById,
  save,
  update,
  remove
}
