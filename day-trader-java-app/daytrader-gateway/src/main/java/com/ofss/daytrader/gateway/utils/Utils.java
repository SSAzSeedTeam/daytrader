package com.ofss.daytrader.gateway.utils;

import org.apache.commons.codec.binary.Base64;

public class Utils {

    // ********************************************************************************
    // ********************************************************************************
    // ********************************************************************************
    public static String encodeBase64(byte[] data) {
        Base64 b64 = new Base64();
        byte[] b64encoded = (byte[]) b64.encode(data);
        String b64encodedString = new String(b64encoded);
        return b64encodedString;
    }
    // ********************************************************************************
    public static byte[] decodeBase64(String data) {
        try {
            return new Base64().decode(data);
        } catch (Exception e) {
            throw new RuntimeException("Error decoding base64", e);
        }
    }
    // ********************************************************************************

    // ********************************************************************************
    // ********************************************************************************
}
