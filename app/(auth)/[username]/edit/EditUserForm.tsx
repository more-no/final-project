'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../../migrations/00000-createTableUsers';
import DOMPurify from 'dompurify';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';

type Props = {
  user: User;
};

export default function EditUserForm({ user }: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [presentation, setPresentation] = useState(user.presentation);

  const router = useRouter();

  async function handleEditUser() {
    try {
      const response = await fetch(`/api/editUser/${user.username}`, {
        method: 'PUT',
        body: JSON.stringify({
          gender,
          country,
          city,
          presentation,
        }),
      });

      const data: UserResponseBodyPut = await response.json();

      if ('errors' in data) {
        setErrors(data.errors);
        console.log('Error editing the User: ', errors);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleEditUser();
        }}
      >
        <div className="form-control">
          <label className="label pb-12">
            <span className="label-text font-bold text-lg p-3">Gender</span>
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
          <label className="label pb-12">
            <span className="label-text font-bold text-lg p-3">Country</span>
            <input
              name="Country"
              value={country}
              className="input input-bordered"
              onChange={(event) => {
                setCountry(DOMPurify.sanitize(event.currentTarget.value));
              }}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label pb-12">
            <span className="label-text font-bold text-lg p-3">City</span>
            <input
              name="City"
              value={city}
              className="input input-bordered"
              onChange={(event) => {
                setCity(DOMPurify.sanitize(event.currentTarget.value));
              }}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="flex flex-col text-left label pb-12">
            <span className="label-text font-bold text-lg p-3">About you</span>
            <textarea
              className="input input-bordered w-80 h-60"
              placeholder="Tell us about yourself (max 900 characters)"
              name="Presentation"
              value={presentation}
              onChange={(event) => {
                setPresentation(DOMPurify.sanitize(event.currentTarget.value));
              }}
            />
          </label>
        </div>
        <div className="text-right">
          <button className="btn btn-neutral">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
