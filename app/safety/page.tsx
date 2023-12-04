export function generateMetadata() {
  return {
    title: 'Safety Tips',
  };
}

export default function Safety() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_safety.jpg)',
      }}
    >
      <div className="flex flex-col text-center">
        <div className="font-bold text-4xl pb-8">Safety tips</div>
        <div className="grid md:grid-cols-2 gap-16 px-32">
          <div className="font-semibold text-left text-md mb-4">
            <div className="font-bold text-2xl mb-6"> General Tips</div>
            <div className="mb-4">
              <span className="font-bold">Read profiles carefully:</span> before
              hosting or being a guest of someone, take the time to read the
              profile of the member in question carefully. Read what the person
              says about him/herself and the comments other members have left
              about him/her.
            </div>
            <div className="mb-4">
              <span className="font-bold">
                Do not host or be hosted by members with empty profiles:
              </span>{' '}
              we recommend only searching for and accepting guests who have
              completely filled out their profile. In addition, a clear photo is
              definitely an advantage.
            </div>
            <div className="mb-4">
              <span className="font-bold">Get to know your host:</span> before
              you meet your host get to know him or her better. If something is
              not well posted in the profile, simply ask him or her for more
              details. Once together, spend some time getting to know him/her
              better
            </div>
            <div className="mb-4">
              <span className="font-bold">
                Inform other people about your plans:
              </span>{' '}
              let your family or friends know what your travel plans are and who
              you will be staying with or hosting.
            </div>
            <div className="mb-4">
              <span className="font-bold">
                Do not put your safety in the hands of others:
              </span>{' '}
              make sure you keep your wits about you at all times: travelling
              can be disorienting; the use of alcohol or drugs can complicate
              this further. Do not put your health, physical or mental, in
              someone else's hands.
            </div>
            <div className="mb-4">
              <span className="font-bold">Have a back-up plan:</span> if you are
              hosted by another member, always have a back-up plan. Try to find
              your way around and know where you can find the nearest hostel or
              hotel open all day, or an alternative place to stay.
            </div>
            <div className="mb-4">
              <span className="font-bold">Report abuse: </span> help us keep the
              community safe by reporting abuse and negative experiences
            </div>
          </div>
          <div className="font-semibold text-left text-md mb-4">
            <div className="font-bold text-2xl mb-6"> Tips for women</div>
            <div className="mb-4">
              If you are traveling alone, consider staying with other women or
              families.
            </div>
            <div className="mb-4">
              Be clear about the limits you set in social relationships and do
              not be reticent in expressing them.
            </div>
            <div className="mb-4">
              If a guest, in either direction, continues to overstep these
              limits, get out of the situation and make sure you always have a
              back-up plan.
            </div>
            <div className="mb-4">
              Learn about the cultural and religious values and patterns of the
              places you visit. Both gender roles and expectations, as well as
              behaviours considered to be approriate vary considerably between
              cultures.
            </div>
            <div className="mb-4">
              Legislation concerning sexual harassment varies widely around the
              world. In some countries authorities are very careful, in others,
              however, you may not be taken very seriously.
            </div>
            <div className="mb-4">
              Be clear about the limits you set in social relationships and do
              not be reticent in expressing them.
            </div>
            <div className="mb-4">
              Be clear about the limits you set in social relationships and do
              not be reticent in expressing them.
            </div>
            <div className="mb-4">
              In an emergency situation, leave immediately: if you feel
              threatened or harassed, leave the situation immediately. Don't
              worry about appearing rude or inhospitable: your safety and health
              are more important.
            </div>
            <div className="mb-4">
              Keep the number of a local taxi company and local emergency
              numbers with you. Make sure you can make calls or access the
              internet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
