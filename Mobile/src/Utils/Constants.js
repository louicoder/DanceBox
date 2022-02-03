import { Dimensions } from 'react-native';
import _FIRESTORE from '@react-native-firebase/firestore';
import _STORAGE from '@react-native-firebase/storage';
import _MESSAGING from '@react-native-firebase/messaging';
import _AUTH from '@react-native-firebase/auth';

export const DEFAULT_PROFILE =
  'https://firebasestorage.googleapis.com/v0/b/dancebox-309908.appspot.com/o/profilepic-default.jpg?alt=media&token=76da5163-cd96-492c-bd67-b0def69215c8';

export const INTERESTS = [
  'Competition',
  'Performance',
  'Workshop',
  'Festival',
  'Class',
  'Video shoot',
  'DJeeing',
  'Rap',
  'BeatBoxing',
  'Breakdance',
  'Traditional',
  'Drummers',
  'Capoela',
  'Mceeing',
  'Freestyle',
  'Videography',
  'Photography',
  'production',
  'battles'
];

export const EVENTS_PIC = 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg';

export const THEME_COLOR = '#FA7C14';
export const THEME_COLOR2 = '#e17012';
export const THEME_COLOR3 = '#fca35b';
export const THEME_COLOR4 = '#fdbe8a';
export const THEME_COLOR5 = '#fff2e8';
export const THEME_COLOR6 = '#af570e';
export const THEME_COLOR7 = '#643208';

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export const HALF_WIDTH = 1 / 2 * WIDTH;
export const THIRD_WIDTH = 1 / 3 * WIDTH;
export const QUARTER_WIDTH = 1 / 4 * WIDTH;
export const FIFTH_WIDTH = 1 / 4 * WIDTH;
export const TWO_THIRD_WIDTH = 2 / 3 * WIDTH;
export const THREE_QUARTER_WIDTH = 3 / 4 * WIDTH;

export const HALF_HEIGHT = 1 / 2 * HEIGHT;
export const THIRD_HEIGHT = 1 / 3 * HEIGHT;
export const QUARTER_HEIGHT = 1 / 4 * HEIGHT;
export const FIFTH_HEIGHT = 1 / 4 * HEIGHT;
export const TWO_THIRD_HEIGHT = 2 / 3 * HEIGHT;
export const THREE_QUARTER_HEIGHT = 3 / 4 * HEIGHT;

export const GREEN = '#2ED69B';
export const QUARTER_GREEN = '#2ED69B75';
export const HALF_GREEN = '#2ED69B50';
export const SEMI_GREEN = '#2ED69B25';

export const BLUE = '#06B5D4';
export const QUARTER_BLUE = '#06B5D475';
export const HALF_BLUE = '#06B5D450';
export const SEMI_BLUE = '#06B5D425';

export const GRAY = '#aaaaaa';
export const QUARTER_GRAY = '#aaaaaa75';
export const HALF_GRAY = '#aaaaaa50';
export const SEMI_GRAY = '#aaaaaa25';

export const BLACK = '#010203';
export const QUARTER_BLACK = '#01020375';
export const HALF_BLACK = '#01020350';
export const SEMI_BLACK = '#01020325';

export const WHITE = '#FFFFFF';
export const QUARTER_WHITE = '#FFFFFF75';
export const HALF_WHITE = '#FFFFFF50';
export const SEMI_WHITE = '#FFFFFF25';

export const BROWN = '#eeeeee';
export const QUARTER_BROWN = '#eeeeee75';
export const HALF_BROWN = '#eeeeee50';
export const SEMI_BROWN = '#eeeeee25';

export const STORAGE = _STORAGE();
export const FIRESTORE = _FIRESTORE();
export const MESSAGING = _MESSAGING();
export const AUTH = _AUTH();

// export { WIDTH, HEIGHT };
