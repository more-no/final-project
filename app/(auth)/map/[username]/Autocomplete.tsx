'use client';
import { useId, useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
// import { PositionResponseBodyPut } from '../../../api/(auth)/editPosition/[username]/route';

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

export type Position = {
  position: string;
  username: string;
};

export default function Autocomplete(props: Position) {
  const [errors, setErrors] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(props.position);
  const [inputValue, setInputValue] = useState('');

  const router = useRouter();

  async function handleInputChange(input: string) {
    setInputValue(input);

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('key', apiKey!);
    params.append('limit', '5');

    const url = `https://api.opencagedata.com/geocode/v1/json?${params.toString()}`;

    const responseAPI = await fetch(url, {
      method: 'GET',
    });

    const data = await responseAPI.json();

    console.log('Data: ', data);

    if (data) {
      const suggestions = data.results.map(
        (result: { formatted: any; geometry: any }) => ({
          label: result.formatted,
          value: result.geometry,
        }),
      );
      setOptions(suggestions);
      console.log('Suggestion: ', suggestions);
    }

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    const responseDB = await fetch(`/api/editPosition/${props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        position: selectedValue,
      }),
    });

    console.log('Response Edit Position: ', responseDB);

    if (responseDB.ok) {
      await responseDB.json();
    } else {
      console.error('Response not okay. Status:', responseDB.status);
    }

    console.log(errors);

    router.refresh();
  }

  const id = useId();

  return (
    <div>
      <h1 className="text-4xl py-6"> Select your location: </h1>
      <p className="text-xl pb-2">
        {' '}
        Save your positions so other users can find you on the Map
      </p>
      <div className="flex-row py-6">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await handleInputChange(inputValue);
          }}
        >
          <div className="flex flex-col">
            <Select
              instanceId={id}
              options={options}
              onChange={(choice) => {
                console.log('The user has selected:', choice);
                setSelectedValue(choice!);
              }}
              onInputChange={handleInputChange}
              inputValue={inputValue}
              isSearchable
              className="min-w-full"
            />
            <button className="btn btn-neutral">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
