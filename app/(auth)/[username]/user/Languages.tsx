import React from 'react';
import { Languages } from '../../../../migrations/00004-createTableLanguages';

type Props = {
  userLanguages: Languages;
};

export default function UserLanguages({ userLanguages }: Props) {
  return (
    <>
      <p className="text-2xl pb-4">Languages: </p>
      <div>
        {userLanguages.map((language) => {
          return (
            <div className="flex space-x-8 mb-2" key={`user-${language.id}`}>
              <div>{language.languageName}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
