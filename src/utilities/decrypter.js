import CryptoJS from "crypto-js";
import { Base64 } from "js-base64";

let key = "TnPXLTozcopqEeUWB8247l9e5oZ3rBQewZZ3mew5W1M=";

function decrypt(payload) {
  var encrypted_json = JSON.parse(Base64.decode(payload));

  // Now I try to decrypt it.
  var decrypted = CryptoJS.AES.decrypt(
    encrypted_json.value,
    CryptoJS.enc.Base64.parse(key),
    {
      iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export { decrypt };
