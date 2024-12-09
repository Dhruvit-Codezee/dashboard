// eslint-disable-next-line sonarjs/concise-regex
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

export const emailRegex =
  // eslint-disable-next-line no-control-regex, sonarjs/slow-regex, sonarjs/regex-complexity, sonarjs/sonar-no-control-regex, sonarjs/concise-regex, sonarjs/single-character-alternation
  /^(((?!.*[^\x00-\x7F])[^<>()[\]\\.,;:\s@"](\.[^<>()[\]\\.,;:\s@"])*){1,64}|(".{1,64}"))@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-zA-Z\-0-9]+(?:-[a-zA-Z\-0-9]+)*([.]{1,1}))){1,4}([a-zA-Z][a-zA-Z0-9]{1,}))|(?:\[(?:(?:(i|I)(p|P)(v)6:(?:(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){7})|(?:(?!(?:.*[a-zA-Z\-0-9][:\]]){7,})(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){0,5})?::(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){0,5})?)))|(?:(?:(i|I)(p|P)(v)6:(?:(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){5}:)|(?:(?!(?:.*[a-zA-Z\-0-9]:){5,})(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){0,3})?::(?:[a-zA-Z\-0-9]{1,4}(?::[a-zA-Z\-0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/;

export const mobileNumberRegex =
  /^\+?\d{1,4}?[-.\s]?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{9})$/;
