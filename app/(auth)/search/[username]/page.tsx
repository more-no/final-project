import SearchHosts from './SearchHost';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Search Page',
  };
}

export default async function SearchPage({ params }: Props) {
  // const users = await getUsers();

  // const usersCities: UserCity[] = users.map((user) => {
  //   return {
  //     username: user.username,
  //     city: user.city,
  //   };
  // });

  // console.log('User/Cities List: ', usersCities);

  return <SearchHosts />;
}
