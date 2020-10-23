package com.ofss.daytrader.gateway.cache;
import java.util.HashMap;
import java.util.Iterator;

public class CachedObjectsClass
{
	 private static CachedObjectsClass singletonInstance = null;

	    static HashMap<String, Object> cachedObjects;

	    private CachedObjectsClass()
	    {
	        cachedObjects = new HashMap<>();
	    }

	    public static CachedObjectsClass getInstance()
	    {
	        singletonInstance = singletonInstance == null ? new CachedObjectsClass()
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

	    public Object checkCacheForObject(String title)
	    {
	        return cachedObjects.get(title);
	    }
}
