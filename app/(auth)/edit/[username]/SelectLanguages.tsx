// 'use client';
// import { useState } from 'react';

// interface Props {
//   languagesList: string[];
// }

// export default function Languages({ languagesList }: Props) {
//   const [selectedOption, setSelectedOption] = useState('');

//   const languageOptions = languagesList.map((language) => {
//     return <option key={`language-div-${language}`}>{language}</option>;
//   });

//   return (
//     <div className="label">
//       <span className="label-text font-bold p-3">Languages</span>
//       <select
//         value={selectedOption}
//         onChange={(event) => {
//           setSelectedOption(event.currentTarget.value);
//         }}
//       >
//         <option value="" disabled>
//           Select a language
//         </option>
//         {languageOptions}
//       </select>
//     </div>
//   );
// }
