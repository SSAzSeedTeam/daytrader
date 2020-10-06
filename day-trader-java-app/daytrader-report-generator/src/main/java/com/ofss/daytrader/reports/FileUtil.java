package com.ofss.daytrader.reports;

import java.io.*;
import java.util.*;

public class FileUtil {

    //=========================================================================================
    public static List<String> getFileListFromFolder(String sourcePath) {
        return getFileList(sourcePath);
    }
    public static List<String> getFileList(String sourcePath) {
        //System.out.println(sourcePath);
        File dir = new File(sourcePath);
        List<String> fileTree = new ArrayList<String>();
        for (File entry : dir.listFiles()) {
            if (entry.isFile())
                fileTree.add(entry.getAbsolutePath());
            else
                fileTree.addAll(getFileList(entry.getAbsolutePath()));
        }
		Collections.sort(fileTree);
        return fileTree;
    }

    //=========================================================================================
    public static ArrayList<String> readListFromFile(String fileName) throws Exception {
        ArrayList<String> returnArray = new ArrayList<String>();
        BufferedReader input = new BufferedReader(new FileReader(new File(fileName)));
        try {
            String line = null; // not declared within while loop
            while ((line = input.readLine()) != null) {
                returnArray.add(line);
            }
        } finally {
            input.close();
        }
        return returnArray;
    }
    //=========================================================================================
    public static String readFileContentsAsString(String fileName) throws Exception {
        StringBuffer returnStringBuffer = new StringBuffer();
        BufferedReader input = new BufferedReader(new FileReader(new File(fileName)));
        try {
            String line = null; // not declared within while loop
            while ((line = input.readLine()) != null) {
                returnStringBuffer.append(line);
            }
        } finally {
            input.close();
        }
        return returnStringBuffer.toString();
    }
    //=========================================================================================
    public static List<String> readFileContentsAsStringList(String fileName) throws Exception {
        List<String> returnArray = new ArrayList<String>();
        BufferedReader input = new BufferedReader(new FileReader(new File(fileName)));
        try {
            String line = null; // not declared within while loop
            while ((line = input.readLine()) != null) {
                returnArray.add(line);
            }
        } finally {
            input.close();
        }
        return returnArray;
    }
    //=========================================================================================
    public static void writeListToFile(String fileListLocation, List<String> fileList) throws Exception {
        FileOutputStream fos1 = new FileOutputStream(new File(fileListLocation));
        for (int i = 0; i < fileList.size(); i++) {
            fos1.write((fileList.get(i) + System.getProperty("line.separator")).getBytes());
        }
        fos1.close();
    }
    //=========================================================================================
    public static void writeStringToNewFile(String fileListLocation, String str) throws Exception {
        FileOutputStream fos1 = new FileOutputStream(new File(fileListLocation));
        fos1.write((str + System.getProperty("line.separator")).getBytes());
        fos1.close();
    }
    //=========================================================================================
    public static void appendStringToFile(String fileListLocation, String str) throws Exception {
        FileOutputStream fos1 = new FileOutputStream(new File(fileListLocation), true);
        fos1.write((str + System.getProperty("line.separator")).getBytes());
        fos1.close();
        
    }

    //=========================================================================================
    //=========================================================================================
    //=========================================================================================
    //=========================================================================================
    //=========================================================================================
    //=========================================================================================
}
