'use client';
import { useState } from 'react';
import { Language } from '../../../../migrations/00004-createTableLanguages';
import { useRouter } from 'next/navigation';
import { User } from '../../../../migrations/00000-createTableUsers';

import Select from 'react-select';

type Props = {
  user: User;
  languages: { id: number; languageName: string }[];
};

export default function EditLanguagesForm({ user, languages }: Props) {
  const [selected, setSelected] = useState<Language[]>([]);

  const router = useRouter();

  async function handleEditLanguages() {
    try {
      const response = await fetch(`/api/languages/${user.username}`, {
        method: 'PUT',
        body: JSON.stringify({
          languageId: selected.map((language) => language.id),
        }),
      });

      const data = await response.json();

      if ('errors' in data) {
        console.log('Error editing the Languages: ', data.errors);
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
          await handleEditLanguages();
        }}
      >
        <div className="form-control">
          <Select
            isMulti
            defaultValue={languages[5]}
            value={selected}
            onChange={(selectedOptions) =>
              setSelected(selectedOptions as Language[])
            }
            options={languages}
            getOptionLabel={(option) => option.languageName}
            getOptionValue={(option) => String(option.id)}
          />
          <div className="text-right pt-10">
            <button className="btn btn-neutral">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
}
