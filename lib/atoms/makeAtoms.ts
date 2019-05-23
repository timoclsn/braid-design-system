import merge from 'lodash/merge';
import partition from 'lodash/partition';
import pick from 'lodash/pick';

import { Tokens } from '../themes/theme';
import { Css } from './types';

import makeColors, { ColorParams } from './color/makeColors';
import makeBackgroundColors, {
  BackgroundColorParams,
} from './color/makeBackgroundColors';
import makeBoxShadows, { BoxShadowParams } from './makeBoxShadows';
import makePadding from './makePadding';

const makeAtoms = (
  tokens: Tokens,
  colors: ColorParams,
  boxShadows: BoxShadowParams,
  backgroundColor: BackgroundColorParams,
): Css => {
  const rules = merge(
    makeBackgroundColors(backgroundColor),
    makeBoxShadows(tokens, boxShadows),
    makeColors(colors),
    makePadding(tokens),
  );

  const [queryRules, regularRules] = partition(Object.keys(rules), ruleName =>
    ruleName.startsWith('@'),
  );

  // Include media queries last to ensure higher specificity
  return {
    ...pick(rules, regularRules),
    ...pick(rules, queryRules),
  };
};

export default makeAtoms;
