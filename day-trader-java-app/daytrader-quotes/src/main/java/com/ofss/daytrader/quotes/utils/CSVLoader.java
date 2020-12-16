package com.ofss.daytrader.quotes.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CSVLoader {

	public static List<Ticker> tickerFull = null;

    // ********************************************************************************
    public static void loadCsvFile() throws Exception {
    	tickerFull = new ArrayList<Ticker>();
        InputStream is = CSVLoader.class.getClassLoader().getResourceAsStream("NASDAQ.txt");
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            String line = br.readLine();
            while (line != null) {
                String[] attributes = line.split(",");
                Ticker t = new Ticker();
                t.symbol=attributes[0];
                t.companyName=attributes[1];
                tickerFull.add(t);
                line = br.readLine();
            }
        }
    }

    // ********************************************************************************
    public static List<Ticker> getTickerListCopy() throws Exception {
    	if(tickerFull == null) {
    		loadCsvFile();
    	}
    	List<Ticker> copy = new ArrayList<Ticker>();
        copy.addAll(tickerFull);
        return copy;
    }


    // ********************************************************************************

    // ********************************************************************************
}
