'use client';
import { useRouter } from 'next/navigation';
import { User } from '../../../../migrations/00000-createTableUsers';
import { Languages } from '../../../../migrations/00004-createTableLanguages';

type Props = {
  user: User;
  userLanguageList: Languages;
};

export default function EditLanguageList({ user, userLanguageList }: Props) {
  const router = useRouter();

  async function handleDeleteLanguage(languageId: number) {
    try {
      const response = await fetch(
        `/api/languages/${user.username}?languageId=${languageId}`,
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();

      if ('errors' in data) {
        console.log('Error editing the User Languages: ', data.errors);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <div>
      {userLanguageList.map((language) => {
        return (
          <div className="flex space-x-8 mb-2" key={`user-${language.id}`}>
            <div>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  await handleDeleteLanguage(language.id);
                }}
              >
                <button className="btn btn-circle">x</button>
              </form>
            </div>
            <div>{language.languageName}</div>
          </div>
        );
      })}
    </div>
  );
}
