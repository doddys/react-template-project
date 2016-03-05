'use strict';


export function getImageSource (task: Object, kind: ?string): {uri: ?string} {
  var uri = task && task.posters ? task.posters.thumbnail : null;
  if (uri && kind) {
    uri = uri.replace('tmb', kind);
  }
  return { uri };
};

export function getTextFromScore (score: number): string {
  return score > 0 ? score + '%' : 'N/A';
};


export function getStyleFromScore (score: number): StyleObj {
  if (score < 0) {
    return styles.noScore;
  }

  var normalizedScore = Math.round((score / 100) * 200);
  return {
    color: 'rgb(' +
      (200 - normalizedScore) + ', ' +
      normalizedScore + ', ' +
      0 +
    ')'
  };
};
