'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../utils/validation';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if ('errors' in data) {
        console.log('Error during the login: ', data.errors);
        setErrors(data.errors);
        return;
      }

      router.push(
        getSafeReturnToPath(props.returnTo) || `/${data.user.username}/search`,
      );

      router.refresh();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <>
      <button
        className="btn btn-neutral"
        onClick={() =>
          (document.getElementById('my_modal_2') as HTMLFormElement).showModal()
        }
      >
        Login
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="min-height: 100vh bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Welcome back!</h1>
              <p className="py-6">
                Join the community and find a new guest or a host!
              </p>
              <img
                src="/logo-transp-bg.png"
                alt="logo"
                width="75"
                height="75"
              />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form
                className="card-body"
                onSubmit={async (event) => await handleLogin(event)}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username: </span>
                    <input
                      type="username"
                      placeholder="username"
                      className="input input-bordered"
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password: </span>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      required
                    />
                  </label>
                  <a
                    href="mailto:none@nowhere.nope"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                {errors.map((error) => (
                  <div className="error" key={`error-${error.message}`}>
                    Error: {error.message}
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
