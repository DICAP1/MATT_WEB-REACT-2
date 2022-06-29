export function getIdToken() {
  if (!localStorage) return null;
  const {token} = JSON.parse(localStorage.getItem('credentials'));
  return token
}