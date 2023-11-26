import React from 'react';

type Props = {
  date: string | undefined;
  gender: string;
  city: string;
  country: string;
};

export default function BasicInfo(props: Props) {
  return (
    <>
      <p className="text-2xl pb-4">Member since: {props.date}</p>
      <p className="text-2xl pb-4">Gender: {props.gender}</p>
      <p className="text-2xl pb-4">From: {`${props.city} ${props.country}`}</p>
    </>
  );
}
