import * as React from 'react';

import { CommunitySearchChipColourViewModel } from '../../../contracts/other/communitySearchChipColourViewModel';

export const communitySearchTags = (chipColours: Array<CommunitySearchChipColourViewModel>, tags: Array<string>) => {
  const getColourForTag = (chipColours: Array<CommunitySearchChipColourViewModel>, tagName: string) => {
    const foundColourObj = chipColours.find((cc) => cc.name.toLocaleLowerCase() === tagName.toLocaleLowerCase());
    if (foundColourObj != null) return foundColourObj.colour;

    return '';
  };

  return (
    <>
      {(tags ?? []).map((tag) => (
        <span key={tag} className="community-search-chip noselect" style={{ backgroundColor: getColourForTag(chipColours, tag) }}>
          {tag}
        </span>
      ))}
    </>
  );
};
