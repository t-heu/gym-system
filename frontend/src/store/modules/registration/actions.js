export function addRegistrationRequest(registration) {
  return {
    type: '@registration/ADD_REQUEST',
    payload: { registration },
  };
}

export function addRegistrationSuccess(response) {
  return {
    type: '@registration/ADD_SUCCESS',
    payload: { response },
  };
}

export function updateRegistrationRequest(registration) {
  return {
    type: '@registration/UPDATE_REQUEST',
    payload: { registration },
  };
}

export function updateRegistrationSuccess(response) {
  return {
    type: '@registration/UPDATE_SUCCESS',
    payload: { response },
  };
}

export function deleteRegistrationRequest(id) {
  return {
    type: '@registration/DELETE_REQUEST',
    payload: { id },
  };
}
