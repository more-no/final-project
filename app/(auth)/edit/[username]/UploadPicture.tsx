'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

type Props = {
  cloudName: string;
  username: string;
};

export default function UploadPicture(props: Props) {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [uploadData, setUploadData] = useState(undefined);

  const cloudName = props.cloudName;

  const router = useRouter();

  function handleOnChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    const files = changeEvent.target.files;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = function (onLoadEvent) {
        const result = onLoadEvent.target?.result;

        if (typeof result === 'string') {
          setImageSrc(result);
        }
      };

      reader.readAsDataURL(files[0]);
    }
  }

  async function handleOnSubmit(event: {
    preventDefault: () => void;
    currentTarget: any;
  }) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      (element): element is HTMLInputElement =>
        element instanceof HTMLInputElement &&
        element.name === 'file' &&
        element.type === 'file',
    );

    const formData = new FormData();

    if (fileInput?.files) {
      for (const file of fileInput.files) {
        formData.append('file', file);
      }

      formData.append('upload_preset', 'opentribe');

      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((response) => response.json());

      setImageSrc(data.secure_url);

      setUploadData(data);

      const responseUrl = await fetch(`/api/pictureUrl/${props.username}`, {
        method: 'POST',
        body: JSON.stringify({
          pictureUrl: data.secure_url,
        }),
      });

      if (!responseUrl.ok) {
        return NextResponse.json(responseUrl.status, { status: 500 });
      }

      router.refresh();
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleOnSubmit}>
        <div>
          <input type="file" name="file" onChange={handleOnChange} />
        </div>
        <div className="pt-8 text-right">
          <button className="btn btn-neutral">Upload Picture</button>
        </div>
      </form>
    </div>
  );
}
