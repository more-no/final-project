'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserAccountResponseBodyPut } from '../../../api/(auth)/editAccount/[username]/route';
import { User } from '../../../../migrations/00000-createTableUsers';

type Props = {
  user: User;
};

export default function EditAccountForm({ user }: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const router = useRouter();

  async function handleEditAccount() {
    const response = await fetch(`/api/editAccount/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });

    console.log('Response Edit Account: ', response);

    const data: UserAccountResponseBodyPut = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    console.log(errors);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/register', 'page');
    router.refresh();
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="basis-5/7">
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
                  setFirstName(event.currentTarget.value);
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
                  setLastName(event.target.value);
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
                  setEmail(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button className="btn btn-neutral">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
