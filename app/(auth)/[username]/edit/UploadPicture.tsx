'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  cloudName: string | undefined;
  username: string;
};

export default function UploadPicture(props: Props) {
  const [imageSrc, setImageSrc] = useState<string | undefined>();

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

      let dataUpload;

      try {
        dataUpload = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        ).then((response) => response.json());
      } catch (error) {
        console.error(
          'An error occurred while fetching the data from the cloud: ',
          error,
        );
      }

      try {
        const response = await fetch(`/api/pictureUrl/${props.username}`, {
          method: 'POST',
          body: JSON.stringify({
            pictureUrl: dataUpload.secure_url,
          }),
        });

        const data = await response.json();

        if ('errors' in data) {
          console.log(data.errors);
          return;
        }

        router.refresh();
      } catch (error) {
        console.error('An error occurred while fetching the data: ', error);
      }
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
