'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { SearchResponseBodyGet } from '../../../api/(auth)/search/route';
import { SearchHost } from '../../../../migrations/00001-createTableHostsInformation';

// interface UserCity {
//   username: string;
//   city: string | null;
// }

export default function SearchHosts() {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [city, setCity] = useState('');
  // const [cityHosts, setCityHosts] = useState(UserCity[]);
  const [cityHosts, setCityHosts] = useState<SearchHost[]>([]);

  const router = useRouter();

  async function handleSearch(selectedCity: string) {
    const sanitizedCityName = DOMPurify.sanitize(selectedCity);

    console.log('Sanitized name: ', sanitizedCityName);

    const response = await fetch(`/api/search?city=${sanitizedCityName}`, {
      method: 'GET',
    });

    console.log('Response Data Hosts', response);

    const data: SearchResponseBodyGet = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    // console.log(errors);

    console.log('Hosts Data: ', data.host);

    const hostsArray = data.host;

    setCityHosts(hostsArray);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/register', 'page');
    router.refresh();
  }

  return (
    <div className="flex-col">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleSearch(city);
        }}
      >
        <div className="form-control">
          <div className="join">
            <input
              name="City"
              value={city}
              className="input input-bordered join-item"
              placeholder="Where are you going?"
              onChange={(event) => {
                setCity(event.currentTarget.value);
              }}
            />
            <button className="btn btn-active btn-ghost join-item rounded-r-full">
              Search
            </button>
          </div>
        </div>
      </form>
      <br />
      <div>
        {cityHosts.length > 0 ? (
          cityHosts.map((host: SearchHost) => (
            <div key={`card-div-${host.id}`}>
              <div> Email: {host.email} </div>
              <div> Username: {host.username} </div>
              <div>
                Living in: {host.city}, {host.country}
              </div>
              <div> Member since: {host.dateString} </div>
              <div> Available: {`${host.available}`} </div>
              <div> Last-minute requests: {`${host.lastMinute}`} </div>
              <div> Open to Meet: {`${host.openToMeet}`} </div>
              <br />
            </div>
          ))
        ) : (
          <>
            <br />
            <span>No hosts found yet.</span>
          </>
        )}
      </div>
    </div>
  );
}
