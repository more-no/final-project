import React from 'react';

type Props = {
  available: boolean | undefined;
  lastMinute: boolean | undefined;
  openToMeet: boolean | undefined;
  privateRoom: boolean | undefined;
  bed: boolean | undefined;
  haveAnimals: boolean | undefined;
  hostAnimals: boolean | undefined;
};

export default function AboutProps(props: Props) {
  const renderIcon = (value: boolean) => {
    return value ? (
      <img src="/true.png" alt="Yes" />
    ) : (
      <img src="/false.png" alt="No" />
    );
  };

  return (
    <>
      <div className="flex flex-row flex-nowrap text-2xl pr-3">
        Available:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.available !== undefined && renderIcon(props.available)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Last-minute requests:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.lastMinute !== undefined && renderIcon(props.lastMinute)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Open to meet:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.openToMeet !== undefined && renderIcon(props.openToMeet)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Offer a Private Room:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.privateRoom !== undefined && renderIcon(props.privateRoom)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Offer a real bed:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.bed !== undefined && renderIcon(props.bed)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Has animals:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.haveAnimals !== undefined && renderIcon(props.haveAnimals)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Accept animals:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {props.hostAnimals !== undefined && renderIcon(props.hostAnimals)}
        </div>
      </div>
    </>
  );
}
