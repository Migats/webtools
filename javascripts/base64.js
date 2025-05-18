const _BASE64CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
class Base64 {
    /**
     * 
     * @param {Uint8Array} array 
     * @returns {String}
     */
    static encode(array) {
        array = new Uint8Array(array);
        let string = "";
        for (let i=0;i<array.length;i+=3) {
            string += _BASE64CHARS[array[i]&63];
            if (array.length == i+1) {
                string += _BASE64CHARS[array[i]>>>6] + "==";
                break;
            }
            string += _BASE64CHARS[(array[i]>>>6)|(array[i+1]&15)];
            if (array.length == i+2) {
                string += _BASE64CHARS[array[i+1]>>>4] + "=";
                break;
            }
            string += _BASE64CHARS[(array[i+1]>>>4)|(array[i+2]&3)];
            string += _BASE64CHARS[array[i+2]>>>2];
        }
        return string;
    }
    /**
     * 
     * @param {String} string
     * @returns {Uint8Array}
     */
    static decode(string) {
        string = string.substring(string.indexOf("="));
        let array = new Uint8Array(Math.floor(string.length*3/4));
        for(let i=0,j=0;i+1<string.length;i+=4,j+=3) {
            array[j] = _BASE64CHARS.indexOf(string.charAt(i)) | (_BASE64CHARS.indexOf(string.charAt(i+1))<<6) & 255;
            if (string.length == i+2) break;
            array[j+1] = (_BASE64CHARS.indexOf(string.charAt(i+1))&15) | (_BASE64CHARS.indexOf(string.charAt(i+2))<<4) & 255;
            if (string.length == i+3) break;
            array[j+2] = (_BASE64CHARS.indexOf(string.charAt(i+1))&3) | (_BASE64CHARS.indexOf(string.charAt(i+2))<<2) & 255;
        }
    }
}