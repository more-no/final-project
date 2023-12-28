'use client';
import { useId, useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

export type Position = {
  position: string;
  username: string;
  apiKey: string | undefined;
};

export default function Autocomplete(props: Position) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(props.position);
  const [inputValue, setInputValue] = useState('');

  const router = useRouter();

  async function handleInputChange(input: string) {
    setInputValue(input);

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('key', props.apiKey ?? '');
    params.append('limit', '5');

    const url = `https://api.opencagedata.com/geocode/v1/json?${params.toString()}`;

    try {
      const responseAPI = await fetch(url, {
        method: 'GET',
      });

      const data = await responseAPI.json();

      if (data) {
        const suggestions = data.results.map(
          (result: { formatted: any; geometry: any }) => ({
            label: result.formatted,
            value: result.geometry,
          }),
        );
        setOptions(suggestions);
      }

      if ('errors' in data) {
        console.log('Error fetching suggestions: ', data.errors);
        return;
      }
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }

    try {
      const responseDB = await fetch(`/api/editPosition/${props.username}`, {
        method: 'PUT',
        body: JSON.stringify({
          position: selectedValue,
        }),
      });

      if (!responseDB.ok) {
        return NextResponse.json(responseDB.status);
      }

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  const id = useId();

  return (
    <div className="flex flex-col max-w-screen-xl pt-8 pb-12 mr-12">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleInputChange(inputValue);
        }}
      >
        <div className="grid grid-cols-6">
          <Select
            instanceId={id}
            options={options}
            placeholder="Put yourself on the map..."
            onChange={(choice) => {
              setSelectedValue(choice!);
            }}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            isSearchable
            className="min-w-[30%] mr-44 mb-8 col-span-5"
            styles={{
              option: (provided) => ({
                ...provided,
                color: 'black',
                backgroundColor: 'white',
              }),
            }}
          />
          <button className="btn btn-neutral col-span-1">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
