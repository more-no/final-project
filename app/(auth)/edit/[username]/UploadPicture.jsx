'use client';
import { useState } from 'react';
import { setConfig } from 'cloudinary-build-url';
import { useRouter } from 'next/navigation';

setConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export default function UploadPicture(props) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const router = useRouter();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'opentribe');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/detgpj4yy/image/upload',
      {
        method: 'PUT',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);

    console.log('Secure Url: ', imageSrc);

    setUploadData(data);

    console.log('Secure Url: ', uploadData);

    const responseUrl = await fetch(`/api/pictureUrl/${props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        pictureUrl: data.secure_url,
      }),
    });

    console.log('Response Edit User Picture Url: ', responseUrl);

    if (!responseUrl.ok) {
      console.error('Response not okay. Status:', responseUrl.status);
    }

    router.refresh();
  }

  return (
    <div>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <div>
          <input type="file" name="file" />
        </div>
        <div className="pt-4 text-right">
          <button className="btn btn-active btn-neutral">Upload Files</button>
        </div>
        {uploadData && <span>Picture uploaded!</span>}
      </form>
    </div>
  );
}
