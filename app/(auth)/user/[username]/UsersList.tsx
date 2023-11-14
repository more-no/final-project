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
  // const [isReported, setIsReported] = useState();

  const router = useRouter();

  async function handleDeleteUser(username: string) {
    const response = await fetch(`/api/editUser/${username}`, {
      method: 'DELETE',
    });

    console.log('Response Delete: ', response);

    const data: UserResponseBodyDelete = await response.json();

    console.log('DELETE Data response: ', data);

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    console.log(errors);

    setUsersList(
      usersList.filter((user) => user.username !== data.user.username),
    );

    router.refresh();
  }

  // async function handleReportUser(username: string) {
  //   setIsReported((prevIsReported) => !prevIsReported);

  //   const response = await fetch(`/api/editUser/${username}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       reported: isReported,
  //     }),
  //   });

  //   console.log('Response User Report: ', response);

  //   const data: UserResponseBodyDelete = await response.json();

  //   console.log('REPORT Data response: ', data);

  //   if ('errors' in data) {
  //     setErrors(data.errors);
  //     return;
  //   }

  //   console.log(errors);

  //   router.refresh();
  // }

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
                <td>{`${user.reported}`}</td>
                <td>
                  <button
                    className="btn btn-sm btn-neutral"
                    onClick={async () => await handleDeleteUser(user.username)}
                  >
                    Delete
                  </button>
                </td>
                {/* <td>
                  <button
                    className="btn btn-sm btn-neutral"
                    onClick={async () => await handleReportUser(user.username)}
                  >
                    Report
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
