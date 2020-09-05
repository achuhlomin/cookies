import express from 'express';
import path from 'path';
import cookie from 'cookie-signature';

const router = express.Router();
const img = path.resolve('./public/images/sunrise.jpg');

router.get('/image_with_cookie', function(req, res) {
  const count = Number(req.cookies['image-cookie-counter']) || 0;

  /* it works in modern browser but you need https */
  // res.cookie('image-cookie-counter', count + 1, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: false, secure: true })
  /* could not be working in modern browser */
  res.cookie('image-cookie-counter', count + 1, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: false });
  /* work only when you navigate by link */
  // res.cookie('image-cookie-counter', count + 1, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: 'Lax' })
  /* just navigate by link and refresh doesn't work, set url in browser manually */
  // res.cookie('image-cookie-counter', count + 1, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: 'Strict' })

  res.sendFile(img);
});

router.get('/image_with_signed_cookie', function(req, res, next) {
  const signedCount = req.cookies['signed-cookie-counter'];
  const unsignedValue = signedCount ? cookie.unsign(signedCount, 'supersecret') : null;

  if (unsignedValue === false) {
    return next(new Error('Invalid cookie signature!'));
  }

  const unsignedCount = signedCount ? Number(unsignedValue) : 0;
  const newSignedCount = cookie.sign(String(unsignedCount + 1), 'supersecret');

  res.cookie('signed-cookie-counter', newSignedCount, { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: false });
  res.sendFile(img);
});

router.get('/check_cross_domain_request', function(req, res) {
  res.cookie('test', 'val', { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: false });

  res.send(req.cookies);
});

router.post('/check_cross_domain_request', function(req, res) {
  res.send(req.cookies);
});

export default router;
