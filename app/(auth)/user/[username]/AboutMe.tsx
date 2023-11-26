import React from 'react';

type Props = {
  presentation: string;
};

export default function AboutMe(props: Props) {
  return (
    <div>
      <h2 className="text-3xl pb-4">About me:</h2>
      <h2 className="text-lg pl-4">{props.presentation}</h2>
    </div>
  );
}
