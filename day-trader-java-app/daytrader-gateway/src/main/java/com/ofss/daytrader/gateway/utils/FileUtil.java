package com.ofss.daytrader.gateway.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;

public class FileUtil {

    // ********************************************************************************
    public static void writeToFile(String fileName, String data) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(new File(fileName));
            fos.write(data.getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Error writing to file :" + fileName, e);
        } finally {
            try {
                fos.close();
            } catch (Exception e) {

            }
        }
    }

    // ********************************************************************************
    public static String readFromFile(String fileName) throws Exception {
        StringBuffer fileData = new StringBuffer();
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        char[] buf = new char[1024];
        int numRead = 0;
        while ((numRead = reader.read(buf)) != -1) {
            String readData = String.valueOf(buf, 0, numRead);
            fileData.append(readData);
        }
        reader.close();
        return fileData.toString();
    }
    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************

    // ********************************************************************************
}
