package com.ofss.daytrader.reports;

import java.util.*;
import java.text.SimpleDateFormat;

import com.microsoft.azure.storage.*;
import com.microsoft.azure.storage.blob.*;
import java.io.File;

public class DayTraderReportGenerator {
  private static String DESTINATION_FOLDER = "D:/TEMP"; //default value
  private static SimpleDateFormat sdf_for_timestamp       = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
  private static String STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=daytraderreportstorage;AccountKey=zjKo0vAxBc6dR1i835v/W+++im4ALz1xxNNsJsN25L1FMGbQfdZPkFxYnoteqhDLhUPZXhYnUxHpwWWsfDr1+Q==;EndpointSuffix=core.windows.net";
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
