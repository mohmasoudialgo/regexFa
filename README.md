#📦 regex‑fa

**A collection of ready-to-use regular expressions for validating common data formats in Persian and English projects:**


## 🚀 Installation

`npm install regex-fa`



## 🧠 regexFaWord


| Option          | Type                                                  | Default   | Description                                                       |
| --------------- | ----------------------------------------------------- | --------- | ----------------------------------------------------------------- |
| `type`          | `"basic"` \| `"strict"` \| `"extended"` \| `"custom"` | `"basic"` | Determines the type of pattern to use for matching Persian words. |
| `min`           | `number`                                              | `1`       | Minimum allowed length of the word.                               |
| `max`           | `number`                                              | `999999`  | Maximum allowed length of the word.                               |
| `customPattern` | `string` \| `RegExp`                                  | —         | A custom regex pattern (required when `type` is `"custom"`).      |



## basic:
Allows only Persian letters and spaces (no digits or symbols). No leading or trailing spaces.

## strict:
Allows Persian letters and Persian digits (۰-۹), but digits cannot appear at the beginning. Only space between words is allowed.

## extended:
Allows Persian letters, Persian and English digits, and symbols (e.g., . , ! ؟ - _ : @ # ...). Symbols and digits are not allowed at the start.

## custom:
Allows you to pass your own custom pattern as a string or RegExp. Useful when none of the built-in types fit your needs.

## Basic Usage regexFaWord
``` js

import { regexFaWord } from "regex-fa";

const regexWord = regexFaWord({
  type: "strict",
  min: 2,
  max: 99,
});

console.log(regexWord.test("سلام ۱۲۳")); // true
console.log(regexWord.test("!سلام!"));   // false

```

## 🔢 regexFaNum

| Option | Type                                    | Default   | Description                                          |
| ------ | --------------------------------------- | --------- | ---------------------------------------------------- |
| `type` | `"basic"` \| `"strict"` \| `"extended"` | `"basic"` | Defines how strict the number matching should be.    |
| `min`  | `number`                                | `1`       | Minimum allowed character length (not number value). |
| `max`  | `number`                                | `999999`  | Maximum allowed character length.                    |


## basic:
Only Persian digits (۰-۹) are allowed. No spaces or symbols.

## strict:
Only Persian digits are allowed, with optional single spaces between digit groups. No leading or trailing spaces.

## extended:
Allows Persian and English digits, and special characters (e.g., .,!?- etc.) — but the string must start and end with a digit.

## Basic Usage regexFaNum
``` js

import { regexFaNum } from "regex-fa";

const regexNumber = regexFaNum({
  type: "strict",
  min: 2,
  max: 99,
});

console.log(regexNumber.test("۱۲۳۴۵۶۷۸۹۰")); // true
console.log(regexNumber.test("۱۲ ۳۴ ۵۶"));   // true
console.log(regexNumber.test("۱۲@۳"));       // false

```

## ✅ regexValue

| Option  | Type                               | Required | Description                    |
| ------- | ---------------------------------- | -------- | ------------------------------ |
| `type`  | string<br/>(see supported types ↓) | ✅        | The type of value to validate. |
| `value` | `string` \| `number`               | ✅        | The value to be validated.     |

## 📘 Types Explained

| Type         | Description                                      |
| ------------ | ------------------------------------------------ |
| `nationalId` | Iranian national identification number (کد ملی)  |
| `postCode`   | Iranian postal code (کد پستی)                    |
| `mobile`     | Iranian mobile number (e.g., 09xxxxxxxxx)        |
| `cardNumber` | 16-digit Iranian bank card number                |
| `sheba`      | Iranian IBAN (Shaba) number, starting with `IR`  |
| `bankNumber` | Generic Iranian bank account number              |
| `email`      | Valid email address (basic RFC-style validation) |
| `date`       | Persian calendar date, e.g., `1402/05/10`        |
| `time`       | Time string in formats like `14:30` or ISO       |
| `ipv4`       | Valid IPv4 address                               |
| `ipv6`       | Valid IPv6 address                               |

## Basic Usage regexValue
``` js

import { regexValue } from "regex-fa";

console.log(regexValue({ type: 'nationalId', value: '2741953295' })); // true
console.log(regexValue({ type: 'postCode', value: '1345678910' }));   // true
console.log(regexValue({ type: 'cardNumber', value: '5892107044075003' })); // true

```

## 🔐 regexPass


| Option       | Type                                                                 | Default  | Description                                                       |
| ------------ | -------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `type`       | `"weak"` \| `"normal"` \| `"strong"` \| `"veryStrong"` \| `"custom"` | `"weak"` | Defines the strength level of the password pattern.               |
| `min`        | `number`                                                             | `2`      | Minimum password length.                                          |
| `max`        | `number`                                                             | `256`    | Maximum password length.                                          |
| `newPattern` | `string` \| `RegExp`                                                 | —        | Required if `type` is `"custom"` — your own custom regex pattern. |


## 📘 Types Explained

| Type         | Description                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `weak`       | Any characters allowed, no specific constraints.                                                        |
| `normal`     | Must include **at least one letter and one number**.                                                    |
| `strong`     | Must include **at least one lowercase, one uppercase, one number, and one special character**.          |
| `veryStrong` | Must include **at least one uppercase, one number, and one special character** (no lowercase required). |
| `custom`     | Allows passing a fully custom regex. Useful for enforcing organizational rules.                         |

## Basic Usage regexPass
``` js
import { regexPass } from "regex-fa";

const regexPassword = regexPass({
  type: "strong",
  min: 8,
  max: 128,
});

console.log(regexPassword.test("StrongPass123!")); // true
console.log(regexPassword.test("weakpass"));       // false

```

## 👤 regexUsername

| Option          | Type                                                               | Default          | Description                                              |
| --------------- | ------------------------------------------------------------------ | ---------------- | -------------------------------------------------------- |
| `type`          | `"basic"` \| `"alpha"` \| `"strict"` \| `"extended"` \| `"custom"` | `"alphanumeric"` | Defines the pattern type used to validate the username.  |
| `min`           | `number`                                                           | `3`              | Minimum allowed length.                                  |
| `max`           | `number`                                                           | `30`             | Maximum allowed length.                                  |
| `customPattern` | `string` \| `RegExp`                                               | —                | Required if `type` is `"custom"` — a fully custom regex. |


## 📘 Types Explained

| Type       | Description                                                                           |
| ---------- | ------------------------------------------------------------------------------------- |
| `basic`    | Only English letters (a–z, A–Z)                                                       |
| `alpha`    | English letters and digits only — no special characters                               |
| `strict`   | Letters, digits, underscores `_` and dots `.`. No leading/trailing/double `.` or `_`. |
| `extended` | Lowercase letters only, digits, underscores. Must start with a letter.                |
| `custom`   | Fully custom regex pattern (e.g., for company-specific username rules).               |

## Basic Usage regexUsername
``` js

import { regexUsername } from "regex-fa";

const regex = regexUsername({
  type: "strict",
  min: 3,
  max: 30,
});

console.log(regex.test("user_name.123")); // true
console.log(regex.test(".username"));     // false
console.log(regex.test("user__name"));    // false
console.log(regex.test("username_"));     // false

```

## License
