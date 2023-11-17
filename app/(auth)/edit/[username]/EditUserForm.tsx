'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../../migrations/00000-createTableUsers';

type Props = {
  user: User;
};

export default function EditUserForm({ user }: Props) {
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [presentation, setPresentation] = useState(user.presentation);

  const router = useRouter();

  async function handleEditUser() {
    const response = await fetch(`/api/editUser/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        gender,
        country,
        city,
        presentation,
      }),
    });

    if (!response.ok) {
      console.error('Response Edit User:', response.status);
    }

    router.refresh();
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="basis-5/7">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await handleEditUser();
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold p-3">Gender</span>
              <select
                name="Gender"
                value={gender}
                className="select select-bordered max-w-md"
                onChange={(event) => {
                  setGender(event.currentTarget.value);
                }}
              >
                <option value="" disabled>
                  {' '}
                  I am{' '}
                </option>
                <option>I'd rather not tell</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold p-3">Country</span>
              <input
                name="Country"
                value={country}
                className="input input-bordered"
                onChange={(event) => {
                  setCountry(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold p-3">City</span>
              <input
                name="City"
                value={city}
                className="input input-bordered"
                onChange={(event) => {
                  setCity(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold p-3">Presentation</span>
              <textarea
                className="textarea textarea-bordered"
                placeholder="A few words about yourself..."
                name="Presentation"
                value={presentation}
                onChange={(event) => {
                  setPresentation(event.currentTarget.value);
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
