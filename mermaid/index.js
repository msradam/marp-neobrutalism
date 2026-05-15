'use strict';

// Neobrutalism Mermaid palette.
// Near-monochromatic: black/white/gray + accent yellow for primary nodes.
// Thick borders (via primaryBorderColor), no radius.

const ACCENT  = '#f5c842';
const BLACK   = '#000000';
const WHITE   = '#ffffff';
const GRAY1   = '#f2f2f2';
const GRAY2   = '#cccccc';
const GRAY3   = '#666666';

// Categorical: anchor to near-black/grays, use accent sparingly
const CSCALE_LIGHT = [
  BLACK,   GRAY3,   '#333333', '#555555', '#111111',
  '#444444','#222222','#777777','#999999', GRAY2,
  '#888888','#1a1a1a',
];

const CSCALE_DARK = [
  WHITE,        '#cccccc', '#aaaaaa', '#888888', '#dddddd',
  '#eeeeee',    '#bbbbbb', '#999999', '#777777', '#555555',
  '#333333',    '#f2f2f2',
];

function cScaleEntries(scale) {
  return Object.fromEntries(scale.map((v, i) => [`cScale${i}`, v]));
}

const light = {
  theme: 'base',
  themeVariables: {
    background:            WHITE,
    primaryColor:          ACCENT,
    primaryTextColor:      BLACK,
    primaryBorderColor:    BLACK,
    secondaryColor:        GRAY1,
    secondaryTextColor:    BLACK,
    secondaryBorderColor:  BLACK,
    tertiaryColor:         GRAY1,
    tertiaryTextColor:     BLACK,
    tertiaryBorderColor:   BLACK,

    lineColor:             BLACK,
    textColor:             BLACK,
    mainBkg:               GRAY1,
    nodeBkg:               GRAY1,
    nodeBorder:            BLACK,
    clusterBkg:            WHITE,
    clusterBorder:         BLACK,
    defaultLinkColor:      BLACK,
    titleColor:            BLACK,
    edgeLabelBackground:   WHITE,
    labelBackground:       WHITE,
    labelColor:            BLACK,

    fontFamily:            "'Space Grotesk', system-ui, sans-serif",
    fontSize:              '15px',

    actorBkg:              GRAY1,
    actorBorder:           BLACK,
    actorTextColor:        BLACK,
    actorLineColor:        BLACK,
    signalColor:           BLACK,
    signalTextColor:       BLACK,
    labelBoxBkgColor:      GRAY1,
    labelBoxBorderColor:   BLACK,
    labelTextColor:        BLACK,
    loopTextColor:         BLACK,
    noteBorderColor:       BLACK,
    noteBkgColor:          ACCENT,
    noteTextColor:         BLACK,
    activationBorderColor: BLACK,
    activationBkgColor:    ACCENT,

    errorBkgColor:         '#ffdddd',
    errorTextColor:        '#ff3333',

    ...cScaleEntries(CSCALE_LIGHT),
  },
};

const dark = {
  theme: 'base',
  themeVariables: {
    background:            BLACK,
    primaryColor:          ACCENT,
    primaryTextColor:      BLACK,
    primaryBorderColor:    WHITE,
    secondaryColor:        '#1a1a1a',
    secondaryTextColor:    WHITE,
    secondaryBorderColor:  WHITE,
    tertiaryColor:         '#1a1a1a',
    tertiaryTextColor:     WHITE,
    tertiaryBorderColor:   WHITE,

    lineColor:             WHITE,
    textColor:             WHITE,
    mainBkg:               '#1a1a1a',
    nodeBkg:               '#1a1a1a',
    nodeBorder:            WHITE,
    clusterBkg:            BLACK,
    clusterBorder:         WHITE,
    defaultLinkColor:      WHITE,
    titleColor:            WHITE,
    edgeLabelBackground:   '#1a1a1a',
    labelBackground:       '#1a1a1a',
    labelColor:            WHITE,

    fontFamily:            "'Space Grotesk', system-ui, sans-serif",
    fontSize:              '15px',

    actorBkg:              '#1a1a1a',
    actorBorder:           WHITE,
    actorTextColor:        WHITE,
    actorLineColor:        WHITE,
    signalColor:           WHITE,
    signalTextColor:       WHITE,
    labelBoxBkgColor:      '#1a1a1a',
    labelBoxBorderColor:   WHITE,
    labelTextColor:        WHITE,
    loopTextColor:         WHITE,
    noteBorderColor:       WHITE,
    noteBkgColor:          ACCENT,
    noteTextColor:         BLACK,
    activationBorderColor: WHITE,
    activationBkgColor:    ACCENT,

    errorBkgColor:         '#330000',
    errorTextColor:        '#ff6666',

    ...cScaleEntries(CSCALE_DARK),
  },
};

module.exports = { light, dark };
