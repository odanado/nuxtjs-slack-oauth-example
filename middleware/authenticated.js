export default function ({ store, redirect, route }) {
  if (route.name === 'signed-in') {
    return undefined;
  } else if (!store.getters.isAuthenticated) {
    return redirect('/sign-in');
  }
  return undefined;
}
