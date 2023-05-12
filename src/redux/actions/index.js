// ACTION TYPE para o reducer user
export const PUSH_EMAIL = 'PUSH_EMAIL';
// ACTION CREATOR para o reducer user
export const pushEmail = (email) => ({
  type: PUSH_EMAIL,
  payload: email,
});
