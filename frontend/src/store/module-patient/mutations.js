export const addPatient = (state, patient) => {
  state.patients.push(patient)
}

export const updateAll = (state, patients) => {
  state.patients = patients
}

export const removePatient = (state, id) => {
  state.patients = state.patients.filter(patient => patient.id !== id)
}

export const updatePatient = (state, patient) => {
  state.patients = state.patients.map(el => el.id === patient.id ? patient : el)
}
