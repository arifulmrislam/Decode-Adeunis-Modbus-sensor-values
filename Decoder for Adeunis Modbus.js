// Java Script for Modbus to Lorawan converter payload parse
function Decode(fPort, bytes) {
	var decoded = {};
	if (bytes[0] == 0x44) {				//Check first byte if valid payload
// Voltage, Power, Energy and Current from Energy Meter
		decoded.phase_1 = readFloatBE(bytes.slice(2,6));
		decoded.phase_2 = readFloatBE(bytes.slice(6,10));  
		decoded.phase_3 = readFloatBE(bytes.slice(10,14));
		decoded.frequency = readFloatBE(bytes.slice(14,18));
		decoded.energy = readFloatBE(bytes.slice(18,22));
	};
	return decoded;
}

/* ************************ bytes to number **********************************/
    
// JavaScript bitwise operators yield a 32 bits integer, not a float. 
// Assume LSB (least significant byte first). 
    
function readFloatBE(bytes) {
var bits = bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3];
var sign = (bits >>> 31 === 0) ? 1.0 : -1.0;
var e = bits >>> 23 & 0xff;
var m = (e === 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
var f = (sign * m * Math.pow(2, e - 150)).toFixed(1);
return f;
}
