package com.sina.weibo.security;

import javax.crypto.Cipher;
import java.io.ByteArrayOutputStream;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
//import android.util.Base64;

public class WeicoSecurityUtils {

    private static final String KEY_ALGORITHM = "RSA";
    private static final String KEY_CIPHER_ALGORITHM = "RSA/ECB/PKCS1Padding";

    private static byte[] encryptByPublicKey(byte[] bArr, String str) throws Exception {
        byte[] bArr2;

        PublicKey generatePublic = KeyFactory.getInstance(KEY_ALGORITHM).generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(str.getBytes())));
        Cipher instance = Cipher.getInstance(KEY_CIPHER_ALGORITHM);
        instance.init(1, generatePublic);
        int length = bArr.length;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int i = 0;
        int i2 = 0;
        while (true) {
            int i3 = length - i;
            if (i3 > 0) {
                if (i3 > 117) {
                    bArr2 = instance.doFinal(bArr, i, 117);
                } else {
                    bArr2 = instance.doFinal(bArr, i, i3);
                }
                byteArrayOutputStream.write(bArr2, 0, bArr2.length);
                i2++;
                i = i2 * 117;
            } else {
                byte[] byteArray = byteArrayOutputStream.toByteArray();
                byteArrayOutputStream.close();
                return byteArray;
            }
        }
    }

    public static void test(String a){
        System.out.println("test_" + a);
    }

    public static void main(String[] args) throws Exception{
        String bbb ;
        String str;
        String str2;
        str = "pd201801";
        str2 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC46y69c1rmEk6btBLCPgxJkCxdDcAH9k7kBLffgG1KWqUErjdv+aMkEZmBaprEW846YEwBn60gyBih3KU518fL3F+sv2b6xEeOxgjWO+NPgSWmT3q1up95HmmLHlgVwqTKqRUHd8+Tr43D5h+J8T69etX0YNdT5ACvm+Ar0HdarwIDAQAB";

        System.out.println("Hello");
        WeicoSecurityUtils.test("end");
//        System.out.println(WeicoSecurityUtils.encryptByPublicKey(str.getBytes(), str2));
        bbb =new String(Base64.getEncoder().encode(WeicoSecurityUtils.encryptByPublicKey(str.getBytes(), str2)));
        System.out.println(bbb);
    }
}
