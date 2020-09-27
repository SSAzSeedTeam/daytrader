package com.ofss.daytrader.reports;

import java.util.*;
import java.text.SimpleDateFormat;

public class DayTraderReportGenerator {
  private static String DESTINATION_FOLDER = "D:/TEMP"; //default value
  private static SimpleDateFormat sdf_for_timestamp       = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
  /******************************************************************************************/
  public static void main(String[] args) throws Exception {
    System.out.println("Report Generator invoked : "+new Date());
    String envDestination = System.getProperty("DESTINATION_FOLDER");
    System.out.println("envDestination : "+envDestination );
    if(envDestination != null && !envDestination.trim().contentEquals("")) {
    	DESTINATION_FOLDER = envDestination;
    }
    System.out.println("DESTINATION_FOLDER : "+DESTINATION_FOLDER );
    
    String fileData = "";
    for(int i=1;i<=100;i=i+2) {
    	fileData = fileData +i+","+"STOCK"+i+","+i+",BUY ,"+sdf_for_timestamp.format(new java.util.Date())+"\r\n";
    	fileData = fileData +(i+1)+","+"STOCK"+(i+1)+","+(i+1)+",SELL,"+sdf_for_timestamp.format(new java.util.Date())+"\r\n";
    }
    //System.out.println(fileData);
    String timeStampString = sdf_for_timestamp.format(new java.util.Date());
    FileUtil.writeStringToNewFile(DESTINATION_FOLDER+"/Daytrader_Report_"+timeStampString+".txt" , fileData);
  }
  /******************************************************************************************/
  /******************************************************************************************/
  /******************************************************************************************/
}
