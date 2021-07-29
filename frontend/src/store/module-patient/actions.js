export const addPatient = ({ commit }, patient) => {
  commit('addPatient', patient)
}
export const updateAll = ({ commit }, patients) => {
  commit('updateAll', patients)
}

export const removePatient = ({ commit }, id) => {
  commit('removePatient', id)
}

export const updatePatient = ({ commit }, patient) => {
  commit('updatePatient', patient)
}
