import RegistrationForm from './RegistrationForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function Register({ searchParams }: Props) {
  return <RegistrationForm returnTo={searchParams.returnTo} />;
}
