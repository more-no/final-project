'use client';
import { useRouter } from 'next/navigation';
import { DeleteSession } from './actions';
import { User } from '../../../../migrations/00000-createTableUsers';

type Props = {
  user: User;
};

export default function DeleteAccountForm({ user }: Props) {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const response = await fetch(`/api/users/${user.username}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if ('errors' in data) {
      console.log('Error deleting the user: ', data.errors);
      return;
    }

    await DeleteSession();

    router.replace('/');
  };

  return (
    <div className="flex flex-row gap-4">
      <form>
        <button className="btn btn-neutral" formAction={handleDeleteAccount}>
          {' '}
          Delete Account
        </button>
      </form>
    </div>
  );
}
