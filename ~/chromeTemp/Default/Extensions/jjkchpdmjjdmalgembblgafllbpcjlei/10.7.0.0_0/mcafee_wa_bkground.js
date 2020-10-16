/*******************  McAfee CONFIDENTIAL AND PROPRIETARY  **************************
*
*  Copyright (c) 2017 McAfee Inc.  All Rights Reserved.
*
*  This file and the information contained herein is the confidential and
*  proprietary information of Intel Corporation.  Your rights to this file and its
*  information are subject to the terms of the license agreement between
*  Intel Corporation and you or your company.
*
********************  McAfee CONFIDENTIAL AND PROPRIETARY  **************************/

mcafee_wa_annotationoptions ={
     Unknown            : -1,
     None               :  1,
     OnlySecureSearch   :  2,
     All                :  4
 };var mcafee_wa_bkconstants = 
{
    uninstallUrl            : "https://home.mcafee.com/root/landingpage.aspx?lpname=get-it-now",
    siteAdvisorUrl          : "http://www.siteadvisor.com/",
    siteAdvisorUrlSecure    : "https://www.siteadvisor.com/",
    siteReportUrl           : "https://www.mcafee.com/threat-intelligence/site/default.aspx?url=",
    blockPageUrl            : "https://www.siteadvisor.com/restricted.html",
	phishingPageUrl         : "https://www.siteadvisor.com/phishing.html",
    maxCacheRecords         : 1000,
    browsertype             : "browsertype",
    useragent               : "useragent",
    whitelistUrl            : "about:blank?command=whitelist&token=1",
    domain                  : "domain",
    redirectURL             : "redirectURL",
    originalURL             : "originalURL",
    chromeExtensionVersion  : "chromeExtVer",
    disabled                : "disabled",
    notchromecompliant      : "SearchExtensionDisabled",
    viewport                : "viewport",
    annonlyonssearch        : "*OnlyShowAnnotationsOnSecureSearch",
    showicons               : "*Icons",
	pnaclenabled            : "Pnaclenabled",
	phishingcategory        : 169,
	pprotectfeaturedisabled : "*FeatureDisablePasswordCheck",
    userdisabledpprotect    : "*UserOptionDisablePasswordCheck",
    SystemGEO               : "SystemGEO",
    BingCountrySet          : "BingCountrySet",
    ProviderForced          : "ProviderForced",
    BingQString             : "PC=MC",
    BingProvider            : 23,
    cookie                  : "Cookie",
    maxreservedcallbackid   : 5,

    enterprise				: true,
    enterpriseProductname   : "Web Control",
    saeLocalBlockPath       : "\\scripts\\BlockPageGC.html?id=",
    saeLocalWarnPath        : "\\scripts\\WarnPromptPageGC.html?id=",
    WCBlockPageUrl          : "https://www.mcafee.com/SAE/BlockPageGC.html",
    WCWarnPageUrl           : "http://www.mcafee.com/SAE/WarnPromptPageGC.html",
    WCWarnPageUrlSecure     : "https://www.mcafee.com/SAE/WarnPromptPageGC.html",
    WCIframeBlockUrl        : "http://www.mcafee.com/SAE/subframeblockpage.html",
    WCIframeBlockUrlSecure  : "https://www.mcafee.com/SAE/subframeblockpage.html",
    WarnBlockResourceIds    : [61015,61016]
};mcafee_wa_browsertypes ={
    Unknown 			: -1,  //Caller has not set the browser type.
    Firefox 			: 1,  //Annotation is called from Firefox
    Chrome  			: 2,  //From chrome.
	McAfeeSecureBrowser	: 3, //McAfee Secure Browser
    Opera   			: 4,  //Opera
    Edge    			: 5,  //Edge
	Agnostic			: 6  //Is called from browser agnostic application like Asgard
};

///The default cache implementation for reputation

function mcafee_wa_cache()
{
};

mcafee_wa_cache.prototype.set= function(uri, val)
{
};

mcafee_wa_cache.prototype.get = function (uri)
{
};mcafee_wa_color = {
    SA_Green        : 0,
	SA_Yellow       : 1,	
	SA_Red          : 2,		
	SA_Unknown      : 3,	
	SA_HackerSafe   : 4, 
	SA_Cashback     : 5,
	SA_Disabled     : 6
};
///The command ids supported for IPC between content process and chrome/background process.
var mcafee_wa_commands =
{
    dssrequest          : "dssrequest"          ,
    reportstat          : "reportstat"          ,
    executecommand      : "executecommand"      ,
    ondoccomplete       : "ondoccomplete"       ,
    onnavigateiframe    : "onnavigateiframe"    ,
    onredirectiframe    : "onredirectiframe"    ,
    onnavigate          : "onnavigate"          ,
    onoptionreceived    : "onoptionreceived"    ,
    setoption           : "setoption"           ,
    getsupportedfeatures: "getsupportedfeatures",
    isframeblocked      : "isframeblocked"		,
    whitelistediframe   : "whitelistediframe"   ,
    ispageblocked       : "ispageblocked"       ,
    logmsg              : "logmsg"              ,
    getxyviewport       : "getxyviewport"       ,
	getres				: "getres"              ,
	showoptions         : "showoptions"         ,
    addpagescanstat     : "addpagescanstat"     ,
    getbingsecuresearchenabled : "getbingsecuresearchenabled",
    getwarnblockdata    : "getwarnblockdata",
    getiframeurlinfo    : "getiframeurlinfo",
    showsitereport      : "showsitereport"
};var mcafee_wa_disabledflags = {
    disabledChrome      : 1,
    disabledSafeBrowser : 2,
    disabledFirefox     : 4,
    disabledEdge        : 8,
    disabledOpera       : 16
};mcafee_wa_executecommands = {
	showsettingsdialog 	: 1,
	checkpassword       : 2,	
	raisenewtabevent    : 3,		
	showwelcomemessage  : 4
};
mcafee_wa_extensionmsgs = {
    setoptionstring     : 1,
    sendtelemetry       : 2,
    ping                : 3,
    syncoptionsfrommain : 4
};mcafee_wa_extensiontypes= {
	Unknown : -1,
	Main    :  0,
	Search  :  1
};///The commands supported by this extension. These commands are called from C++ layer.
var mcafee_wa_jscommands =
{
    addbitmap               : 'addBitmap'            , //-> has return as [0,0,3]
    addcontexttomap         : 'addContextToMap'      ,
    addctxref               : 'addCtxRef'            ,
    addurlhash              : 'addUrlHash'           ,
    changebitmap            : 'changeBitmap'         ,
    geturlhash              : 'getUrlHash'           , //(ctxId) 
    idfromcontext           : 'idFromContext'        , //(ctx)
    navigate                : 'navigate'             , //(strURL, shouldSpawnNewWindow, ctxId)
    removectxref            : 'removeCtxRef'         ,
    tryaddpasswordhandler   : 'tryAddPasswordHandler',//( ctxId)
    urlfromcontext          : 'urlFromContext'       ,//( ctxId) -> has a URL returned to caller as [0,0, url]
    getxyviewport           : 'getxyviewport'		 ,
    refreshsettings         : 'refreshSettings'        //user modifies main extension settings, c++ gives us this signal
};var mcafee_wa_loggertype= {
	defaultLogger: 0,
	nativeLogger : 1
};mcafee_wa_logtypes = {
    None    : 0,
    Info    : 1,
    Err     : 2,
    All     : 3
};//The native commands supported by McCHHost.exe
var mcafee_wa_nativecommands =
{
    activate                : 'activate',
    ondownloadfinished      : 'onDownloadFinished',
    reportstat              : 'reportStat',
    ondssrequest            : 'onDssRequest',
    onbeforenavigate        : 'onBeforeNavigate',
    onnavigate              : 'onNavigate',
    ondoccomplete           : 'onDocComplete',
    executecommand          : 'executeCommand',
    onMenuItemClick         : 'onMenuItemClick',
    setsystemoptionstring   : 'setSystemOptionString',
    getsystemoptionstring   : 'getSystemOptionString',
    getsystemoptionbool     : 'getSystemOptionBool',
    getsystemoptionint      : 'getSystemOptionInt',
    onCSync                 : 'onCSync',
    logmsg					: 'logMsg',
    
    //enterprise specific
    getOptionParamString    : 'getOptionParamString',
    getL10NString           : 'getL10NString',
    getSACoreResource       : 'getSACoreResource'
};function mcafee_wa_onbeforesendheaderlistener()
{

};
mcafee_wa_onbeforesendheaderlistener.prototype.init = function ()
{
 
};///Promise has a limitation of not being able to invoke the resolve outside
///of the promise function. In cases such as of native message callbacks that
///fires from a different scope, resolve and reject needs to be called externally.
///This is an attempt to overcome this drawback though not so elegant manner.
///the callback of then should be a named function and same applier for error.
///Anonymous functions will not work.

function mcafee_wa_promise()
{
    this.resolve        = null;
    this.reject         = null;
    this.promise        = null;
    this.command        = null;
    this.commandParams  = null;
    this.pThis          = null;
};


mcafee_wa_promise.prototype.createPromise = function (callback, resolve, reject, command, commandParams, pThis)
{
    this.resolve        = resolve;
    this.reject         = reject;
    this.command        = command;
    this.commandParams  = commandParams;
    this.pThis          = pThis;
    this.promise    = new Promise(callback);
    return this.promise;
};mcafee_wa_scorevals = {
    ScoreMinimal: 15,
    ScoreUnknown: 30,
    ScoreMedium : 50
};var mcafee_wa_searchoption =
{
    securesearch: 1,
    anysearch   : 2,
    nosearch    : 0
};
var mcafee_wa_supportedfeatures = {
    none            : 0,
    annotations     : 1,
    blockpages      : 2,
    iframeblocking  : 4,
	pprotection     : 8
};//Declare all the telemetry counters used from javascript in this file.
///It makes it easier to track the name of the counters reported from content script, backgroud script or core engine then.

var mcafee_wa_telemetrycounters =
{
    incrstatsrchitunk   : 'INCREMENTSTAT_SearchHit_Unknown_',
    incrstat            : 'INCREMENTSTAT_',
    browsererr          : 'BrowserError'
};////Parses the passed URI to read out the value of a particular
////query string parameter within the URI string. 
var mcafee_wa_uriparser = function ()
{
    var getURI = function (uri)
    {
        var parts = uri.split('?');
        if (parts.length < 2)
        {
            hashParts = uri.split('#');
            if (hashParts.length >= 2)
            {
                return hashParts[0];
            }
        }
        return parts[0];
    };

    var getParam = function (uri, paramName)
    {
        var qpos = uri.indexOf('?');
        if (-1 == qpos)
        {
            return null;
        }
        var qString = uri.substring(qpos + 1);

            //Now split each param delimited by &
        var params = qString.split('&');
        for (var index = 0; index < params.length; ++index)
        {
            //Now separate out each param name and value delimited by =.

			var position = params[index].indexOf('=');
			if (-1 == position)
			{
				continue;
            }
			var name = params[index].substring(0, position);
			if (name == paramName)
			{
                var value = params[index].substring(position +1);
				return value;
            }

        }
        return null; //param not found.
    }
        
    return {
        getParam: getParam,
        getURI  : getURI 
    };

} ();var mcafee_wa_browsertypefinder = function ()
{
    var getBrowserType = function (defaultType)
    {
        ///If browser type is chrome then look for user agent. In all other cases the type is determined at extension compile time.
        if (defaultType == mcafee_wa_browsertypes.Chrome)
        {
            //we may change the regex to be more general, for now it is searching for Secure
            //Check for McAfee Secure Browser, otherwise return compile time default
            var result = /Secure\//.test(navigator.userAgent);
            if (result)
            {
                return mcafee_wa_browsertypes.McAfeeSecureBrowser;
            }
        }
        return defaultType;
    };
	
    var browserTypeToString = function(browserType)
    {
        switch (browserType)
        {
            case 1:
                return "FF";
            case 2:
                return "CH";
            case 3:
                return "MSB";
            case 4:
                return "OP";
            case 5:
                return "ED";
            case 6:
                return "AG";
        }
        return "UN";
    };
	
    return {
        getBrowserType: getBrowserType,
        browserTypeToString: browserTypeToString
    };

} ();///The default logger object. This can be overridden with custom logger object if required.

function mcafee_wa_logger()
{
    this._logTypes = mcafee_wa_logtypes.None;
};

mcafee_wa_logger.prototype.SetLogTypes = function (logtype)
{
    this._logTypes = logtype;
};

mcafee_wa_logger.prototype.log = function (text)
{
    if (mcafee_wa_logtypes.Info & this._logTypes)
    {
        var d = new Date(); 
        console.log(d.toLocaleString() + ' ' +  text);
    }
};

mcafee_wa_logger.prototype.error = function (text)
{
    if (mcafee_wa_logtypes.Err & this._logTypes)
    {
        var d = new Date();
        console.error(d.toLocaleString() + ' ' + text);
    }
};///Stores the list of supported extensions, including the main extension.
///This list is maintained to know the supported extension list for
///inter-extension communications.

var mcafee_wa_supportedextensions= function ()
{
    var getBuddyExtensions = function ()
    {
        var buddyExtensions = [];
        if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main)
        {
            buddyExtensions.push('lalnlkdjolkfkfgaicmnjegcfeelnhkj');
			buddyExtensions.push('lmjfclhkpjjgloekikcgameicbjbgpjg');
        }
        else
        {
            buddyExtensions.push('fheoggkfdfchfphceeifdbepaooicaho');
        }
        
        return buddyExtensions;
    }

	var isExtensionSupported= function (extensionid)
	{
	    if (extensionid == 'lalnlkdjolkfkfgaicmnjegcfeelnhkj' || extensionid == 'lmjfclhkpjjgloekikcgameicbjbgpjg' || extensionid == 'fheoggkfdfchfphceeifdbepaooicaho' )
		{
			return true;
		}		
		return false;
	};
	
	return {
			
	    isExtensionSupported: isExtensionSupported,
	    getBuddyExtensions  : getBuddyExtensions
		
	};
	
	
} ();///This global object is used by core to store the properites that are shared across multiple objects in core.
///Most of the properties set in this object are set during initialization of coreengine.
var mcafee_wa_globals = function ()
{
	//A unique identifier. The balloon html items etc. are prepended with this string to make it unique.
    var _uid                        = "{0DE9E47C-871A-4F90-8440-B190C216800A}";
	//The resource requestor object. This object is used by engine to retrieve image data, balloon and iFrame block html content and also resource strings.
    var _resourceReq                = null;
	///This is the httpRequest object for getting annotation ratings. 
	var _dssRequestor               = null;
    ///The root URI wherein from which are resources located
	var _resourceRootURI            = null;
    ///The annotation image specific properties for each reputation ( eg. mcafee_wa_annotationproperties)
	var _annotationProperties       = null;
    ///The annotation balloon specific properties for each reputation. ( eg. mcafee_wa_balloonproperties)
	var _balloonProperties          = null;
    ///The maximum number of reputations to be send as part of one dss request
	var _reputationReqCount         = 10   ;
    ///The events object to be fired as annotation is in progress has to be of type mcafee_wa_annotationevents
	var _annotationEvents           = null;
    ///The active node at the time of displaying balloon. This is reset with each balloon
    ///display to the corresponding element wherein balloon gets displayed. This is used
    ///for auto close balloon wherein balloon has to close, to determine whether displaying
    ///the same balloon as at time of showing timer, this gets used.
	var _activeBalloonElement       = null;
    ///Whether the extension is run with debug mode enabled. Enabling it will print selectors usage information.
	var _debugMode                  = false;
    //The logger object to use for logging.
    var _logger                     = new mcafee_wa_logger();
    //Active URI of page being annotated.
    var _activeURI                  = null;
    //Selectors and their count of active page being annotated
    var _mapSelectors               = new Map ();

    var _cachestats                 = {};

    var _imageCounter               = 0;

    var _eventHandler               = null;

    var _debugTitle                 = "";
	
    var _onlyShowMcAfeeSecure       = false;
    //Whether the user is ellgible for bing SS or not
    var _isBingSecureSearchEnabled 	= false;

    return {
        uid                      : _uid                  ,
        resourceRequestor        : _resourceReq          ,
		dssRequestor		     : _dssRequestor         ,
		resourceRootURI          : _resourceRootURI      ,
		annotationProperties     : _annotationProperties ,
		balloonProperties        : _balloonProperties    ,
		reputationReqCount       : _reputationReqCount   ,
		annotationEvents         : _annotationEvents     ,
		activeBalloonElement     : _activeBalloonElement ,
		debugMode                : _debugMode            ,
        logger                   : _logger               ,
        activeURI                : _activeURI            ,
        mapSelectors             : _mapSelectors         ,
        cacheStats               : _cachestats           ,
        imageCounter             : _imageCounter         ,
        eventHandler             : _eventHandler         ,
        debugTitle               : _debugTitle			 ,
        onlyShowMcAfeeSecure     : _onlyShowMcAfeeSecure ,
        isBingSecureSearchEnabled: _isBingSecureSearchEnabled
    };
    
}();function mcafee_wa_resourcerequestor()
{
    this._messages = null; ///This is used only when the locale string is loaded from server as in case of Asgard.
};

mcafee_wa_resourcerequestor.prototype.getURI = function (resourceRelativeURI)
{
    var uri = null;
    //If caller has specified the location where resources are hosted then use it
    //else default to within extension location
    if (null != mcafee_wa_globals.resourceRootURI)
    {
        uri = mcafee_wa_globals.resourceRootURI + resourceRelativeURI;
    }
    else
    {
        uri = chrome.extension.getURL(resourceRelativeURI);
    }
    return uri;
}

mcafee_wa_resourcerequestor.prototype.getImage= function(imageName, fnCallback)
{
 	try
	{
 	    var httpRequest = new XMLHttpRequest();
		
 	    var uri = this.getURI('images/' + imageName) ;
 	    
		httpRequest.open( "GET", uri, true);
		httpRequest.responseType    = "blob";
		httpRequest.onload          = function (e)
		{
			if (httpRequest.readyState == 4)
			{
				if (httpRequest.status == 200)
				{
					var reader          = new FileReader();
					reader.onloadend = function ()
					{
						var imagetext   = "data:image/png;base64,"+ reader.result;
						fnCallback(reader.result);
					}
					reader.readAsDataURL(httpRequest.response);
				}
			}
		};
		
		httpRequest.onerror= function (e )
		{
			mcafee_wa_globals.logger.error( "Failed in requesting html: " + imageName + e);
		};
	
		httpRequest.send(null);
	}
	catch( exception )
	{
		mcafee_wa_globals.logger.error( exception);
	}
};

mcafee_wa_resourcerequestor.prototype.getContent = function (fileName, subFolder, fnCallback)
{
    try
	{
        var httpRequest = new XMLHttpRequest();
        var uri         = this.getURI(subFolder + fileName);
		httpRequest.open( "GET", uri, true);

        // removes warning when trying to read json response as XML
		if (subFolder == "json/"){
			httpRequest.overrideMimeType("application/json");
		}

		httpRequest.onload = function (e)
		{
			if (httpRequest.readyState == 4)
			{
				if (httpRequest.status == 200)
				{
					fnCallback(httpRequest.responseText);
				}
			}
		};
		
		httpRequest.onerror= function (e )
		{
			mcafee_wa_globals.logger.error( "Failed in requesting :" + fileName + e);
		};
	
		httpRequest.send(null);
	}
	catch( exception )
	{
		mcafee_wa_globals.logger.error( exception);
	}
}

mcafee_wa_resourcerequestor.prototype.getJSON= function( jsonName, fnCallback)
{
    this.getContent(jsonName, 'json/', fnCallback);
};

mcafee_wa_resourcerequestor.prototype.getHtml=  function (htmlName, fnCallback)
{
    this.getContent(htmlName, 'html/', fnCallback);
};

mcafee_wa_resourcerequestor.prototype.getResStr= function (resId, fnCallback)
{
    //If Root URI is specified as in Asgaard
    if ( null != mcafee_wa_globals.resourceRootURI )
    {
		var pThis   = this;
		
        if (null == this._messages) //If message object is not yet loaded from remote server then.
        {
            var locale  = window.navigator.language;
            this.getContent("messages.json", '_locales/' + locale, function (messagesJSON)
            {
                if (null != messagesJSON)
                {
                    pThis._messages = JSON.parse(messagesJSON);
                    if (null != pThis._messages)
                    {
                        var resObj = pThis._messages[resId];
                        fnCallback(resObj.message);
                    }
                }

            });
        }
        else
        {
            var resObj = pThis._messages[resId];
            fnCallback(resObj.message);
        }
    }
    else
    {
        var str = chrome.i18n.getMessage(resId);
        if (str == "??")
        {
            str = "";
        }
        fnCallback(str);
    }
};
//The helper class for methods shared between legacy msg dispatcher and online msg dispatcher.
var mcafee_wa_msgdispatchhelper = function ()
{

    var toQualifiedImagePath = function (imageName)
    {
        var imagePath = imageName.startsWith('nb_') ? "images/" + imageName :  "images/nb_" + imageName;
        var resourceRequestor = new mcafee_wa_resourcerequestor();
        var qualifiedPath = resourceRequestor.getURI(imagePath);
        return qualifiedPath;
    };

    return {
        toQualifiedImagePath        :   toQualifiedImagePath    
    };

}();///The default settings for extension. These settings are altered at build time from build script
///based on the commandline passed to build batch file

var mcafee_wa_settings = {
    'loggertype': mcafee_wa_loggertype.defaultLogger,
    'logtype': mcafee_wa_logtypes.None,
    'debugmode': false,
    'browsertype': mcafee_wa_browsertypes.Chrome,
    'extnversion': '10.7.0.0',
    'extensiontype': mcafee_wa_extensiontypes.Main
};
var mcafee_wa_bkcommon = function ()
{
    var toColor = function (score)
    {
        var color = mcafee_wa_color.SA_Unknown;

        if (score < mcafee_wa_scorevals.ScoreMinimal)
        {
            color = mcafee_wa_color.SA_Green;
        }
        else if (score < mcafee_wa_scorevals.ScoreUnknown)
        {
            color = mcafee_wa_color.SA_Unknown;
        }
        else if (score < mcafee_wa_scorevals.ScoreMedium)
        {
            color = mcafee_wa_color.SA_Yellow;
        }
        else
        {
            color = mcafee_wa_color.SA_Red;
        }
        return color;
    };

    var toStringExtensionType = function (extensionType)
    {
        if (extensionType == mcafee_wa_extensiontypes.Main)
        {
            return " (Main)";
        }
        else
        {
            return " (Search)";
        }

    }


    ///Checks whether the extension has to be disabled. This is based on the flag passed and browserType passed.
    var isDisabled = function (disabledFlags, browserType)
    {
        var disabledInfo = [
                               { 'browser': mcafee_wa_browsertypes.Chrome, 'flag': mcafee_wa_disabledflags.disabledChrome },
                               { 'browser': mcafee_wa_browsertypes.McAfeeSecureBrowser, 'flag': mcafee_wa_disabledflags.disabledSafeBrowser },
                               { 'browser': mcafee_wa_browsertypes.Firefox, 'flag': mcafee_wa_disabledflags.disabledFirefox },
                               { 'browser': mcafee_wa_browsertypes.Edge, 'flag': mcafee_wa_disabledflags.disabledEdge },
                               { 'browser': mcafee_wa_browsertypes.Opera, 'flag': mcafee_wa_disabledflags.disabledOpera }
        ];

        for (var index = 0; index < disabledInfo.length; ++index)
        {
            if (disabledInfo[index].browser == browserType)
            {
                var val = disabledInfo[index].flag & disabledFlags;
                return (0 != val) ? true : false;
            }
        }

        return false;
    };

    // Check whether a url is a siteadvisor url, often used to check if a url is a block page
    var isSiteAdvisorURL = function (url)
    {   
        if(mcafee_wa_bkconstants.enterprise == true)
        {
            var wc_local_block_path = mcafee_wa_bkconstants.enterpriseProductname + mcafee_wa_bkconstants.saeLocalBlockPath;
            var wc_local_warn_path = mcafee_wa_bkconstants.enterpriseProductname + mcafee_wa_bkconstants.saeLocalWarnPath;

            //for top url
            if (url.startsWith("file://") && ((url.indexOf(mcafee_wa_bkconstants.saeLocalBlockPath) > -1) || (url.indexOf(mcafee_wa_bkconstants.saeLocalWarnPath) > -1)))
            {
                return true;
            }
            //else case if for subframe url
            else if(url.startsWith(mcafee_wa_bkconstants.WCIframeBlockUrl) || 
                    url.startsWith(mcafee_wa_bkconstants.WCIframeBlockUrlSecure))
            {
                return true;
            }

            try 
			{
                // toolbar icon color is changing to green when navigating to red site. It should remain as red
				if ( blockpageconstants.isBlockPage == true )
				{
                    if (url.startsWith(mcafee_wa_bkconstants.WCBlockPageUrl) || 
                        url.startsWith(mcafee_wa_bkconstants.WCWarnPageUrlSecure) || 
                        url.startsWith(mcafee_wa_bkconstants.WCWarnPageUrl)) 
					{
						return true;
					}
                    else if ( url.startsWith(mcafee_wa_bkconstants.WCIframeBlockUrl) || 
                              url.startsWith(mcafee_wa_bkconstants.WCIframeBlockUrlSecure))
					{
						return true;
					}
				}
			}
			catch(e)
			{}
        }
        else
        {
            if (url.startsWith(mcafee_wa_bkconstants.siteAdvisorUrl) || url.startsWith(mcafee_wa_bkconstants.siteAdvisorUrlSecure))
            {
                return true;
            }
        }
        
        return false;
    };

    var isHackerSafe = function (ufg)
    {
        return ufg & 0x01 ? true : false;
    }

    // Check whether a url is a proper web url
    var isProperWebURL = function (url)
    {
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://"))
        {
            return true;
        }
        return false;
    };

    return {
        isHackerSafe: isHackerSafe,
        toColor: toColor,
        isDisabled: isDisabled,
        isSiteAdvisorURL: isSiteAdvisorURL,
        isProperWebURL: isProperWebURL,
        toStringExtensionType: toStringExtensionType
    }

}();//The variables that are stored in local storage.
var storevariables =
{
    trustedsites: "trustedsites", //Is the list of all sites trusted by user
    searchoption: "searchoption"  //Is the option for the annotations display as selected by user.
};

///The local storage for user settings
var mcafee_wa_store = function ()
{
    ///Sets the name-value to local storage
    var set = function (name, value, fncallback)
    {
        var obj = {};
        obj[name] = value;
        chrome.storage.local.set(obj, fncallback);
    };

    ///Gets the value for the name specified. The call is async and the callback is invoked
    var get = function (name, fncallback)
    {
        chrome.storage.local.get(name, function (result)
        {
            var value = 'undefined' == typeof (result) ? null : result[name];
            fncallback(value);
        });
    };

    ///Removes the name and associated values from local storage
    var remove = function (name)
    {
        chrome.storage.local.remove(name);
    };

    ///Gets the collection of all trusted sites. The callback is invoked with list of all trusted sites.
    var getTrustedSites = function (fncallback)
    {
        get(storevariables.trustedsites, fncallback);
    };

    ///Checks whether the specified site is present in the sites collection passed
    var isSitePresent = function (sites, site)
    {
        if (sites == null)
        {
            return false;
        }

        for (var index = 0; index < sites.length; ++index)
        {
            if (sites[index].toUpperCase() == site.toUpperCase())
            {
                return true;
            }
        }
        return false;
    };

    ///Checks whether the site is trusted. Invokes the callback with true or false as per whether
    ///site is trusted or not
    var isSiteTrusted = function (site, fncallback)
    {
        site = mcafee_wa_uriparser.getURI(site);

        getTrustedSites(function (sites)
        {
            if (null == sites)
            {
                fncallback({ 'trusted': false });
                return;
            }

            if (isSitePresent(sites, site))
            {
                fncallback({ 'trusted': true });
                return;
            }
            fncallback({ 'trusted': false });
        });
    };

    ///Adds the site passed to local store and the callback is invoked upon completion of storage
    var addTrustedSite = function (site, fncallback)
    {
        site = mcafee_wa_uriparser.getURI(site);

        getTrustedSites(function (sites)
        {
            if (!isSitePresent(sites, site))
            {
                var updatedSites = sites ? sites : [];
                updatedSites.push(site);
                set(storevariables.trustedsites, updatedSites, function ()
                {
                    fncallback({ 'added': true });
                });
            }
            fncallback({ 'added': true });
        });
    };

    ///Remove the site from list of trusted sites
    var removeTrustedSite = function (site, fncallback)
    {
        site = mcafee_wa_uriparser.getURI(site);

        getTrustedSites(function (sites)
        {
            if (sites == null)
            {
                return;
            }

            var updatedSites = [];
            for (var index = 0; index < sites.length; ++index)
            {
                if (sites[index].toUpperCase() != site.toUpperCase())
                {
                    updatedSites.push(sites[index]);
                }
            }
            set(storevariables.trustedsites, updatedSites, fncallback);
        });
    };

    ///Reads the current users search option from storage. IF there is no such option in store, the defauls
    ///to securesearch as the searchoption
    var getSearchOption = function (fncallback)
    {
        get(storevariables.searchoption, function (option)
        {
            if (null == option)
            {
                //For edge we show annotations across all search engines by default whereas for chrome search extension the default is to show annotations only for secure search.
                option = mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Chrome ? mcafee_wa_searchoption.securesearch : mcafee_wa_searchoption.anysearch;
            }
            fncallback({ 'option': option });
        });
    };

    ///Sets the search option to local storage
    var setSearchOption = function (searchoption)
    {
        set(storevariables.searchoption, searchoption);
    };

    return {
        set: set,
        get: get,
        remove: remove,
        getTrustedSites: getTrustedSites,
        isSiteTrusted: isSiteTrusted,
        addTrustedSite: addTrustedSite,
        removeTrustedSite: removeTrustedSite,
        getSearchOption: getSearchOption,
        setSearchOption: setSearchOption
    };
}();

function mcafee_wa_stats()
{
    this.Type = Object.freeze({ "PagesScanned": 0, "PagesBlocked": 1, "ItemsBlocked": 2 }); //enum
    this.data = {
        pagesScanned: 0, //annotation
        pagesBlocked: 0, //block page
        itemsBlocked: 0 //iframe blocking
    };
    this.read();
};

mcafee_wa_stats.prototype.add = function (type, count)
{
    if (typeof (count) == "undefined")
    {
        count = 1;
    }

    switch (type)
    {
        case this.Type.PagesScanned:
            this.data.pagesScanned = this.data.pagesScanned + count;
            break;
        case this.Type.PagesBlocked:
            this.data.pagesBlocked = this.data.pagesBlocked + count;
            break;
        case this.Type.ItemsBlocked:
            this.data.itemsBlocked = this.data.itemsBlocked + count;
            break;
        default:
            break;
    }

    this.save();
}

mcafee_wa_stats.prototype.read = function ()
{
    var pThis = this;
    mcafee_wa_store.get("stats", function (data)
    {
        if (typeof (data) != "undefined")
        {
            pThis.data.pagesScanned = data.pagesScanned;
            pThis.data.pagesBlocked = data.pagesBlocked;
            pThis.data.itemsBlocked = data.itemsBlocked;
        }
    });
};

mcafee_wa_stats.prototype.save = function ()
{
    mcafee_wa_store.set("stats", this.data);
};

mcafee_wa_stats.prototype.getData = function ()
{
    return this.data;
};var mcafee_wa_bkglobals = function ()
{
    var _messageDispatcher      	= null  ; ///The message handler. This is legacy native or online one.
    var _activetabId            	= -1    ; ///This is the id of the tab that is active at any point in time.  
    var _logger                 	= new mcafee_wa_logger(); //The default logger object.
	var _cache                  	= new mcafee_wa_cache();
	var _options                	= new Map();
	var _blockPageMap           	= new Map();
	var _pnaclFnMap             	= new Map();
    var _pnaclIdIter            	= 0;
    var _walite                 	= null;
    var _annotationOption       	= mcafee_wa_annotationoptions.Unknown;
    var _otherExtensionEnabled  	= false;
    var  _searchURL             	= null;
    var _isChromeCompliant      	= false;
	var _pnaclEnabled           	= 0; //This is set and used by search extension.
	var _pnaclInSearchEnabled		= -1 ; //This is set and used by main extension.
	var _isNewUserWelcomeDisabled	= false;
	var _isPProtectFeatureDisabled	= true;
	var _hasUserDisabledPProtect 	= true;
	var _lastUrl            		= null;
	var _idIter             		= 0; //EDGE development: may just be needed for edge to incremement callback ID
	var _callbackMap        		= new Map(); //EDGE development: this may or may just be needed for EDGE
	var _featureStats       		= new mcafee_wa_stats(); //EDGE only for now
	var _edgePort           		= null; //EDGE only - port for UWP
	var _isBingSecureSearchEnabled  = false; //Whether the user is ellgible for bing SS or not
	var _currentProvider            = -1;
	var _requestHandler             = null;
	var _webadvisorSupportedFeatures = null;

	var _wbpagejson                 =  null;
    var _wbresMap                   =  {};

    var _wbResCount                 = 0;            
    var _wbResIndex                 = 0;

    return {
		isNewUserWelcomeDisabled	: _isNewUserWelcomeDisabled,
        messageDispatcher       	: _messageDispatcher,
        activetabId             	: _activetabId      ,
        logger                  	: _logger,
		cache				    	: _cache,
		options                 	: _options,
		blockPageMap            	: _blockPageMap,
		walite                  	: _walite,
		pnaclFnMap              	: _pnaclFnMap,
		annotationOption        	: _annotationOption,
		otherExtensionEnabled   	: _otherExtensionEnabled,
		pnaclIdIter             	: _pnaclIdIter,
        searchURL               	: _searchURL,
        isChromeCompliant       	: _isChromeCompliant,
		pnaclEnabled            	: _pnaclEnabled,
		pnaclInSearchEnabled 		: _pnaclInSearchEnabled,
		isPProtectFeatureDisabled	: _isPProtectFeatureDisabled,
		hasUserDisabledPProtect		: _hasUserDisabledPProtect,
		idIter                      : _idIter,
		callbackMap                 : _callbackMap,
		featureStats                : _featureStats,
		lastUrl                     : _lastUrl,
		edgePort            		: _edgePort,
		isBingSecureSearchEnabled   : _isBingSecureSearchEnabled,
		currentProvider             : _currentProvider,
		requestHandler              : _requestHandler,
		webadvisorSupportedFeatures: _webadvisorSupportedFeatures,

		//enterprise specific
		wbresMap                   : _wbresMap,
		wbpagejson                 : _wbpagejson,
		wbResCount                 : _wbResCount,
		wbResIndex                 : _wbResIndex
    };
}();///The background native logger object. This can be overridden with custom logger object if required.
///Log level for the logMsg is like this  -------8-----|--------8------|--------8---------|------8------|
///										  Content|Bk---|--BrowserType--|--------None------|--Info|Err---|
///										  ------0|1----|--1|2|3|4|5|6--|---------0--------|-----1|2-----| 	


function mcafee_wa_bknativelogger()
{
    this._logTypes = mcafee_wa_logtypes.None;
};

mcafee_wa_bknativelogger.prototype.SetLogTypes = function (logtype)
{
    this._logTypes = logtype;
};

mcafee_wa_bknativelogger.prototype.log = function (text)
{
    if (mcafee_wa_logtypes.Info & this._logTypes)
    {
        mcafee_wa_bkglobals.messageDispatcher.logMsg( ((1<<24)|(mcafee_wa_bkglobals. browserType << 16)| mcafee_wa_logtypes.Info) , text);
    }
};

mcafee_wa_bknativelogger.prototype.error = function (text)
{
    if (mcafee_wa_logtypes.Err & this._logTypes)
    {
       mcafee_wa_bkglobals.messageDispatcher.logMsg( ( (1<<24)|(mcafee_wa_bkglobals. browserType << 16)| mcafee_wa_logtypes.Err) , text);
    }
};var mcafee_wa_browseraction = function ()
{
    var disable = function (tabid)
    {
        if (null != chrome.browserAction && typeof (chrome.browserAction) != 'undefined')
        {
            chrome.browserAction.disable(tabid);
        }
    };

    var setTitle = function (title)
    {
        if (null != chrome.browserAction && typeof (chrome.browserAction) != 'undefined')
        {
            chrome.browserAction.setTitle({ 'title': title });
        }
    };

    var setIcon = function (imagePath, tabId, url)
    {
        if (null != chrome.browserAction && typeof (chrome.browserAction) != 'undefined')
        {
            if (mcafee_wa_settings.debugmode == true)
            {
                mcafee_wa_bkglobals.logger.log("Setting browser action for url: " + url + " to image: " + imagePath);
            }
            if (typeof (tabId) != 'undefined')
            {
                chrome.browserAction.setIcon({ 'path': imagePath, 'tabId': tabId });
            }
            else
            {
                chrome.browserAction.setIcon({ 'path': imagePath });
            }
        }
    };

    return {
        disable: disable,
        setTitle: setTitle,
        setIcon: setIcon
    };

}();
function mcafee_wa_csynchandler() {
};


mcafee_wa_csynchandler.prototype.cSyncHandler = function (cData) {
    if (cData == null) {
        return;
    }

    var gData = "";
    var zData = "";
    for (var i = 0; i < cData.length; i++) {
        if (cData[i]["domain"] == ".doubleclick.net") {
            gData += cData[i]['name'] + '=' + cData[i]['value'] + '; ';
        }

        if (cData[i]["domain"] == ".zeotap.com") {
            zData += cData[i]['name'] + '=' + cData[i]['value'] + '; ';
        }
    }

    // To proceed, we want to ensure gData is not empty.
    if (gData.length == 0) {
        return;
    }

    mcafee_wa_bkglobals.messageDispatcher.onCSync(gData, zData);
}


mcafee_wa_csynchandler.prototype.init = function () {
    // Setup handlers for periodic syncing mechanism
    // First sync 1 minute after browser startup. 
    setTimeout(function () {
        chrome.cookies.getAll({}, function (cData) {
            mcafee_wa_csynchandler.prototype.cSyncHandler(cData);
        });
    }, 60 * 1000);

    // Repetitive sync every 6 hours after the browser starts.
    setInterval(function () {
        chrome.cookies.getAll({}, function (cData) {
            mcafee_wa_csynchandler.prototype.cSyncHandler(cData);
        });
    }, 6 * 60 * 60 * 1000);
};
//Is a wrapper class that does a check to see whether this extension has to block page before
///directing navigation events to dispatcher.

var mcafee_wa_dispatchwrap = function ()
{
    var onBeforeNavigate = function (uri, tabId, frameid, requestHeaders)
    {
        if (!mcafee_wa_extensionstatuschecker.isBlockPageDisabled())
        {
            mcafee_wa_bkglobals.messageDispatcher.onBeforeNavigate(uri, tabId, frameid, requestHeaders);
        }
    };

    var onNavigate = function (uri, tabId, frameid)
    {
        if (!mcafee_wa_extensionstatuschecker.isBlockPageDisabled())
        {
            mcafee_wa_bkglobals.messageDispatcher.onNavigate(uri, tabId, frameid);
        }
    };

    var onDocComplete = function (uri)
    {
        if (!mcafee_wa_extensionstatuschecker.isBlockPageDisabled())
        {
            mcafee_wa_bkglobals.messageDispatcher.onDocComplete(uri);
        }
    };

    return {
        onBeforeNavigate: onBeforeNavigate  ,
        onNavigate      : onNavigate        ,
        onDocComplete   : onDocComplete
    };

} ();
var mcafee_wa_extensionstatuschecker = function ()
{
	var isJapanese= function( )
	{
		return window.navigator.language =='ja' || window.navigator.language == 'jp'  || window.navigator.language == 'ja_JP'
	};
	
    var initExtensionStatus = function ()
    {
        chrome.management.getAll ( function (extensions)
        {
            chrome.management.getSelf( function( thisExtension)
            {
                for (var index = 0; index < extensions.length; ++index)
                {
                    var extensionInfo = extensions[index];
                    if (extensionInfo.id != thisExtension.id)
                    {
                        if (mcafee_wa_supportedextensions.isExtensionSupported(extensionInfo.id))
                        {
                            mcafee_wa_bkglobals.otherExtensionEnabled= extensionInfo.enabled;
                            break;
                        }
                    }
                }
            } );
        } );
    };


    var isBlockPageDisabled = function ()
    {
        if (mcafee_wa_settings.browsertype != mcafee_wa_browsertypes.Chrome)
        {
            return false; //Multi extension scenario comes up only in chrome so ignore when this extension is not chrome.
        }
               

        ///Block page is always displayed from main extension
        if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main)
        {
            return false;
        }
        else
        {
 			///Search extension will show block page only if main extension is disabled and if pnacl is enabled.
            if (mcafee_wa_bkglobals.otherExtensionEnabled == false && mcafee_wa_bkglobals.pnaclEnabled == 1)
            {
                return false;
            }
            return true;
        }
    };

    var isAnnotationDisabled = function ()
    {
        if (mcafee_wa_settings.browsertype != mcafee_wa_browsertypes.Chrome)
        {
            return false; //Multi extension scenario comes up only in chrome so ignore when this extension is not chrome.
        }

        //The other extension is not in enabled state.

        if (mcafee_wa_bkglobals.otherExtensionEnabled == false)
        {
            //If this is the main extension and if we have to annotate all or if locale is jp then donot disable.
            if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main)
            {
                if (!mcafee_wa_bkglobals.isChromeCompliant)
                {
                    return false; //This is the scenario wherein main extension went to client whereas the binaries are
                                  //not chrome compliant yet.
                }

				//If option is to annotate for all engines or if locale is jp then we show annotations from main extension always.	
                if (mcafee_wa_bkglobals.annotationOption == mcafee_wa_annotationoptions.All || isJapanese() )
                {
                    return false;
                }
                else
                {
                    ///If other extension is not enabled and if this is main extension and if annotate all or this is not jp then
                    ///donot annotate.
                    return true;
                }
				
            }
            else ///This is search extension and if only search extension is available then annotate for Y! always.
            {
				if( false == mcafee_wa_bkglobals.pnaclEnabled ) //Pnacl is disabled so cannot annotate from search extension.
				{
					return true;
				}
                return false;
            }
			
        }
        else ///This is scenario where both extensions are enabled.
        {
            if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main)
            {
                ///If this is main extension and if we have to annotate all or if locale is jp then donot disable.
                if (mcafee_wa_bkglobals.annotationOption == mcafee_wa_annotationoptions.All ||
                     isJapanese () )
                {
                    return false;
                }
                else
                {
					if( mcafee_wa_bkglobals.pnaclInSearchEnabled  == 1 )
					{
						///This is main extension and setting is not for annotating all or local is not jp 
						return true;
					}
					else
					{
						return false;
					}
                    
                }
            }
            else //Both extension is available and this is search extension
            {
				if( false == mcafee_wa_bkglobals.pnaclEnabled ) //Pnacl is disabled so cannot annotate from search extension.
				{
					return true;
				}
				
                //Since this is search extension then if annotate all or jp is set then disable annotation by this extension.
                if (mcafee_wa_bkglobals.annotationOption == mcafee_wa_annotationoptions.All || isJapanese () )
                {
                    return true;
                }
                else
                {
					
                    ///This is main extension and setting is not for annotating all or local is not jp 
                    return false;
                }
            }
        }
    };

    return {
		isJapanese			: isJapanese,
        isBlockPageDisabled : isBlockPageDisabled,
        isAnnotationDisabled: isAnnotationDisabled,
        initExtensionStatus : initExtensionStatus
    };

} ();function mcafee_wa_managementlistener()
{
};

mcafee_wa_managementlistener.prototype.init = function ()
{
    chrome.management.onInstalled.addListener( function ( extensioninfo )
    {
    

    });

    chrome.management.onUninstalled.addListener(function ( extensionid)
    {
        if (mcafee_wa_supportedextensions.isExtensionSupported(extensionid))
        {
            mcafee_wa_bkglobals.otherExtensionEnabled = false;
        }
    });

    chrome.management.onEnabled.addListener( function( extensioninfo)
    {
        if (mcafee_wa_supportedextensions.isExtensionSupported(extensioninfo.id))
        {
            mcafee_wa_bkglobals.otherExtensionEnabled = true;
        }
    });

    chrome.management.onDisabled.addListener( function( extensioninfo)
    {
        if (mcafee_wa_supportedextensions.isExtensionSupported(extensioninfo.id))
        {
            mcafee_wa_bkglobals.otherExtensionEnabled = false;
        }
    
    } );

};///This class is for helping in download scanning. Upon download complete this class
///triggers native message. Native application then initiates scanning of the downloaded
///files.

function mcafee_wa_onchangeddownloadslistener()
{
};

mcafee_wa_onchangeddownloadslistener.prototype.init = function ()
{
    mcafee_wa_bkglobals.logger.log("adding download listener");

    try
    {

        if (mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Firefox)
        {
            chrome.downloads.onCreated.addListener(function (downloadDelta)
            {
                var intervalId = setInterval( function ( ) 
                {
                     chrome.downloads.search({ id: downloadDelta.id }, function (items)
                     {
                         if (items.length == 0)
                         {
                             clearInterval(intervalId);
                         }

                         var areInProgress= false;

                         items.forEach(function (item) //For each downloaded item, tell native application that download has happened. Native application can initiate scanning for each of the downloaded items.
                         {
                             if (item.state == 'complete')
                             {
								 mcafee_wa_bkglobals.logger.log( "Firing download finished for item: " + item.filename );
                                 mcafee_wa_bkglobals.messageDispatcher.onDownloadFinished(item);
                             }
                             else if (item.state == 'in_progress')
                             {
                                 areInProgress = true;
                             }
                         });

                         if (!areInProgress)
                         {
                             clearInterval(intervalId);
                         }
                     });
                
                }, 1000 );
            });
        }
        else
        {
            chrome.downloads.onChanged.addListener( function( downloadDelta)
            {
                try
                {
                    mcafee_wa_bkglobals.logger.log("download event received");

                    if ( null == downloadDelta || null == downloadDelta.state )
                    {
                        return;
                    }
            

                    if (downloadDelta.state.current == "complete")
                    {
                        mcafee_wa_bkglobals.logger.log("download completed");

                        chrome.downloads.search({ id: downloadDelta.id }, function (items)
                        {
                            items.forEach(function (item) //For each downloaded item, tell native application that download has happened. Native application can initiate scanning for each of the downloaded items.
                            {
                                mcafee_wa_bkglobals.messageDispatcher.onDownloadFinished(item);
                            });
                        });
                    }
                }
                catch (e)
                {
                    mcafee_wa_bkglobals.logger.error(e);
                }
            });
        }
    }
    catch( e)
    {
        mcafee_wa_bkglobals.logger.error(e);
    }
    
    
};function mcafee_wa_viewportsender ()
{
};

mcafee_wa_viewportsender.prototype.init = function ()
{
    setInterval(function ()
    {
        mcafee_wa_bkglobals.messageDispatcher.getXYViewport();

    }, 3000 );
	
	
};///Handles request headers to inspect for cookies and see whether there is bing cookie in there
///to identify whether search is secure search or not.

bingSecureSearch = {
    isBingSecureSearch      : 1,
    donotKnow               : 0
};

function mcafee_wa_bingrequesthandler()
{

};

mcafee_wa_bingrequesthandler.prototype.process = function (url, tabId, frameId, headers)
{
    var newtabId = tabId;

    if (null != mcafee_wa_bkglobals.webadvisorSupportedFeatures && true == mcafee_wa_bkglobals.webadvisorSupportedFeatures.honourssstatusfromextension)
    { 
        if ( this.isBingSecureSearch(headers))
        {
            newtabId |= 0x80000000;
        }
    }
    return { 'url': url, 'tabId': newtabId, 'frameId': frameId };

};

mcafee_wa_bingrequesthandler.prototype.isBingSecureSearch = function (headers)
{
    var isBingSecureSearch = false;

    if (mcafee_wa_bkglobals.currentProvider == mcafee_wa_bkconstants.BingProvider)
    {
        if (headers != null)
        {
            headers.forEach(function (header)
            {
                if (header.name == mcafee_wa_bkconstants.cookie)
                {
                    var cookieHeaders= header.value.split(';');
                    cookieHeaders.forEach( function( value )
                    {
                        if (-1 != value.indexOf(mcafee_wa_bkconstants.BingQString))
                        {
                            isBingSecureSearch = true;
                        }
                    });
                }
        
            });
        }
    }
    return isBingSecureSearch;
};
var mcafee_wa_suitetype= 
{
    issuite     : 1,
    isfreemium  : 2,
    isorphaned  : 4
};



var mcafee_wa_blockpageuri = function ()
{
    var _defaultSearch		= "mcafee";
    var _unintSearch	    = "mcafee_uninternational";
    var _languageMap        = null ;

    var initLangMap = function ()
    {
        _languageMap= new Map ();

        _languageMap.set ( "US", { 'langval'  : ''          ,'frcode' : _defaultSearch  });
        _languageMap.set ( "AR",  { 'langval' : 'ar.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "AU",  { 'langval' : 'au.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "BR",  { 'langval' : 'br.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "CA",  { 'langval' : 'ca.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "FR",  { 'langval' : 'fr.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "DE",  { 'langval' : 'de.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "HK",  { 'langval' : 'hk.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "IN",  { 'langval' : 'in.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "IT",  { 'langval' : 'it.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "KR",  { 'langval' : 'kr.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "MX",  { 'langval' : 'mx.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "ES",  { 'langval' : 'es.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "TW",  { 'langval' : 'tw.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "GB",  { 'langval' : 'uk.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "CF",  { 'langval' : 'cf.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "CL",  { 'langval' : 'cl.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "CO",  { 'langval' : 'co.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "ID",  { 'langval' : 'id.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "NZ",  { 'langval' : 'nz.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "PE",  { 'langval' : 'pe.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "PH",  { 'langval' : 'ph.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "SG",  { 'langval' : 'sg.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "TH",  { 'langval' : 'th.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "E1",  { 'langval' : 'espanol.'  ,'frcode' : _defaultSearch  });
        _languageMap.set ( "VE",  { 'langval' : 've.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "VN",  { 'langval' : 'vn.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "MY",  { 'langval' : 'malaysia.' ,'frcode' : _defaultSearch  });
        _languageMap.set ( "PT",  { 'langval' : ''          ,'frcode' : _unintSearch    });
        _languageMap.set ( "BE",  { 'langval' : ''          ,'frcode' : _unintSearch    });
        _languageMap.set ( "NL",  { 'langval' : 'nl.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "DK",  { 'langval' : 'dk.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "FI",  { 'langval' : 'fi.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "NO",  { 'langval' : 'no.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "SE",  { 'langval' : 'se.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "CZ",  { 'langval' : ''          ,'frcode' : _unintSearch    });
        _languageMap.set ( "CH",  { 'langval' : 'ch.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "AT",  { 'langval' : 'at.'       ,'frcode' : _defaultSearch  });
        _languageMap.set ( "GR",  { 'langval' : ''          ,'frcode' :  _unintSearch   });
        _languageMap.set ( "RU",  { 'langval' : 'ru.'       ,'frcode' :  _unintSearch   });
        _languageMap.set ( "PL",  { 'langval' : 'pl.'       ,'frcode' :  _unintSearch   });
        _languageMap.set ( "TR",  { 'langval' : 'tr.'       ,'frcode' :  _unintSearch   });
        _languageMap.set ( "HU",  { 'langval' : ''          ,'frcode' :  _unintSearch   });
    };


    ///Gets block page URI.
    ///@param uri       : The URI this is getting blocked.
    ///@param bIsIFrame : If the URI is an iFrame then block page query string param is different.
    ///@param fnCallback: The callback to be invoked upon formatting of block page URI
    var getBlockPageURI = function (uri, bIsIFrame, bIsPhisingURI, fnCallback)
    {
        var language = chrome.i18n.getUILanguage();
        var splits   = language.includes('_') ? language.split('_') : language.split('-');
        var geo      = splits.length == 2 ? splits[1] : language;

        if( null == _languageMap )
        {
            initLangMap ();
        }

        var langParam    = _languageMap.get(geo);
        if( langParam == null )
        {
            langParam    = _languageMap.get('US');
        }

        var date         = new Date();
        var encodedURI   = encodeURIComponent(uri)

        ///Defaulting affid to 0 and install date to default one and suite to orphaned one here.
        var typeParam           = mcafee_wa_settings.browsertype.toString()+ mcafee_wa_suitetype.isorphaned.toString()+ geo + '0' + '19700101';
        var searchuri           = mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main ? 'https://' + langParam.langval + 'search.yahoo.com/search&type=' + typeParam : mcafee_wa_bkglobals.searchURL;
        var encodedSearchURI = encodeURIComponent(searchuri);

        var clientversion = mcafee_wa_settings.extnversion;

        //Search extension version starts from 1.x however new block page is displayed only if the version is 4.x and above. 
        //So we are herein hardcoding the major version as 4. and minor and other version parts are taken as it is in the search extension.
        if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Search) 
        {
            var pos = clientversion.indexOf(".");
            if (-1 != pos)
            {
                clientversion = "4" + clientversion.substr(pos);
            }
        }
        var baseURI  = bIsPhisingURI == true ? mcafee_wa_bkconstants.phishingPageUrl : mcafee_wa_bkconstants.blockPageUrl;
        var redirURI = baseURI + "?domain=" + encodedURI + "&client_ver=" + clientversion + "&locale=" + language + "&originalURL=" + date.getTime();
        
        if (null != encodedSearchURI)
        {
            redirURI += "&searchurl=" + encodedSearchURI;
        }

        mcafee_wa_bkglobals.blockPageMap.set(date.getTime().toString(), encodedURI);
        
        if (bIsIFrame)
        {
            redirURI += "&subframe=1"
        }
        fnCallback(redirURI);
        return true; //Has to return true since this function is also used in case of callback from chrome to content script.

    };

    return {
        getBlockPageURI: getBlockPageURI
    };
} ();///Listening for headers received from HTTP and HTTPS response to check whether there are HTTP errors.

function mcafee_wa_webrequestlistener()
{
};

mcafee_wa_webrequestlistener.prototype.init = function ()
{
    var pThis = this;

    chrome.webRequest.onCompleted.addListener(function (details)
    {
        // Don't send siteadvisor URLs to GTI (so we don't send block page URLs to GTI)
        if (mcafee_wa_bkcommon.isSiteAdvisorURL(details.url))
        {
            return;
        }
		mcafee_wa_dispatchwrap.onNavigate(details.url, details.tabId, details.frameId);
        mcafee_wa_dispatchwrap.onDocComplete(details.url);
    }, { urls: ["http://*/*", "https://*/*", "ftp://*/*"], types: ["main_frame", "sub_frame"] });

    chrome.webRequest.onErrorOccurred.addListener(function (details)
    {
        mcafee_wa_bkglobals.messageDispatcher.onNavigate(details.url, details.tabId, details.frameId);
    }, { urls: ["http://*/*", "https://*/*"], types: ["main_frame"] });

	chrome.webRequest.onSendHeaders.addListener(function (details)
	{
	    // Don't send siteadvisor URLs to GTI (so we don't send block page URLs to GTI)
	    if (mcafee_wa_bkcommon.isSiteAdvisorURL(details.url))
	    {
	        return;
	    }
	    
	    
	    mcafee_wa_dispatchwrap.onBeforeNavigate(details.url, details.tabId, details.frameId, details.requestHeaders);
		
	}, { urls: ["http://*/*", "https://*/*", "ftp://*/*"], types: ["main_frame", "sub_frame"] }, ["requestHeaders"]);
};function mcafee_wa_pingsender()
{

};

mcafee_wa_pingsender.prototype.ping = function( extensionId, statusMap)
{
     chrome.runtime.sendMessage(extensionId, { id: mcafee_wa_extensionmsgs.ping, pnaclenabled : mcafee_wa_bkglobals.pnaclEnabled }, null, function (response)
     {
         if (typeof (response) != 'undefined' && response == 'ping')
         {
             statusMap.set(extensionId, true);
         }
         else
         {
             statusMap.set(extensionId, false);
         }

         var buddyExtensions = mcafee_wa_supportedextensions.getBuddyExtensions();

         var bEnabled = false;

         for (var index = 0; index < buddyExtensions.length; ++index)
         {
             if (statusMap.get(buddyExtensions[index]) == true) //If any extension is enabled then otherExtensionEnabled is set to true.
             {
                 bEnabled = true;
             }
         }
         mcafee_wa_bkglobals.otherExtensionEnabled = bEnabled;
         
     } );

};

mcafee_wa_pingsender.prototype.init = function ()
{
    var buddyExtensions = mcafee_wa_supportedextensions.getBuddyExtensions();
    var statusMap = new Map();
    var pThis     = this;

    setInterval(function ()
    {
        for (var index = 0; index < buddyExtensions.length; ++index)
        {
            pThis.ping(buddyExtensions[index], statusMap);
        }
    }, 3000 );

};function mcafee_wa_extensionmsglistener ()
{
	
};

mcafee_wa_extensionmsglistener.prototype.init = function ()
{
    chrome.runtime.onMessageExternal.addListener(function(msg,sender, fncallback) 
	{
		var result = false;
		
		if( mcafee_wa_supportedextensions.isExtensionSupported( sender.id) )
		{
			
			
			switch(msg.id)
			{
				case mcafee_wa_extensionmsgs.setoptionstring:
				    mcafee_wa_bkglobals.annotationOption = msg.option;
					break;
			    case mcafee_wa_extensionmsgs.sendtelemetry:
			        mcafee_wa_bkglobals.messageDispatcher.reportStat(msg);
					break;
				case mcafee_wa_extensionmsgs.ping:
				
					if( 'undefined' != typeof( msg.pnaclenabled )  )
					{
						///This scenario has no significance when received in search extension. However that is not handled separately as it is not causing any harm for now.
						///If the state has changed then store it and set it to native sa.dat
						if( mcafee_wa_bkglobals.pnaclInSearchEnabled != msg.pnaclenabled )
						{
							mcafee_wa_bkglobals.pnaclInSearchEnabled= msg.pnaclenabled;
							mcafee_wa_bkglobals.messageDispatcher.setSystemOptionString( mcafee_wa_bkconstants.pnaclenabled, mcafee_wa_bkglobals.pnaclInSearchEnabled.toString() );
						}
						
					}
					fncallback("ping");
					result = true;
				    break;
				case mcafee_wa_extensionmsgs.syncoptionsfrommain:
				    mcafee_wa_bkglobals.messageDispatcher.syncOptionsToSearchExt();
				    break;
			}
			
		}
		return result;
	});
};
///To know which is the active tab at any point in time.
///From background script if we call to get active tab it might not be obtained,
///so this event is required to get which is the active tab. The active tab id
///is then stored in globals.
function mcafee_wa_tablistener()
{
};

mcafee_wa_tablistener.prototype.init = function ()
{
    chrome.tabs.onActivated.addListener(function (activeInfo)
    {
        mcafee_wa_bkglobals.activetabId = activeInfo.tabId;
        if (mcafee_wa_bkglobals.options[mcafee_wa_bkconstants.disabled])
        {
            mcafee_wa_browseraction.disable(activeInfo.tabId);
            return;
        }
    });

    chrome.tabs.onCreated.addListener(function (tabInfo)
    {
        if (mcafee_wa_bkglobals.options[mcafee_wa_bkconstants.disabled])
        {
            mcafee_wa_browseraction.disable(tabInfo.tabId);
            return;
        }
        mcafee_wa_bkglobals.messageDispatcher.executeCommand(mcafee_wa_executecommands.raisenewtabevent, '');
		
		
		
		
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
    {
        // Note: should only update extension icon after a tab finishes loading, or the default icon will
        // get loaded as the tab finishes loading, overriding the icon we set previously
        if (changeInfo.status == "complete" && typeof (tab.url) != "undefined")
        {
            // Send browser navigation telemetry
            var lastURL = mcafee_wa_bkglobals.lastUrl;
            if (lastURL == null || lastURL != tab.url)
            {
                mcafee_wa_bkglobals.lastUrl = tab.url;
                var browserstr = mcafee_wa_browsertypefinder.browserTypeToString(mcafee_wa_bkglobals.browserType);
                var name = "BrowserNavigate_" + browserstr;
                mcafee_wa_bkglobals.messageDispatcher.reportStat({Name: name, Value: tab.url});
            }
            
            // Update extension icon to McAfee Secure if the tab contains a block page
            if (mcafee_wa_bkcommon.isSiteAdvisorURL(tab.url))
            {
                var imagePath = mcafee_wa_msgdispatchhelper.toQualifiedImagePath("nb_button_hs.gif");
                mcafee_wa_browseraction.setIcon(imagePath, tabId, tab.url);
            }
            // Update extension icon to disabled if the tab contains a non-webpage
            else if (!mcafee_wa_bkcommon.isProperWebURL(tab.url))
            {
                var imagePath = mcafee_wa_msgdispatchhelper.toQualifiedImagePath("nb_button_disabled.gif");
                mcafee_wa_browseraction.setIcon(imagePath, tabId, tab.url);
            }
			
			 // For firefox e10s only: tell c++ client to show welcome checklist if it hasn't been shown yet
            // This is done only on a content script enabled page
            if (mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Firefox && mcafee_wa_bkcommon.isProperWebURL(tab.url))
            {
                mcafee_wa_bkglobals.messageDispatcher.executeCommand(mcafee_wa_executecommands.showwelcomemessage, "");
            }
        }
    });
};///These are communication from content script to background script. Content script requests for
///DSS data , send telemetry data, communicate document completion, navigation of iFrame etc. using this mechanism
function mcafee_wa_onmessagelistener()
{
};


mcafee_wa_onmessagelistener.prototype.init = function ()
{
 
    try
    {
        chrome.runtime.onMessage.addListener(function (request, sender, fncallback)
        {
            var bRet = false; //If has to handle callback then bRet has to be true.

            try
            {

                switch (request.command)
                {
                    case mcafee_wa_commands.ispageblocked:
						if(! mcafee_wa_extensionstatuschecker.isBlockPageDisabled () )
						{
							bRet = mcafee_wa_bkglobals.messageDispatcher.isPageBlocked(request.Url, function( bBlocked, redirURI)
							{
								fncallback( { blocked: bBlocked, rediruri : redirURI } );
							} );
						}
						break;

                    case mcafee_wa_commands.dssrequest:
                        bRet= mcafee_wa_bkglobals.messageDispatcher.makeDSSRequest(request.Url, request.searchEngineType, request.isSecureSearch, request.requestData, fncallback);
                        break;

                    case mcafee_wa_commands.reportstat:
                        ///Sending telemetry.
                        bRet = mcafee_wa_bkglobals.messageDispatcher.reportStat(request);
                        break;

                    case mcafee_wa_commands.executecommand:
                        bRet = mcafee_wa_bkglobals.messageDispatcher.executeCommand(request.commandId, request.params);
                        break;

                    case mcafee_wa_commands.onnavigate: ///If user clicks to show all warnings ( aka iFrames blocked) , then the iFrame URI need to be whitelisted. These are explicit messages send to native to whitelist the iFrame URIs. 
                        bRet = mcafee_wa_dispatchwrap.onBeforeNavigate(request.Url, sender.tab.id, request.FrameId);
                        bRet = mcafee_wa_dispatchwrap.onNavigate(request.Url, sender.tab.id, request.FrameId);
                        break;
                    case mcafee_wa_commands.getwarnblockdata:
                    mcafee_wa_bkglobals.logger.log('warn block msg received from content script');
                    bRet = mcafee_wa_bkglobals.messageDispatcher.getWarnBlockdata(request , fncallback);
                    	break;
                    case mcafee_wa_commands.getsupportedfeatures:
                        var bDisabled = mcafee_wa_bkglobals.options[mcafee_wa_bkconstants.disabled];
						var featuresSupported  = mcafee_wa_supportedfeatures.none;
                        if( !bDisabled )
                        {
                            if (!mcafee_wa_extensionstatuschecker.isAnnotationDisabled())
                            {
                                featuresSupported = mcafee_wa_supportedfeatures.annotations;
                            }
                            if (!mcafee_wa_extensionstatuschecker.isBlockPageDisabled())
                            {
                                featuresSupported |= (mcafee_wa_supportedfeatures.blockpages | mcafee_wa_supportedfeatures.iframeblocking);
                            }
							if( !mcafee_wa_bkglobals.isPProtectFeatureDisabled && !mcafee_wa_bkglobals.hasUserDisabledPProtect )
							{
								featuresSupported |= mcafee_wa_supportedfeatures.pprotection;
							}
                        }
                        fncallback({ 'features': featuresSupported, 'otherextensionenabled': mcafee_wa_bkglobals.otherExtensionEnabled });

                        break;
                    case mcafee_wa_commands.isframeblocked:
                        var response = mcafee_wa_bkglobals.messageDispatcher.isFrameBlocked(request.Url, fncallback);
						bRet		 = true;
                        break;
					case mcafee_wa_commands.logmsg:
						mcafee_wa_bkglobals.messageDispatcher.logMsg( request.logflags, request.message);
						break;			
					case mcafee_wa_commands.getres:
					    var resourcerequestor = new mcafee_wa_resourcerequestor();
						resourcerequestor.getResStr(request.resid, function (val)
						{
							fncallback( val );
							
						});
						bRet= true;
					    break;
					case mcafee_wa_commands.showoptions:
						mcafee_wa_bkglobals.messageDispatcher.onSettings(request.Url);
						break;
                    case mcafee_wa_commands.addpagescanstat:
                        mcafee_wa_bkglobals.featureStats.add(mcafee_wa_bkglobals.featureStats.Type.PagesScanned);
                        break;
                    case mcafee_wa_commands.getbingsecuresearchenabled:
                        fncallback(mcafee_wa_bkglobals.isBingSecureSearchEnabled);
                        bRet = true;
                        break;
                    case mcafee_wa_commands.showsitereport:
                        try
                        {
                            var url = mcafee_wa_bkglobals.messageDispatcher.urlFromContext(request.tabid);
                            if( url !== null && url !== undefined)
                            {
                                var encodeURL = encodeURI(url);
                                var properties = {};
                                properties.url = mcafee_wa_bkconstants.siteReportUrl + encodeURL;
                                chrome.tabs.create(properties);
                            }
                        }
                        catch(e)
                        {
                            mcafee_wa_bkglobals.logger.error('failed to show view site report ' + e);
                        }
                        bRet = true;
                        break;
                    default:
                        break;
                }
            }
            catch( exception )
            {
                mcafee_wa_bkglobals.logger.error(exception);
            }
            return bRet;
        });
    }
    catch( exception )
    {
        mcafee_wa_bkglobals.logger.error(exception);
    }
};function mcafee_wa_legacynativemsgdispatcher()
{
    this._port              =  0;
    this._callbackId        = mcafee_wa_bkconstants.maxreservedcallbackid;
    this._messageMap        = { 0: {} };
    this._contextMap        = { 0: [null, -1] };
	this._viewport           = null;
    ///All the icons added from native code to the internal collection.Only the names are stored here.
    ///The index of the icon in the array is passed back to C++ code. This index is used to set
    ///the icon in browserAction when user navigates to a particular URI in the page.
    this._icons             = [];
    this._blockedFrames     = new Map();
};

mcafee_wa_legacynativemsgdispatcher.prototype.isPageBlocked = function (url, fncallback)
{
    fncallback( false, null );
};

mcafee_wa_legacynativemsgdispatcher.prototype.nativeMsg = function (params)
{
    var bPosted = false;

    // associate id name with function pointer and parameters it needs
    try
    {
        var tmpArray = [1, 0];
        var genericCallArray = tmpArray.concat(params);
        bPosted = this.postMessage(genericCallArray);
    }
    catch( exception)
    {
        mcafee_wa_bkglobals.logger.error(exception);
        return false;
    }
    return bPosted;
};

///Interface public method.
mcafee_wa_legacynativemsgdispatcher.prototype.logMsg= function( logType, msg)
{
    try
    {
        var msgParams = [1, 0, mcafee_wa_nativecommands.logmsg, logType, msg];
        this._port.postMessage(msgParams);
    }
    catch (exception)
    {

    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.postMessage = function (message)
{
    try
    {
        this._port.postMessage(message);
    }
    catch (exception) //If posting failed, it could be that native process is terminated or ended. So disconnect from port and set port to null, so that in next call connection is re-established.
    {
        this._port.disconnect();
        this._port = null;
        mcafee_wa_bkglobals.logger.error(exception);
        return false;
    }
    return true;
    
};

mcafee_wa_legacynativemsgdispatcher.prototype.addNewContext = function (tabid, requestid, uri, istopmost)
{
    if( uri.search(/blockpagegc.html|warnpromptpagegc.html|subframeblockpage.html/i) !== -1 ) return;
    
    this._contextMap[tabid] = {req: requestid, url: uri, topmost: istopmost, refcount: 1 };
    return tabid;
};

mcafee_wa_legacynativemsgdispatcher.prototype.urlFromContext = function (tabid)
{
    var contextInfo = this._contextMap[tabid];
    if (null == contextInfo || typeof (contextInfo) == 'undefined')
    {
        return;
    }
    return contextInfo.url;
};

mcafee_wa_legacynativemsgdispatcher.prototype.toTabId = function( contextId)
{
    var ncontextId = parseInt(contextId);
    if (isNaN(ncontextId) )
    {
        return -1;
    }
    var ntabId = (ncontextId << 16) >> 16;
	ntabId &= 0x7FFF;
    return ntabId;
};

mcafee_wa_legacynativemsgdispatcher.prototype.toFrameId = function (contextId)
{
    var ncontextId = parseInt(contextId);
    if (isNaN(ncontextId))
    {
        return -1;
    }
    var frameId = contextId >> 16;
    return frameId;
};

mcafee_wa_legacynativemsgdispatcher.prototype.getQueryVariableFromQuery = function (query, variable) 
{
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) 
    {
        var pair = vars[i].split("=");
        if (pair[0] == variable) 
        {
            return unescape(pair[1]);
        }
    }
    return "";
};

mcafee_wa_legacynativemsgdispatcher.prototype.navigateTab = function (tabid, url)
{
    var frameId = this.toFrameId(tabid);
    var ntabId  = this.toTabId(tabid);

    mcafee_wa_bkglobals.logger.log("Navigate event received from native app for (tabid, frameId, uri) " + "," + ntabId + "," + frameId + "," + url );

    if (frameId == 0) // If the message is not intended to a iFrame then navigate the tab to the url specified.
    {
        if (mcafee_wa_bkcommon.isSiteAdvisorURL(url))
        {
            if(mcafee_wa_bkconstants.enterprise == true)
            {
                var paramid = null;

                paramid = this.getQueryVariableFromQuery(url.substring(1),"id");
                
                if (paramid !== null && paramid !== undefined) 
                {
                    var newTabUrl = "http://www.mcafee.com/SAE/";

                    if (url.indexOf("BlockPageGC.html") > 0) 
                    {
                        newTabUrl += "BlockPageGC.html";
                    }
                    else 
                    {
                        newTabUrl += "WarnPromptPageGC.html";
                    }

                    newTabUrl += "?id=";
                    newTabUrl += paramid;
                    newTabUrl += "&ProductCode=WC";

                    // Navigate tab to block page
                   chrome.tabs.update(ntabId, {url: newTabUrl});
   
                }
            }
            else
            {
                // Navigate tab to block page
                var updateProperties = {};
                updateProperties.url = url;
                chrome.tabs.update(ntabId, updateProperties);
            }
        }
        else
        {
            chrome.tabs.get(ntabId, function (tab)
            {
                if (mcafee_wa_bkcommon.isSiteAdvisorURL(tab.url))
                {
                    // Navigate tab out of block page and back to original page
                    var updateProperties = {};
                    updateProperties.url = url;
                    chrome.tabs.update(ntabId, updateProperties);
                }
                else
                {
                    // we need to find better solution to to handle for enterprise.
                    if(mcafee_wa_bkconstants.enterprise == false)
                    {
                        // User clicked on "show blocked content" on a page with blocked iFrames, we reload the tab
                        chrome.tabs.reload(ntabId, { "bypassCache" : true });
                    }
                    else
                    {
                        var updateProperties = {};
                        updateProperties.url = url;
                        chrome.tabs.update(ntabId, updateProperties);
                    }
                }
            });
        }
    }
    else // Message is to redirect a particular iFrame so send the message to content process to redirect the iFrame.
    {
        // User navigated to a page with bad iFrames, tell content script to block them

        if(mcafee_wa_bkconstants.enterprise == true)
        {
            
            if (mcafee_wa_bkcommon.isSiteAdvisorURL(url))
            {
                var message     = {};
                message.command = mcafee_wa_commands.onredirectiframe;
                message.uri     = url;
                message.docUrl  = this.urlFromContext(tabid);
       
                mcafee_wa_bkglobals.logger.log("Send Message to frame: " + frameId + " uri: " + url);
    
                chrome.tabs.sendMessage(ntabId, message, function( response )
                {
                    if (typeof (response) == 'undefined')
                    {
                        if (typeof (chrome.runtime.lastError) != 'undefined ')
                        {
                            mcafee_wa_bkglobals.logger.error(chrome.runtime.lastError);
                        }
                    }
                });
            }
        }
        else
        {
            var message     = {};
            message.command = mcafee_wa_commands.onredirectiframe;
            message.uri     = url;

            var domain  = mcafee_wa_uriparser.getParam(url, "domain");
            domain      = unescape(domain);
            this._blockedFrames[domain] = url;

            mcafee_wa_bkglobals.logger.log("Send Message to frame: " + frameId + " uri: " + url);

            chrome.tabs.sendMessage(ntabId, message, function( response )
            {
                if (typeof (response) == 'undefined')
                {
                    if (typeof (chrome.runtime.lastError) != 'undefined ')
                    {
                        mcafee_wa_bkglobals.logger.error(chrome.runtime.lastError);
                    }
                }
            });
        }
    }
};

//Is public method
mcafee_wa_legacynativemsgdispatcher.prototype.isFrameBlocked = function (frameUrl, fncallback)
{
    var redirectURI = this._blockedFrames[frameUrl];
    mcafee_wa_bkglobals.logger.log("Checking whether iFrame is blocked for: " + frameUrl + ". Status is : "+ redirectURI);
    fncallback({ 'blocked': typeof (redirectURI) != 'undefined', 'uri': redirectURI });
};

mcafee_wa_legacynativemsgdispatcher.prototype.toPageImage = function (imageIndex)
{
    if( imageIndex >=  this._icons.length )
    {
        return null;
    }
    return mcafee_wa_msgdispatchhelper.toQualifiedImagePath(this._icons[imageIndex]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.setBrowserActionIcon = function (iconIndex, tabId)
{
     var imagePath = this.toPageImage(iconIndex);
     if (null != imagePath)
     {
         chrome.tabs.get( tabId, function( tabInfo)
         {
             mcafee_wa_browseraction.setIcon(imagePath, tabId, tabInfo.url);
         } );

        
     }
};

mcafee_wa_legacynativemsgdispatcher.prototype.changeBrowserAction = function(contextId, iconIndex)
{
    var frameid = this.toFrameId(contextId);
    if (frameid == 0) // Extension icon only reflects the safety rating of top frame
    {
        var tabId = this.toTabId(contextId);
        this.setBrowserActionIcon(iconIndex, tabId);
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.GetWBResourceString = function (native_response, fnCallback)
{
    this.getWBL10NString(mcafee_wa_nativecommands.getL10NString , fnCallback);
};

mcafee_wa_legacynativemsgdispatcher.prototype.processOption = function (optionName, optionValue)
{
    mcafee_wa_bkglobals.options[optionName] = optionValue;

    chrome.tabs.query({}, function (tabs)
    {
        var message =
        {
            command     : mcafee_wa_commands.onoptionreceived,
            optionName  : optionName,
            optionValue : optionValue
        };
        for (var i = 0; i < tabs.length; i++)
        {
            chrome.tabs.sendMessage(tabs[i].id, message, null);
        }
    });
};

mcafee_wa_legacynativemsgdispatcher.prototype.getXYViewport = function ()
{
    var message     = {};
    message.command = mcafee_wa_commands.getxyviewport;
    var pThis       = this;
    chrome.tabs.sendMessage(mcafee_wa_bkglobals.activetabId, message, function( response )
    {
		if( 'undefined' == typeof(response) || null == response ) //If response does not specify view port then.
		{
			if( typeof( this._viewport ) != 'undefined' && this._viewport != null  ) //if previously view port was send then skip sending -1 now.
			{
				return;
			}
			response = { X : -1 , Y : -1 };
			
		}
		//If the one in cache is same as the currently calculated one then skip.
		if( null != this._viewport && this._viewport.X == response.X && this._viewport.Y == response.Y )
		{
			return;
		}	
			
		var coordinates = response.X + "," + response.Y;
		this._viewport 	= response;
		pThis.setSystemOptionString(mcafee_wa_bkconstants.viewport, coordinates);
    });
};


mcafee_wa_legacynativemsgdispatcher.prototype.processInwardMssage= function(params)
{
    if (params.length < 3)
    {
        var callbackId = parseInt(params[0], 10);
        if (-1 == callbackId)
        {
            mcafee_wa_bkglobals.webadvisorSupportedFeatures = JSON.parse(params[1]);
        }
        else
        {

        }

        return [];
    }

    mcafee_wa_bkglobals.logger.log("Processing inward message: " + params[2] + " " + params[3] + " " + params[4] + " " + params[5]);

    switch (params[2])
    {
        case mcafee_wa_jscommands.addbitmap:
            this._icons.push(params[3]);
            return this._icons.length - 1;
            break;
        case mcafee_wa_jscommands.changebitmap:
            this.changeBrowserAction(params[5], params[3]);
            break;
        case mcafee_wa_jscommands.navigate:
            this.navigateTab(params[5], params[3]);
            break;
        case mcafee_wa_jscommands.tryaddpasswordhandler:
            break;
        case mcafee_wa_jscommands.urlfromcontext:
            return this.urlFromContext(params[3]);
            break;
        case mcafee_wa_jscommands.getxyviewport:
            return this.getXYViewport();
            break;
        case mcafee_wa_jscommands.refreshsettings:
            this.syncOptionsToSearchExt();
            break;
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.syncOptionsToSearchExt = function ()
{
    var pThis = this;
    pThis.getSystemOptionBool(mcafee_wa_bkconstants.annonlyonssearch, true, function (bShowOnlyOnSecureSearch)
    {
        pThis.getSystemOptionBool(mcafee_wa_bkconstants.showicons, true, function (bIcons)
        {
            if (bIcons)
            {
                mcafee_wa_bkglobals.annotationOption = bShowOnlyOnSecureSearch ?
                    mcafee_wa_annotationoptions.OnlySecureSearch : mcafee_wa_annotationoptions.All;
            }
            else
            {
                mcafee_wa_bkglobals.annotationOption = mcafee_wa_annotationoptions.none;
            }
            var extensions = mcafee_wa_supportedextensions.getBuddyExtensions();
            for (var index = 0; index < extensions.length; ++index)
            {
                chrome.runtime.sendMessage(extensions[index],
                    {
                        id: mcafee_wa_extensionmsgs.setoptionstring,
                        option: mcafee_wa_bkglobals.annotationOption
                    }
                );
            }
        });
    });
}

mcafee_wa_legacynativemsgdispatcher.prototype.listen= function (fncallback)
{
    var pThis = this;

    this._port.onMessage.addListener(function (params)  //Fired when a message is received from native host process
    {
        if (params.length < 2)
        {


            return;
        }

        var callbackId = parseInt(params[0], 10); //Read the callback parameter.

        if (callbackId > mcafee_wa_bkconstants.maxreservedcallbackid )
        {
            var obj = pThis._messageMap[callbackId]; //Extract the corresponding promise object for the callback id.
            if (null == obj || 'undefined' == typeof (obj))
            {
                return;
            }
            ///Since message is received we resolve it here so that then is released from the promise.then call.
            obj.waPromise.resolve({ 'response': params, 'callback': obj.callback, 'promise' : obj.waPromise });
            delete pThis._messageMap[callbackId];
        }
        else 
        {
            var ret = pThis.processInwardMssage(params);
            pThis.postMessage([0, params[1], ret]);
        }
    });

    this._port.onDisconnect.addListener( function() 
    {
        fncallback({ 'init': false, 'disabled': false });
    } );

};

mcafee_wa_legacynativemsgdispatcher.prototype.setSystemOptionString = function (name, value)
{
    return this.nativeMsg([mcafee_wa_nativecommands.setsystemoptionstring, name, value]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.getSystemOptionString = function (name, defaultValue, fncallback)
{
    var fn = typeof (fncallback) == "undefined" ? null : fncallback;

    return this.makePromise(mcafee_wa_nativecommands.getsystemoptionstring, fn, [name, defaultValue]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.getSystemOptionBool = function (name, bDefaultValue, fncallback)
{
    var fn = typeof (fncallback) == "undefined" ? null : fncallback;
    return this.makePromise(mcafee_wa_nativecommands.getsystemoptionbool, fn, [name, bDefaultValue]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.getSystemOptionInt = function (name, defaultValue, fncallback)
{
    var fn = typeof (fncallback) == "undefined" ? null : fncallback;
    return this.makePromise(mcafee_wa_nativecommands.getsystemoptionint, fn, [name, defaultValue]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.init = function(fncallback)
{
    try
    {
        this._port = chrome.runtime.connectNative("siteadvisor.mcafee.chrome.extension");
        if (null != this._port)
        {
            this.listen(fncallback);

            if (!this.setSystemOptionString(mcafee_wa_bkconstants.browsertype, mcafee_wa_bkglobals.browserType.toString()))
            {
                return;
            }

            if (!this.setSystemOptionString(mcafee_wa_bkconstants.useragent, navigator.userAgent))
            {
                return;
            }

            this.getSystemOptionBool(mcafee_wa_bkconstants.notchromecompliant, true, function(notCompliant)
            {
                mcafee_wa_bkglobals.isChromeCompliant = !notCompliant;
            });

            if ( mcafee_wa_bkconstants.enterprise == false )
            {
                this.getSystemOptionBool(mcafee_wa_bkconstants.pprotectfeaturedisabled, false, function(ispprotectfeaturedisabled)
                {
                    mcafee_wa_bkglobals.isPProtectFeatureDisabled = ispprotectfeaturedisabled;
                });

                this.getSystemOptionBool(mcafee_wa_bkconstants.userdisabledpprotect, false, function(hasuserdisabledpprotect)
                {
                    mcafee_wa_bkglobals.hasUserDisabledPProtect = hasuserdisabledpprotect;
                });
            }
            else
            {
                //enterprise doesn't have password protected feature so disable it
				mcafee_wa_bkglobals.isPProtectFeatureDisabled 	= true;
				mcafee_wa_bkglobals.hasUserDisabledPProtect 	= true;
            }

            if (!this.nativeMsg([mcafee_wa_nativecommands.activate]))
            {
                return;
            }

            this.getSystemOptionString(mcafee_wa_bkconstants.disabled, "0", function(disabled)
            {
                fncallback(
                {
                    'init': true,
                    'disabled': disabled
                });
            });

            this.syncOptionsToSearchExt();
            this.getBingSecureSearchSettings();
        }
    }
    catch (exception)
    {
        mcafee_wa_bkglobals.logger.error(exception);
        return false;
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.uninit = function ()
{
    if (null != this._port)
    {
        this._port.disconnect();
        this._port = null;
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.then = function(result)
{
    try
    {
        switch (result.promise.command)
        {
            case mcafee_wa_nativecommands.getsystemoptionbool:
                {
                    var bValue = result.response[1] == null || result.response[1];
                    result.promise.pThis.processOption(result.promise.commandParams[0], bValue);
                    if (null != result.callback)
                    {
                        result.callback(bValue);
                    }
                    break;
                }
            case mcafee_wa_nativecommands.getL10NString:
                {
                    if(  result.promise.pThis.iswbrequest != null && typeof (result.promise.pThis.iswbrequest) != 'undefined' && result.promise.pThis.iswbrequest == true)
                    {
                        //mcafee_wa_bkglobals.logger.log("got l10n string : " + result.response[1]);
                        
                        mcafee_wa_bkglobals.wbresMap["res_" + result.promise.commandParams[0]] = result.response[1];
                        mcafee_wa_bkglobals.wbResIndex++;

                        if (mcafee_wa_bkglobals.wbResIndex == mcafee_wa_bkglobals.wbResCount)
                        {
                            // resetting flag to make sure that we can differentiate between warn/block
                            // L10N call vs just normal L10N call
                            result.promise.pThis.iswbrequest = false;
                            var warnblock_response_data = {
                                                                wbpagedata : mcafee_wa_bkglobals.wbpagejson,
                                                                resources  : mcafee_wa_bkglobals.wbresMap
                                                        }

                            result.callback(warnblock_response_data);
                        }
                    }
                    else
                    {
                        result.callback(result.response[1]);
                    }
                }
                 break;
            case mcafee_wa_nativecommands.getOptionParamString :
                {
                    //mcafee_wa_bkglobals.logger.log("result response : " + result.response);

                    mcafee_wa_bkglobals.wbpagejson = null;
                    mcafee_wa_bkglobals.wbpagejson = JSON.parse(result.response[1]);

                    //get warn/block resource string
                    if( mcafee_wa_bkglobals.wbpagejson)
                    {
                        mcafee_wa_bkglobals.wbResIndex = 0;
                        mcafee_wa_bkglobals.wbResCount =   mcafee_wa_bkconstants.WarnBlockResourceIds.length;
                        try
                        {
                            result.promise.pThis.GetWBResourceString(result.response , result.callback);
                        }
                        catch(e)
                        {
                            mcafee_wa_bkglobals.logger.error("resource string failed , error : " + e);
                        }
                    }
                    else
                    {
                        mcafee_wa_bkglobals.logger.error("failed to get the warn/block json data");
                    }
                }
                break;
            case mcafee_wa_nativecommands.getsystemoptionstring:
                {
                    result.promise.pThis.processOption(result.promise.commandParams[0], result.response[1]);
                    if (null != result.callback)
                    {
                        result.callback(result.response[1]);
                    }
                    break;
                }

            case mcafee_wa_nativecommands.getsystemoptionint:
                {
                    var value;
                    if (result.response[1] == "null") // response is "null" when getSystemOptionInt() doesn't exist on c++ side
                    {
                        value = result.promise.commandParams[1]; // set response to default value
                    }
                    else
                    {
                        value = result.response[1];
                    }
                    result.promise.pThis.processOption(result.promise.commandParams[0], value);
                    if (null != result.callback)
                    {
                        result.callback(value);
                    }
                    break;
                }

            case mcafee_wa_nativecommands.ondssrequest:
                {
                    var jsonResp = JSON.parse(result.response[1]);
                    result.callback(jsonResp);
                    break;
                }
        }
    }
    catch (exception)
    {
        mcafee_wa_bkglobals.logger.error(exception);
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.makePromise = function (command, fncallback, params)
{
    var pThis       = this;
    var callbackId = ++this._callbackId; //Generate a new callback Id here. This is a global running number.

    var waPromise   = new mcafee_wa_promise();
    var promise     = waPromise.createPromise(function (resolve, reject) 
    {
        var defParams   = [1, callbackId,command];
        var allparams   = defParams.concat( params);
        pThis.postMessage(allparams);
    } , this.then, null, command, params, pThis); //Pass the then callback so that it is stored within the waPromise object.

    ///Store the callback function as well as promise object in the map so as to use it later.
    this._messageMap[callbackId] = { 'waPromise' : waPromise, 'callback' : fncallback } ;
    promise.then( this.then  );
    return true;
};

///Since GTI is supported always use GTI for reputation whether store or with client mode.
mcafee_wa_legacynativemsgdispatcher.prototype.makeDSSRequest = function (url, sourceType, isSecureSearch, requestdata, fncallback)
{
    var dssreq      = 'dssrequest:multiquery/MultiQuery?tojson=1&href=' + url + '&sourceType=' + sourceType +  "&ssearch=" + isSecureSearch;
    var requestURIs = requestdata.join("\t");

    return this.makePromise(mcafee_wa_nativecommands.ondssrequest,fncallback, [dssreq, requestURIs]);
};

///Get warnblock data
mcafee_wa_legacynativemsgdispatcher.prototype.getWarnBlockdata = function (requestdata, fncallback)
{
    var querystring      = requestdata.querystring;
    mcafee_wa_bkglobals.logger.log("sending native message to get the warn block data querystring id : " + querystring);
    return this.makePromise(mcafee_wa_nativecommands.getOptionParamString,fncallback, [querystring, ""]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.getL10NString = function (fncallback , resourceID)
{
    return this.makePromise(mcafee_wa_nativecommands.getL10NString,fncallback, [resourceID]);
}

///Get warn block resource string
mcafee_wa_legacynativemsgdispatcher.prototype.getWBL10NString = function (requestdata, fncallback)
{
    var ResCount = mcafee_wa_bkconstants.WarnBlockResourceIds.length;
	for(var i=0; i< mcafee_wa_bkconstants.WarnBlockResourceIds.length; i++ )
	{
		if( mcafee_wa_bkconstants.WarnBlockResourceIds[i]  && mcafee_wa_bkconstants.WarnBlockResourceIds[i] != 'undefined' )
		{
            // setting flag to notify resolve(this.then) function that call is for warn/block L10N string
            this.iswbrequest = true;
            this.getL10NString(fncallback, mcafee_wa_bkconstants.WarnBlockResourceIds[i]);
		}
    }
};

mcafee_wa_legacynativemsgdispatcher.prototype.onDownloadFinished = function (item)
{
	var referrer= item.referrer == null ? '' : item.referrer;
    this.nativeMsg([mcafee_wa_nativecommands.ondownloadfinished, item.url, item.filename, referrer]);
    return false;
};

mcafee_wa_legacynativemsgdispatcher.prototype.reportStat = function (request)
{
    mcafee_wa_bkglobals.logger.log("Stat: " + request.Name + " Value: " + request.Value);

    var value = typeof (request.Value) == 'string' ? request.Value : request.Value.toString();

    this.nativeMsg([mcafee_wa_nativecommands.reportstat, request.Name, value]);
    return false;
};

mcafee_wa_legacynativemsgdispatcher.prototype.onSettings = function (uri)
{
    var contextId = this.generateContextId(mcafee_wa_bkglobals.activetabId, 0);
    this.addNewContext(contextId, contextId, uri, true);
    this.nativeMsg([mcafee_wa_nativecommands.onMenuItemClick, 114, contextId.toString()]);
    return false;
    
};

mcafee_wa_legacynativemsgdispatcher.prototype.onDocComplete = function (uri)
{
    this.nativeMsg([mcafee_wa_nativecommands.ondoccomplete, uri, "", 0, true]);
    return false;
};

mcafee_wa_legacynativemsgdispatcher.prototype.generateContextId = function(tabId, frameid)
{
    var contextId = frameid == -1 ? tabId : tabId | frameid << 16;
    return contextId;
};

///@param uri       : The uri that is navigating to
///@param tabId     : The tab which is navigating to the uri
///@param frameid   : The frameId if the navigation is from a iFrame else this is set to -1
mcafee_wa_legacynativemsgdispatcher.prototype.onBeforeNavigate = function (uri, tabId, frameid, requestHeaders)
{
    if (frameid <= 0 )
    {
        delete this._blockedFrames;
        //Clear the blocked Frame collection as soon as there is a navigation event in any tabs main frame.
        this._blockedFrames = new Map();
      
    }

	var  ret = mcafee_wa_bkglobals.requestHandler.process(uri, tabId, frameid, requestHeaders);
	
    //Loword is tabid and high word is frameid
    var contextId = this.generateContextId(tabId, frameid);

    this.addNewContext(contextId, contextId, uri, true);
    mcafee_wa_bkglobals.logger.log("onBeforeNavigate event called for ( uri, tabId, frameid, contextid) (" + uri + "," + tabId + "," + frameid + "," + contextId + ")");
    var bTopmost= frameid == 0;
	this.nativeMsg([mcafee_wa_nativecommands.onbeforenavigate, uri, ret.tabId.toString(), contextId.toString(), bTopmost]);
    return false;
};

///@param uri       : The uri that is navigating to
///@param tabId     : The tab which is navigating to the uri
///@param frameid   : The frameId if the navigation is from a iFrame else this is set to -1
mcafee_wa_legacynativemsgdispatcher.prototype.onNavigate = function (uri, tabId, frameid)
{
    //Loword is tabid and high word is frameid
    var contextId = this.generateContextId( tabId, frameid);
    this.addNewContext(contextId, contextId, uri, true);
    mcafee_wa_bkglobals.logger.log("onNavigate event called for ( uri, tabId, frameid, contextid) (" + uri + "," + tabId+ "," + frameid + "," + contextId + ")" );
    var bTopmost= frameid == 0;
    this.nativeMsg([mcafee_wa_nativecommands.onnavigate, uri, contextId.toString(), contextId.toString(), bTopmost]);
    return false;
};

mcafee_wa_legacynativemsgdispatcher.prototype.executeCommand = function (commandid, param)
{
    this.nativeMsg([mcafee_wa_nativecommands.executecommand, commandid, param]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.onCSync = function (gData, zData)
{
    this.nativeMsg([mcafee_wa_nativecommands.onCSync, navigator.userAgent, gData, zData]);
};

mcafee_wa_legacynativemsgdispatcher.prototype.getBingSecureSearchSettings = function()
{
    var pThis = this;
    pThis.getSystemOptionString(mcafee_wa_bkconstants.SystemGEO, "", function(systemGEO)
    {
        pThis.getSystemOptionString(mcafee_wa_bkconstants.BingCountrySet, "AU,DE", function(bingCountrySet)
        {
            pThis.getSystemOptionInt(mcafee_wa_bkconstants.ProviderForced, -1, function(providerForced)
            {
                mcafee_wa_bkglobals.currentProvider = providerForced;
                if (systemGEO != "" && bingCountrySet != "" && providerForced != -1)
                {
                    var bingCountrySetArray = bingCountrySet.split(",");
                    if (bingCountrySetArray.includes(systemGEO) && providerForced == 23)
                    {
                        mcafee_wa_bkglobals.isBingSecureSearchEnabled = true;
                    }
                }
            });
        });
    });
};

var mcafee_wa_listenermanager = function ()
{
    var _listeners = [];

    ///For now just one listener is supported for individual creation.
    var getListenersWhenDisabled = function ()
    {
        if( _listeners.length == 0 )
        {
          _listeners.push(new mcafee_wa_tablistener());
          _listeners.push(new mcafee_wa_onmessagelistener());
        }
        return _listeners;
    };

    ///Returns a list of all the supported listeners.
    var getListeners = function ()
    {
        if (_listeners.length == 0)
        {
            _listeners.push(new mcafee_wa_onmessagelistener()); //For IPC between content chrome process
           
            _listeners.push(new mcafee_wa_tablistener()); //To listen for active tabs.

            _listeners.push(new mcafee_wa_webrequestlistener());

            //For download scanning. In edge download scanning is not supported.
            if (mcafee_wa_bkglobals.browserType == mcafee_wa_browsertypes.Firefox)
            {
                _listeners.push(new mcafee_wa_onchangeddownloadslistener());
				_listeners.push(new mcafee_wa_viewportsender() );
            }
            else if (mcafee_wa_bkglobals.browserType == mcafee_wa_browsertypes.Chrome &&
                mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Main) //Supported only in main extension not search extension.
            {
                _listeners.push(new mcafee_wa_onchangeddownloadslistener());
            }

            if (mcafee_wa_bkglobals.browserType == mcafee_wa_browsertypes.Firefox)
            {
                _listeners.push(new mcafee_wa_csynchandler());
            }

            if (mcafee_wa_bkglobals.browserType == mcafee_wa_browsertypes.Chrome)
            {
                _listeners.push(new mcafee_wa_extensionmsglistener());
                _listeners.push(new mcafee_wa_pingsender());

                if (mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Search)
                {
                    _listeners.push(new mcafee_wa_onbeforesendheaderlistener());
                }
            }
        }
        return _listeners;
    };

    return {
        getListeners            : getListeners,
        getListenersWhenDisabled: getListenersWhenDisabled
    };
}();///Background script to be running in the chrome process. This takes care of making GTI requests.
function mcafee_wa_background()
{
};

mcafee_wa_background.prototype.processActiveTab = function ()
{
    chrome.tabs.query({ 'active': true }, function (tabs)
    {
        if (tabs.length == 0)
        {
            return;
        }
        mcafee_wa_bkglobals.activetabId = tabs[0].id;
		
        if (mcafee_wa_bkcommon.isProperWebURL(tabs[0].url))
		{
			mcafee_wa_dispatchwrap.onBeforeNavigate(tabs[0].url, tabs[0].id, 0, null);
			mcafee_wa_dispatchwrap.onNavigate(tabs[0].url, tabs[0].id, 0);
		}
		
        
    });
};

mcafee_wa_background.prototype.handleDisabled= function ()
{
    mcafee_wa_bkglobals.messageDispatcher.uninit();

    var listeners = mcafee_wa_listenermanager.getListenersWhenDisabled();
    for (var index = 0; index < listeners.length; ++index)
    {
        var listener = listeners[index];
        listener.init();
    }
            
    chrome.tabs.query({ 'active': true }, function (tabs)
    {
        if (tabs.length == 0)
            return;
        mcafee_wa_browseraction.disable(tabs[0].tabId);
    } );
};

mcafee_wa_background.prototype.handleEnabled = function ()
{
    ///Initialize all listeners here.
    var listeners = mcafee_wa_listenermanager.getListeners();
    for (var index = 0; index < listeners.length; ++index)
    {
        var listener = listeners[index];
        listener.init();
    }
    
    //The initial tab at startup is not firing the navigate event with tab Id.
    ///This is required to get the icon set for the browserAction.
    ///Below getting the active tab at startup and then firing the beforeNavigate and Navigate events to the dispatcher.
    this.processActiveTab();
};

mcafee_wa_background.prototype.processInit = function( disabledFlags)
{
    var disabledInt = parseInt(disabledFlags);
    var bDisabled   = mcafee_wa_bkcommon.isDisabled(disabledInt,mcafee_wa_bkglobals.browserType);
    mcafee_wa_bkglobals.options[mcafee_wa_bkconstants.disabled] = bDisabled;

    if( bDisabled )
    {
        this.handleDisabled ();
    }
    else
    {
        this.handleEnabled();
    }

};


mcafee_wa_background.prototype.createDispatcher = function()
{
	if ( mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Edge )
	{
		return new mcafee_wa_onlinemsgdispatcher ( new mcafee_wa_edgemsgdispatcher  () );
	}
	if( mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Chrome && mcafee_wa_settings.extensiontype == mcafee_wa_extensiontypes.Search )
	{
		return new mcafee_wa_onlinemsgdispatcher( new mcafee_wa_pnaclmsgdispatcher () );
	}
    return new mcafee_wa_legacynativemsgdispatcher();
};


///The entry point for background script. Here all listeners are registered.
///The message dispatcher is initialized. This will take care of initializing
///the native communication layer or the standalone layer.
mcafee_wa_background.prototype.main = function()
{
    if (mcafee_wa_settings.loggertype == mcafee_wa_loggertype.nativeLogger)
    {
        mcafee_wa_bkglobals.logger = new mcafee_wa_bknativelogger();
    }

    mcafee_wa_bkglobals.logger.SetLogTypes(mcafee_wa_settings.logtype);
    mcafee_wa_bkglobals.options[mcafee_wa_bkconstants.disabled]= false; //By default extension is enabled.
	mcafee_wa_bkglobals.browserType = mcafee_wa_browsertypefinder.getBrowserType(mcafee_wa_settings.browsertype);
	mcafee_wa_bkglobals.requestHandler = new mcafee_wa_bingrequesthandler();

	var pThis = this;
	
	mcafee_wa_bkglobals.messageDispatcher= this.createDispatcher ();
	mcafee_wa_bkglobals.messageDispatcher.init(function( response)
	{
		if( response.init == true )
		{
            pThis.processInit(response.disabled);
		}
	});

	if (mcafee_wa_settings.browsertype == mcafee_wa_browsertypes.Edge)
	{
	    mcafee_wa_bkglobals.edgePort = new mcafee_wa_edgeport();
	}
};

var bkobj = new mcafee_wa_background();
bkobj.main();