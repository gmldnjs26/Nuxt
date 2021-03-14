export default async function({ store }, redirect) {
  if (store.state.users.me) {
    await redirect('/');
  }
}