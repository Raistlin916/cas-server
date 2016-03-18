/*
 * @Author: detailyang
 * @Date:   2016-02-26 13:53:51
* @Last modified by:   detailyang
* @Last modified time: 2016-03-18T13:12:20+08:00
 */

import bcrypt from 'bcrypt';
import base32 from 'thirty-two';
import notp from 'notp';

function check(plaintext, cipher) {
  return bcrypt.compareSync(plaintext, cipher);
}

function encrypt(plaintext, salt) {
  // oops, the salt should be generated by automate
  return bcrypt.hashSync(plaintext, salt);
}

function otpqrcode(key, _label) {
  // encoded will be the secret key, base32 encoded
  const encoded = base32.encode(key);
  const label = _label || 'otp';

  // Google authenticator doesn't like equal signs
  const encodedForGoogle = encoded.toString().replace(/=/g, '');

  // to create a URI for a qr code (change totp to hotp if using hotp)
  const uri = 'otpauth://totp/' + label + '?secret=' + encodedForGoogle;

  return uri;
}

// google auth token and user key
function otpcheck(token, key) {
  return notp.totp.verify(token, key);
}

module.exports = {
  check: check,
  encrypt: encrypt,
  genSalt: bcrypt.genSaltSync,
  otpqrcode: otpqrcode,
  otpcheck: otpcheck,
};
