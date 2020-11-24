/**
 * lot of code is taken from http://lifeinide.blogspot.com/2013/10/java-cryptography-architecture-and.html
 * 
 */
package com.ofss.daytrader.auth.util;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class AESUtil {
    private static byte[] SALT = new byte[] { (byte) 0xa1, (byte) 0x22, (byte) 0x33, (byte) 0xa4, (byte) 0x11, (byte) 0x22, (byte) 0x12, (byte) 0x22 };

    // ********************************************************************************
    // ********************************************************************************
    /**
     * Builds a random secret key for symmetric algorithm
     */
    public static Key buildAESKey() throws Exception {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("AES");
            keyGen.init(256, SecureRandom.getInstance("SHA1PRNG"));
            return keyGen.generateKey();
        } catch (Exception e) {
            throw new Exception("Error generating AES secret key", e);
        }
    }

    // ********************************************************************************
    /**
     * Builds a secret key for symmetric algorithm recoverable by password
     */
    public static Key buildAESKeyBasedOnPassword(String password) throws Exception {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            KeySpec spec = new PBEKeySpec(password.toCharArray(), SALT, 256, 256);
            SecretKey tmp = factory.generateSecret(spec);
            return new SecretKeySpec(tmp.getEncoded(), "AES");
        } catch (Exception e) {
            throw new Exception("Error generating AES secret key (using password)", e);
        }
    }

    // ********************************************************************************
    public static byte[] aesEncrypt(Key key, byte[] data) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return cipher.doFinal(data);
        } catch (Exception e) {
            throw new Exception("Error encrypting with AES", e);
        }
    }

    // ********************************************************************************
    public static byte[] aesDecrypt(Key key, byte[] data) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);
            return cipher.doFinal(data);
        } catch (Exception e) {
            throw new Exception("Error decrypting with AES", e);
        }
    }

    // ********************************************************************************
    // ********************************************************************************
    public static void writeKeyToFile(Key key) throws Exception {
        byte[] keyArray = key.getEncoded();
        String keyAsc = Utils.encodeBase64(keyArray);
        FileUtil.writeToFile("aesKey.asc", keyAsc);

        System.out.println("keyAsc   =" + keyAsc);
    }

    // ********************************************************************************
    public static Key convertByteArrayToAESKey(byte[] bytes) throws Exception {
        return new SecretKeySpec(bytes, "AES");
    }
    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

}
