// import { cookies, headers } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getValidSessionByToken } from '../../database/sessions';

type Props = {
  children: React.ReactNode;
};

export default function ProfileLayout(props: Props) {
  return <div>{props.children}</div>;
}
