import { handleLogout } from './actions';

export default function Logout() {
  return (
    <form>
      <button formAction={handleLogout}>Logout</button>
    </form>
  );
}
