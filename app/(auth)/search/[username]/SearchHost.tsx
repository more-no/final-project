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

    console.log('Hosts Data: ', data.host);

    const hostsArray = data.host;

    setCityHosts(hostsArray);

    router.refresh();
  }

  return (
    <div className="flex-row">
      <div>
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
      </div>
      <div>
        {cityHosts.length > 0 ? (
          cityHosts.map((host: SearchHost) => (
            <div className="pb-8" key={`card-div-${host.id}`}>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <div className="flex-col">
                  <h2 className="card-title pt-4 pb-4">
                    {host.username} is available!
                  </h2>
                  <figure>
                    <img
                      src={host.pictureUrl}
                      alt="Thumbnail"
                      className="w-50"
                    />
                  </figure>
                </div>
                <div className="card-body justify-end">
                  <span> Member since: {host.dateString} </span>
                  <span>
                    {' '}
                    Currently living in: {host.city}, {host.country}{' '}
                  </span>
                  <span>
                    {' '}
                    Accept last-minute requests: {`${host.lastMinute}`}{' '}
                  </span>
                  <span> Open to Meet travelers: {`${host.openToMeet}`} </span>
                  <div className="flex flex-row space-x-10">
                    <div className="card-actions pt-6">
                      <a
                        className="btn btn-primary"
                        href={`/profile/${host.username}`}
                      >
                        {' '}
                        See Profile
                      </a>
                    </div>
                    <div className="card-actions pt-6">
                      <a
                        className="btn btn-primary"
                        href={`mailto:${host.email}`}
                      >
                        {' '}
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
