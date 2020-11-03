package com.ofss.daytrader.gateway.cache;
import java.util.HashMap;
import java.util.Iterator;

public class CachedObjectBean
{
	 private static CachedObjectBean singletonInstance = null;

	    static HashMap<String, Object> cachedObjects;

	    private CachedObjectBean()
	    {
	        cachedObjects = new HashMap<>();
	    }

	    public static CachedObjectBean getInstance()
	    {
	        singletonInstance = singletonInstance == null ? new CachedObjectBean()
	                : singletonInstance;
	        return singletonInstance;
	    }

	    public void addObjectToCache(String key, Object object)
	    {
	    	System.out.println("key"+key);
	    	System.out.println("object"+object);
	        cachedObjects.put(key, object);
	        System.out.println("cachedObjects"+cachedObjects);
	    }

	    public Object getCacheObject(String title)
	    {
	        return cachedObjects.get(title);
	    }
}
