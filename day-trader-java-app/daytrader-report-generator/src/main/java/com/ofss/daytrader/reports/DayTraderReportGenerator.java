package com.ofss.daytrader.reports;

import java.util.*;
import java.text.SimpleDateFormat;

import com.microsoft.azure.storage.*;
import com.microsoft.azure.storage.blob.*;
import java.io.File;

import java.util.Base64;
import java.util.UUID;
import java.io.UnsupportedEncodingException;

public class DayTraderReportGenerator {
  private static String DESTINATION_FOLDER = "D:/TEMP"; //default value
  private static SimpleDateFormat sdf_for_timestamp       = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
  private static String ENCODED = "RGVmYXVsdEVuZHBvaW50c1Byb3RvY29sPWh0dHBzO0FjY291bnROYW1lPWRheXRyYWRlcnJlcG9ydHN0b3JhZ2U7QWNjb3VudEtleT16aktvMHZBeEJjNmRSMWk4MzV2L1crKytpbTRBTHoxeHhOTnNKc04yNUwxRk1HYlFmZFpQa0Z4WW5vdGVxaERMaFVQWlhoWW5VeEhwd1dXc2ZEcjErUT09O0VuZHBvaW50U3VmZml4PWNvcmUud2luZG93cy5uZXQ=";
  private static String STORAGE_CONNECTION_STRING = "";
  private static String STORAGE_CONTAINER_NAME = "daytradercontainer"; 
  /******************************************************************************************/
  public static void main(String[] args) throws Exception {
    System.out.println("Report Generator invoked : "+new Date());
    String envDestination = System.getProperty("DESTINATION_FOLDER");
    System.out.println("envDestination : "+envDestination );
    if(envDestination != null && !envDestination.trim().contentEquals("")) {
    	DESTINATION_FOLDER = envDestination;
    }
    System.out.println("DESTINATION_FOLDER : "+DESTINATION_FOLDER );
    
    String envStorageConnectionString = System.getProperty("STORAGE_CONNECTION_STRING");
    if(envStorageConnectionString != null && !envStorageConnectionString.trim().contentEquals("")) {
    	STORAGE_CONNECTION_STRING = envStorageConnectionString;
    }

    String envStorageContainerName = System.getProperty("STORAGE_CONTAINER_NAME");
    if(envStorageContainerName != null && !envStorageContainerName.trim().contentEquals("")) {
    	STORAGE_CONTAINER_NAME = envStorageContainerName;
    }

    CloudStorageAccount storageAccount;
    CloudBlobClient blobClient = null;
    CloudBlobContainer container=null;



    String fileData = "";
    for(int i=1;i<=100;i=i+2) {
    	fileData = fileData +i+","+"STOCK"+i+","+i+",BUY ,"+sdf_for_timestamp.format(new java.util.Date())+"\r\n";
    	fileData = fileData +(i+1)+","+"STOCK"+(i+1)+","+(i+1)+",SELL,"+sdf_for_timestamp.format(new java.util.Date())+"\r\n";
    }
    //System.out.println(fileData);
    String timeStampString = sdf_for_timestamp.format(new java.util.Date());
    String localFileName = DESTINATION_FOLDER+"/Daytrader_Report_"+timeStampString+".txt";
    FileUtil.writeStringToNewFile( localFileName , fileData);
    
    

    byte[] base64decodedBytes = Base64.getDecoder().decode(ENCODED);
    STORAGE_CONNECTION_STRING = new String(base64decodedBytes, "utf-8");

	// Parse the connection string and create a blob client to interact with Blob storage
	storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);
	blobClient = storageAccount.createCloudBlobClient();
	container = blobClient.getContainerReference(STORAGE_CONTAINER_NAME);

	// Create the container if it does not exist with public access.
	System.out.println("Creating container: " + container.getName());
	container.createIfNotExists(BlobContainerPublicAccessType.CONTAINER, new BlobRequestOptions(), new OperationContext());		    

	File localFile = new File(localFileName);
	//Getting a blob reference
	CloudBlockBlob blob = container.getBlockBlobReference(localFile.getName());

	//Creating blob and uploading file to it
	System.out.println("Uploading the report file ");
	blob.uploadFromFile(localFile.getAbsolutePath());
	System.out.println("Uploading complete!!!");

	
  }
  /******************************************************************************************/
  /******************************************************************************************/
  /******************************************************************************************/
}
