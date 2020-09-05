## Cookies

[HTTP cookie Wiki](https://en.wikipedia.org/wiki/HTTP_cookie)  
[HTTP State Management Mechanism](https://tools.ietf.org/html/rfc6265)  

### Terminology

- session cookies
- persistent cookies (with `Expires` or `Max-Age` attribute)
- secure cookies (transmitted over https only. `Secure` attribute)
- http-only cookies (cannot be accessed by client-side APIs, such as JavaScript. `HttpOnly` attribute)
- same-site cookies  (attribute `SameSite` can have a value of Strict, Lax or None)
- third-party cookies (banner advertisements)

### Implementation

- to set or update cookie use `Set-Cookie` header in HTTP response
- to read cookie use `Cookie` header in HTTP request
- to delete set `Expires` attribute in past

### Nodejs

    // set or update
    res.cookie('my-custom-cookie', '42', { maxAge: 3 * 60 * 1000, httpOnly: true })
    
    // read
    req.cookies['my-custom-cookie']
    
    // delete
    res.cookie('my-custom-cookie', '42', { maxAge: 0, httpOnly: true });

### Sign

    const signedValue = cookie.sign('value', 'supersecret');
    const unsignedValue = cookie.unsign(signedValue, 'supersecret')

    # sign() underhood
    exports.sign = function(val, secret){
      if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
      if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
      return val + '.' + crypto
        .createHmac('sha256', secret)
        .update(val)
        .digest('base64')
        .replace(/\=+$/, '');
    };

### Browser

- You can read/write cookies with `HttpOnly=false` by javascript in a browser.

        decodeURIComponent(document.cookie)
    
- `HttpOnly=true` cookie you can see(read) only in network monitor.


[express-session](https://www.npmjs.com/package/express-session)  
[connect-redis](https://www.npmjs.com/package/connect-redis)  
[node-cookie-signature](https://github.com/tj/node-cookie-signature)  
            