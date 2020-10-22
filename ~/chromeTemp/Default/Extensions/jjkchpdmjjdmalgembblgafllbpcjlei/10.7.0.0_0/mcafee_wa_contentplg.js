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

mcafee_wa_color = {
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
mcafee_wa_extensiontypes= {
	Unknown : -1,
	Main    :  0,
	Search  :  1
};var mcafee_wa_loggertype= {
	defaultLogger: 0,
	nativeLogger : 1
};function mcafee_wa_msghandler ()
{	
	this._client= null;
};


mcafee_wa_msghandler.prototype.init = function ( client)
{
	this._client= client;
	
	var pThis= this;
	
	window.addEventListener("message", function(event) 
	{
		// We only accept messages from ourselves
		if (event.source != window)
		{
			return;
		}
		
		if( null != pThis._client )
		{
			pThis._client.processpagemsg ( event );
		}
	});
	
};

function mcafee_wa_mutationobserver()
{
    this._observers = new Map();
};

mcafee_wa_mutationobserver.prototype.isAnyLinkNode= function( list )
{
	for( var item = 0; item< list.length; ++item )
	{
		if( list[ item].nodeName.toLowerCase() == 'a' )
		{
			return true;
		}
	}
	return false;
	
};

mcafee_wa_mutationobserver.prototype.Observe = function (document)
{
    try
    {
		var pThis= this;
		
        var observer = new MutationObserver(function (mutationList, observer) ///document is held in closure.
        {
            var total = mutationList.length;

            for (var item = 0; item < total; ++item)
            {
                var mutationRecord = mutationList[item];

                //we only care about added nodes. NodeList is not an Array
                var addedNodesList  = mutationRecord.addedNodes;
                var nodeTotal       = addedNodesList.length;
                if (nodeTotal > 0 )
                {
					 if( pThis.isAnyLinkNode ( addedNodesList) )
					 {
						mcafee_wa_coreengine.annotate(document);
						break;
					 }
                }
            }

        });
        observer.observe(document, { childList: true, subtree: true });
        this._observers.set(document, observer);
    }
    catch (exception)
    {
        mcafee_wa_globals.logger.error(exception);
        return false;
    }
    return true;
};

mcafee_wa_mutationobserver.prototype.Disconnect = function (document)
{
    var observer = this._observers.get( document)
    if (observer != null && observer != "undefined" )
    {
        observer.disconnect();
        this._observers['delete'](document);
        mcafee_wa_globals.logger.log("Disconnected observer: Total items left: " + this._observers.size);

    }
};
mcafee_wa_scorevals = {
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

} ();///The default settings for extension. These settings are altered at build time from build script
///based on the commandline passed to build batch file

var mcafee_wa_settings = {
    'loggertype': mcafee_wa_loggertype.defaultLogger,
    'logtype': mcafee_wa_logtypes.None,
    'debugmode': false,
    'browsertype': mcafee_wa_browsertypes.Chrome,
    'extnversion': '10.7.0.0',
    'extensiontype': mcafee_wa_extensiontypes.Main
};
///Takes care of communication from content process to background process.  Every message has an associated commandid which are defined in mcafee_wa_commands.js. 

var mcafee_wa_backgroundipc = function ()
{
    var getWarnBlockData = function (url , fncallback)
    {
       if( url.search(/blockpagegc.html|warnpromptpagegc.html|subframeblockpage.html/i) == -1 ) return;
            

       try
       {
            var query = null;
            query = window.location.search;
            if(query === null) return;
    
            var wbhandler = new mcafee_wa_blockpagehandler();
            var paramid = wbhandler.getQueryVariableFromQuery(query.substring(1),"id");
        
    
            chrome.runtime.sendMessage({ command: mcafee_wa_commands.getwarnblockdata , Url : url ,  topmost : ((url.search(/subframeblockpage.html/i) == -1)?true:false) , querystring : paramid}, fncallback);
       }
       catch(e)
       {
            mcafee_wa_globals.logger.error('failed to get warn/block data , error ' + e);
       }
       
    };

	var logMsg = function( flags, msg )
	{
	    chrome.runtime.sendMessage({ command: mcafee_wa_commands.logmsg, logflags: flags, message: msg });
	};
	
	var isPageBlocked = function (uri, fncallback)
	{
	    chrome.runtime.sendMessage({ command: mcafee_wa_commands.ispageblocked, Url : uri }, fncallback);
	};

    var isFrameBlocked = function ( frameUri, fncallback)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.isframeblocked, Url: frameUri }, fncallback);

    };

    var getSupportedFeatures = function (fncallback)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.getsupportedfeatures }, fncallback);
    };

    ///Report telemetry to background process aka chrome process
    var reportStat = function (name, value)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.reportstat, Name: name, Value: value })
    };

    ///Makes a request to receive the reputation for the Urls.
    ///@param url           : The Uri of the search 
    ///@param requestdata   : The array of Uris in the search page for which reputation is requested
    ///@param fncallback    : The callback which will be invoked upon reciept of the reputations. This takes a single string argument
    var makeDSSRequest = function (url,sourceType, issecuresearch, requestdata,  fncallback)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.dssrequest, searchEngineType: sourceType, Url: url, isSecureSearch: issecuresearch, requestData: requestdata }, fncallback);
        return true;
    };

    var onNavigate = function (url, frameId)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.onnavigate, Url: url, FrameId:frameId });
    };

    ///Called by password protection feature now.
    var executeCommand  = function(id, param)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.executecommand, commandId: id, params: param });
    };

    var addPageScanStat = function ()
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.addpagescanstat });
    };

    var getBingSecureSearchEnabled = function (fncallback)
    {
        chrome.runtime.sendMessage({ command: mcafee_wa_commands.getbingsecuresearchenabled }, fncallback);
    }

    return {
        makeDSSRequest      : makeDSSRequest        ,
        reportStat          : reportStat            ,
        onNavigate          : onNavigate            ,
        executeCommand      : executeCommand        ,
        getSupportedFeatures: getSupportedFeatures  ,
        isFrameBlocked      : isFrameBlocked 	    ,
        logMsg              : logMsg                ,
        isPageBlocked       : isPageBlocked         ,
        addPageScanStat     : addPageScanStat       ,
        getBingSecureSearchEnabled : getBingSecureSearchEnabled,
        getWarnBlockData    : getWarnBlockData
    };

} ();var blockpageconstants =
{
    acceptrisk   : 'acceptrisk'     ,
    fnacceptrisk : 'acceptrisk()',
    isBlockPage  :  true
};

var mcafee_wa_blockpagehandler = function ()
{
};

///Creates script tag in the block page. The script tag is for posting a message to self. The content script of extension will pick the message
///and process it. The message is posted upon clicking of the link 'acceptRisk' in the page.
mcafee_wa_blockpagehandler.prototype._insertScript = function (doc)
{
     // if enterprise then don't do anything because WC handles warn block page differently
     if (mcafee_wa_bkconstants.enterprise == false)
     {
        var scripttag   = doc.createElement("script"); // create the script tag
        scripttag.text  = "function " + blockpageconstants. fnacceptrisk + " { window.postMessage({ type: '"+ blockpageconstants.acceptrisk + "'}, '*'); }";
        var heads       = document.getElementsByTagName("head");

        if (heads != null && typeof (heads) != "undefined")
        {
            heads[0].appendChild(scripttag);
        
        }
    }

}


mcafee_wa_blockpagehandler.prototype.processpagemsg= function( message )
{
	//Do nothing for now since block page does not have any scripts injected to the page.
};

mcafee_wa_blockpagehandler.prototype.process = function (doc)
{

    if (mcafee_wa_bkconstants.enterprise == true)
    {
        var url = doc.location.href;
        mcafee_wa_backgroundipc.getWarnBlockData(url , function (warnblockdata)
        {
            try
            {
                warnblockdata.topmost = true;
                var wbhandler = new mcafee_wa_blockpagehandler();
                wbhandler.fillPageFromJson(warnblockdata);
            }
            catch( exception )
            {
                mcafee_wa_globals.logger.log(exception);
            }

        } );
    }
    else
    {
        ///Get the actual URI that is blocked.
        var realURI     = mcafee_wa_uriparser.getParam(doc.location.href, mcafee_wa_bkconstants.domain);
        var originalURI = mcafee_wa_uriparser.getParam(doc.location.href, mcafee_wa_bkconstants.originalURL);
        if (originalURI != null)
        {
            ///Insert script to do postMessage to self.
            this._insertScript(doc);

            ///Handler for the message received from block page. Block page sends this on user clicking 'Accept Risk'.
            ///This is fired from the script injected by insertScript into the block page.
            window.addEventListener("message", function (event)
            {
                if (event.source != window)
                {
                    return;
                }
                //Mimic a navigate event to the whitelist which will make native code to fire a navigateEvent after whitelisting
                //of the uri.
                if (event.data.type && (event.data.type == blockpageconstants.acceptrisk))
                {
                    if (realURI != null)
                    {
                        var uri = mcafee_wa_bkconstants.whitelistUrl + "&whitelisturl=" + realURI + "&" + mcafee_wa_bkconstants.redirectURL + "=" + originalURI;
                        mcafee_wa_backgroundipc.onNavigate(uri, 0);
                    }
                    else
                    {
                        var uri = mcafee_wa_bkconstants.whitelistUrl + "&" + mcafee_wa_bkconstants.redirectURL + "=" + originalURI;
                        mcafee_wa_backgroundipc.onNavigate(uri, 0);
                    }
                }
            }, false);

            ///added to call the script function injected into the block page when user click the link <a> 'Accept Risk'
            var dontWarnLink = doc.getElementById('DontWarn');
            if (dontWarnLink != null)
            {
                dontWarnLink.href = 'javascript:' + blockpageconstants.fnacceptrisk;
            }
        }
    }
};

mcafee_wa_blockpagehandler.prototype.SmartWordBreak = function (str) 
{
    var re = /(.{20,500})/g;
    var words = str.split(" ");
    for (var i in words)
    {
    	if (words[i] != null)
    	{
	        if (words[i].length >= 20)
	        {
		        var letters = [];
		        for(var l=0; l<words[i].length; l++)
		        {
			        letters.push(words[i].charAt(l))
		        }
		        words[i] = letters.join("<wbr/>")
	        }
    	}
    }
    return words.join(" ");
};

mcafee_wa_blockpagehandler.prototype.showWarning  = function(response) 
{
    var domEvent = new Object();
    
	domEvent.originalTarget = document;
	this.doc = document;
	var resjson = response.resources;
    var topmost = response.topmost;
    
	if(resjson == null)
	{
		mcafee_wa_globals.logger.log("resjson is null.");
		return;
    }
    	  
	var query = window.location.search;
	var paramid = null;
    if(query !== null) 
    {
		paramid = this.getQueryVariableFromQuery(query.substring(1), "id");
    }

    var parsedWBData = response.wbpagedata.enfDataInfo;
              
    var saDomain                = parsedWBData["*sadomain"];
    var actionText              = parsedWBData["*actiontext"];
    var actionDetailText        = parsedWBData["*actiondetailtext"];
    var actionDetailAltText     = parsedWBData["*actiondetailtext2"];
    var dssRatingDescription    = parsedWBData["*dssratingdesc"];

    var dssRatingDesc;
    if ( dssRatingDescription !== undefined && dssRatingDescription !== null)
        dssRatingDesc = this.SmartWordBreak(dssRatingDescription);


    var dssRatingIconUrl        = parsedWBData["*dssratingiconurl"];
    var dssContentDescription   = parsedWBData["*dsscontentdesc"];
    
    var dssContentDesc;
    if ( dssContentDescription !== undefined && dssContentDescription !== null)
        dssContentDesc = this.SmartWordBreak(dssContentDescription);

    // siteAdvisor Domain
    this.setDisplay('saDomainText', encodeURI(saDomain));
    
    // actionText
    this.setDisplay('actionText', actionText);

    this.toggleElementShow(false, 'actionDetailText');
    this.toggleElementShow(false, 'actionDetailAltText');

    // actionDetailText
    if (actionDetailText != "" && actionDetailText !== undefined) 
    {
        this.setDisplay('actionDetailText', actionDetailText);
        this.toggleElementShow(true, 'actionDetailText');
    }

    // actionDetailAltText
   if (actionDetailAltText != "" && actionDetailAltText !== undefined) 
    {
        this.setDisplay('actionDetailAltText', actionDetailAltText);
        this.toggleElementShow(true, 'actionDetailAltText');
    }

    var IDS_SAE_SECURITY_LABEL_DEF =  61015;
    var IDS_SAE_CONTENT_LABEL_DEF  =  61016;
    
    var dssSecuityHtml = "";

    var securityLabel 	= resjson["res_" + IDS_SAE_SECURITY_LABEL_DEF];
    var contentLabel  	= resjson["res_" + IDS_SAE_CONTENT_LABEL_DEF];

    if( securityLabel == null)
    {
        securityLabel = "";
    }
    
    if( contentLabel == null)
    {
        contentLabel = "";
    }

    // dssDataHtml - This section is not used for exploits, phishing and prohibit
    var dssContentHtml = "";
    this.toggleElementShow(false, 'dssContentText');
    this.toggleElementShow(false, 'dssSecuityText');

    //mcafee_wa_globals.logger.log('dssContentDesc ' + dssContentDesc);
    if (dssContentDesc != "" && dssContentDesc !== undefined) 
    {
        dssContentHtml =  contentLabel + " " + dssContentDesc;
        this.setDisplay('dssContentText', dssContentHtml);
        this.toggleElementShow(true, 'dssContentText');
    }

    if (dssRatingDesc != "" && dssRatingDesc !== undefined)
    {
        dssSecuityHtml += securityLabel + " " + dssRatingDesc;
        this.setDisplay('dssSecurityText', dssSecuityHtml);
        this.toggleElementShow(true, 'dssSecuityText');
    }
        
    this.toggleElementShow(true, 'main');
    this.toggleElementShow(true, 'poweredBy');
}

mcafee_wa_blockpagehandler.prototype.fillPageFromJson = function(response) 
{
    var domEvent = new Object();
    
	domEvent.originalTarget = document;
	this.doc = document;
	var resjson = response.resources;
    var topmost = response.topmost;
    this.form = document.forms[0];
    
	if(resjson == null)
	{
		mcafee_wa_globals.logger.log("resjson is null.");
		return;
    }
    
	var logo = document.getElementsByTagName('img')[0];
	if( logo != null )
	{
        mcafee_wa_globals.logger.log("logo is not null.");
        logo.setAttribute("src", chrome.extension.getURL("images/mcafee.gif"));
    }
    
	var query = window.location.search;
	var paramid = null;
    if(query !== null) 
    {
		paramid = this.getQueryVariableFromQuery(query.substring(1), "id");
    }
    
    if(topmost) 
    {
        mcafee_wa_globals.logger.log("topmost is true.");
        
        var declineid = document.getElementById('decline_id');
        
		if(declineid !== null)
            declineid.value = paramid;
            
		var acceptid = document.getElementById('accept_id');
		if(acceptid !== null)
            acceptid.value = paramid;
            
		var declineform = document.getElementById('declineResultForm');
        var acceptform  = document.getElementById('acceptResultForm');
        
		if(declineform !== null)
            declineform.action ="wbresult.html";
            
		if(acceptform !== null)
			acceptform.action = "wbresult.html";

        var parsedWBData = response.wbpagedata.enfDataInfo;
                
		var resumeUrl               = parsedWBData["*url"];
        var saDomain                = parsedWBData["*sadomain"];
        var actionText              = parsedWBData["*actiontext"];
        var actionDetailText        = parsedWBData["*actiondetailtext"];
        var actionDetailAltText     = parsedWBData["*actiondetailtext2"];

        var dssRatingDescription    = parsedWBData["*dssratingdesc"];

        var dssRatingDesc;
        if ( dssRatingDescription !== undefined && dssRatingDescription !== null)
            dssRatingDesc  = this.SmartWordBreak(dssRatingDescription);

        var dssRatingIconUrl        = parsedWBData["*dssratingiconurl"];
        var dssContentDescription   = parsedWBData["*dsscontentdesc"];

        var dssContentDesc;
        if ( dssContentDescription !== undefined && dssContentDescription !== null)
            dssContentDesc          = this.SmartWordBreak(dssContentDescription);

        var goBackButtonText        = parsedWBData["*gobackbuttontext"];
        var continueButtonText      = parsedWBData["*continuebuttontext"];
		var hideBackButton          = parsedWBData["*hidebackbutton"];
		var contentId               = parsedWBData["*contentid"];
		var reasonDetail            = parsedWBData["*reasondetail"];
		var customImageSrc          = parsedWBData["*logourl"];

		// resume URL
	    this.setDisplay('resumeUrlText', resumeUrl);
        this.setInputValue('resumeurl', resumeUrl);

        // siteAdvisor Domain
        this.setDisplay('saDomainText', resumeUrl);
        this.setInputValue('sadomain', saDomain);

        // actionText
        this.setDisplay('actionText', actionText);
        this.toggleElementShow(false, 'actionDetailText');
        this.toggleElementShow(false, 'actionDetailAltText');

        // actionDetailText
        if (actionDetailText != "" && actionDetailText !== undefined) 
        {
            this.setDisplay('actionDetailText', actionDetailText);
            this.toggleElementShow(true, 'actionDetailText');
        }

        // actionDetailAltText
        if (actionDetailAltText != "" && actionDetailAltText !== undefined) 
        {
            this.setDisplay('actionDetailAltText', actionDetailAltText);
            this.toggleElementShow(true, 'actionDetailAltText');
        }

		var IDS_SAE_SECURITY_LABEL_DEF =  61015;
		var IDS_SAE_CONTENT_LABEL_DEF  =  61016;
		
		var dssSecuityHtml = "";
		var securityLabel 	= resjson["res_" + IDS_SAE_SECURITY_LABEL_DEF];
        var contentLabel  	= resjson["res_" + IDS_SAE_CONTENT_LABEL_DEF];

        //get custom image if provided through ePO policy as part of enforcement message
        this.getCustomImage('logoImage', customImageSrc);

        // page title
        this.doc.title = "Web Control: " + actionText
        
        if( securityLabel == null)
		{
			securityLabel = "";
		}
		
		if( contentLabel == null)
		{
			contentLabel = "";
		}

        // dssDataHtml - This section is not used for exploits, phishing and prohibit
        var dssContentHtml = "";
        this.toggleElementShow(false, 'dssContentText');
        this.toggleElementShow(false, 'dssSecuityText');

        if (dssContentDesc != "" && dssContentDesc !== undefined) 
        {
	        dssContentHtml =  contentLabel + " " + dssContentDesc;
            this.setDisplay('dssContentText', dssContentHtml);
            this.toggleElementShow(true, 'dssContentText');
		}

        if (dssRatingDesc != "" && dssRatingDesc !== undefined)
		{
	        dssSecuityHtml += securityLabel + " " + dssRatingDesc;
            this.setDisplay('dssSecurityText', dssSecuityHtml);
            this.toggleElementShow(true, 'dssSecuityText');
        }

         // goBackButtonText
        this.setInputTextValue('decline', goBackButtonText);

        // continueButtonText
        this.setInputTextValue('accept', continueButtonText);

        // *warn page only*
        this.setInputValue('contentid', contentId);
        this.setInputValue('reasondetail', reasonDetail);
        
        // hidebackbutton
        if (hideBackButton == "true") 
        {
            this.toggleElementEnable(false, 'decline');
        }

        this.checkPage(goBackButtonText);
        this.toggleElementShow(true, 'main');
        this.toggleElementShow(true, 'poweredBy');
	}
    else 
    {
        this.showWarning(response);
	}
};

mcafee_wa_blockpagehandler.prototype.checkPage = function (text)
{
    var bOk = true
    if (text == null || text == "")
    {
        this.toggleElementShow(false, 'decline')
        this.toggleElementShow(false, 'accept')
        this.setDisplay('actionText', "--")
        bOk = false
    }
    return bOk;
};

mcafee_wa_blockpagehandler.prototype.setDisplay = function (divId, text) 
{
    var div = this.doc.getElementById(divId);
    if (div) 
    {
        div.innerHTML = text;
    }
};

mcafee_wa_blockpagehandler.prototype.setInputTextValue = function (id, text) 
{
    var inp = this.doc.getElementById(id);
    if (inp) 
    {
        inp.value = text;
    }
};

mcafee_wa_blockpagehandler.prototype.setInputValue = function (inputId, valueText) 
{
    var declineInp = this.doc.getElementById("decline_" + inputId);
    if (declineInp) 
    {
        declineInp.value = valueText;
    }

    var acceptInp = this.doc.getElementById("accept_" + inputId);
    if (acceptInp) 
    {
        acceptInp.value = valueText;
    }
};

mcafee_wa_blockpagehandler.prototype.toggleElementShow = function (bShow, id) 
{
    var oEle = this.doc.getElementById(id);
    if (oEle != null && oEle !== undefined && oEle.style !== undefined) 
    {
        oEle.style.display = bShow ? "block" : "none";
    }
    return oEle;
};

mcafee_wa_blockpagehandler.prototype.toggleElementEnable = function (bEnabled, id) 
{
    var oEle = this.doc.getElementById(id);
    if (oEle != null && oEle !== undefined && oEle.style !== undefined) 
    {
        oEle.className = bEnabled ? 'buttonEnabled' : 'buttonDisabled';
        oEle.disabled = !bEnabled;
    }
    return oEle;
};

mcafee_wa_blockpagehandler.prototype.acceptPrompt = function () 
{
    this.setInputValue('saeaction', 'true');
};

mcafee_wa_blockpagehandler.prototype.declinePrompt = function () 
{
    this.setInputValue('saeaction', 'false');
};

mcafee_wa_blockpagehandler.prototype.validSumit = function ()
{
	if (this.posted)
	{
		this.posted=true;
		return true;
	}
	return false;
};

mcafee_wa_blockpagehandler.prototype.ltrim = function(str, chars) 
{
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
mcafee_wa_blockpagehandler.prototype.rtrim = function(str, chars) 
{
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

mcafee_wa_blockpagehandler.prototype.trim = function(str, chars) 
{
	return this.ltrim(this.rtrim(str, chars), chars);
}

mcafee_wa_blockpagehandler.prototype.validImageUrl = function(url) 
{
    var valid = false;   
    if (url != null)
    {
        url = this.trim(url); 
        if (url.length > 0 && url.match(/^https?:\/\//i))
        {
            valid = true
        }
    }
    return valid;
}

//this is called from callback function
mcafee_wa_blockpagehandler.prototype.showCustomImage = function(eleId)
{
	var customImageEle = this.doc.getElementById(eleId)
	customImageEle.style.display = "block"
}

///Removes all child nodes and does equivalent to innerHTML= ""
mcafee_wa_blockpagehandler.prototype.removeAllChildNodes = function(node)
{
	if ( node != 'undefined' && node != null )
	{
		while (node.firstChild)
		{
			node.removeChild(node.firstChild);
		}
	}
}

mcafee_wa_blockpagehandler.prototype.setImageNode = function(parentNode, src, alt, verticalAlign, maxWidth , img_doc)
{
	try
	{
		if ( parentNode == 'undefined' || parentNode == null )
			return;
		
		this.removeAllChildNodes(parentNode);
		imageNode = img_doc.createElement("img");
		imageNode.alt = alt;
		imageNode.src = src;

		if (verticalAlign != null || maxWidth != null)
		{
			styleNode = img_doc.createElement("style");
			if (verticalAlign != null)
			{
				styleNode.verticalAlign = verticalAlign;
			}

			if (maxWidth != null)
			{
				styleNode.maxWidth = maxWidth
			}
			imageNode.setAttribute("style", styleNode);
		}

		parentNode.appendChild(imageNode);
		return imageNode;
	}
	catch(e)
	{
		mcafee_wa_globals.logger.error('setImageNode error ' + e.message);
	}
}

mcafee_wa_blockpagehandler.prototype.addCustomImage = function(eleId, customImageSrc)
{
    try
    {
        var customImageEle = this.doc.getElementById(eleId)
        this.setImageNode(customImageEle, customImageSrc, "", null, null , this.doc);
    }
    catch(e)
    {
        mcafee_wa_globals.logger.error('addcustomimage failed , error : ' + e);
    }
}

mcafee_wa_blockpagehandler.prototype.getCustomImage = function(eleId, imageSrcUrl) 
{
    if (! this.validImageUrl(imageSrcUrl))
    {
        return;
    } 
    
    this.addCustomImage(eleId, imageSrcUrl);
    var _this = this;
    
    var req = new XMLHttpRequest();
	req.open('GET', imageSrcUrl, true);
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.onreadystatechange = function () 
    {
        if (req.readyState == 4) 
        {
            try 
            {
                stat = req.status;
            }
            catch(staterr) 
            {
                stat = 500;
            }
            if (stat == 200) 
            {
    		    _this.showCustomImage(eleId);
			}
		}
	};

    try
    {
		req.send(null);
	}
    catch(e)
    {
	}

}

mcafee_wa_blockpagehandler.prototype.getQueryVariableFromQuery = function (query, variable)
{
    var vars = query.split("&");
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

mcafee_wa_blockpagehandler.prototype.procesmsg = function (msg, fncallback)
{
};
///The content native logger object.
///Log level for the logMsg is like this  -------8-----|--------8------|--------8---------|------8------|
///										  Content|Bk---|--BrowserType--|--------None------|--Info|Err---|
///										  ------0|1----|--1|2|3|4|5|6--|---------0--------|-----1|2-----| 	

function mcafee_wa_contentnativelogger( logTypes, browserType)
{
    this._logTypes      = logTypes;
    this._browserType   = browserType;
};

mcafee_wa_contentnativelogger.prototype.log = function (text)
{
    if (mcafee_wa_logtypes.Info & this._logTypes)
    {
		
        mcafee_wa_backgroundipc.logMsg(((0 << 24) | (this._browserType << 16) | mcafee_wa_logtypes.Info), text);
    }
};

mcafee_wa_contentnativelogger.prototype.error = function (text)
{
    if (mcafee_wa_logtypes.Err & this._logTypes)
    {
        mcafee_wa_backgroundipc.logMsg(((0 << 24) | (this._browserType << 16) | mcafee_wa_logtypes.Err), text);
    }
};
//Core engine calls this objects post method to get reputation for urls in the web page. This class delegates the call to background IPC.
function mcafee_wa_gtiproxy()
{

};

mcafee_wa_gtiproxy.prototype.post = function (url, sourceType, issecuresearch,requestdata, fncallback)
{
    try
    {
        ///This is based on hardcoded data in engine.json. However we need to see whether the fr code is mcafee to ascertain
        ///that uri is secure search. This is done here and not in coreengine since core engine does not have uri parser class.
        if (issecuresearch)
        {
            var decodedURI  = decodeURIComponent(url);
            var frcode      = mcafee_wa_uriparser.getParam(decodedURI, "fr");
            issecuresearch  = frcode == 'mcafee';
        }

        if (sourceType == mcafee_wa_senginetypes.SearchEngine_BING)
        {
            if (document.cookie != null)
            {
                var cookieHeaders = document.cookie.split(';');
                cookieHeaders.forEach( function( value )
                {
                    if (-1 != value.indexOf(mcafee_wa_bkconstants.BingQString))
                    {
                        issecuresearch = true;
                    }
                });
            }
        }

        mcafee_wa_backgroundipc.makeDSSRequest(url, sourceType, issecuresearch, requestdata, fncallback);
    }
    catch (exception)
    {
	    mcafee_wa_globals.logger.error(exception);
    }
};
function mcafee_wa_iframehandler()
{
};

mcafee_wa_iframehandler.prototype.processmsg = function (request, fncallback)
{
    switch (request.command) ///Background script sends this message to content script to block iFrame.
    {
        case mcafee_wa_commands.onredirectiframe:
        {
            if (mcafee_wa_bkconstants.enterprise == true)
            {
                this._processIFrameBlockPage(request, document);
                fncallback({ 'succeeded': true });
            }
            else
            {
                this._processIFrameBlocking(request, document);
                fncallback({ 'succeeded': true });
            }
        }
        break;
    }
};

mcafee_wa_iframehandler.prototype.process = function (doc)
{
    if (mcafee_wa_bkconstants.enterprise == true)
    {
       var url = doc.location.href;
      
       if(mcafee_wa_bkcommon.isSiteAdvisorURL(url))
       {
            mcafee_wa_backgroundipc.getWarnBlockData(url , function (warnblockdata)
            {
                try
                {
                    warnblockdata.topmost = false;
                    var wbhandler = new mcafee_wa_blockpagehandler();
                    wbhandler.fillPageFromJson(warnblockdata);
                }
                catch( exception )
                {
                    mcafee_wa_globals.logger.log(exception);
                }

            } );

       }
    }
    else
    {
        //If the frame URI is not block page of any kind then, do a recheck with the background cache to see
        //whether the frame is to be blocked. This is due to the fact that the block frame message to tab would have
        //been sent before the frame listened to the message, hence the frame has a chance of missing out the message.
        if (!mcafee_wa_bkcommon.isSiteAdvisorURL(doc.location.href))    //a block page starts with siteadvisor URL
        {
            var pThis = this;
            mcafee_wa_backgroundipc.isFrameBlocked(doc.location.href, function(response)
            {
                if (response.blocked == true)
                {
                    pThis._processIFrameBlocking(response, doc);
                }
            });
        }
    }
};

mcafee_wa_iframehandler.prototype.processpagemsg= function( message )
{
	
	
};

mcafee_wa_iframehandler.prototype._processIFrameBlockPage= function( request, document)
{
    if ( request.docUrl == window.location.href)
    {
        mcafee_wa_globals.logger.log("Replacing iFrame to " + request.url);
        window.location.replace(request.uri);
    }
};

mcafee_wa_iframehandler.prototype._processIFrameBlocking= function( request, document)
{
    var domain         = mcafee_wa_uriparser.getParam(request.uri, "domain");
    var originalURI    = mcafee_wa_uriparser.getParam(request.uri, 'originalURL');

    if (domain != null && originalURI != null)
    {
        ///Document.documentURI is not available in certain browsers.
        var documentURI = document.documentURI || document.URL || document.baseURI;

        var unescapedDomain = unescape(domain);
        if (unescapedDomain == documentURI)
        {
            var subFrame = mcafee_wa_uriparser.getParam(request.uri, 'subframe');
            subFrame = subFrame != '1' ? '&subframe=1' : ''

            mcafee_wa_globals.logger.log("Replacing iFrame to " + request.uri + subFrame);
            window.location.replace(request.uri + subFrame);
        }
    }
};
/**
 * This class allows to define if the current html represent a login page
 * or not based on predefined rules.
 *
 * @param {string} html The html context
 * @param {string} url The webpage's url
 * @param {object} hints Hints given to the linter
 * @param {object} hints.hasLoginForm
 * @param {object} hints.hasTwoFactorForm
 * @param {array}  reasons in plain text
 * @param {object} flags as boolean values for reasons
 * @constructor
 */
var _wa = {};
_wa.LoginLinter = function (html, url, w, log) {
    this.w = w;
    this.html = html;
    this.url = url;
    this.hints = {};
    this.reasons = [];
    this.flags = {
        hasLoginOrSignupForm: false,
        hasTwoFactorForm: false,
        hasLoginLink: false,
        hasLogoutLinkOrInput: false,
        hasLogoutLinkOrInputAndLoginOrSignupForm: false,
        hasLoginAttribute: false,
        hasLogoutAttribute: false,
        hasLoginUrl: false,
        hasLoginValidationError: false
    };
    this.log = log;
};

/**
 * Defines if we found a login page
 * @api public
 */
_wa.LoginLinter.prototype.isLoginPage = function () {
    return this.score() > 2;
};

/**
 * Get the score for this page
 */
_wa.LoginLinter.prototype.score = function () {
    if (!this._score) {
        this._score = 0;
        var links = _wa.$('a,btn,button', this.html);
        var inputs = _wa.$('input', this.html);

        if (this.hasLoginForm() || this.hasSignupForm()) {
            this.addReason('has a login or signup form +2', 'hasLoginOrSignupForm');
            this._score += 2;
        }

        if (this.hasTwoFactorForm()) {
            this.addReason('has a two factor form -2', 'hasTwoFactorForm');
            this._score -= 2;
        }

        if (this.hasLoginLink(links) || this.hasLoginInput(inputs)) {
            this.addReason('has a login link or input +1', 'hasLoginLinkOrInput');
            this._score += 1;
        }

        if (this.hasLogoutLink(links) || this.hasLogoutInput(inputs)) {
            this.addReason('has a logout link or input -2', 'hasLogoutLinkOrInput');
            this._score -= 2;
        } else {
            this.addReason('does not have a logout link or input +1');
            this._score += 1;
        }

        // If it contains both a logout and a signin, it's most probably a login page
        if ((this.hasLogoutLink(links) || this.hasLogoutInput(inputs)) &&
            (this.hasLoginForm() || this.hasSignupForm())) {
            this.addReason('has a logout link and login/signup form +2', 'hasLogoutLinkOrInputAndLoginOrSignupForm');
            this._score += 2;
        }

        if (this.hasNonHiddenLogoutLink(links) || this.hasNonHiddenLogoutInput(inputs)) {
            this.addReason('has a non hidden logout link or input -3', 'hasNonHiddenLogoutLinkOrInput');
            this._score -= 3;
        }

        // If it contains both a logout and signin, BUT the logout is not hidden, it's probably not a login
        if ((this.hasNonHiddenLogoutLink(links) || this.hasNonHiddenLogoutInput(inputs)) &&
            (this.hasLoginForm() || this.hasSignupForm())) {
            this.addReason('has both logout and login/signup, but logout is not hidden -5', 'hasLoginAndNonHiddenLogout');
            this._score -= 5;
        }

        if (this.hasLoginAttribute()) {
            this.addReason('has a login attribute +1', 'hasLoginAttribute');
            this._score += 1;
        }

        if (this.hasLogoutAttribute()) {
            this.addReason('has a logout attribute -1', 'hasLogoutAttribute');
            this._score -= 1;
        }

        if (this.hasNonHiddenLogoutAttribute()) {
            this.addReason('has non hidden logout attribute -2', 'hasNonHiddenLogoutAttribute');
            this._score -= 2;
        }

        if (this.hasLoginUrl()) {
            this.addReason('has a login url +1', 'hasLoginUrl');
            this._score += 1;
        }

        if (this.hasLoginValidationError()) {
            this.addReason('has a validation error +1', 'hasLoginValidationError');
            this._score += 1;
        }
    }
    return this._score;
};

/**
 * List of regexps to match login and logout buttons in all supported languages.
 * Use online converter to add more - https://mothereff.in/js-escapes
 */
var loginRegxs = [
    "(sign|log)(.?)(in|on)",                                                                        // en_US 
    "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",                          // ar_AE 
    "P\u0159ihl\xE1sit",                                                                            // cs_CZ 
    "Log p\xE5", "Log ind",                                                                         // da_DK 
    "Anmelden",                                                                                     // de_DE 
    "\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7", "\u0395\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2",     // el_GR 
    "Iniciar sesi\xF3n", "Entrar",                                                                  // es_ES 
    "Kirjaudu sis\xE4\xE4n",                                                                        // fi_FI 
    "Se connecter", "Connexion", "S\u2019identifier",                                               // fr_FR 
    "\u05D4\u05D9\u05DB\u05E0\u05E1", "\u05D4\u05EA\u05D7\u05D1\u05E8",                             // he_IL 
    "Prijava",                                                                                      // hr_HR 
    "Bejelentkez\xE9s",                                                                             // hu_HU 
    "Accesso", "Accedi",                                                                            // it_IT 
    "\u30ED\u30B0\u30A4\u30F3", "\u30B5\u30A4\u30F3\u30A4\u30F3",                                   // ja_JP 
    "\uB85C\uADF8\uC778",                                                                           // ko_KR 
    "Logg p\xE5", "Logg inn",                                                                       // nb_NO 
    "Aanmelden", "Inloggen",                                                                        // nl_NL 
    "Zaloguj si\u0119",                                                                             // pl_PL 
    "Efetuar login", "Entrar",                                                                      // pt_BR 
    "Iniciar sess\xE3o",                                                                            // pt_PT 
    "\u0412\u0445\u043E\u0434", "\u0412\u043E\u0439\u0442\u0438",                                   // ru_RU 
    "Prihl\xE1si\u0165 sa",                                                                         // sk_SK 
    "Prijavite se", "\u041F\u0440\u0438\u0458\u0430\u0432\u0438 \u0441\u0435",                      // sr_RS 
    "Logga in",                                                                                     // sv_SE 
    "Oturum A\xE7", "Giri\u015F Yap",                                                               // tr_TR 
    "\u767B\u5165",                                                                                 // zh_CN 
    "\u767B\u5F55"                                                                                  // zh_TW 
];

var logoutRegxs = [
    "(sign|log)(.?)(out|off)",                                                                      // en_US 
    "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",                          // ar_AE 
    "Odhl\xE1sit",                                                                                  // cs_CZ 
    "Log af",                                                                                       // da_DK 
    "Abmelden",                                                                                     // de_DE 
    "\u0391\u03C0\u03BF\u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7",                                 // el_GR 
    "Cerrar sesi\xF3n", "Salir",                                                                    // es_ES 
    "Kirjaudu ulos",                                                                                // fi_FI 
    "Se d\xE9connecter", "D\xE9connexion",                                                          // fr_FR 
    "\u05D4\u05EA\u05E0\u05EA\u05E7",                                                               // he_IL 
    "Odjava",                                                                                       // hr_HR 
    "Kijelentkez\xE9s",                                                                             // hu_HU 
    "Disconnessione", "Esci",                                                                       // it_IT 
    "\u30ED\u30B0\u30A2\u30A6\u30C8",                                                               // ja_JP 
    "\uB85C\uADF8\uC544\uC6C3",                                                                     // ko_KR 
    "Afmelden",                                                                                     // nl_NL 
    "Logg av",                                                                                      // no_NO 
    "Wyloguj si\u0119",                                                                             // pl_PL 
    "Efetuar logout", "Salir",                                                                      // pt_BR 
    "Terminar Sess\xE3o",                                                                           // pt_PT 
    "\u0412\u044B\u0439\u0442\u0438", "\u0412\u044B\u0445\u043E\u0434",                             // ru_RU 
    "Odhl\xE1si\u0165 sa",                                                                          // sk_SK 
    "Odjavite se", "\u041E\u0434\u0458\u0430\u0432\u0438\u0442\u0435 \u0441\u0435",                 // sr_RS 
    "Logga ut", "Logg ut",                                                                          // sv_SE 
    "Oturumu Kapat", "\xC7\u0131k\u0131\u015F Yap",                                                 // tr_TR 
    "\u6CE8\u9500", "\u9000\u51FA",                                                                 // zh_CN 
    "\u767B\u51FA"                                                                                  // zh_TW 
];

_wa.LoginLinter.prototype.addReason = function (reason, flag) {
    this.reasons.push(reason);
    if (flag)
        this.flags[flag] = true;
};

/** looks for a login form */
_wa.LoginLinter.prototype.hasLoginForm = function () {
    // not implemented, using hints instead
    return Boolean(this.hints.hasLoginForm);
};

/** looks for a 2fa form */
_wa.LoginLinter.prototype.hasTwoFactorForm = function () {
    // not implemented, using hints instead
    return Boolean(this.hints.hasTwoFactorForm);
};

/** looks for a signup form */
_wa.LoginLinter.prototype.hasSignupForm = function () {
    // not implemented, using hints instead
    return Boolean(this.hints.hasSignupForm);
};

/** look for login links */
_wa.LoginLinter.prototype.hasLoginLink = function (els) {
    var re = new RegExp(loginRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        return _wa.$(el).text().match(re);
    });
};

/** look for login links */
_wa.LoginLinter.prototype.hasLoginInput = function (els) {
    var re = new RegExp(loginRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        return _wa.$(el).val().match(re);
    });
};

/** look for logout links */
_wa.LoginLinter.prototype.hasLogoutLink = function (els) {
    var re = new RegExp(logoutRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        return _wa.$(el).text().match(re) ||
            (_wa.$(el,el).find('img').attr('alt') && _wa.$(el,el).find('img').attr('alt').match(re));
    });
};

_wa.LoginLinter.prototype.hasNonHiddenLogoutLink = function (els) {
    var self = this;
    var re = new RegExp(logoutRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        // check if the element is hidden
        var imageAltText = _wa.$(el,el).find('img').attr('alt');
        return (_wa.$(el).text().match(re) || re.test(imageAltText)) && self.isVisible(el);
    });
};

/** look for logout input (fix facebook.com) */
_wa.LoginLinter.prototype.hasLogoutInput = function (els) {
    var re = new RegExp(logoutRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        return _wa.$(el).val().match(re);
    });
};

/** look for non hidden logout input */
_wa.LoginLinter.prototype.hasNonHiddenLogoutInput = function (els) {
    var self = this;
    var re = new RegExp(logoutRegxs.join('|'), 'i');
    return els.toArray().some(function (el) {
        return !!(_wa.$(el).val().match(re) && self.isVisible(el));
    });
};

/** look for login classes or ids */
_wa.LoginLinter.prototype.hasLoginAttribute = function () {
    var query = '[class*=login],[id*=login],[class*=signin],[id*=signin],' +
        '[class*=Login],[id*=Login],[class*=Signin],[id*=Signin]';
    var els = _wa.$(query, this.html);
    // make sure the element got some content
    return els.toArray().some(function (el) {
        return el.innerHTML && el.innerHTML.length;
    });
};

/** look for logout classes or ids */
_wa.LoginLinter.prototype.hasLogoutAttribute = function () {
    var query = '[class*=logout],[id*=logout],[class*=signout],[id*=signout],' +
        '[class*=Logout],[id*=Logout],[class*=Signout],[id*=Signout]';
    var els = new _wa.$(query, this.html);
    // make sure the element got some content
    return els.toArray().some(function (el) {
        return el.innerHTML && el.innerHTML.length;
    });
};

/** look for non hidden logout classes or ids */
_wa.LoginLinter.prototype.hasNonHiddenLogoutAttribute = function () {
    var self = this;
    var query = '[class*=logout],[id*=logout],[class*=signout],[id*=signout],' +
        '[class*=Logout],[id*=Logout],[class*=Signout],[id*=Signout]';
    var els = _wa.$(query, this.html);
    // make sure the element got some content
    return els.toArray().some(function (el) {
        return !!(el.innerHTML && el.innerHTML.length && self.isVisible(el));
    });
};

/** look for login in url */
_wa.LoginLinter.prototype.hasLoginUrl = function () {
    var re = /(sign|log)(.?)(in|on)/i;
    return this.url && Boolean(this.url.match(re));
};

/** look for an error message */
_wa.LoginLinter.prototype.hasLoginValidationError = function () {
    if (!this.loginFailedRegExp) {
        //Possible IDs
        var id = '(id|name|username|nick|screen name|handle|e-?mail( address)?|password|user id|login|account)';

        // List of possible error messages
        var rules = [
            'enter (a|an|your)?\\s?(valid)?\\s?' + id,
            '(forgot|reset) (your )?' + id,
            id + ' (you entered )?(is|were|was|are)?\\s?(locked|incorrect|invalid|missing|unknown|do not match)',
            id + ' was entered incorrectly',
            '(incorrect|invalid|unknown|wrong|not a valid) (avatar )?' + id,
            'enter a (value for|valid|correct) ' + id,
            id + '(is|has been) (temporarily )?(disabled|blocked|de-activated)',
            '(sign|signing|log|loging)(\s|-)?(in|on)? failed',
            'unable to (sign|signing|log|loging)(\s|-)?(in|on)?',
            id + ' (doesn\'t|does not) exist',
            '(does not|doesn\'t) match (an account|our records)',
            'the ' + id + ' or password (you) entered is not correct'
        ];

        var r = _wa.$(rules).toArray().map(function (rule) {
            return '(' + rule + ')';
        });

        this.loginFailedRegExp = new RegExp(r.join('|'), 'gi');
    }

    var text = _wa.$('div, span, p, section, h1, h2, h3, h4, li, article, nav, main, form', this.html).text();
    return Boolean(this.loginFailedRegExp.test(text));
};

_wa.LoginLinter.prototype.isVisible = function (el) {
    var computedStyle = this.w.getComputedStyle(el);

    var visibility = computedStyle.visibility || el.style.visibility;
    var display = computedStyle.display || el.style.display;
    var overflow = computedStyle.overflow || el.style.overflow;

    var visible = el.offsetLeft > -999 && el.offsetTop > -999 && visibility != 'hidden' && display != 'none';

    if (visible && overflow == 'hidden')
        visible = el.offsetHeight > 1 && el.offsetWidth > 1;

    if (visible && el.parentElement)
        visible = this.isVisible(el.parentElement);

    return visible;
};

_wa.$ = function () {
    var _context;
    return function (selector, context) {
        if (context) {
            _context = context;
        }

        var object = {
            context: context,
            nodeArray: [],

            length: function () {
                return this.nodeArray.length;
            },

            init: function () {
                this.context = this.context || _context;
                var nodes = this.find(selector);
                if (!this.isArray(nodes)) {
                    if (nodes.length && !nodes.nodeArray) {
                        this.nodeArray = this.makeArray(nodes);
                    } else {
                        if (nodes.nodeType) {
                            this.nodeArray.push(nodes);
                        }
                    }
                } else {
                    this.nodeArray = this.makeArray(nodes);
                }
                return this;
            },

            find: function (selector) {
                if (!selector) {
                    return null;
                }
                if ((typeof selector === 'string' || selector instanceof String)) {
                    if (this.context.querySelectorAll) {
                        try {
                            var nodes = this.context.querySelectorAll(selector);
                            if (nodes) {
                                this.nodeArray = this.makeArray(nodes);
                            }
                        } catch (error) {
                            //Do nothing
                        }
                    }
                    return this;
                }
                return selector;
            },

            attr: function (name) {
                var attributes = "";
                for (var i = 0; i < this.nodeArray.length; i++) {
                    var attribute = this.nodeArray[i].getAttribute(name);
                    if (attribute != null && attribute.length > 0) {
                        attributes += attribute;
                    }
                }
                return attributes;
            },

            text: function () {
                var text = "";
                for (var i = 0; i < this.nodeArray.length; i++) {
                    if (this.nodeArray[i].textContent) {
                        text += this.nodeArray[i].textContent;
                    } else {
                        text += this.nodeArray[i].innerText;
                    }
                }
                return text;
            },

            val: function () {
                var values = "";
                for (var i = 0; i < this.nodeArray.length; i++) {
                    if (this.nodeArray[i].value &&
                        this.nodeArray[i].value.length > 0) {
                        values += this.nodeArray[i].value;
                    }
                }
                return values;
            },

            isArray: function (obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            },

            toArray: function () {
                return this.nodeArray;
            },

            makeArray: function (nodes) {
                var array = [],
                    arrayObject;

                if (nodes && nodes.length) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes.item) {
                            if (nodes.item(i).nodeType == 1) {
                                array.push(nodes.item(i));
                            }
                        } else {
                            array.push(nodes[i]);
                        }
                    }
                }

                arrayObject = {};
                arrayObject.list = array;
                arrayObject.some = function (func) {
                    var len = this.list.length;
                    for (var i = 0; i < len; i++) {
                        if (i in this.list && func.call(null, this.list[i], i, this.list)) {
                            return true;
                        }
                    }
                    return false;
                };
                arrayObject.map = function (func) {
                    var len = this.list.length,
                        o = new Array(len);

                    for (var i = 0; i < len; i++) {
                        if (i in this.list) {
                            o[i] = func.call(null, this.list[i], i, this.list);
                        }
                    }
                    return o;
                };

                return arrayObject;
            }
        };

        return object.init();
    }
}();

_wa.DomDocument = function (x, mcHelper) {
    this.doc = x.document || x.originalTarget || document;
    this.helper = mcHelper;
    this.x = x;
    this.window = null;
    this.entryCheckAttribute = "WAid71FA0D88-5390-4b5b-A2F4-E45FA93D85E2";
    this.entryCheckValue = "SA password protect entry checker";
    this.log = null;
};

_wa.DomDocument.prototype.load = function (onload) {
    var self = this,
        body = this.doc.body,
        browser = "ie";

    if (typeof (this.helper.browser) !== "undefined") {
        browser = this.helper.browser;
    }

    if (browser === "ff") {
        //Firefox needs to work with content.document.body.  Otherwise, IsAlreadyLoaded
        //will always return true even when MarkLoaded has executed before.
        try {
            body = content.document.body;
        } catch (x) {
            body = this.doc.body;
        }
    }

    //We want to add handlers only once, but McBrwCtl can run us more than once.
    //Thus, we check in here whether we've already run or not.
    if (this.isAlreadyLoaded(body)) {
        return;
    }
    this.markLoaded(body);

    if (browser === "ie") {
        try {
            this.window = this.doc.parentWindow;
            this.log = function (msg) {
                self.helper.log(msg);
            };
        } catch (error) {
            this.log(error.message);
        }
    } else if (browser === "ff") {
        try {
            this.window = this.x;
            this.log = function (msg) {
                self.x.console.log(msg);
            };
        } catch (error) {
            this.log(error.message);
        }
    } else if (browser === "ch") {
        try {
            this.window = window;
            this.log = function (msg) {
                console.log(msg);
            };
        } catch (error) {
            this.log(error.message);
        }
    }

    this.registerOnLoad(onload, self);
};

_wa.DomDocument.prototype.registerOnLoad = function (onload, self) {
    if (self && onload && typeof onload === "function") {
        if (this.window.document.readyState === "complete") {
            onload(self);
        } else {
            this.window.addEventListener("load", function () {
                onload(self);
            });
        }
    }
};

_wa.DomDocument.prototype.isAlreadyLoaded = function (body) {
    try {
        return body ? (body.getAttribute(this.entryCheckAttribute) === this.entryCheckValue) : false;
    }
    catch (e) {
        //do nothing - it's better to return false and execute twice than not at all
    }
    return false;
};

_wa.DomDocument.prototype.markLoaded = function (body) {
    try {
        if (body) {
            body.setAttribute(this.entryCheckAttribute, this.entryCheckValue);
        }
    }
    catch (e) {
        //nothing we can do if this encountered an exception
    }
};

_wa.passwordProtect = {
    addSubmitEventListener: function (document) {
        var doc = document.doc,
            log = document.log,
            inputs = doc.querySelectorAll("[type=password]"),
            hostName = doc.location.hostname,
            self = this,
            w = document.window,
            isLogin = false;

        try {
            var linter = new _wa.LoginLinter(doc, doc.URL, w, log);
            isLogin = linter.isLoginPage();
        } catch (error) {
            log(error.message);
        }

        var onSubmitEvent = function () {
            var passwords = this.querySelectorAll("[type=password]");

            for (var j = 0; j < passwords.length; ++j) {
                var password = passwords[j],
                    passwordValue = password.value;

                if (self.isValid(password) && isLogin) {
                    var params = hostName + " " + passwordValue,
                        COMMANDID_CHECK_PASSWORD = 2;
                    mcafee_wa_backgroundipc.executeCommand(COMMANDID_CHECK_PASSWORD, params);
                }
            }
        };

        for (var i = 0; i < inputs.length; ++i) {
            inputs[i].form.addEventListener("submit", onSubmitEvent);
        }
    },

    isValid: function (password) {
        return password.value.length > 0 && !password.disabled;
    }
};

// Add submit handlers to any forms with password fields that send 
// any submitted passwords to the plugins
// @param x - The WND, or the document, or nothing depending on browser
// @param mcHelper - object that has executeCommand function that sends password to plugin
function addPasswordHandler(x, mcHelper) {
    if (typeof _wa.DomDocument !== "undefined") {
        var domDocument = new _wa.DomDocument(x, mcHelper);
        domDocument.load(function (document) {
            _wa.passwordProtect.addSubmitEventListener(document);
        });
    }
};var mcafee_wa_bkcommon = function ()
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

}();function stat(regex, searchStatName, secureSearchStatName, engineAddendum, type)
{
	this._regex					= regex;
	this._searchStatName		= searchStatName;
	this._secureSearchStatName	= secureSearchStatName;
	this._engineAddendum        = engineAddendum;
    this._type                  = type;
};

var telemetryOrigin =
{
    typosquatting   : "TypoSquatting",
    blockpage       : "BlockPage",
    unknown         : "Unknown",
    defaultsearch   : "DefaultSearch",
    toolbar         : "Toolbar",
    blank           : ""
};


var mcafee_wa_telemetry = function()
{
    var stats =
    [
	    new stat(/^http(s)?:\/\/(us\.|ar\.|au\.|br\.|ca\.|fr\.|de\.|hk\.|in\.|it\.|kr\.|mx\.|es\.|tw\.|uk\.|cf\.|cl\.|co\.|id\.|nz\.|pe\.|ph\.|sg\.|th\.|espanol\.|ve\.|vn\.|malaysia\.)?search\.yahoo\.(com|co\.jp)\/yhs\/search.*(\?|&)hspart=mcafee/,
            "srch_t",
            "SecureSearchHit_",
            "_YahooYHS",
            telemetryOrigin.unknown
            ),
	    new stat(/^http(s)?:\/\/(us\.|ar\.|au\.|br\.|ca\.|fr\.|de\.|hk\.|in\.|it\.|kr\.|mx\.|es\.|tw\.|uk\.|cf\.|cl\.|co\.|id\.|nz\.|pe\.|ph\.|sg\.|th\.|espanol\.|ve\.|vn\.|malaysia\.)?search\.yahoo\.(com|co\.jp)\/search.*(\?|&)fr=mcafee/,
            "srch_h",
            "SecureSearchHit_",
            "_Yahoo",
            telemetryOrigin.defaultsearch
            ),
	    new stat(/^http(s)?:\/\/(us\.|ar\.|au\.|br\.|ca\.|fr\.|de\.|hk\.|in\.|it\.|kr\.|mx\.|es\.|tw\.|uk\.|cf\.|cl\.|co\.|id\.|nz\.|pe\.|ph\.|sg\.|th\.|espanol\.|ve\.|vn\.|malaysia\.)?search\.yahoo\.(com|co\.jp)\/search.*(\?|&)fr=(mcasa|mcsaoff|mcsaoffblock|slv8-mcafee|slv8-mc)/,
            "srch_p",
            "SecureSearchHit_",
            "_Yahoo",
            telemetryOrigin.toolbar
            ),
	    new stat(/^http(s)?:\/\/(www\.)?yandex\.(com|ru)\/yandsearch.*(\?|&)clid=1963438/,
            "srch_h",
            "SecureSearchHit_",
            "_Yandex",
            telemetryOrigin.defaultsearch
            )
    ];

    var _colourMap =
    {
        "OK"        : "GR",
        "CERTIFIED" : "GR",
        "INFO"      : "YW",
        "WARN"      : "RD",
        "HACKERSAFE": "HS",
        "CASHBACK"  : "CB",
        "UNKNOWN"   : "UN"
    };

    var _previousSearchTerm     = null; // This is used to avoid sending search telemetry multiple times for same term.
    var _previousSearchEngine   = null;
    var _browserType = mcafee_wa_browsertypes.Unknown;
    var _impressions  = {};

    var getBrowserType = function ()
    {
        switch (_browserType)
        {
            case mcafee_wa_browsertypes.Firefox:
                return "FF";
            case mcafee_wa_browsertypes.Chrome:
                return "CH";
            case mcafee_wa_browsertypes.Agnostic:
                return "AG";
            case mcafee_wa_browsertypes.Opera:
                return "OP";
            case mcafee_wa_browsertypes.Edge:
                return "ED";
			case mcafee_wa_browsertypes.McAfeeSecureBrowser:
				return "MSB";
        }
        return "Unknown";
    };

    var init = function (browserType)
    {
        _browserType = browserType;
    };

	///Called when annotation is about to start for a page
	///@param url 				: The complete URL to the page that is getting annotated
	///@param searchEngineName	: The name of the search engine for the page
	///@param searchTerms 		: The search terms used by user in the page 
    var onBeginAnnotation= function ( url, searchEngineName, searchTerms )
    {
        // increment annotation page scan feature count
        mcafee_wa_backgroundipc.addPageScanStat();

        if (null != searchTerms && 'undefined' != typeof (searchTerms))
        {
            if ( _previousSearchTerm == null || _previousSearchTerm != searchTerms ||
                 _previousSearchEngine == null || _previousSearchEngine != searchEngineName )
            {
                mcafee_wa_backgroundipc.reportStat(mcafee_wa_telemetrycounters.incrstatsrchitunk + getBrowserType() + '_' + searchEngineName, searchTerms);
                _previousSearchTerm     = searchTerms       ;
                _previousSearchEngine   = searchEngineName  ;
            
                var type = telemetryOrigin.blank;

                if (url.match(/^http(s)?:\/\/.*&type=\w\d3/))
                {
                    type = telemetryOrigin.typosquatting;
                }
                else if (url.match(/^http(s)?:\/\/.*&type=\w\d4/))
                {
                    type = telemetryOrigin.blockpage;
                }

                for( var index= 0; index < stats.length; ++index )
                {
                    var curStat= stats[ index];
                    if( url.match( curStat._regex ) )
                    {
                        var typeOrigin = type == telemetryOrigin.blank ? curStat._type : type; //If empty then use the associated type else use the type set above.

                        mcafee_wa_backgroundipc.reportStat   (mcafee_wa_telemetrycounters.incrstat + curStat._searchStatName ,1 );
                        mcafee_wa_backgroundipc.reportStat   (mcafee_wa_telemetrycounters.incrstat + curStat._secureSearchStatName + typeOrigin + "_" +  getBrowserType() + curStat._engineAddendum, 1);
                    }
                }
            }
        }    
        _impressions = {};
    };
    
    ///Called when the balloon is about to be displayed. This is invoked just before displaying the balloon
    ///@param linkInfo	: The details of the link for the balloon that is getting displayed.
    ///@param document  : The document in which balloon is getting displayed
    ///@param uid       : The uid that is appended to each html elements in the balloon.
	var onShowBalloon = function( linkInfo,document, uid )
	{
	    var onclickstatname = "SERP_CL_" + _colourMap[linkInfo.score];
	    mcafee_wa_backgroundipc.reportStat(mcafee_wa_telemetrycounters.incrstat + onclickstatname, 1);
	};
	
	///Called upon completion of annotation for the page
	///@param url		: The uri of the page that has completed annotation
	var onCompleteAnnotation= function( url)
	{
	    for (var stat in _impressions)
	    {
	        mcafee_wa_backgroundipc.reportStat(mcafee_wa_telemetrycounters.incrstat + stat, _impressions[stat]);
	    }
	    _impressions = {};
	};
	
	var onAnnotatingLink = function( linkInfo, config)
	{
	    var statname = "SERP_VW_" + _colourMap[linkInfo.score];
	    if ("undefined" == typeof (_impressions[statname]))
	    {
	        _impressions[statname] = 1;
	    }
	    else
	    {
	        _impressions[statname]++;
	    }
	};

	return {
        init                : init                  ,
		onBeginAnnotation	: onBeginAnnotation		,
		onShowBalloon 		: onShowBalloon			,
		onCompleteAnnotation: onCompleteAnnotation	,
		onAnnotatingLink	: onAnnotatingLink
	};
	
	
} ();

var mcafee_wa_warnbannconsts = 
{
    WARNING_BANNER_BASIC: "WARNING_BANNER_BASIC",
    WARNING_BANNER_LIVE : "WARNING_BANNER_LIVE" ,
    show_all_content    : "show_all_content",
    close_btn_x         : "close_btn_x"
};

function mcafee_wa_warnbanner()
{
    this._document  = null  ;
    this._frameUrls = new Map();
    this._totalWhitelisted = 0;
};

//Hide the warning banner from top.
mcafee_wa_warnbanner.prototype.hideWarning= function() 
{
    var warning_banner = this._document.getElementById(mcafee_wa_warnbannconsts.WARNING_BANNER_BASIC);
    if (warning_banner) 
    {
        warning_banner.style.visibility = 'hidden';
    }

    var warning_banner_live = this._document.getElementById(mcafee_wa_warnbannconsts.WARNING_BANNER_LIVE);
    if (warning_banner_live) 
    {
        warning_banner_live.style.visibility = 'hidden';
    }
};

mcafee_wa_warnbanner.prototype.showAllContent= function() 
{
    var showAllContentButton        = this._document.getElementById(mcafee_wa_warnbannconsts.show_all_content);
    showAllContentButton.disabled = true;

    // For each of the blocked iFrame URIs now go ahead and whiltelist them.
    this._frameUrls.forEach( function ( value, key, map )
    {
        // Key is the actual uri and value is the redirectURI value that is received from native code.
        var uri = mcafee_wa_bkconstants.whitelistUrl + "&whitelisturl=" + key + "&" + mcafee_wa_bkconstants.redirectURL + "=" + value;
        mcafee_wa_backgroundipc.onNavigate(uri, -1);
    });
};

mcafee_wa_warnbanner.prototype.isBannerCreated = function ()
{
    var bannerElem = this._document.getElementById(mcafee_wa_warnbannconsts.WARNING_BANNER_LIVE);
    return ( null != bannerElem )
};

mcafee_wa_warnbanner.prototype.setWarningImage = function (image)
{
    var imageName = image.getAttribute("src");
    mcafee_wa_resourcemanager.getImage(imageName, function (imageData)
    {
        image.setAttribute("src", imageData);
    });
};

mcafee_wa_warnbanner.prototype.addFrameURI = function (frameURI, actualURI)
{
    this._frameUrls.set(frameURI, actualURI);
};

mcafee_wa_warnbanner.prototype.showWarningBanner = function (domdoc)
{
    this._document = domdoc;

    try
    {
        //store the frame Uris. Alll the Uris in this collection will be whitelisted if user wishes so.

        if (this.isBannerCreated())
        {
            return true;
        }
        
		var pThis= this;
		
		var warningHtml = mcafee_wa_resourcemanager.getHtml(mcafee_wa_constants.warningHtmlName, function (warningHtml)
		{
		    if (pThis.isBannerCreated())
		    {
		        return true;
		    }

		    if( null == warningHtml || "" == warningHtml )
		    {
		        return false;
		    }
			
			mcafee_wa_scriptinjector.injectscript( pThis._document, mcafee_wa_scripts.showiframe + mcafee_wa_scripts.hidewarning );

		    var bannerDiv = pThis._document.createElement("DIV");
		    bannerDiv.setAttribute("id", "BannerLayer" + mcafee_wa_globals.uid);

		    bannerDiv.innerHTML = warningHtml;
        
		    pThis._document.body.insertBefore(bannerDiv, pThis._document.body.childNodes[0]);

		    var warningBannerLive = pThis._document.getElementById(mcafee_wa_warnbannconsts.WARNING_BANNER_LIVE);
		    if( "undefined" != warningBannerLive && null != warningBannerLive )
		    {
		        warningBannerLive.style.visibility = 'visible';
			
		        var images = warningBannerLive.getElementsByTagName("img"); //Get the collection of images from the html and set appropriate content.

		        for (var index =0; index< images.length; ++index)
		        {
		            pThis.setWarningImage(images[index] );

		        }
		    }
		
		    var warningTextLive = pThis._document.getElementById("warning_text_live");
		    if( "undefined" != warningTextLive && null != warningTextLive)
		    {
		        mcafee_wa_resourcemanager.getResString("res_20041", function (bannerBlocked)
		        {
		            warningTextLive.innerHTML = bannerBlocked;
		        });
		        
		    }
        
		    var showAllContent = pThis._document.getElementById(mcafee_wa_warnbannconsts.show_all_content);
			if( null != showAllContent )
			{
			    mcafee_wa_resourcemanager.getResString("res_20042", function (showBlockedContent)
			    {
			        showAllContent.value = showBlockedContent;
			    });
			}
		});
       
    }
    catch(e)
    {
        mcafee_wa_globals.logger.error("showWarningBanner: " + e.message);
        return false;
    }
    return true;
};
function mcafee_wa_annotatehandler()
{
    this._mutationObserver = new mcafee_wa_mutationobserver();
};

mcafee_wa_annotatehandler.prototype.process = function (doc)
{
    ///reset the cache Statistics to zero each time.
    mcafee_wa_globals.cacheStats.localCacheHits = 0;
    mcafee_wa_globals.cacheStats.localCacheMiss = 0;

    ///This is a final check. Sometimes the tab is not yet created when we receive that
    ///tab is malicious from the cache so we are unable to update tab. In such scenario,
    ///this is the final line of defence. Yes, its a tad late but better late than never.
    mcafee_wa_backgroundipc.isPageBlocked( doc.location.href, function( response)
    {
        if( response.blocked == true )
        {
            mcafee_wa_globals.logger.log("Top page is blocked so redirecting to blockpage");
            window.location.replace(response.rediruri);
        }
    } );

    if (mcafee_wa_coreengine.annotate(doc))
    {
       this._mutationObserver.Observe(doc);
    }
};


mcafee_wa_annotatehandler.prototype.processpagemsg = function(event)
{
    switch (event.data.id)
    {
        case mcafee_wa_scriptmessages.msgShowBalloon:
            mcafee_wa_globals.eventHandler.showBalloon(event);
            break;
        case mcafee_wa_scriptmessages.msgHideBalloon:
            mcafee_wa_globals.eventHandler.hideBalloon(event);
            break;
        case mcafee_wa_scriptmessages.msgShowIFrame:
            this._warningBanner.showAllContent();
            break;
        case mcafee_wa_scriptmessages.msgHideWarning:
            this._warningBanner.hideWarning();
            break;
    }
};


mcafee_wa_annotatehandler.prototype.processmsg = function (request, fncallback)
{
    switch( request.command)
    {
        case mcafee_wa_commands.onredirectiframe:

            //web control doesn't have allow feature for blocked iframe
            if( mcafee_wa_bkconstants.enterprise == false)
            {
                if (null == this._warningBanner)
                {
                    this._warningBanner = new mcafee_wa_warnbanner();
                }
                var domain = mcafee_wa_uriparser.getParam(request.uri, "domain");
                var originalURI = mcafee_wa_uriparser.getParam(request.uri, 'originalURL');

                this._warningBanner.addFrameURI(domain, originalURI);//The blocked iFrame list is maintained to whitelist it if user clicks to show those ones.
                this._warningBanner.showWarningBanner(document);
            }
            break;

        case mcafee_wa_commands.whitelistediframe:

            // there is no iframewhilelisting for iframe its managed differently in web control through ePO policy
            if( mcafee_wa_bkconstants.enterprise == false)
            {
                if (++this._warningBanner._totalWhitelisted ==this._warningBanner._frameUrls.size) 
                {
                    window.location.reload();
                }
            }
            break;
    }
};


function mcafee_wa_standaloneclient()
{
    ///Called by password protection manager
    this.browser            = "ch";
    this._loadInvoked       = false;
    this._initialized       = false;
    this._handler           = null;
    this._messages          = [];
	this._otherExtensionEnabled =false;
    this._supportedFeatures = mcafee_wa_supportedfeatures.none;
};

mcafee_wa_standaloneclient.prototype.isLoaded = function ()
{
    return this._loadInvoked;
};


mcafee_wa_standaloneclient.prototype.processXYViewPortRequest = function()
{
    if (window != null) {
        var offsetX = (window.mozInnerScreenX - window.screenX) * window.devicePixelRatio;
        offsetX = Math.round(offsetX);
        var offsetY = (window.mozInnerScreenY - window.screenY) * window.devicePixelRatio;
        offsetY = Math.round(offsetY);
        return { 'X': offsetX, 'Y': offsetY };
    }
    return null;
};

mcafee_wa_standaloneclient.prototype.processpagemsg= function( event)
{
	 if( null != this._handler )
	 {
		this._handler.processpagemsg ( event); 
	 }
};

mcafee_wa_standaloneclient.prototype.initMsgHandler = function ()
{
    var pThis = this;

    chrome.runtime.onMessage.addListener(function (request, sender, fncallback)
    {
        var bRet = false; //If has to handle callback then bRet has to be true.

        try
        {
            if( null == pThis._handler )
            {
                mcafee_wa_globals.logger.log("Message received however handler not initialized so msg is cached");
                var obj = { 'request': request, 'sender': sender, 'fncallback': fncallback };
                pThis._messages.push(obj);
                return;
            }
            
            mcafee_wa_globals.logger.log(request.command + " received in frame with uri: " + document.location.href);

            if (mcafee_wa_bkconstants.enterprise == false && request.command == mcafee_wa_commands.getxyviewport)
            {
                var result = pThis.processXYViewPortRequest();
                fncallback(result);
            }
            else
            {
                pThis._handler.processmsg(request, fncallback);
            }

        }
        catch( exception )
        {
            mcafee_wa_globals.logger.error(exception);
        }
        return bRet;
    });

};


mcafee_wa_standaloneclient.prototype.init = function (supportedFeatures, otherExtensionEnabled)
{
    this._supportedFeatures 	= supportedFeatures;
    this._initialized       	= true;
	this._otherExtensionEnabled = otherExtensionEnabled;
	
	if( mcafee_wa_browsertypes.Chrome ==  mcafee_wa_settings.browsertype )
	{
		///If this extension is not expected to annotate & if other extension expected to annotate is disabled, then this extension
		///is going to show annotation for secure search alone.
		if( ( (this._supportedFeatures & mcafee_wa_supportedfeatures.annotations) == 0 ) && (false == otherExtensionEnabled)  )
		{
			mcafee_wa_globals.onlyShowMcAfeeSecure= true;
		}	
    }
    
    mcafee_wa_backgroundipc.getBingSecureSearchEnabled(function(isBingSecureSearchEnabled)
    {
        mcafee_wa_globals.isBingSecureSearchEnabled = isBingSecureSearchEnabled;
    });
};


mcafee_wa_standaloneclient.prototype.createHandler = function (doc)
{
    if (doc.defaultView == doc.defaultView.top)
    {
        if ((this._supportedFeatures & mcafee_wa_supportedfeatures.blockpages) && mcafee_wa_bkcommon.isSiteAdvisorURL(doc.location.href))
        {
            return new mcafee_wa_blockpagehandler();
        }
        else if ( 	this._supportedFeatures & mcafee_wa_supportedfeatures.annotations || this._supportedFeatures & mcafee_wa_supportedfeatures.iframeblocking || 
					mcafee_wa_browsertypes.Chrome ==  mcafee_wa_settings.browsertype )
        {
            return new mcafee_wa_annotatehandler();
        }
    }
    else if (this._supportedFeatures & mcafee_wa_supportedfeatures.iframeblocking)
    {
       return new mcafee_wa_iframehandler();
    }
    return null;
};


mcafee_wa_standaloneclient.prototype.process = function( doc)
{
    try
    {
        this._handler = this.createHandler(doc);
    
        if (null != this._handler)
        {
            this._handler.process(doc);

            for (var index = 0 ; index < this._messages.length; ++index)
            {
                this._handler.processmsg(this._messages[index].request, this._messages[index].fncallback);
            }
            this._messages = [];
        }
        ///password protection is also for iFrames
		if( 'undefined' != typeof(addPasswordHandler) && ((this._supportedFeatures & mcafee_wa_supportedfeatures.pprotection) !=0 ) )
		{
			addPasswordHandler(doc, this);
		}
        
       
    }
    catch(e)
    {
        mcafee_wa_globals.logger.error(e);
    }
};

mcafee_wa_standaloneclient.prototype.onDocumentComplete = function (e)
{
    var doc = e.target;
    if (doc instanceof HTMLDocument) 
    {
        this.process(doc);
    }
};

///Called by password protection manager.
mcafee_wa_standaloneclient.prototype.executeCommand = function (id, param)
{
    mcafee_wa_backgroundipc.executeCommand(id, param);
};


mcafee_wa_standaloneclient.prototype.handleEvent = function (event)
{
    try 
    {
        switch (event.type)
        {
            case "load":
                this._loadInvoked = true;
                if (this._initialized)
                {
                    mcafee_wa_globals.logger.log("Since initialized proceeding with handling of event from loadHandler for " + document.location.href);
                    this.onDocumentComplete(event);
                }
                break;
            default:
                break;
        };
    } 
    catch(exception) 
    {
        mcafee_wa_globals.logger.error(exception);
    }
};///The entry point to content script. Here logger object is created,
///browsertype is specified, telemetry object, dssRequestor and warning hander
///are created and then core engine is initialized. 


var mcafee_wa_main = function ()
{
    var _main = function ()
    {
        var client = new mcafee_wa_standaloneclient();
        client.initMsgHandler();
		
		var msgHandler= new mcafee_wa_msghandler();
		msgHandler.init ( client);

    	//EDGE development:
    	//For edge this needs to be wrapped into a try catch because it fails to execute this line....
    	//however window.addEventListener() can be called later...
    	// not sure why, possibly some internal object has not finished constructing
    	try
    	{
    		window.addEventListener("load", function() 
			{
				client.handleEvent( { 'type' : 'load', 'target' : document} );
				
			}, false);
    	}
    	catch(exception)
    	{
			console.log("exception adding event listener 'load'")
    	}
        

    	mcafee_wa_backgroundipc.getSupportedFeatures(function (supportedFeatures)
        {
            if (supportedFeatures.features == mcafee_wa_supportedfeatures.none)
            {
                return; //Tells that extension is in disabled state.
            }

            try
            {
                var browserType = mcafee_wa_browsertypefinder.getBrowserType(mcafee_wa_settings.browsertype);

                var coreProperties = new mcafee_wa_coreproperties();

                if (mcafee_wa_settings.loggertype == mcafee_wa_loggertype.nativeLogger)
                {
                    coreProperties.logger = new mcafee_wa_contentnativelogger(mcafee_wa_settings.logtype, browserType);
                }
                else
                {
                    coreProperties.logType = mcafee_wa_settings.logtype;
                }
                
                coreProperties.dssRequestor                 = new mcafee_wa_gtiproxy();
                coreProperties.events.onShowBalloon         = mcafee_wa_telemetry.onShowBalloon;
                coreProperties.events.onBeginAnnotation     = mcafee_wa_telemetry.onBeginAnnotation;
                coreProperties.events.onAnnotatingLink      = mcafee_wa_telemetry.onAnnotatingLink;
                coreProperties.events.onCompleteAnnotation  = mcafee_wa_telemetry.onCompleteAnnotation;
                coreProperties.debugMode                    = mcafee_wa_settings.debugmode;
                coreProperties.browserType                  = browserType;
                coreProperties.binjectBalloon               = mcafee_wa_browsertypes.Edge == browserType;
                coreProperties.debugTitle                   = mcafee_wa_bkcommon.toStringExtensionType(mcafee_wa_settings.extensiontype );


                //enterprise Web Control doesn't have feature for telemetry
                if (mcafee_wa_bkconstants.enterprise != true)
                {
                  mcafee_wa_telemetry.init(browserType); //Browser type is set during build by build script.
                }

                mcafee_wa_coreengine.init(coreProperties , function() 
                {
                    client.init(supportedFeatures.features, supportedFeatures.otherextensionenabled);
                    //If load was already fired then its time now to call the processDocument directly
                    //since the event will be missed otherwise.
                    if (client.isLoaded()) 
                    {
                        mcafee_wa_globals.logger.log("Since already loaded invoking processDocument explicitly for " + document.location.href);
                        client.process(document);
                    }
                } );


            }
            catch( exception )
            {
                mcafee_wa_globals.logger.log(exception);
            }

        } );

    };
    return {
        main: _main
    };
}();
mcafee_wa_main.main();