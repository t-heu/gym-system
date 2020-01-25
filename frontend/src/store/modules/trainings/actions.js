export function trainingRegisterRequest(training) {
  return {
    type: '@training/REGISTER_REQUEST',
    payload: { training },
  };
}

export function trainingRegisterSuccess() {
  return {
    type: '@training/REGISTER_SUCCESS',
  };
}

export function getTrainingRequest(id) {
  return {
    type: '@training/REQUEST',
    payload: { id },
  }
}

export function getTrainingSuccess(training) {
  return {
    type: '@training/REQUEST_SUCCESS',
    payload: { training },
  };
}

export function trainingUpdateRequest(training) {
  return {
    type: '@training/UPDATE_REQUEST',
    payload: { training },
  };
}

export function trainingUpdateSuccess(training) {
  return {
    type: '@training/UPDATE_SUCCESS',
    payload: { training },
  };
}

export function trainingDeleteRequest(id) {
  return {
    type: '@training/DELETE_REQUEST',
    payload: { id },
  };
}

export function trainingDeleteSuccess() {
  return {
    type: '@training/DELETE_SUCCESS',
  };
}

export function trainingFailure() {
  return {
    type: '@training/FAILURE',
  };
}