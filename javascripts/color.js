/*
 * 
 */
class Color {
    /**
     * Creates a new color
     * @param {*} data Any data to get a color from
     */
    constructor(data) {
        if (data instanceof Color) {
            this._data = data._data;
        } else if (data instanceof ArrayBuffer || data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
            if (data.byteLength != 4) {throw new RangeError("parameter 1 requires bytelength 4")}
            this._data = new Uint8ClampedArray(data);
        } else if (typeof data == "number" || data instanceof BigInt) {
            data = Number(data);
            this._data = new Uint8ClampedArray([data&255,data>>8&255,data>>16&255,data>>24&255]);
        } else if ((data instanceof Float32Array || data instanceof Float64Array || data instanceof Array)) {
            if (data.length != 4) {throw new RangeError("parameter 1 requires a length of 4")}
            this._data = new Uint8ClampedArray([data[0]*255,data[1]*255,data[2]*255,data[3]*255]);
        } else if (data instanceof String) {
            if (/^#([A-Fa-f0-9]{8}?)$/.test(data)) {
                let int = parseInt(data.slice(1), 16);
                this._data = new Uint8ClampedArray(int>>24&255,int>>16&255,int>>8&255,int&255);
            } else if (/^#([A-Fa-f0-9]{6}?)$/.test(data)) {
                let int = BigInt(parseInt(data.slice(1), 16));
                this._data = new Uint8ClampedArray(int>>16n&255n,int>>8n&255n,int&255n,255);
            } else if (/^#([A-Fa-f0-9]{4}?)$/.test(data)) {
                let int = parseInt(data.slice(1));
                this._data = new Uint8ClampedArray((int>>12&15)*17,(int>>8&15)*17,(int>>4&15)*17,(int&15)*17);
            } else if (/^#([A-Fa-f0-9]{3}?)$/.test(data)) {
                let int = parseInt(data.slice(1));
                this._data = new Uint8ClampedArray((int>>8&15)*17,(int>>4&15)*17,(int&15)*17,255);
            } else if (/^\s*rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/.test(data)) {
                let r = data.match(/^\s*rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/).slice(1);
                r.push(255);
                this._data = new Uint8ClampedArray(r);
            } else if (/^\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/.test(data)) {
                let r = data.match(/^\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/).slice(1);
                r[3]*=255;
                this._data = new Uint8ClampedArray(r);
            } else {
                let c = document.createElement("canvas"), ctx = c.getContext("2d");
                c.width = c.height = 1;
                ctx.fillStyle = data;
                ctx.fillRect(0, 0, 1, 1);
                this._data = ctx.getImageData(0, 0, 1, 1).data;
            }
        } else if (data instanceof Boolean) {
            this._data = new Uint8ClampedArray([0,0,0,data*255]);
        }
    }
    /**
     * Picks a color from a specified position in the canvas
     * @param {ImageData|HTMLCanvasElement|CanvasRenderingContext2D|HTMLImageElement|Image} imageData The canvas
     * @param {Number} x The x position
     * @param {Number} y The y position
     * @returns {Color}
     */
    static getColorAt(imageData, x, y) {
        if (imageData instanceof HTMLImageElement || imageData instanceof Image) {
            let c = document.createElement("canvas"), ctx = c.getContext("2d");
            c.width = imageData.width;
            c.height = imageData.height;
            ctx.drawImage(imageData, 0, 0);
            imageData = ctx;
        }
        if (imageData instanceof HTMLCanvasElement) imageData = imageData.getContext("2d");
        if (imageData instanceof CanvasRenderingContext2D) return new this(imageData.getImageData(0, 0, 1, 1).data);
        if (imageData instanceof ImageData) {
            if (x < 0 || x >= imageData.width) return this.TRANSPARENT;
            if (y < 0 || y >= imageData.height) return this.TRANSPARENT;
            let i = x + y * imageData.width;
            i *= 4;
            return new this(imageData.data.slice(i,i+4));
        }
    }
    /**
     * Iterates through each pixel in a canvas
     * @param {ImageData} imageData The canvas
     * @param {Function} callback The callback to run the iteration with
     * @returns {ImageData} The modified image data
     */
    static forEachColor(imageData, callback) {
        for (let i=0;i<imageData.data.length;i+=4) {
            let data = callback(new this(imageData.slice(i, i+4)), i/4%imageData.width, Math.floor(i/4/imageData.width), imageData);
            if (data) imageData.data.set(new this(data)._data, i);
        }
        return imageData;
    }
    /**
     * Creates a color from an RGB value
     * @param {Number} red A red value from 0 to 255
     * @param {Number} green A green value from 0 to 255
     * @param {Number} blue A blue value from 0 to 255
     * @returns {Color} A color with the given RGB value
     */
    static fromRgb(red, green, blue) {
        return new this(new Uint8ClampedArray([red,green,blue,255]));
    }
    /**
     * Creates a color from an RGBA value
     * @param {Number} red A red value from 0 to 255
     * @param {Number} green A green value from 0 to 255
     * @param {Number} blue A blue value from 0 to 255
     * @param {Number} alpha The alpha value as a floating point number
     * @returns {Color} A color with the given RGBA value
     */
    static fromRgba(red, green, blue, alpha) {
        return new this(new Uint8ClampedArray([red,green,blue,alpha*255]));
    }
    /**
     * @param {Number} hue The hue in radians
     * @param {Number} saturation The saturation as a floating point number
     * @param {Number} lightness The lightness as a floating point number
     * @returns {Color} A color with the given HSL value
     */
    static fromHsl(hue, saturation, lightness) {
        hue=(hue*3/Math.PI)%6;
        saturation = Math.clamp(saturation,0,1);
        lightness = Math.clamp(lightness,0,1);
        let c = (1-Math.abs(2*lightness-1))*saturation;
        let x = c*(1-Math.abs(hue%2-1));
        let m = lightness-c/2;
        let r,g,b;
        if (hue<1) {r=c;g=x;b=0}
        else if (hue<2) {r=x;g=c;b=0}
        else if (hue<3) {r=0;g=c;b=x}
        else if (hue<4) {r=0;g=x;b=c}
        else if (hue<5) {r=x;g=0;b=c}
        else {r=c;g=0;b=x}
        return new this(new Uint8ClampedArray([(r+m)*255,(g+m)*255,(b+m)*255,255]))
    }
    /**
     * @param {Number} hue The hue in radians
     * @param {Number} saturation The saturation as a floating point number
     * @param {Number} value The color value as a floating point number
     * @returns {Color} A color with the given HSV value
     */
    static fromHsv(hue, saturation, value) {
        hue=(hue*3/Math.PI)%6;
        saturation = Math.clamp(saturation,0,1);
        value = Math.clamp(value,0,1);
        let c = value*saturation;
        let x = c*(1-Math.abs(hue%2-1));
        let m = value-c;
        let r,g,b;
        if (hue<1) {r=c;g=x;b=0}
        else if (hue<2) {r=x;g=c;b=0}
        else if (hue<3) {r=0;g=c;b=x}
        else if (hue<4) {r=0;g=x;b=c}
        else if (hue<5) {r=x;g=0;b=c}
        else {r=c;g=0;b=x}
        return new this(new Uint8ClampedArray([(r+m)*255,(g+m)*255,(b+m)*255,255]))
    }
    _data;
    /**
     * The integer value for the red channel
     * @type {Number}
     */
    get red() {
        return this._data[0];
    }
    /**
     * The integer value for the green channel
     * @type {Number}
     */
    get green() {
        return this._data[1];
    }
    /**
     * The integer value for the blue channel
     * @type {Number}
     */
    get blue() {
        return this._data[2];
    }
    /**
     * The float value for the alpha channel
     * @type {Number}
     */
    get alpha() {
        return this._data[3]/255;
    }
    /**
     * @type {Number}
     */
    set red(value) {
        this._data[0] = value;
    }
    /**
     * @type {Number}
     */
    set green(value) {
        this._data[1] = value;
    }
    /**
     * @type {Number}
     */
    set blue(value) {
        this._data[2] = value;
    }
    /**
     * @type {Number}
     */
    set alpha(value) {
        this._data[3] = value*255;
    }
    /**
     * Converts the color to a HTML hexadecimal value
     * @returns {String}
     */
    toString() {
        if (this._data[3] == 255) {
            return (0x1000000 | this._data[0]<<16 | this._data[1]<<8 | this._data[2]).toString(16).replace(/^1/,"#");
        } else {
            return (0x100000000n | BigInt(this._data[0])<<24n | BigInt(this._data[1])<<16n | BigInt(this._data[2])<<8n | BigInt(this._data[3])).toString(16).replace(/^1/,"#");
        }
    }
    /**
     * Converts the color to a 32-bit integer (big endian)
     * @returns {Number}
     */
    valueOf() {
        return this._data[0]|this._data[1]<<8|this._data[2]<<16|this._data[3]<<24;
    }
    /**
     * Converts the color to a Float32Array
     * @returns {Float32Array}
     */
    toFloat32() {
        return new Float32Array([this._data[0]/255,this._data[1]/255,this._data[2]/255,this._data[3]/255]);
    }
    /**
     * Converts the color to a Float64Array
     * @returns {Float64Array}
     */
    toFloat64() {
        return new Float64Array([this._data[0]/255,this._data[1]/255,this._data[2]/255,this._data[3]/255]);
    }
    /**
     * Calculates the hue
     * @returns {Number} the hue in radians
     */
    getHue() {
        let data = this.toFloat64();
        let M = Math.max(data[0],data[1],data[2]);
        let d = M-Math.min(data[0],data[1],data[2]);
        if (d==0) {
            return 0;
        }
        if (M==data[0]) {
            return ((data[1] - data[2])/d+6)%6*Math.PI/3;
        }
        if (M==data[1]) {
            return ((data[2] - data[0])/d+2)*Math.PI/3;
        }
        return ((data[0] - data[1])/d+4)*Math.PI/3;
    }
    /**
     * Calculates the hue in degrees
     * @returns {Number} the hue in degrees
     */
    getHueInDegrees() {
        let data = this.toFloat64();
        let M = Math.max(data[0],data[1],data[2]);
        let d = M-Math.min(data[0],data[1],data[2]);
        if (d==0) {
            return 0;
        }
        if (M==data[0]) {
            return ((data[1] - data[2])/d+6)%6*60;
        }
        if (M==data[1]) {
            return ((data[2] - data[0])/d+2)*60;
        }
        return ((data[0] - data[1])/d+4)*60;
    }
    /**
     * Calculates the saturation
     * @returns {Number} The saturation value for HSL method
     */
    getSaturation() {
        let data = this.toFloat64();
        let M = Math.max(data[0],data[1],data[2]);
        let m = Math.min(data[0],data[1],data[2]);
        let d = M-m;
        if (d==0) return 0;
        return d/(1-Math.abs((M+m)-1));
    }
    /**
     * Calculates the saturation
     * @returns {Number} The saturation value for the HSV method
     */
    getLightSat() {
        let data = this.toFloat64();
        let M = Math.max(data[0],data[1],data[2]);
        let d = M-Math.min(data[0],data[1],data[2]);
        return M==0 ? 0 : d/M;
    }
    /**
     * Calculates the lightness
     * @returns {Number} The lightness value for the HSL method
     */
    getLightness() {
        let data = this.toFloat64();
        return (Math.max(data[0],data[1],data[2])+Math.min(data[0],data[1],data[2]))/2;
    }
    /**
     * Calculates the lightness value
     * @returns {Number} The value for the HSV method
     */
    getLightValue() {
        let data = this.toFloat64();
        return Math.max(data[0],data[1],data[2]);
    }
    /**
     * Adds a Vec3 value to the color
     * @param {Number|Color} color The value to add
     * @returns {Color} The resulting color
     */
    add(color) {
        let data = new Array(4);
        if (typeof color == "number") {
            for (let i=0;i<3;i++) {
                data[i] = this._data[i]+color*255;
            }
            data[3] = this._data[3];
        } else {
            if (!(color instanceof Color)) color = new Color(color);
            for (let i=0;i<4;i++) {
                data[i] = this._data[i]+color._data[i];
            }
        }
        return new Color(new Uint8ClampedArray(data));
    }
    /**
     * Subtracts a Vec3 value to the color
     * @param {Number|Color} color The value to subtract
     * @returns {Color} The resulting color
     */
    subtract(color) {
        let data = new Array(4);
        if (typeof color == "number") {
            for (let i=0;i<3;i++) {
                data[i] = this._data[i]-color*255;
            }
            data[3] = this._data[3];
        } else {
            if (!(color instanceof Color)) color = new Color(color);
            for (let i=0;i<4;i++) {
                data[i] = this._data[i]-color._data[i];
            }
        }
        return new Color(new Uint8Array(data));
    }
    /**
     * Multiplies the color with the given Vec3 value
     * @param {Number|Color} color The value to multiply
     * @returns {Color} The resulting color
     */
    multiply(color) {
        let data = new Array(4);
        if (typeof color == "number") {
            for (let i=0;i<3;i++) {
                data[i] = this._data[i]*color;
            }
            data[3] = this._data[3];
        } else {
            if (!(color instanceof Color)) color = new Color(color);
            for (let i=0;i<4;i++) {
                data[i] = this._data[i]*color._data[i]/255;
            }
        }
        return new Color(new Uint8Array(data));
    }
    /**
     * Blends the color with another color
     * @param {Color} color The overlaying color
     * @param {Number} blendMode The WebGL blend mode
     * @returns {Color} The resulting color
     */
    blendOver(color, blendMode) {
        if (!(color instanceof Color)) color = new Color(color);
        switch (blendMode) {
            case 1: {
                return this.add(color);
            }
            case 2: {
                return this.subtract(color);
            }
            case 3: {
                return this.multiply(color);
            }
            default: {
                let data = this.toFloat64();
                let data2 = color.toFloat64();
                let a = 1-(1-data[3])*(1-data2[3]);
                const c = data2[3] / a;
                return new Color(new Uint8Array([
                    (data2[0]*c+data[0]*(1-c))*255,
                    (data2[1]*c+data[1]*(1-c))*255,
                    (data2[2]*c+data[2]*(1-c))*255,
                    a
                ]));
            }
        }
    }
    /**
     * Returns the result of a linear color mix
     * @param {Color} color The color to mix
     * @param {Number} t The mixing aspect
     * @returns {Color} The resulting color
     */
    linearTo(color, t) {
        t = Number(t);
        if (t>1) t=1;
        if (t<0) t=0;
        if (!(color instanceof Color)) color = new Color(color);
        let data = new Uint8Array(this._data);
        let data2 = new Uint8Array(color._data);
        if (data[3] == 0) {
            data2[3]*=t;
            return new Color(data2);
        }
        if (data2[3] == 0) {
            data[3]*=1-t;
            return new Color(data);
        }
        for(let i=0;i<4;i++) {
            data[i]+=(data2[i]-data[i])*t;
        }
        return new Color(data);
    }
    /**
     * Inverts the RGB value of the color
     * @returns {Color} The inverted color
     */
    invert() {
        let data = new Uint8Array(4);
        for(let i=0;i<3;i++) {
            data[i] = 255-this._data[i];
        }
        data[3] = this._data[3];
        return new Color(data);
    }
    /**
     * Converts the color to a greyscale value
     * @returns {Color} A greyscaled color
     */
    greyscale() {
        let y = this._data[0]*0.2126 + this._data[1]*0.7152 + this._data[2]+0.0722;
        return new Color(new Uint8Array([y,y,y,this._data[3]]));
    }
    /**
     * Multiplies the opacity of the color
     * @param {Number} opacity The opacity as a floating point number
     * @returns {Color} The resulting color
     */
    withOpacity(opacity) {
        let data = this.toFloat64();
        data[3] *= opacity;
        return new Color(data);
    }
    /**
     * Makes the color completely opaque
     * @returns {Color} The opaque color
     */
    opaque() {
        let color = new Color(this);
        color.alpha = 1.0;
        return color;
    }
    [Symbol.toStringTag] = "Color";
    static TRANSPARENT;
    static BLACK;
    static GRAY;
    static GREY;
    static WHITE;
    static RED;
    static YELLOW;
    static GREEN;
    static AQUA;
    static CYAN;
    static BLUE;
    static MAGENTA;
}
/**
 * Clamps a number to a given range
 * @param {Number} number The initial number
 * @param {Number} min The minimal value
 * @param {Number} max The maximal value
 * @returns {Number} A clamped number
 */
Math.clamp = function(number, min, max) {
    if (min > max || isNaN(number)) return NaN;
    if (number < min) return min;
    if (number > max) return max;
    return number;
}
class _NativeColor extends Color {
    constructor(string) {
        if (_NativeColor._init == null) throw TypeError("Illegal constructor");
        let c = document.createElement("canvas"), ctx = c.getContext("2d");
        c.width = c.height = 1;
        ctx.fillStyle = string;
        ctx.fillRect(0, 0, 1, 1);
        super(ctx.getImageData(0, 0, 1, 1).data);
        this._value = string;
    }
    _value;
    /**
     * Returns the name of the color
     * @returns {String} A color name
     */
    toString() {
        return this._value;
    }
    /**
     * @type {Number}
     */
    get red() {
        return super.red;
    }
    /**
     * @type {Number}
     */
    get green() {
        return super.green;
    }
    /**
     * @type {Number}
     */
    get blue() {
        return super.blue;
    }
    /**
     * @type {Number}
     */
    get alpha() {
        return super.alpha;
    }
    static _init() {
        Color.TRANSPARENT = new _NativeColor("transparent");
        Color.BLACK = new _NativeColor("black");
        Color.WHITE = new _NativeColor("white");
        Color.GRAY = new _NativeColor("gray");
        Color.GREY = new _NativeColor("grey");
        Color.RED = new _NativeColor("red");
        Color.YELLOW = new _NativeColor("yellow");
        Color.GREEN = new _NativeColor("green");
        Color.AQUA = new _NativeColor("aqua");
        Color.CYAN = new _NativeColor("cyan");
        Color.BLUE = new _NativeColor("blue");
        Color.MAGENTA = new _NativeColor("magenta");
    }
}
_NativeColor._init();
_NativeColor._init = null;