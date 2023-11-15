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
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img src={host.pictureUrl} alt="Thumbnail" className="w-50" />
                </figure>
                <div className="card-body">
                  <h1 className="card-title">{host.username} is available!</h1>
                  <span> Member since: {host.dateString} </span>
                  <span>
                    {' '}
                    Living in: {host.city}, {host.country}{' '}
                  </span>
                  <span> Last-minute requests: {`${host.lastMinute}`} </span>
                  <span> Open to Meet: {`${host.openToMeet}`} </span>
                  <div className="card-actions justify-end pt-6">
                    <a
                      className="btn btn-ghost"
                      href={`/profile/${host.username}`}
                    >
                      {' '}
                      See Profile
                    </a>
                  </div>
                  <div className="card-actions justify-end pt-6">
                    <a className="btn btn-ghost" href={`mailto:${host.email}`}>
                      {' '}
                      Contact
                    </a>
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
