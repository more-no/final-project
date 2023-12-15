'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { SearchResponseBodyGet } from '../../../api/(auth)/search/route';
import { SearchHost } from '../../../../migrations/00001-createTableHostsInformation';

export default function SearchHosts() {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [city, setCity] = useState('');
  const [cityHosts, setCityHosts] = useState<SearchHost[]>([]);

  const renderIcon = (value: boolean) => {
    return value ? (
      <img src="/true.png" alt="Yes" />
    ) : (
      <img src="/false.png" alt="No" />
    );
  };

  const router = useRouter();

  async function handleSearch(selectedCity: string) {
    const sanitizedCityName = DOMPurify.sanitize(selectedCity);

    const response = await fetch(`/api/search?city=${sanitizedCityName}`, {
      method: 'GET',
    });

    const data: SearchResponseBodyGet = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      console.log('Could not find the city: ', errors);
      return;
    }

    const hostsArray = data.host;

    setCityHosts(hostsArray);

    router.refresh();
  }

  return (
    <div className="flex-row">
      <h1 className="text-4xl py-6"> Search for a Host: </h1>
      <p className="text-xl pb-2">
        {' '}
        Save your positions so other users can find you on the Map
      </p>
      <div className="py-6">
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
        <div className="flex flex-wrap gap-12">
          {cityHosts.length > 0 ? (
            cityHosts.map((host: SearchHost) => (
              <div className="pb-8" key={`card-div-${host.id}`}>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                  <div className="flex-col">
                    <h2 className="card-title pl-6 pt-4 pb-4">
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
                  <div className="card-body justify-end pl-6 pt-16 mt-3">
                    <span> Member since: {host.dateString} </span>
                    <span>
                      {' '}
                      Currently living in: {host.city}, {host.country}{' '}
                    </span>
                    <div className="flex items-center">
                      <div className="flex flex-row">
                        Last-minute requests:{' '}
                      </div>
                      <div className="ml-4">{renderIcon(host.lastMinute)}</div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex flex-row">Open to meet: </div>
                      <div className="ml-16">{renderIcon(host.openToMeet)}</div>
                    </div>

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
              <div className="ml-3 text-xl">No hosts found yet.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
