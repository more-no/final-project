'use client';
import { useState } from 'react';
import { User } from '../../../../migrations/00000-createTableUsers';
import { UserResponseBodyDelete } from '../../../api/(auth)/editUser/[username]/route';
import { useRouter } from 'next/navigation';

type Props = {
  users: User[];
};

export default function UsersList({ users }: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [usersList, setUsersList] = useState(users);

  const router = useRouter();

  async function handleDeleteUser(username: string) {
    try {
      const response = await fetch(`/api/editUser/${username}`, {
        method: 'DELETE',
      });

      const data: UserResponseBodyDelete = await response.json();

      if ('errors' in data) {
        setErrors(data.errors);
        console.log('Error fetching the users: ', errors);
        return;
      }

      setUsersList(
        usersList.filter((user) => user.username !== data.user.username),
      );

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={`user-div-${user.id}`} className="hover">
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-neutral"
                    onClick={async () => await handleDeleteUser(user.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
