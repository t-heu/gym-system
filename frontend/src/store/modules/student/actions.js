export function studentRegisterRequest(student) {
  return {
    type: '@student/REGISTER_REQUEST',
    payload: { student },
  };
}

export function studentRegisterSuccess() {
  return {
    type: '@student/REGISTER_SUCCESS',
  };
}

export function getStudentRequest(id) {
  return {
    type: '@student/REQUEST',
    payload: { id },
  };
}

export function getStudentSuccess(student) {
  return {
    type: '@student/REQUEST_SUCCESS',
    payload: { student },
  };
}

export function studentUpdateRequest(student) {
  return {
    type: '@student/UPDATE_REQUEST',
    payload: { student },
  };
}

export function studentUpdateSuccess(student) {
  return {
    type: '@student/UPDATE_SUCCESS',
    payload: { student },
  };
}

export function studentDeleteRequest(id) {
  return {
    type: '@student/DELETE_REQUEST',
    payload: { id },
  };
}

export function studentDeleteSuccess() {
  return {
    type: '@student/DELETE_SUCCESS',
  };
}

export function studentFailure() {
  return {
    type: '@student/FAILURE',
  };
}
