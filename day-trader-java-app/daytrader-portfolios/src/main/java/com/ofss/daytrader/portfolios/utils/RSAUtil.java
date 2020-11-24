/**
 * lot of code is taken from http://lifeinide.blogspot.com/2013/10/java-cryptography-architecture-and.html
 * 
 */
package com.ofss.daytrader.portfolios.utils;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

public class RSAUtil {
    private static final String RSA_ALGORITHM = "RSA/ECB/PKCS1Padding";
    private String algorithm = RSA_ALGORITHM;

    // ********************************************************************************
    // ********************************************************************************
    public static KeyPair genKeyPair() throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        SecureRandom random = SecureRandom.getInstance("SHA256withRSA");
        		//SecureRandom.getInstance("SHA1PRNG", "SUN");
        keyGen.initialize(4096, random);
        KeyPair keyPair = keyGen.generateKeyPair();
        return keyPair;
    }

    // ********************************************************************************
    public static void writeKeyPairToFile(KeyPair keyPair) throws Exception {
        PrivateKey priv = keyPair.getPrivate();
        byte[] privArray = priv.getEncoded();
        String privAsc = Utils.encodeBase64(privArray);
        FileUtil.writeToFile("rsaPrivate.asc", privAsc);

        PublicKey pub = keyPair.getPublic();
        byte[] publicArray = pub.getEncoded();
        String publicAsc = Utils.encodeBase64(publicArray);
        FileUtil.writeToFile("rsaPublic.asc", publicAsc);

        System.out.println("privAsc   =" + privAsc);
        System.out.println("publicAsc =" + publicAsc);
    }

    // ********************************************************************************
    /**
     * Encrypts data with key
     */
    public static byte[] rsaEncrypt(Key key, byte[] data) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return cipher.doFinal(data);
        } catch (Exception e) {
            throw new Exception("Error key encrypting", e);
        }
    }

    // ********************************************************************************
    /**
     * Decrypts data with key
     */
    public static byte[] rsaDecrypt(Key key, byte[] data) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);
            return cipher.doFinal(data);
        } catch (Exception e) {
            throw new Exception("Error key decrypting", e);
        }
    }
    // ********************************************************************************
    public static byte[] rsaSignWithPrivateKey(PrivateKey privateKey, byte[] data) throws Exception {
        try {
            Signature sig = Signature.getInstance("SHA1WithRSA");
            sig.initSign(privateKey);
            sig.update(data);
            byte[] signatureBytes = sig.sign();
            return signatureBytes;
        } catch (Exception e) {
            throw new Exception("Error signing message", e);
        }
    }
    // ********************************************************************************
    public static boolean rsaVerifySignWithPublicKey(PublicKey publicKey, byte[] data, byte[] signedDataByteArray) throws Exception {
        try {

            Signature sig2 = Signature.getInstance("SHA1WithRSA");
            sig2.initVerify(publicKey);
            sig2.update(data);
            boolean signatureVerifySuccessFlag = sig2.verify(signedDataByteArray);
            return signatureVerifySuccessFlag ;
        } catch (Exception e) {
            throw new Exception("Error verifying signed message", e);
        }
    }
    // ********************************************************************************
    public static PublicKey convertByteArrayToPublicKey(byte[] byteArray) throws Exception {
        PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(byteArray));
        return publicKey;
    }
    // ********************************************************************************
    public static PrivateKey convertByteArrayToPrivateKey(byte[] byteArray) throws Exception {
        PrivateKey publicKey = KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(byteArray));
        return publicKey;
    }
    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

}
