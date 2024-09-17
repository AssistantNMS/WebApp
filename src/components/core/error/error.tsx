import * as React from 'react';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';

export const Error = () => {
  return (
    <>
      <div className="content">
        <img src="/assets/images/error.png" alt="error robot" style={{ width: '30%', maxWidth: '500px' }} draggable={false} />
        <h2 className="pt1">{translate(LocaleKey.somethingWentWrong)}</h2>
      </div>
    </>
  );
};

// export const ErrorTile = () => {
//   return (
//     <div className="gen-item-container">
//       <div className="image-container" style={{ paddingRight: '1em' }}>
//         <LazyLoadImage
//           src="/assets/images/error.png"
//           alt="error"
//           draggable={false}
//           style={{
//             width: '100px',
//             maxHeight: '100px',
//             marginBlock: '0.75em',
//           }}
//         />
//       </div>
//       <div className="gen-item-content-container">
//         <TextContainer text={translate(LocaleKey.somethingWentWrong)} additionalCss="full" />
//       </div>
//     </div>
//   );
// };