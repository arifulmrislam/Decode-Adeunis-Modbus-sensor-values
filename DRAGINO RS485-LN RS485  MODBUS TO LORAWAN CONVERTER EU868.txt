//Java Script for Modbus to Lorawan converter payload parse

function Decode(fPort, bytes) {
  var decoded = {};
    
// Voltage, Power, Energy and Current from Energy Meter
decoded.EM1_V1 = readFloatLE(bytes.slice(1,3));
decoded.EM1_V2 = readFloatLE(bytes.slice(3,5));
decoded.EM1_V3 = readFloatLE(bytes.slice(5,7));
decoded.EM1_FR = readFloatLE(bytes.slice(7,9));
decoded.EM1_Power = readFloatLE(bytes.slice(9,11));
decoded.EM1_Energy = readFloatLE(bytes.slice(11,13));
    
decoded.EM2_Power = readFloatLE(bytes.slice(13,15));
decoded.EM2_Energy = readFloatLE(bytes.slice(15,17));
    
decoded.EM3_Power = readFloatLE(bytes.slice(17,19));
decoded.EM3_Energy = readFloatLE(bytes.slice(19,21));
    
decoded.EM4_Power = readFloatLE(bytes.slice(21,23));
decoded.EM4_Energy = readFloatLE(bytes.slice(23,25));
    
decoded.EM5_Power = readFloatLE(bytes.slice(25,27));
decoded.EM5_Energy = readFloatLE(bytes.slice(27,29));
    
    
return decoded;
}
    
    
/* ************************ bytes to number **********************************/
    
// JavaScript bitwise operators yield a 32 bits integer, not a float. 
// Assume LSB (least significant byte first). 
    
function readFloatLE(bytes) {
var bits = bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3];
var sign = (bits >>> 31 === 0) ? 1.0 : -1.0;
var e = bits >>> 23 & 0xff;
var m = (e === 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
var f = (sign * m * Math.pow(2, e - 150)).toFixed(2);
return f;
}