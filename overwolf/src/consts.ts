
export const kGamesFeatures = new Map<number, string[]>([
  // Minecraft
  // [ // for testing
  //   8032,
  //   [
  //     'game_info',
  //     'match_info'
  //   ]
  // ],
  [
    8032,
    [
      'game_info',
      'match_info'
    ]
  ]
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop'
};

export const kHotkeys = {
  toggle: 'assistant_nms_showhide'
};
