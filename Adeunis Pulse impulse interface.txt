// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes) {
	var decoded = {}, low_bat, consum_gaz;
	if (bytes[0] == 0x46) {				// Periodic data frame?
// First test battery status from Status byte[1]. If bit 1 = 1 -> Set Low Battery alarm
		low_bat = Boolean(bytes[1] & 0x02);
		consum_gaz = (bytes[2] << 24 | bytes[3] << 16 | bytes[4] <<8 | bytes[5])*0.01; // 1 imp. = 0.01mc
		decoded.low_bat = low_bat;
		decoded.consum_gaz = consum_gaz.toFixed(2); //afișare cu 3 zecimale
	};
return decoded
}
