import React from 'react';

type Props = {
  available: boolean;
  lastMinute: boolean;
  openToMeet: boolean;
  privateRoom: boolean;
  bed: boolean;
  haveAnimals: boolean;
  hostAnimals: boolean;
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
          {renderIcon(props.available)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Last-minute requests:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.lastMinute)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Open to meet:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.openToMeet)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Offer a Private Room:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.privateRoom)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Offer a real bed:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.bed)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Has animals:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.haveAnimals)}
        </div>
      </div>
      <div className="flex flex-row flex-nowrap text-2xl pt-8">
        Accept animals:
        <div className="pl-2 pt-1 w-8 h-8 inline-block">
          {renderIcon(props.hostAnimals)}
        </div>
      </div>
    </>
  );
}
