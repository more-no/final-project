import { Logout } from './actions';

export default function LogoutLink() {
  return (
    <form>
      <button formAction={Logout}>Logout</button>
    </form>
  );
}
