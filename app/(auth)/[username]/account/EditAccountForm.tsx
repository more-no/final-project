'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../../migrations/00000-createTableUsers';
import DOMPurify from 'dompurify';

type Props = {
  user: User;
};

export default function EditAccountForm({ user }: Props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const router = useRouter();

  async function handleEditAccount() {
    try {
      const response = await fetch(`/api/editAccount/${user.username}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json();

      if ('errors' in data) {
        console.log('Error editing the account data. ', data.errors);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <div className="flex flex-row gap-4">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleEditAccount();
        }}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold p-3">First Name</span>
            <input
              name="First Name"
              value={firstName}
              className="input input-bordered"
              onChange={(event) => {
                setFirstName(DOMPurify.sanitize(event.currentTarget.value));
              }}
            />
          </label>
          <label className="label">
            <span className="label-text font-bold p-3">Last Name</span>
            <input
              name="Last Name"
              value={lastName}
              className="input input-bordered"
              onChange={(event) => {
                setLastName(DOMPurify.sanitize(event.target.value));
              }}
            />
          </label>
          <label className="label">
            <span className="label-text font-bold p-3">Email</span>
            <input
              name="Email"
              type="Email"
              value={email}
              className="input input-bordered"
              onChange={(event) => {
                setEmail(DOMPurify.sanitize(event.currentTarget.value));
              }}
            />
          </label>
        </div>
        <div className="text-right pt-4">
          <button className="btn btn-neutral">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
