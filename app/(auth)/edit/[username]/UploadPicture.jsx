'use client';
import { useState } from 'react';
import { setConfig } from 'cloudinary-build-url';
import { useRouter } from 'next/navigation';

setConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export default function UploadPicture(props) {
  const [errors, setErrors] = useState([]);
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

    console.log('Secure Url: ', data.secure_url);

    setUploadData(data);

    const responseUrl = await fetch(`/api/pictureUrl/${props.username}`, {
      method: 'PUT',
      body: JSON.stringify({
        pictureUrl: data.secure_url,
      }),
    });

    console.log('Response Edit User Picture Url: ', responseUrl);

    if (responseUrl.ok) {
      const data = await responseUrl.json();
    } else {
      console.error('Response not okay. Status:', responseUrl.status);
    }

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/register', 'page');
    router.refresh();
  }

  return (
    <div>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>

        {/* <img src={imageSrc} /> */}

        {imageSrc && !uploadData && (
          <p>
            <button className="btn btn-active btn-neutral">Upload Files</button>
          </p>
        )}

        {/* {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )} */}
      </form>
    </div>
  );
}
