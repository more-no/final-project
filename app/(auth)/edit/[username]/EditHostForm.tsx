'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HostResponseBodyPut } from '../../../api/(auth)/hosts/[username]/route';
import { Host } from '../../../../migrations/00001-createTableHostsInformation';

type Props = {
  host: Host;
  username: string;
};

export default function EditHostForm(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [available, setAvailable] = useState(props.host.available);
  const [lastMinute, setLastMinute] = useState(props.host.lastMinute);
  const [openToMeet, setOpenToMeet] = useState(props.host.openToMeet);
  const [privateRoom, setPrivateRoom] = useState(props.host.privateRoom);
  const [bed, setBed] = useState(props.host.bed);
  const [haveAnimals, setHaveAnimals] = useState(props.host.haveAnimals);
  const [hostAnimals, setHostAnimals] = useState(props.host.hostAnimals);

  const router = useRouter();

  async function handleEditHost(userId: number) {
    const response = await fetch(`/api/editHost/${props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        available,
        lastMinute,
        openToMeet,
        privateRoom,
        bed,
        haveAnimals,
        hostAnimals,
        userId,
      }),
    });

    const data: HostResponseBodyPut = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      console.log('Error editing the Host: ', errors);
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleEditHost(props.host.userId);
        }}
      >
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Available to host:{' '}
            </span>
            <input
              name="available"
              type="checkbox"
              className="toggle"
              checked={available}
              onChange={(event) => {
                setAvailable(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Last minute requests:{' '}
            </span>
            <input
              name="lastMinute"
              type="checkbox"
              className="toggle"
              checked={lastMinute}
              onChange={(event) => {
                setLastMinute(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Open to meet:{' '}
            </span>
            <input
              name="openToMeet"
              type="checkbox"
              className="toggle"
              checked={openToMeet}
              onChange={(event) => {
                setOpenToMeet(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Private room:{' '}
            </span>
            <input
              name="privateRoom"
              type="checkbox"
              className="toggle"
              checked={privateRoom}
              onChange={(event) => {
                setPrivateRoom(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Bed to offer:{' '}
            </span>
            <input
              name="bed"
              type="checkbox"
              className="toggle"
              checked={bed}
              onChange={(event) => {
                setBed(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Have animals:{' '}
            </span>
            <input
              name="haveAnimals"
              type="checkbox"
              className="toggle"
              checked={haveAnimals}
              onChange={(event) => {
                setHaveAnimals(event.currentTarget.checked);
              }}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text font-bold text-lg p-3">
              Host animals:{' '}
            </span>
            <input
              name="hostAnimals"
              type="checkbox"
              className="toggle"
              checked={hostAnimals}
              onChange={(event) => {
                setHostAnimals(event.currentTarget.checked);
              }}
            />
          </label>
        </div>
        <div className="text-right pt-4">
          <button className="btn btn-neutral">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
