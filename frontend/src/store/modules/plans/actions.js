export function registerPlanRequest(plan) {
  return {
    type: '@plans/ADD_REQUEST',
    payload: { plan },
  };
}

export function registerPlanSuccess() {
  return {
    type: '@plans/ADD_SUCCESS',
  };
}

export function updatePlanRequest(plan) {
  return {
    type: '@plans/UPDATE_REQUEST',
    payload: { plan },
  };
}

export function updatePlanSuccess(plan) {
  return {
    type: '@plans/UPDATE_SUCESS',
    payload: { plan },
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plans/DELETE_REQUEST',
    payload: { id },
  };
}
