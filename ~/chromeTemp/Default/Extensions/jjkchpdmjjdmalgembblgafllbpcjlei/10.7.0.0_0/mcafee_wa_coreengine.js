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

function mcafee_wa_annotationevents()
{
    this.onShowBalloon          = null;//(link) //Fired when balloon is displayed.
    this.onBeginAnnotation      = null;//(url)  //Fired when annotation is about to start.
    this.onPreprocessLink       = null;//(href) //Fired for each link before sending dss request, provide a means to modify the link.
    this.onAnnotatingLink       = null;//(link) //Fired while annotating link.
    this.onCompleteAnnotation   = null;//(url)  //Fired after annotation is completed.
};
var mcafee_wa_annotationproperties =
{
    properties:
    {
        "HACKERSAFE"    :
        {
            "highlightColor"    : "#CCFFCC"                         ,
            "color"             : "green"                           ,
            "width"             : 68                                ,
            "height"            : 16                                ,
            "icon"              : "hackersafe.gif"                  ,
            "background_color"  : "#D9EAE2"                         ,
            "foreground_color"  : "#00753B"
        },

        "CERTIFIED"     :
        {
            "highlightColor"    : "#CCFFCC"                         ,
            "color"             : "green"                           ,
            "width"             : 16                                ,
            "height"            : 16                                ,
            "icon"              : "balloon_safe_annotation.png"     ,
            "background_color"  : "#D9EAE2"                         ,
            "foreground_color"  : "#00753B"
        },

        "OK"            :
        {
            "highlightColor"    : "#CCFFCC"                         ,
            "color"             : "green"                           ,
            "width"             : 16                                ,
            "height"            : 16                                ,
            "icon"              : "balloon_safe_annotation.png"     ,
            "background_color"  : "#D9EAE2"                         ,
            "foreground_color"  : "#00753B"
        },

        "INFO"          :
        {
            "highlightColor"    : "#F7F995"                         ,
            "color"             : "yellow"                          ,
            "width"             : 16                                ,
            "height"            : 16                                ,
            "icon"              : "balloon_warning_annotation.png"  ,
            "background_color"  : "#FFF8E0"                         ,
            "foreground_color"  : "#FFCC00"
        },

        "WARN":
        {
            "highlightColor"    : "#FFAAAA"                         ,
            "color"             : "red"                             ,
            "width"             : 16                                ,
            "height"            : 16                                ,
            "icon"              : "balloon_threat_annotation.png"   ,
            "background_color"  : "#F9E2E8"                         ,
            "foreground_color"  : "#CC0033"
        },

        "UNKNOWN":
        {
            "highlightColor"    : "#FFFFFF"                         ,
            "color"             : "white"                           ,
            "width"             : 16                               ,
            "height"            : 16                                ,
            "icon"              : "untested.gif"                    ,
            "background_color"  : "#E1E1E1"                         ,
            "foreground_color"  : "#999999"
        }
    }
};
var mcafee_wa_array = function ()
{
    var FindItem = function(array, fn)
    {
        for (var index in array)
        {
            if (fn(array[index]) === true)
            {
                return array[index];
            }
        }
        return null;
    };

    var RemoveItem= function(array, element)
    {
        for (var index in array)
        {
            if (array[index] == element)
            {
                array.splice(index, 1);
                return true;
            }
        }
        return false;
    };


    var ForEachItem = function (array, fn, context)
    {
        for (var i = 0, len = array.length; i < len; ++i)
        {
            fn(array[i], context);
        }
            
    };


    return  {
        Remove      : RemoveItem    ,
        Find        : FindItem      ,
        ForEach     : ForEachItem
    };

} ();
var mcafee_wa_balloonproperties =
{
    properties :
    {
        "balloonHtmlName"   : "annotationballoon.html",
        "title"             : "McAfee Endpoint Security",
        "logo"              :  "button_red.gif",
        "width"             : "360px",
        "appearance"        :
         {
            "hackersafe":
            {
                srcImage       :    "hs_icon.gif",
                borderColor    :    "#52b600",
                backgroundColor:    "#52b600"
            },
            "green":
            {
                srcImage       :    "balloon_safe_icon.png",
                borderColor    :    "#52b600",
                backgroundColor:    "#52b600"
            },
             "yellow":
             {
                 srcImage       :   "balloon_warning_icon.png",
                 borderColor    :   "#fdae13",
                 backgroundColor:   "#fdae13"
             },
             "red":
             {
                 srcImage       :   "balloon_threat_icon.png",
                 borderColor    :   "#d31245",
                 backgroundColor:   "#d31245"
             },
             "white":
             {
                 srcImage       :   "w_icon.gif",
                 borderColor    :   "#B9B9B9",
                 backgroundColor:   "#B9B9B9"
             }
         }
    }
};var mcafee_wa_constants =
{
    mcafee_wa_config            : "mcafee_wa_config"             ,
    mcafee_wa_ann               : "mcafee_wa_ann"                ,
    mcafee_wa_processedtag      : "mcafee_wa_processedtag"       ,
    expectedcount               : "mcafee_wa_expectedcount"      ,
    harvestingTime              : "mcafee_wa_harvestingtime"     ,
    annotationTime              : "mcafee_wa_annotationtime"     ,
    dssRequestTime              : "mcafee_wa_requesttime"        ,
    statisticsTag               : "mcafee_wa_statistics"         ,
    bubbleLayer                 : "BubbleLayer"                  ,
    mcafee_wa_blnimages         : "sc_mcafee_wa_blnimages"       ,
    mcafee_wa_configsc          : "sc_mcafee_wa_configsc"        ,
    mcafee_wa_pagesc            : "sc_mcafee_wa_pagesc"          ,
    maxCacheRecords             : 1000                           ,
    ScoreMinimal                : 15                             ,
    ScoreUnknown                : 30                             ,
    ScoreMedium                 : 50                             ,
    warningHtmlName             : "wa-warning.html",
    annDivDefaultStyle          : "margin-left: 2px; position: relative; display: inline; cursor: auto; width: 16px;  height:16px; float: none; padding:0",
    annDivInline                : "display: inline",
    annDivNonInline             : "line-height:100%",
    scoreToColor                : {"HACKERSAFE":"green", "OK":"green", "CERTIFIED":"green", "INFO":"yellow", "WARN":"red", "UNKNOWN":"white", "":"white"},
    secureSearchEngineName      : "yahoo",
    enterprise                  : true
};mcafee_wa_logtypes = {
    None    : 0,
    Info    : 1,
    Err     : 2,
    All     : 3
};var mcafee_wa_resources= {
	IDS_PROVOCATIVEATTIRE	:	12035,
	IDS_INCIDENTALNUDITY	:	12077,
	IDS_TOBACCO	:	12049,
	IDS_ONLINESHOPPING	:	12034,
	IDS_REDIRECTURL_PHISHING	:	1001,
	IDS_HISTORICALREVISIONISM	:	12086,
	IDS_NUDITY	:	12031,
	IDS_PLUSPRODUCTNAME_W_TM	:	213,
	IDS_MEDIADOWNLOADS	:	12028,
	IDS_VERSION	:	170,
	IDS_BUILD	:	172,
	IDS_HACKINGCOMPUTERCRIME	:	12017,
	IDS_FORKIDS	:	12094,
	IDS_ENTERTAINMENTCULTURE	:	14102,
	IDS_LOCALE_DISPLAY	:	101,
	IDS_SPORTS	:	12044,
	IDS_PROFANITY	:	12058,
	IDS_PLUSEXTENSION	:	209,
	IDS_LIFESTYLE	:	14106,
	IDS_SITEDETAILS	:	166,
	IDS_MCAFEEWEBADVISORTEXT	:	30010,
	IDS_LANGUAGE_SHORT	:	102,
	IDS_RELIGIONIDEOLOGY	:	12041,
	IDS_LASTUPDATE	:	173,
	IDS_SAFESEARCH_CashBack	:	20034,
	IDS_URL_CASHBACK_EBATES_PORTAL	:	1116,
	IDS_SAFESEARCH_moreInfoElipses	:	20022,
	IDS_TEXTTRANSLATORS	:	12092,
	IDS_ILLEGALUK	:	12101,
	IDR_MENU_TOOLBAR	:	103,
	IDS_MODERATED	:	12096,
	IDS_SPAMURLS	:	12069,
	IDS_MCAFEEWEBADVISOR	:	30006,
	IDS_ANONYMIZINGUTILITIES	:	12004,
	IDS_LANGUAGE	:	171,
	IDS_USENETNEWS	:	12030,
	IDS_PROFESSIONALNETWORKING	:	12090,
	IDS_MCAFEEWEBADVISORLIVETEXT	:	30011,
	IDS_WARNING_CAREFUL_REC	:	3321,
	IDS_RECREATIONHOBBIES	:	12083,
	IDS_SAFESEARCH_CC_Header	:	20029,
	_APS_NEXT_SYMED_VALUE	:	60001,
	IDS_WARNING_UNSAFE_REC	:	3320,
	IDS_INTERACTIVEWEBAPPLICATIONS	:	12070,
	IDS_LOCALE_POSIX	:	100,
	IDS_REALESTATE	:	12082,
	IDS_ALCOHOL	:	12002,
	IDS_INFORMATIONCOMMUNICATION	:	14105,
	IDS_UNDOCK_YT_MSG	:	4000,
	IDS_SOCIETYEDUCATIONRELIGION	:	14111,
	IDS_UNDOCK_YT_DONE_MSG	:	4001,
	IDS_PLUSPRODUCTNAME	:	212,
	IDS_BROWSEREXPLOITS	:	12098,
	IDS_STREAMINGMEDIA	:	12045,
	IDS_BANNER_BLOCKED	:	20041,
	IDS_CONTROVERSIALOPINIONS	:	12100,
	IDS_GENERALNEWS	:	12033,
	IDS_URL_CLIENT_UPSELL	:	1110,
	IDS_PORNOGRAPHY	:	12047,
	IDS_PUBLICINFORMATION	:	12007,
	IDS_SAFESEARCH_okMsg	:	20010,
	IDS_ENTERTAINMENT	:	12011,
	IDS_RESIDENTIALIPADDRESSES	:	12105,
	IDS_WARNINGTEXT_UNSAFE_BLURB	:	3305,
	IDS_WARNINGTEXT_CAREFUL_BLURB	:	3306,
	ID_TOOL_MORE	:	113,
	IDS_SOCIALNETWORKING	:	12091,
	IDS_HEALTH	:	12018,
	IDS_DATINGPERSONALS	:	12088,
	IDS_HS_Recommendation	:	20031,
	IDS_INTERNETSERVICES	:	12075,
	IDS_BANNER_WARNING	:	20040,
	IDS_INFORMATIONTECHNOLOGY	:	14104,
	IDS_PHARMACY	:	12080,
	IDS_WEAPONS	:	12053,
	IDS_FINANCEBANKING	:	12013,
	IDS_BANNER_SHOWCONTENT	:	20042,
	IDS_DRUGS	:	12009,
	IDS_SEARCHENGINES	:	12043,
	IDS_EDUCATIONREFERENCE	:	12010,
	IDS_SHAREWAREFREEWARE	:	12046,
	IDS_BLOGSWIKI	:	12084,
	IDS_ARTCULTUREHERITAGE	:	12001,
	IDS_ILLEGALSOFTWARE	:	12073,
	IDS_TECHNICALINFORMATION	:	12087,
	IDS_SEARCHBOX_EMPTYTEXT	:	4102,
	IDS_P2PFILESHARING	:	12036,
	IDS_WEBMEETINGS	:	12093,
	IDS_PERSONALPAGES	:	12038,
	IDS_MAJORGLOBALREGIONS	:	12102,
	IDS_BUSINESS	:	12005,
	IDS_SEXUALMATERIALS	:	12060,
	_APS_NEXT_COMMAND_VALUE	:	40001,
	IDS_GAMBLING	:	12014,
	IDS_GAMES	:	12015,
	ID_TOOL_SETTINGS	:	114,
	IDS_SAFESEARCH_redMsg	:	20033,
	IDS_INSTALL_DONE_MSG	:	10016,
	IDS_URL_UPGRADE_MSADP	:	1107,
	IDS_WEBPHONE	:	12055,
	IDS_DIGITALPOSTCARDS	:	12085,
	IDS_CHROMEWARNING_MSG	:	3166,
	IDS_GAMBLINGRELATED	:	12064,
	IDS_INSTANTMESSAGING	:	12021,
	ID_TOOL_SETTINGS_SEARCH	:	128,
	IDS_SAFESEARCH_bannerWarn	:	20017,
	IDS_POLITICSOPINION	:	12037,
	IDS_INSTALL_CLOSE_BROWSER_MSG	:	10019,
	IDS_PURCHASING	:	14109,
	IDS_CONTENTSERVER	:	12074,
	IDS_COMPANYNAME	:	207,
	IDS_INSTALL_WIZARD_REBOOT_REQUIRED	:	2918,
	IDS_ANONYMIZERS	:	12003,
	_APS_NEXT_RESOURCE_VALUE	:	30008,
	IDS_PUPS	:	12104,
	IDS_JOBSEARCH	:	12024,
	IDS_INTERNETRADIOTV	:	12023,
	IDS_AUCTIONSCLASSIFIEDS	:	12056,
	IDS_RISKFRAUDCRIME	:	14110,
	IDS_INFORMATIONSECURITY	:	12025,
	IDS_PORNOGRAPHYNUDITY	:	14108,
	IDS_HISTORY	:	12095,
	IDS_MARKETINGMERCHANDISING	:	12078,
	IDS_SAFESEARCH_cautionMsg	:	20009,
	IDS_GRUESOMECONTENT	:	12061,
	IDS_SAVE	:	164,
	IDS_CONSUMERPROTECTION	:	12099,
	IDS_SEARCHBUTTON_TOOLTIP	:	4101,
	IDS_REDIRECTURL_RESTRICTED	:	1000,
	IDS_BUSINESSSERVICES	:	14100,
	IDS_HUMORCOMICS	:	12019,
	IDS_SCHOOLCHEATINGINFORMATION	:	12059,
	IDS_FORUMBULLETINBOARDS	:	12057,
	IDS_SEARCHBUTTON_LABEL	:	4100,
	IDS_WEBMAIL	:	12054,
	IDS_SAFESEARCH_untestedMsg	:	20008,
	IDS_VIOLENCE	:	12051,
	IDS_EXTREME	:	12012,
	IDS_VISUALSEARCHENGINE	:	12062,
	IDS_RESOURCESHARING	:	12042,
	IDS_PARKEDDOMAIN	:	12079,
	_APS_NEXT_CONTROL_VALUE	:	50001,
	IDS_HATEDISCRIMINATION	:	12020,
	IDS_MALICIOUSSITES	:	12029,
	IDS_SPYWAREADWARE	:	12048,
	IDS_GAMESGAMBLING	:	14103,
	IDS_PERSONALNETWORKSTORAGE	:	12068,
	IDS_MOTORVEHICLES	:	12089,
	IDS_MEDIASHARING	:	12076,
	IDS_WARNING_REPUTATION_REC	:	3322,
	IDS_TRAVEL	:	12050,
	IDS_MESSAGING	:	12065,
	IDS_YAHOO_SEARCH_DISPLAYNAME	:	11010,
	IDS_SAFESEARCH_UPSELL	:	140,
	IDS_PORTALSITES	:	12039,
	IDS_BANNER_BLOCKED_TITLE	:	20043,
	IDS_TEXTSPOKENONLY	:	12097,
	IDS_GAMECARTOONVIOLENCE	:	12066,
	IDS_PHISHING	:	12067,
	IDS_SAFESEARCH_unsafeLinks	:	20018,
	IDS_URL_HELP	:	1102,
	IDS_RESTAURANTS	:	12081,
	IDS_CHAT	:	12006,
	IDS_DRUGSGROUP	:	14101,
	IDS_MATUREVIOLENT	:	14107,
	IDS_MOBILEPHONE	:	12027,
	IDS_MCAFEEWEBADVISORLIVE	:	30009,
	IDS_SAFESEARCH_yahoo_block_text	:	20028,
	IDS_GOVERNMENTMILITARY	:	12016,
	IDS_UNINSTALL_REBOOT_MSG	:	3752,
	IDS_WEBADS	:	12052,
	IDS_DATINGSOCIALNETWORKING	:	12026,
	IDS_CRIMINALACTIVITIES	:	12008,
	IDS_PRODUCTNAME	:	208,
	IDS_MALICIOUSDOWNLOADS	:	12103,
	IDS_SOFTWAREHARDWARE	:	12072,
	IDS_TECHNICALBUSINESSFORUMS	:	12063,
	IDS_VIEWSITEREPORT	:	30007,
	IDS_REMOTEACCESS	:	12040,
	IDS_FASHIONBEAUTY	:	12071,
	IDS_NONPROFITADVOCACYNGO	:	12032,
	IDS_STOCKTRADING	:	12022,
	IDS_WARNINGTEXT_REPUTATION_BLURB	:	3302
};mcafee_wa_scores = {
    Ok      : 0,
    Unknown : 1,
    Info    : 2,
    War     : 3
};
var mcafee_wa_scriptinjector = function ()
{
	var injectscript = function (document, script)
	{
		var customscript = document.createElement("script");
        customscript.setAttribute("type", "text/javascript");
        customscript.innerHTML = script;
        document.getElementsByTagName("head")[0].appendChild(customscript);
	};
	
	return {
		
		injectscript:injectscript
	};
	
}();
//The ids specified in each of the scripts below are the same as in mcafee_wa_scriptmessages

var mcafee_wa_scripts = {
    showballoon: "function wa_showballoon(ev) 		{ var toId = ev.target.getAttribute('id');  window.postMessage({ type: 'message', 'id': 1, 'toId': toId }, '*'); };",
    hideballoon: "function wa_hideballoon(ev) 		{ var toId = ev.relatedTarget.getAttribute('id');  window.postMessage({ type: 'message', 'id': 2, 'toId': toId }, '*'); };",
    showiframe: "function wa_showallblocked(ev) 	{ window.postMessage({ type: 'message', 'id' : 3 }, '*'); };",
    hidewarning: "function wa_hidebanner    (ev) 	{ window.postMessage({ type: 'message', 'id' : 4 }, '*'); };"
};mcafee_wa_senginetypes= {
    SearchEngine_UNKNOWN        :   0   ,
    SearchEngine_GOOGLE         :   1   ,
    SearchEngine_YAHOO          :   2   ,
    SearchEngine_MSN            :   3   ,
    SearchEngine_AOL            :   4   ,
    SearchEngine_ASK            :   5   ,
    SearchEngine_UOL            :   6   ,
    SearchEngine_GOO            :   7   ,
    SearchEngine_MYWAY          :   8   ,
    SearchEngine_BAIDU          :   9   ,
    SearchEngine_LIVE           :   10  ,
    SearchEngine_TERRA          :   11  ,
    SearchEngine_COMCAST        :   12  ,
    SearchEngine_WEB            :   13  ,
    SearchEngine_BIGLOBE        :   14  ,
    SearchEngine_SONET          :   15  ,
    SearchEngine_COX            :   16  ,
    SearchEngine_GMX            :   17  ,
    SearchEngine_EXCITE         :   18  ,
    SearchEngine_SKY            :   19  ,
    SearchEngine_NATE           :   20  ,
    SearchEngine_NAVER          :   21  ,
    SearchEngine_NIFTY          :   22  ,
    SearchEngine_BING           :   23  ,
    SearchEngine_RAKUTAN        :   24  ,
    SearchEngine_YANDEX         :   25  ,
    SearchEngine_SN_LINKEDIN    :   26  ,
    SearchEngine_SN_GOOGLEPLUS  :   27  ,
    SearchEngine_SN_FACEBOOK    :   28  ,
    SearchEngine_WEBMAIL        :   100
};function mcafee_wa_statistics()
{
    this._document = null;
    this._scores = {};
};

mcafee_wa_statistics.prototype.setHiddenValue = function (name, value)
{
    var statDiv = this._document.getElementById(mcafee_wa_constants.statisticsTag);
    if (null == statDiv)
    {
        statDiv = this._document.createElement("DIV");
        statDiv.setAttribute("title", mcafee_wa_constants.statisticsTag);
        statDiv.setAttribute("id"  , mcafee_wa_constants.statisticsTag);
        statDiv = this._document.body.insertBefore(statDiv, null);
    }

    var element= this._document.getElementById(name);
    if( null == element )
    {
        element = this._document.createElement("DIV");
        element.setAttribute("id", name);
        element = statDiv.appendChild(element);
    }
    element.setAttribute("title", name+ "-" + value);

};

mcafee_wa_statistics.prototype.setDocument = function (document)
{
    if (this._document == document && this._scores != null ) //empty values now.
    {
        for (score in this._scores)
        {
            var element = this._document.getElementById(score);
            if (null != element)
            {
                element.setAttribute("title", "0");
            }
        }

    }

    this._document = document;
    this._scores   = {};
};

mcafee_wa_statistics.prototype.setExpectedCount = function (count)
{
    this.setHiddenValue(mcafee_wa_constants.expectedcount, count);
};

mcafee_wa_statistics.prototype.incrementScore = function (score)
{
    var scoreName = "mcafee_wa_" + score;

    if ("undefined" == typeof (this._scores[scoreName] ))
    {
        this._scores[scoreName] = 0;
    }
    this._scores[scoreName]++;
};

mcafee_wa_statistics.prototype.setHarvestingTime = function (timeInMilli)
{
    this.setHiddenValue(mcafee_wa_constants.harvestingTime, timeInMilli);
};

mcafee_wa_statistics.prototype.setDSSRequestTime = function (timeInMilli)
{
    this.setHiddenValue(mcafee_wa_constants.dssRequestTime, timeInMilli);
};

mcafee_wa_statistics.prototype.setAnnotationTime = function (timeInMilli)
{
    this.setHiddenValue(mcafee_wa_constants.annotationTime, timeInMilli);
};

mcafee_wa_statistics.prototype.setScores = function ()
{
    for (score in this._scores)
    {
        this.setHiddenValue(score, this._scores[score]);
    }
};var mcafee_wa_categorymap = function ()
{
    var toCategoryResId = function (categoryId)
    {
        var resId = 0;

        switch (categoryId)
        {
            case 100:
                resId = mcafee_wa_resources.IDS_ARTCULTUREHERITAGE; break;
            case 101:
                resId = mcafee_wa_resources.IDS_ALCOHOL; break;
            case 102:
                resId = mcafee_wa_resources.IDS_ANONYMIZERS; break;
            case 104:
                resId = mcafee_wa_resources.IDS_ANONYMIZINGUTILITIES; break;
            case 105:
                resId = mcafee_wa_resources.IDS_BUSINESS; break;
            case 106:
                resId = mcafee_wa_resources.IDS_CHAT; break;
            case 108:
                resId = mcafee_wa_resources.IDS_PUBLICINFORMATION; break;
            case 109:
                resId = mcafee_wa_resources.IDS_CRIMINALACTIVITIES; break;
            case 110:
                resId = mcafee_wa_resources.IDS_DRUGS; break;
            case 111:
                resId = mcafee_wa_resources.IDS_EDUCATIONREFERENCE; break;
            case 112:
                resId = mcafee_wa_resources.IDS_ENTERTAINMENT; break;
            case 113:
                resId = mcafee_wa_resources.IDS_EXTREME; break;
            case 114:
                resId = mcafee_wa_resources.IDS_FINANCEBANKING; break;
            case 115:
                resId = mcafee_wa_resources.IDS_GAMBLING; break;
            case 116:
                resId = mcafee_wa_resources.IDS_GAMES; break;
            case 117:
                resId = mcafee_wa_resources.IDS_GOVERNMENTMILITARY; break;
            case 118:
                resId = mcafee_wa_resources.IDS_HACKINGCOMPUTERCRIME; break;
            case 119:
                resId = mcafee_wa_resources.IDS_HEALTH; break;
            case 120:
                resId = mcafee_wa_resources.IDS_HUMORCOMICS; break;
            case 121:
                resId = mcafee_wa_resources.IDS_HATEDISCRIMINATION; break;
            case 122:
                resId = mcafee_wa_resources.IDS_INSTANTMESSAGING; break;
            case 123:
                resId = mcafee_wa_resources.IDS_STOCKTRADING; break;
            case 124:
                resId = mcafee_wa_resources.IDS_INTERNETRADIOTV; break;
            case 125:
                resId = mcafee_wa_resources.IDS_JOBSEARCH; break;
            case 126:
                resId = mcafee_wa_resources.IDS_INFORMATIONSECURITY; break;
            case 127:
                resId = mcafee_wa_resources.IDS_DATINGSOCIALNETWORKING; break;
            case 128:
                resId = mcafee_wa_resources.IDS_MOBILEPHONE; break;
            case 129:
                resId = mcafee_wa_resources.IDS_MEDIADOWNLOADS; break;
            case 130:
                resId = mcafee_wa_resources.IDS_MALICIOUSSITES; break;
            case 131:
                resId = mcafee_wa_resources.IDS_USENETNEWS; break;
            case 132:
                resId = mcafee_wa_resources.IDS_NUDITY; break;
            case 133:
                resId = mcafee_wa_resources.IDS_NONPROFITADVOCACYNGO; break;
            case 134:
                resId = mcafee_wa_resources.IDS_GENERALNEWS; break;
            case 136:
                resId = mcafee_wa_resources.IDS_ONLINESHOPPING; break;
            case 137:
                resId = mcafee_wa_resources.IDS_PROVOCATIVEATTIRE; break;
            case 138:
                resId = mcafee_wa_resources.IDS_P2PFILESHARING; break;
            case 139:
                resId = mcafee_wa_resources.IDS_POLITICSOPINION; break;
            case 140:
                resId = mcafee_wa_resources.IDS_PERSONALPAGES; break;
            case 141:
                resId = mcafee_wa_resources.IDS_PORTALSITES; break;
            case 142:
                resId = mcafee_wa_resources.IDS_REMOTEACCESS; break;
            case 143:
                resId = mcafee_wa_resources.IDS_RELIGIONIDEOLOGY; break;
            case 144:
                resId = mcafee_wa_resources.IDS_RESOURCESHARING; break;
            case 145:
                resId = mcafee_wa_resources.IDS_SEARCHENGINES; break;
            case 146:
                resId = mcafee_wa_resources.IDS_SPORTS; break;
            case 147:
                resId = mcafee_wa_resources.IDS_STREAMINGMEDIA; break;
            case 148:
                resId = mcafee_wa_resources.IDS_SHAREWAREFREEWARE; break;
            case 149:
                resId = mcafee_wa_resources.IDS_PORNOGRAPHY; break;
            case 150:
                resId = mcafee_wa_resources.IDS_SPYWAREADWARE; break;
            case 151:
                resId = mcafee_wa_resources.IDS_TOBACCO; break;
            case 152:
                resId = mcafee_wa_resources.IDS_TRAVEL; break;
            case 153:
                resId = mcafee_wa_resources.IDS_VIOLENCE; break;
            case 154:
                resId = mcafee_wa_resources.IDS_WEBADS; break;
            case 155:
                resId = mcafee_wa_resources.IDS_WEAPONS; break;
            case 156:
                resId = mcafee_wa_resources.IDS_WEBMAIL; break;
            case 157:
                resId = mcafee_wa_resources.IDS_WEBPHONE; break;
            case 158:
                resId = mcafee_wa_resources.IDS_AUCTIONSCLASSIFIEDS; break;
            case 159:
                resId = mcafee_wa_resources.IDS_FORUMBULLETINBOARDS; break;
            case 160:
                resId = mcafee_wa_resources.IDS_PROFANITY; break;
            case 161:
                resId = mcafee_wa_resources.IDS_SCHOOLCHEATINGINFORMATION; break;
            case 162:
                resId = mcafee_wa_resources.IDS_SEXUALMATERIALS; break;
            case 163:
                resId = mcafee_wa_resources.IDS_GRUESOMECONTENT; break;
            case 164:
                resId = mcafee_wa_resources.IDS_VISUALSEARCHENGINE; break;
            case 165:
                resId = mcafee_wa_resources.IDS_TECHNICALBUSINESSFORUMS; break;
            case 166:
                resId = mcafee_wa_resources.IDS_GAMBLINGRELATED; break;
            case 167:
                resId = mcafee_wa_resources.IDS_MESSAGING; break;
            case 168:
                resId = mcafee_wa_resources.IDS_GAMECARTOONVIOLENCE; break;
            case 169:
                resId = mcafee_wa_resources.IDS_PHISHING; break;
            case 170:
                resId = mcafee_wa_resources.IDS_PERSONALNETWORKSTORAGE; break;
            case 171:
                resId = mcafee_wa_resources.IDS_SPAMURLS; break;
            case 172:
                resId = mcafee_wa_resources.IDS_INTERACTIVEWEBAPPLICATIONS; break;
            case 174:
                resId = mcafee_wa_resources.IDS_FASHIONBEAUTY; break;
            case 175:
                resId = mcafee_wa_resources.IDS_SOFTWAREHARDWARE; break;
            case 176:
                resId = mcafee_wa_resources.IDS_ILLEGALSOFTWARE; break;
            case 177:
                resId = mcafee_wa_resources.IDS_CONTENTSERVER; break;
            case 178:
                resId = mcafee_wa_resources.IDS_INTERNETSERVICES; break;
            case 179:
                resId = mcafee_wa_resources.IDS_MEDIASHARING; break;
            case 180:
                resId = mcafee_wa_resources.IDS_INCIDENTALNUDITY; break;
            case 181:
                resId = mcafee_wa_resources.IDS_MARKETINGMERCHANDISING; break;
            case 183:
                resId = mcafee_wa_resources.IDS_PARKEDDOMAIN; break;
            case 184:
                resId = mcafee_wa_resources.IDS_PHARMACY; break;
            case 185:
                resId = mcafee_wa_resources.IDS_RESTAURANTS; break;
            case 186:
                resId = mcafee_wa_resources.IDS_REALESTATE; break;
            case 187:
                resId = mcafee_wa_resources.IDS_RECREATIONHOBBIES; break;
            case 188:
                resId = mcafee_wa_resources.IDS_BLOGSWIKI; break;
            case 189:
                resId = mcafee_wa_resources.IDS_DIGITALPOSTCARDS; break;
            case 190:
                resId = mcafee_wa_resources.IDS_HISTORICALREVISIONISM; break;
            case 191:
                resId = mcafee_wa_resources.IDS_TECHNICALINFORMATION; break;
            case 192:
                resId = mcafee_wa_resources.IDS_DATINGPERSONALS; break;
            case 193:
                resId = mcafee_wa_resources.IDS_MOTORVEHICLES; break;
            case 194:
                resId = mcafee_wa_resources.IDS_PROFESSIONALNETWORKING; break;
            case 195:
                resId = mcafee_wa_resources.IDS_SOCIALNETWORKING; break;
            case 196:
                resId = mcafee_wa_resources.IDS_TEXTTRANSLATORS; break;
            case 197:
                resId = mcafee_wa_resources.IDS_WEBMEETINGS; break;
            case 600:
                resId = mcafee_wa_resources.IDS_FORKIDS; break;
            case 601:
                resId = mcafee_wa_resources.IDS_HISTORY; break;
            case 602:
                resId = mcafee_wa_resources.IDS_MODERATED; break;
            case 603:
                resId = mcafee_wa_resources.IDS_TEXTSPOKENONLY; break;
            case 198:
                resId = mcafee_wa_resources.IDS_CONTROVERSIALOPINIONS; break;
            case 199:
                resId = mcafee_wa_resources.IDS_RESIDENTIALIPADDRESSES; break;
            case 200:
                resId = mcafee_wa_resources.IDS_BROWSEREXPLOITS; break;
            case 201:
                resId = mcafee_wa_resources.IDS_CONSUMERPROTECTION; break;
            case 202:
                resId = mcafee_wa_resources.IDS_ILLEGALUK; break;
            case 203:
                resId = mcafee_wa_resources.IDS_MAJORGLOBALREGIONS; break;
            case 204:
                resId = mcafee_wa_resources.IDS_MALICIOUSDOWNLOADS; break;
            case 205:
                resId = mcafee_wa_resources.IDS_PUPS; break;
        }
        return resId;

    };

    return {

        toCategoryResId: toCategoryResId
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
};///The messages below should be in sync with the id specified in mcafee_wa_scripts.js
var mcafee_wa_scriptmessages= {
	msgShowBalloon: 1,
	msgHideBalloon: 2,
	msgShowIFrame : 3,
	msgHideWarning: 4
};///This global object is used by core to store the properites that are shared across multiple objects in core.
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
    
}();
var mcafee_wa_resourcemanager= function ()
{
    var _resourceCache  = {};
    var _imageCache     = {};
    var _htmlCache      = {};
    var _jsonCache      = {};

    var getResString = function (resourceName, fnCallback)
    {
        try
        {
            var resValue = _resourceCache[resourceName] //Check cache.
            if (typeof (resValue) == "undefined" || null == resValue) //If not in cache.
            {
                mcafee_wa_globals.resourceRequestor.getResStr(resourceName, function (resValue)
                {
                    if (null != resValue && resValue.length > 0 )
                    {
                        mcafee_wa_globals.logger.log("Caching resource string : " + resourceName);
                        _resourceCache[resourceName] = resValue; //Since resource is retrieved store it in cache.
                        fnCallback(resValue);
                    }
                    else
                    {
                        mcafee_wa_globals.logger.error("Resource string " + resourceName + " failed to fetch through resource requestor");
                    }
                });
            }
            else
            {
                fnCallback(resValue);
            }
        }
        catch (err)
        {
            mcafee_wa_globals.logger.error(err);
        }
  
    }

    var getImage = function (imageName, fnCallback)
    {
        try
        {
            var image = _imageCache [ imageName]
            if (typeof (image) == "undefined")
            {
                mcafee_wa_globals.resourceRequestor.getImage(imageName, function (imageData)
                {
                    if (null != imageData && imageData.length > 0)
                    {
                        mcafee_wa_globals.logger.log("Caching image " + imageName);
                        _imageCache[imageName] = imageData;
                        fnCallback(imageData);
                    }
                    else
                    {
                        mcafee_wa_globals.logger.error("Image " + imageName + " failed to fetch through resource requestor");
                    }
                    
                });
            }
            else
            {
                fnCallback(image);
            }
        }
        catch (e)
        {
            mcafee_wa_globals.logger.error(e);
        }
    };

    var getCSSstyleImage = function (imageName, fnCallback) 
    { 
        getImageInternal(imageName, function (imageData)
        {
            var cssImage = "url(" + imageData + ")";
            fnCallback(cssImage);
        });
    };

    var getJSON = function (jsonName, fnCallback)
    {
        var json = null;
        try
        {
            json = _jsonCache[jsonName]
            if (typeof (json) == "undefined")
            {
                mcafee_wa_globals.resourceRequestor.getJSON(jsonName, function (jsonData)
                {
                    if (null != jsonData && jsonData.length > 0)
                    {
                        mcafee_wa_globals.logger.log("Caching json for " + jsonName);
                        _jsonCache[jsonName] = jsonData;
                        fnCallback(jsonData);
                    }
                    else
                    {
                        mcafee_wa_globals.logger.error("Failed to fetch json " + jsonName);
                    }
                    
                });
            }
            else
            {
                fnCallback(json);
            }
        }
        catch (e)
        {
            mcafee_wa_globals.logger.error(e);
        }

    };

    var getHtml = function (htmlName, fnCallback)
    {
        var html = null;
        try
        {
            html = _htmlCache[htmlName]
            if (typeof (html) == "undefined")
            {
                mcafee_wa_globals.resourceRequestor.getHtml(htmlName, function (htmlData)
                {
                    if (null != htmlData && htmlData.length > 0)
                    {
                        _htmlCache[htmlName] = htmlData;
                        mcafee_wa_globals.logger.log("Caching html " + htmlName);
                        fnCallback(htmlData);
                    }
                    else
                    {
                        mcafee_wa_globals.logger.error("Failed to retrieve html " + htmlName);
                    }
                    
                });
            }
            else
            {
                fnCallback(html);
            }
        }
        catch (e)
        {
            mcafee_wa_globals.logger.error(e);
        }
    };

    return {

        getCSSStyleImage    : getCSSstyleImage  ,
        getImage            : getImage          ,
        getResString        : getResString      ,
        getHtml             : getHtml           ,
        getJSON             : getJSON 
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

var mcafee_wa_stringhelper = function ()
{

    var trimInternal = function(str, chars)
    {
        return ltrimInternal(rtrimInternal(str, chars), chars);
    };

    var ltrimInternal = function (str, chars)
    {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    };

    var rtrimInternal = function (str, chars)
    {
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    };

    var toJSON = function (map)
    {
        var strJSON = "{";
        for (var strKey in map)
        {
            strJSON += "\"" + strKey + "\":\"" + map[strKey] + "\",";
        }
        strJSON = strJSON.replace(new RegExp(",$"), "}");
        return strJSON;
    };

    // Shorten long strings, and add ellipsis at the end
    var truncateStringInternal = function (str, maxLength)
    {
        if (null == str)
        {
            return "";
        }
        return str.length <= maxLength ? str : (str.substring(0, maxLength) + "...");
    };
			
    var convertObjectToStringInternal = function(obj) 
    {
        if(typeof(JSON) != "undefined" && typeof(JSON.stringify) != "undefined")
        {
            try 
            {
                return JSON.stringify(obj);
            }
            catch(err)
            {
                mcafee_wa_globals.logger.error(e);
            }
        }
			
        // TODO IE8 and up should support JSON.stringify, so this can be removed in the future
        if ( typeof(obj) != "object" )
        {
            if ( typeof(obj) == "number" || typeof(obj) == "boolean" )
            {
                return obj;
            }
            else if( typeof(obj) == "string")
            {
                return "\"" + obj.replace(/\"/g, "\'") + "\"";
            }
            else
            {
                return "\"\"";
            }
        }
			
        str = "{";
        for( attr in obj )
        {
            str += "\"" + attr + "\"" + ":" + convertObjectToString(obj[attr]);
            str += ",";
        }
        if( str.charAt(str.length - 1 ) == ',')
            str = str.substring(0, str.length - 1 );
        str += "}";
        return str;
			
    };

    return {
        trim                    : trimInternal,
        rtrim                   : rtrimInternal,
        ltrim                   : ltrimInternal,
        mapToString             : toJSON,
        truncateString          : truncateStringInternal,
        convertObjectToString   : convertObjectToStringInternal
    }
}();var mcafee_wa_timer= function()
{
    var _id      = null;
    var _window  = null;

    var setInternal = function( document, fn, valuems ) 
    {
        _window = document.parentWindow ? document.parentWindow : null;
        _id = _window != null ? _window.setTimeout(fn, valuems) : setTimeout(fn, valuems);
    };

    var clearInternal= function()
    {
        try
        {
            if ( null == _id)
            {
                return;
            }
            _window != null ? _window.clearTimeout(_id) : clearTimeout(_id);
            _id = null;
        }
        catch(e)
        { 
            mcafee_wa_globals.logger.error(e);
        }
    };

    return {

        id      : _id           ,
        set     : setInternal   ,
        clear   : clearInternal
    }


}();
function mcafee_wa_ballooncreator(document)
{
    this._document          = document;
    this._bubbleLayerElement= null;
};

//If ballon is already created in this document then no need to to attempt for re-creating it.
mcafee_wa_ballooncreator.prototype.isBalloonAlreadyCreated = function()
{
    this._bubbleLayerElement= this._document.getElementById(mcafee_wa_constants.bubbleLayer  + mcafee_wa_globals.uid);
    return( null != this._bubbleLayerElement );
};

///balloon div tag is created and then balloon html is inserted to the div tag. Each html elements within the 
///balloon is then provided with a unique id.
mcafee_wa_ballooncreator.prototype.createBalloon = function ()
{
    try
    {
        if (this.isBalloonAlreadyCreated())
        {
            return true;
        }

        mcafee_wa_globals.logger.log("Creating balloon bubble layer");

        var pThis = this;

        this._bubbleLayerElement                = this._document.createElement("div");
        this._bubbleLayerElement.style.cssText = "visibility:hidden;position:absolute;z-index:2147483647;";
         
        this._bubbleLayerElement.setAttribute("id", mcafee_wa_constants.bubbleLayer + mcafee_wa_globals.uid);
             
        mcafee_wa_resourcemanager.getHtml(mcafee_wa_globals.balloonProperties.properties.balloonHtmlName, function (balloonhtmlContent)
        {
            pThis._bubbleLayerElement.innerHTML = balloonhtmlContent;
             //Balloon html comes with default Ids. Here those ids are suffixed with uid to make it unique.					
            var allElements = pThis._bubbleLayerElement.getElementsByTagName("*");

            for (var index = 0 ; index < allElements.length; ++index)
            {
                var element = allElements[index];
                var currentId = element.getAttribute("id");
                if (null != currentId)
                {
                    element.setAttribute("id", currentId + mcafee_wa_globals.uid);
                }
            }
            pThis._document.body.insertBefore(pThis._bubbleLayerElement, pThis._document.body.childNodes[0]);

        });
    }
    catch (e)
    {
        mcafee_wa_globals.logger.error(e);
        return false;
    }
    return true;
};

function mcafee_wa_coreproperties()
{
    this.logger                 = null; //The logger object
    this.logType                = mcafee_wa_logtypes.None;  //The log type default is to not log anything.
    this.dssRequestor           = null  ;                   //The object to make URI reputation request.
    this.resourceRequestor      = null  ;                   //The object to read resources such as html, json, images & strings.
	this.resourceRootURI        = null  ;                   //The path to the resource location. This should be a web accessible root location.
	this.reputationReqCount     = 10    ;                   //The total number of reputations to send in a single request.
	this.balloonProperties      = null  ;                   //The properties for annotationBalloon. see mcafee_wa_balloonproperties.
	this.annotationProperties   = null  ;                   //The properties for annotation images. see mcafee_wa_annotationproperties.    
    this.events                 = new mcafee_wa_annotationevents();//The events fired by core engine.
    this.debugMode              = false ;                   //To turn on debug mode. Defaults to false.
    this.browserType            = -1;  //Unknown
    this.debugTitle             = "";
    this.binjectBalloon         = false;
};///The links within a page are harvested in this class. It first checks whether
///there are any links that are not annotated. To figure out whether a link is
///annotated or not, while annotating we add a new attribute by name saprocessedanchor
///for every annotated node. That way a recheck and resending of entry to dss Server is
///avoided. All links which are not annotated are then checked against each selector unless
///there is a match. If there is a match then that is the link which is send to receive
///notification. This class returns a collection of all such links that have to be
///annotated.

var mcafee_wa_uriFilterType=
{
    filterWithStartEnd : 0
};


var mcafee_wa_linkharvester = function ()
{
    var PROCESSED_TAG   = "saprocessedanchor";
    var ORIGINAL_TARGET = "original_target";

    var anchorHandler = function( anchor, unProcessedAnchors)
    {
        var processedtag= anchor.getAttribute( PROCESSED_TAG);
        if( "true" != processedtag )
        {
            var href = anchor.getAttribute("href");
            if (!href || href.length < 3 || href.substr(0,1) == "#" || ( (href.indexOf(".") == -1) && (href.indexOf("%2E") == -1) ) ) 
            {
                return;
            }
            unProcessedAnchors.push(anchor);
        }
    };

    ///Parse out the actual URI from within the complete href. The URI is between a 
    ///start and end tokens.
    var getFilteredURI = function (originalURI, filterObj)
    {
        if ("undefined" !== typeof filterObj)
        {
            var uri = decodeURIComponent(originalURI);
			switch (filterObj.filterType) 
            {
				case mcafee_wa_uriFilterType.filterWithStartEnd:
					var startIndex = uri.indexOf(filterObj.startsWith, 0)
					if (-1 == startIndex)
					{
						break;
					}
					var endIndex = uri.indexOf(filterObj.endsWith, startIndex);
					if (-1 == endIndex)
					{
						break;
					}
					uri = uri.slice(startIndex + filterObj.startsWith.length, endIndex);
                    break;
			}
            return uri;
        }
        return originalURI;
    };

    var getUnProcessedAnchors= function( document, engine )
    {
        var unProcessedAnchors = [];

        try
        {
            var allAnchors  = document.getElementsByTagName("a"); ///get all anchors
                      
            mcafee_wa_array.ForEach(allAnchors, anchorHandler, unProcessedAnchors); //For each anchor element now figure out the unprocessed anchor elements.
           
            if (unProcessedAnchors.length == 0) //If there are no unprocessed elements then return here itself.
            {
                return null;
            }
        }
        catch ( exception )
        {
            mcafee_wa_globals.logger.error( exception);
            return null;
        }

        return unProcessedAnchors;
    };

    var shouldExcludeURI = function (expression, url)
    {
        if ('undefined' != typeof (expression))
        {
            try
            {
                var regexp = new RegExp(expression, 'i');
                var ret = regexp.test(url);
                return ret;
            }
            catch (exception)
            {
                mcafee_wa_globals.logger.error(exception);
            }
        }
        return false;
    };

    var getParam = function (document, uri, paramName)
    {
        var ahref   = document.createElement('a');
        ahref.href  = uri;
        var param   = ahref.search.replace('?','');
        var params  = param.split('&');

        for (var index = 0; index < params.length; ++index)
        {
            if (!params[index])
            {
                continue;
            }
            var pair = params[index].split('=');
            if ( (null != pair) && (pair.length == 2) && (pair[0] == paramName) ) 
            {
                var quri= decodeURIComponent(pair[1]);
                return quri;
            }
        }
        return null;
    };

    var getURI = function (document, element, selObj)
    {
        var uri = null;

        if ('undefined' != typeof (selObj.hrefattr)) //If specific attribute has to be searched for actual URI then do it.
        {
            for (var attrIndex = 0; attrIndex < selObj.hrefattr.length; ++attrIndex)
            {
                var attrib = element.getAttribute(selObj.hrefattr[attrIndex]);
                if( null != attrib )
                {
                    uri = attrib.value;
                    break;
                }
            }
        }

        if( null == uri ) //If specific attribute was there or not there and in
        { //either case if uri could not be found then take the default a href as uri.
            uri = element.href;

            //if hrefqstring is mentioned the parse it out of the query string.
            if ('undefined' != typeof (selObj.hrefqstring))
            {
                uri= getParam(document, uri, selObj.hrefqstring);
            }
        }

        if ( null != uri && !uri.startsWith('http') && !uri.startsWith('www.') )
        {
            var aElem   = document.createElement('a');
            aElem.href  = uri;
            uri         = aElem.protocol + "//" + aElem.hostname + aElem.port + aElem.pathname + aElem.search + aElem.hash;
        }

        if (!uri)
        {
            return null;
        }

        if (uri.startsWith('http') || uri.startsWith('https') || uri.startsWith('ftp') || uri.startsWith('sftp'))
        {
            return uri;
        }
        return null;
        
    };

    var harvestLinksInternal = function ( document, engine, fncallback )
    {
       
        try
        {
            var unProcessedAnchors = getUnProcessedAnchors(document, engine);

            if( null == unProcessedAnchors || unProcessedAnchors.length == 0 )
            {
                return false; //return empty array.
            }

            var requestURLs     = [];
            var requestElements = [];

            //If in debug mode and if the selectorMap is not already initialized then initialize with selector use count.
            if (mcafee_wa_globals.debugMode && mcafee_wa_globals.mapSelectors.size == 0 )
            {
                for (var i = 0; i < engine.selectors.length; i++)
                {
                    mcafee_wa_globals.mapSelectors.set(engine.selectors[i].selector, 0);
                }
            }
            
            for( var elemIndex = unProcessedAnchors.length-1; elemIndex >= 0 ; --elemIndex )
            {
                var element = unProcessedAnchors[elemIndex];

                for (var index = 0; index < engine.selectors.length; ++index )
                {
                    var selObj = engine.selectors[index];

                    var matches = false;

                    try
                    {
                        matches= Sizzle.matchesSelector(element, selObj.selector);
                    }
                    catch (e)
                    {
                        mcafee_wa_globals.logger.error(e);
                    }

                    if (true == matches) //match the element with a specific selector
                    {
                        var newelem = {};

                        if (selObj.parent == true)
                        {
                            newelem.node = element.parentNode;
                        }
                        else
                        {
                            newelem.node = element;
                        }

                        if (selObj.inline == true)
                        {
                           newelem.node.style.display = 'inline-block';
                        }

                        var uri = getURI(document, element, selObj);
                        if (null == uri)
                        {
                            continue;
                        }

                        var bExclude = shouldExcludeURI(selObj.excluderegex, uri);
                        if (bExclude == true)
                        {
                            continue;
                        }

                        newelem.url = uri.toLowerCase();

                        if (null != mcafee_wa_globals.annotationEvents.onPreprocessLink)
                        {
                            newelem.url= mcafee_wa_globals.annotationEvents.onPreprocessLink(newelem.url);
                        }

                        newelem.url = getFilteredURI(newelem.url, selObj.filterURI);


                        newelem.url = punycode.toASCII(newelem.url);
                        newelem.node.setAttribute(ORIGINAL_TARGET, newelem.url);

                        if (mcafee_wa_globals.debugMode)
                        {
                            newelem.matchedSelector = selObj.selector;
                            mcafee_wa_globals.mapSelectors.set(selObj.selector, mcafee_wa_globals.mapSelectors.get(selObj.selector) + 1 );
                        }

                        if (newelem.url.length > 0)
                        {
                            requestElements.push(newelem);
                            requestURLs.push(newelem.url);
                        }
                        break;
                    }
                }
                element.setAttribute(PROCESSED_TAG, "true");

                if (( mcafee_wa_globals.reputationReqCount > 0) && ( requestElements.length == mcafee_wa_globals.reputationReqCount) )
                {
                    var urls        = requestURLs.slice();
                    var elems       = requestElements.slice();
                    fncallback(urls, elems);
                    requestURLs     = [];
                    requestElements = [];
                }

            }
            ///Whatever is pending invoke callback
            if (requestURLs.length > 0)
            {
                fncallback(requestURLs, requestElements);
            }
        }
        catch(e)
        {
            mcafee_wa_globals.logger.error(e);
        }
        return true;
    };

    var getRequestURLsInternal= function ()
    {
        return _requestURLs;
    };

    var getRequestElementsInternal = function ()
    {
        return _requestElements;
    };

    return {
        harvestLinks       : harvestLinksInternal,
        getRequestElements : getRequestElementsInternal,//is the collection of HTML node elements that have to be annonated
        getRequestURLs     : getRequestURLsInternal     //Is the URLS that have to be checked. This is send to server for finding whether each URI is good or bad
    }


}();var mcafee_wa_annotationhelper = function ()
{
    var getDossierURLInternal = function(url, linkInfo, config)
    { 
			var newUrl = mcafee_wa_bkconstants.siteReportUrl + encodeURIComponent(url)
            return newUrl;
			
        if (linkInfo.dossierUrl)
        {
            return linkInfo.dossierUrl;
        }
            			
    	if( !config.resources || !config.resources.siteReport || !config.resources.siteReport.baseURL || !url)
    	{
    		return null;
    	}
    	var newUrl = config.resources.siteReport.baseURL + encodeURIComponent(url);
    	return newUrl;
    };

    var populateLinkInfoInternal = function (linkInfo, url, config, score)
    {
        linkInfo.actualScore        = score;
        linkInfo.colour             = getColourInternal(linkInfo);
        linkInfo.recommendation     = linkInfo.recommendation ? linkInfo.recommendation : ""
        linkInfo.dossierUrl         = getDossierURLInternal(url, linkInfo, config);
        linkInfo.domain_specifier   = linkInfo.domain_specifier ? linkInfo.domain_specifier : ""
        linkInfo.CCList             = linkInfo.CCList ? linkInfo.CCList : "{}";
        linkInfo.displayURL         = mcafee_wa_stringhelper.truncateString(url, 50);
    };


    var getColourInternal = function (linkInfo)
    {
        if ("undefined" == typeof (linkInfo.colour) && "undefined" == typeof (linkInfo.score)) return;

        var colour = linkInfo.colour ? linkInfo.colour : mcafee_wa_constants.scoreToColor[linkInfo.score];

        if ("green" == colour && linkInfo.hackerSafe)
        {
            colour = "hackersafe";
        }
        return colour;
    };

    var getLinkConfigInternal = function( linkinfo)
    {
        var linkConfig          = linkinfo.linkConfig ? linkinfo.linkConfig : {};
        var defaultLinkConfig   = mcafee_wa_globals.annotationProperties.properties[linkinfo.actualScore];
    	
    	if (typeof(linkConfig.icon) != "string")
    	{
    		linkConfig.icon = defaultLinkConfig.icon
    	}
    	if (typeof(linkConfig.highlightColor) != "string")
    	{
    		linkConfig.highlightColor = defaultLinkConfig.highlightColor
    	}
    	if (typeof(linkConfig.color) != "string")
    	{
    		linkConfig.color = defaultLinkConfig.color
    	}
    	if (typeof(linkConfig.iconWidth) != "number")
    	{
    		linkConfig.iconWidth = defaultLinkConfig.width
    	}
    	if (typeof(linkConfig.iconHeight) != "number")
    	{
    		linkConfig.iconHeight = defaultLinkConfig.height
    	}
    	if (typeof(linkConfig.disableLink) != "boolean")
    	{
    		linkConfig.disableLink = false;
    	}
    	
    	return linkConfig;
    };

	
	var numScoreToText = function(score)
	{
	    if (score < mcafee_wa_constants.ScoreMinimal)
	        return "OK";
	    if (score < mcafee_wa_constants.ScoreUnknown)
	        return "UNKNOWN";
	    if (score < mcafee_wa_constants.ScoreMedium)
	        return "INFO";
		return "WARN";
	};

	var getActualScoreInternal = function (linkinfo)
	{
		if(linkinfo.actualScore) return linkinfo.actualScore;
		
		var actualScore = linkinfo.score;
		
		// in 3.6 format, actualScore is numerical. Convert it first.
		if( !isNaN( parseInt(actualScore) ) )
		{
			linkinfo.score = numScoreToText(actualScore);
			actualScore = linkinfo.score;
		}
		
		if (linkinfo.hackerSafe && (linkinfo.score == "OK" || linkinfo.score == "CERTIFIED"))
		{
			actualScore = "HACKERSAFE";	
			isHackerSafe = true;
		}
		return actualScore;

	};

    return {

        getDossierURL           : getDossierURLInternal ,
        getActualScore          : getActualScoreInternal,
        getLinkConfig           : getLinkConfigInternal,
        populateLinkInfo        : populateLinkInfoInternal
    }



} ();var mcafee_wa_searchengine = function ()
{
    var _engines = null;

    var init = function (fncallback)
    {
        if (null != _engines)
        {
            return;
        }

        mcafee_wa_resourcemanager.getJSON("engines.json", function (searchengines)
        {
            try
            {
                _engines = JSON.parse(searchengines);
                if (fncallback != null)
                {
                    fncallback();
                }
                else
                {
                    mcafee_wa_globals.logger.error("Failed to parse engines.json");
                }
            }
            catch( exception)
            {
                mcafee_wa_globals.logger.error(exception);
            }
            
        });
    };

    var isEngineOfBrowerType = function (engine, browserType)
    {
        if (browserType == -1)
        {
            return true;
        }
        //If there is no browser attribute then just return that engine is found.
        if ('undefined' == typeof (engine.browsers))
        {
            return true;
        }
        ///If there is a browser attribute for the specific engine.
        //Check whether browser exists in the collection. if so then return true.
        var browser= mcafee_wa_array.Find( engine.browsers, function( typeOfbrowser)
        {
            if( typeOfbrowser == browserType )
            {
                return true;
            }
        });

        if( null != browser )
        {
            return true;
        }
        return false;
    };

     ///Gets selector information that includes the selectorData and pageData for the specified selectorName
    var getEngineByName = function (engineName,  browserType)
    {
        var engineData= mcafee_wa_array.Find( _engines.searchengines, function( engine) 
        {
            if (engine.name == engineName)
            {
                if (isEngineOfBrowerType(engine, browserType))
                {
                    return true;
                }
            }
            return false;
        } );
        return engineData;
    };


    var getEngineForUrl= function (url, browserType)
    {
        var engineData= mcafee_wa_array.Find( _engines.searchengines, function( engine) 
        {
            for (var reindex = 0; reindex < engine.urlre.length; ++reindex)
            {
                try
                {
                    var regexp  = new RegExp(engine.urlre[reindex], 'i');
                    var ret     = regexp.test(url);
                    if (true == ret)
                    {
                        if (isEngineOfBrowerType(engine, browserType))
                        {
                            return true;
                        }
                    }
                }
                catch (exception)
                {
                    mcafee_wa_globals.logger.error(exception);
                }
            }
            return false;
        } );
        return engineData;
    };
    ///Gets the list of all selectors. This include disabled selectors as well.
    var getEngines = function ()
    {
        return _engines.searchengines;
    };

    ///Disable the selector specified from the list of supported selectors.
    var disableEngine = function (engineName)
    {
        engineName = engineName.toLowerCase();

        for (var index in _engines.searchengines.length)
        {
            var engine = _engines.searchengines[index];
            if (engine.name == engineName)
            {
                engine.enabled = false;
                return true;
            }
        }
        return false;
    };

    return {
        init                : init              ,
        getEngineForUrl     : getEngineForUrl   ,
        getEngines          : getEngines        ,
        disableEngine       : disableEngine     ,
        getEngineByName     : getEngineByName   ,
        isEngineOfBrowerType: isEngineOfBrowerType
    }


} ();///This class takes care of display the annotation balloon when user hover over annotation
///image.

var recElemStyle =
{
    Small   : 0,
    Normal  : 1
};

//This is the maximum chars that can be accomodated as recommendation in balloon. If the rec. is longer than this then 
//the font of element is reduced to recElemStyle.Small to accomodate the complete string. When hackersafe is the state,
//then the image is longer and the length of recommendation string is further reduced to 15.
var recElemLength =
{
    maxLength           : 30,
    maxHackerSafeLength : 15
}

function mcafee_wa_balloondisplayer()
{
    this._bubbleLayerElement    = null;    
    this._logoElement           = null;
    this._recommendationElement = null;
    this._titleElement          = null;
    this._balloonElement        = null;
    this._categoryTitleElement  = null;
    this._iconElement           = null;
    this._borderElement         = null;
    this._balloonColorElement   = null;
    this._dossierElement        = null;
    this._recommendationDesc    = null;
    this._categoryElements      = [];
    this._isCurrentHackerSafe = false;
    this._recommendationDefStyle = [];
};

///Get element for the elementName specified from DOM and if not found then throws exception.
///This is for getting elements inserted for balloon in the page.
mcafee_wa_balloondisplayer.prototype.initElement = function (elementName)
{
    var element = this._document.getElementById(elementName + this._uid);
    return element;
};

///This is cashback specific fix to remove cashback recommendation string. The ideal fix should have
//been implemented in native code rather than here. Once this is done in C++ then remove this function.
mcafee_wa_balloondisplayer.prototype.preProcessRecommendationId = function (recommendationId, actualScore)
{
    if (20034 == recommendationId)
    {
        switch (actualScore)
        {
            case "HACKERSAFE"   : 
            case "CERTIFIED"    : recommendationId = 20031; break;
            case "OK"           : recommendationId = 20010; break;
            case "INFO"         : recommendationId = 20009; break;
            case "WARN"         : recommendationId = 20033; break;
            case "UNKNOWN"      : recommendationId = 20008; break;
        }
    }
    return recommendationId;
};


mcafee_wa_balloondisplayer.prototype.getRecommendationString = function (annoItem, fcallback)
{
    if(mcafee_wa_constants.enterprise == true)
    {
        fcallback(annoItem.recommendation);
    }
    else
    {
        if (annoItem.recommendation)
        {
            var recResId        = parseInt(annoItem.recommendation);
            if (!isNaN(recResId) )
            {
                recResId = "res_" + this.preProcessRecommendationId(recResId, annoItem.actualScore);
                mcafee_wa_resourcemanager.getResString(recResId, fcallback);
            }
        }
    }
};

mcafee_wa_balloondisplayer.prototype.addRecommendationElemStyle = function (obj, fontSize)
{
    obj.fontSize    = fontSize;
};

mcafee_wa_balloondisplayer.prototype.init = function(bIsShowing)
{
    try
    {
        mcafee_wa_globals.logger.log(bIsShowing ? "Showing balloon" : "Hiding balloon");

        this._bubbleLayerElement = this.initElement("BubbleLayer");
        
        if (true == bIsShowing) //These elements are required only when bubble is being shown.
        { 
            this._logoElement           = this.initElement("BALLOONLOGO"    );
            this._recommendationElement = this.initElement("RECOMMENDATION" );
            this._titleElement          = this.initElement("WEBADVISORTEXT" );
            this._balloonElement        = this.initElement("BALLOON"        );
            this._categoryTitleElement  = this.initElement("CCHeader"       );
            this._iconElement           = this.initElement("ICON"           );
            this._borderElement         = this.initElement("BALLOON_BORDER" );
            this._balloonColorElement   = this.initElement("BALLOON_CLR"    );
            this._dossierElement        = this.initElement("DOSSIER_LINK");
            this._recommendationDesc    = this.initElement("RECOMMENDATIONDESC");
            this._categoryElements      = [];

            for (var catIndex = 0; catIndex < 3; ++catIndex)
            {
                var catElement = this.initElement("CC_DESC_" + catIndex);
                this._categoryElements.push(catElement);
            }

            if (this._recommendationDefStyle.length == 0)
            {
                var recStyle = this._recommendationDefStyle;
                var recElem = this._recommendationElement;
                recStyle.push({});
                recStyle.push({});
                this.addRecommendationElemStyle(recStyle[recElemStyle.Small], "16px 16px 0px 20px", "12px", "600", null, null);
                this.addRecommendationElemStyle(recStyle[recElemStyle.Normal], recElem.style.padding, recElem.style.fontSize, recElem.style.fontWeight, recElem.style.clear, recElem.style.lineHeight);
            }
        }

        

    }
    catch( exception)
    {
        mcafee_wa_globals.logger.error(exception);
        return false;
    }
    return true;
};

mcafee_wa_balloondisplayer.prototype.setCategories = function (annoItem, config)
{
    //We show a maximum of 3 categories.

    var pThis = this;

    var catUsedIndex  = 0; //Is the actual index of categories added.
    for (var catIndex = 0; catIndex < 3; ++catIndex)
    {
        if( this._categoryElements.length <= catIndex )
        {
            break;
        }

        if (this._categoryElements[catUsedIndex] == null)
        {
            continue;
        }
        //Empty the existing category listed at the index aka. clear it. Maybe it is already having category for earlier links balloon.
        this._categoryElements[catIndex].innerHTML                  = "";
        this._categoryElements[catIndex].style.lineHeight           = "0px";
        this._categoryElements[catIndex].style.display              = "none";
        this._categoryElements[catIndex].parentNode.style.display   = "none";
        this._categoryElements[catIndex].parentNode.style.lineHeight= "0px";

        if (mcafee_wa_constants.enterprise == false && annoItem.categories.length > catIndex )
        {
            var categoryId   = parseInt(annoItem.categories[catIndex] );
            if (!isNaN(categoryId))
            {
                categoryId = mcafee_wa_categorymap.toCategoryResId(categoryId);

                mcafee_wa_resourcemanager.getResString("res_" + categoryId, function ( categoryText )
                {
                    if ('undefined' != typeof (categoryText) && categoryText.length > 0) //If category is valid string then add it.
                    {
                        pThis._categoryElements[catUsedIndex].innerHTML                  = categoryText;
                        pThis._categoryElements[catUsedIndex].style.display              = "block";
                        pThis._categoryElements[catUsedIndex].parentNode.style.display   = "";
                        pThis._categoryElements[catUsedIndex].style.lineHeight = "20px";

                        ++catUsedIndex;
                    }
                } );
                
            }
        }
        else if ( mcafee_wa_constants.enterprise == true && annoItem.CCList.length > catIndex)
        {
            var CCList = annoItem.CCList;
            if ( (typeof(CCList) != "undefined") && typeof (CCList[0]) != "undefined")
            {
            
                if (CCList[catIndex]["desc"].length > 0 && 'undefined' != typeof (CCList[catIndex]["desc"]))
                {
                    pThis._categoryElements[catUsedIndex].innerHTML                  = CCList[catIndex]["desc"];
                    pThis._categoryElements[catUsedIndex].style.display              = "block";
                    pThis._categoryElements[catUsedIndex].parentNode.style.display   = "";
                    pThis._categoryElements[catUsedIndex].style.lineHeight           = "20px";

                    ++catUsedIndex;
                    
                }
           }
        }
    }

};

mcafee_wa_balloondisplayer.prototype.resizeRecommendationElement = function (elemStyle)
{
    this._recommendationElement.style.fontSize = this._recommendationDefStyle[elemStyle].fontSize;
};


mcafee_wa_balloondisplayer.prototype.showBalloon = function (document, uid, config, engine, event)
{
    this._document = document;
    this._uid = uid;

    if (!this.init(true)) //initialize all elements since we are showing balloon.
    {
        return;
    }

    var toElement = event.toElement;
    if (null == toElement)
    {
        return;
    }

    //In case of hover balloon the hightlighted element coud be something like <strong> which is within the <a> .
    //We need to get <a> to get to the annotationData , since we insert the data as parent to <a>

    var annData = null;
    var element = toElement;
    while (null == annData && null != element)
    {
        annData = element.getAttribute(mcafee_wa_constants.mcafee_wa_ann);
        if (annData != null)
        {
            break;
        }
        element = element.parentNode;
    }
    var annoItem = JSON.parse(annData);

    if (null == annData || null == annoItem) //If annotation data is absent or if annotation data cannot be parsed.
    {
        return;
    }

    var currProperties = mcafee_wa_globals.balloonProperties.properties.appearance[annoItem.colour];

    if ('undefined' == typeof (currProperties))
    {
        return;
    }

    if (null != this._titleElement)
    {
        if (mcafee_wa_globals.debugMode)
        {
            this._titleElement.innerHTML = mcafee_wa_globals.debugTitle + annoItem.matchedSelector;
        }
        else
        {
            this._titleElement.innerHTML = mcafee_wa_globals.balloonProperties.properties.title;
        }
    }

    var pThis = this;

    if (null != this._iconElement)
    {
        mcafee_wa_resourcemanager.getImage(currProperties.srcImage, function (image)
        {
            pThis._iconElement.innerHTML = "<img alt='' src='" + image + "' style='vertical-align:middle;max-width:none' />";
        });
    }

    if (null != this._borderElement)
    {
        this._borderElement.style.borderColor = currProperties.borderColor;
    }

    if (null != this._balloonColorElement)
    {
        this._balloonColorElement.style.backgroundColor = currProperties.backgroundColor;
    }

    if (null != this._logoElement)
    {
        mcafee_wa_resourcemanager.getImage(mcafee_wa_globals.balloonProperties.properties.logo, function (imageData)
        {
            pThis._logoElement.innerHTML = "<img alt='' src='" + imageData + "' />";
        });
    }

    this._isCurrentHackerSafe = annoItem.hackerSafe;

    if (null != this._recommendationElement)
    {
        this.getRecommendationString(annoItem, function (recommendationStr)
        {
            ///For site advisor the string for recommendation is longer. This results in improper display of the 
            ///recommendation title. Hence here we are reducing the size of the font and related aspects to accomodate
            ///the string in cases wherein the string is longer in length. The strings are of shorter length for
            ///web advisor though.

            if (recommendationStr.length > recElemLength.maxLength || (pThis._isCurrentHackerSafe && recommendationStr.length > recElemLength.maxHackerSafeLength))
            {
                pThis.resizeRecommendationElement(recElemStyle.Small);
            }
            else
            {
                pThis.resizeRecommendationElement(recElemStyle.Normal);
            }
            pThis._recommendationElement.innerHTML = recommendationStr;

            if (mcafee_wa_globals.debugMode)
            {
                pThis._recommendationDesc.innerHTML = "";

                mcafee_wa_globals.mapSelectors.forEach(function (value, key, obj)
                {
                    pThis._recommendationDesc.innerHTML = pThis._recommendationDesc.innerHTML + key + "\t:\t" + value + " times(s)</br>";
                });
                if( typeof(mcafee_wa_globals.cacheStats.localCacheHits) != 'undefined' && typeof(mcafee_wa_globals.cacheStats.localCacheMiss) != 'undefined' )
                {
                    pThis._recommendationElement.innerHTML = "Hit-" + mcafee_wa_globals.cacheStats.localCacheHits + "Miss-" + mcafee_wa_globals.cacheStats.localCacheMiss;
                }

                 
            }

        });

}

    if (null != this._bubbleLayerElement)
    {
        this._bubbleLayerElement.onmouseout = function (e)
        {
            pThis.hideBalloon(pThis._document, mcafee_wa_globals.uid, e);
        };
    }

    if (null != this._borderElement)
    {
        this._borderElement.style.width = mcafee_wa_globals.balloonProperties.properties.width;
    }

    if (null != this._balloonElement)
    {
        this._balloonElement.style.width = mcafee_wa_globals.balloonProperties.properties.width;
    }

    this.setCategories(annoItem, config);

    if (null != this._dossierElement)
    {
        mcafee_wa_resourcemanager.getResString("res_" + mcafee_wa_resources.ID_TOOL_MORE, function (siteReportLinkText)
        {
            pThis._dossierElement.innerHTML = annoItem.colour == "white" ? "" : siteReportLinkText;
        });
        this._dossierElement.href = annoItem.dossierUrl + "&ref=safesearch";
    }

    if (null != mcafee_wa_globals.annotationEvents.onShowBalloon)
    {
        mcafee_wa_globals.annotationEvents.onShowBalloon(annoItem, this._document, mcafee_wa_globals.uid);
    }

    this.moveBubble(element);

    if ('undefined' != typeof (engine.autoclose) && engine.autoclose > 0) //per engine auto close of balloon can be turned on. If defined and if value is greater than 0 then its the milliseconds for which to retain the balloon before auto-closing it.

    {
        mcafee_wa_globals._activeBalloonElement = srcElem;
        var pThis = this;
        setTimeout(function ()
        {
            if (mcafee_wa_globals._activeBalloonElement == srcElem)
            {
                pThis._bubbleLayerElement.style.visibility = 'hidden';
            }

        }, engine.autoclose)
    }

};

mcafee_wa_balloondisplayer.prototype.getBalloonPosition = function (elem)
{
    var box             = elem.getBoundingClientRect();
    var body            = this._document.body;
    var docElem         = this._document.documentElement;
    var scrollTop       = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft      = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop       = docElem.clientTop || body.clientTop || 0;
    var clientLeft      = docElem.clientLeft || body.clientLeft || 0;
    var top             = box.top + scrollTop - clientTop;
    var left            = box.right + scrollLeft - clientLeft;

    var balloonRect     = this._bubbleLayerElement.getBoundingClientRect();

    ///If balloon cannot fit into the browser window then donot show it.
    if (balloonRect.height > window.innerHeight || balloonRect.width > window.innerWidth)
    {
        return { top: -1, left: -1 };
    }

    var margin = 15;

    if ((top + balloonRect.height + margin) > (window.innerHeight + scrollTop))
    {
        top = (top - (balloonRect.height - ((window.innerHeight + scrollTop) - top))) -margin;
    }

    if ((left + balloonRect.width + margin) > window.innerWidth + scrollLeft)
    {
        left = (left - (balloonRect.width - ((window.innerWidth + scrollLeft) - left))) -margin;
    }
    return { top: Math.round(top), left: Math.round(left)}
};


    // function: moveBubble to element that contains annotation info
mcafee_wa_balloondisplayer.prototype.moveBubble = function (element)
{
    var image = element;
    var position = this.getBalloonPosition(image);

    if (position.top == - 1 || position.left == -1) //Hide balloon when there is no space to show it.
    {
        mcafee_wa_globals.logger.log("Hiding balloon since there is no space to show it");
        this._bubbleLayerElement.style.visibility = 'hidden';
        return;
    }
    mcafee_wa_globals.logger.log("Showing balloon at " + position.top + " , " + position.left);
	
    this._bubbleLayerElement.style.top = position.top + "px";
    this._bubbleLayerElement.style.left = position.left + "px";
    this._bubbleLayerElement.style.visibility = 'visible';
};

    // function: hideBalloon
mcafee_wa_balloondisplayer.prototype.hideBalloon = function (document, uid, event)
{
    this._document = document;
    this._uid = uid;

    if (!this.init(false)) //Initialize only the elements required for hiding.
    {
        return;
    }

        //Get the element to which mouse is moving to.
        //event.toElement - used for when mouse moves from annotation icon to other elements
        //event.relatedTarget - used for when mouse moves from annotation balloon to other elements
        //one of them will always be undefined
    var toElement = event.toElement || event.relatedTarget;

        // Check that the mouse isn't moving into the annotation or other pieces of the balloon
    if (null != toElement && this._bubbleLayerElement.contains(toElement))
    {
        return;
    }
    this._bubbleLayerElement.style.visibility = 'hidden';
};
var mcafee_wa_eventhandler = function(document, config, engine)
{
    this._document = document;
    this._config = config;
    this._engine = engine;
    this._displayer = new mcafee_wa_balloondisplayer();
};

// isFromLinks - whether balloon is shown from link (true) or annotation icon (false)
mcafee_wa_eventhandler.prototype.showBalloon = function(event, isFromLinks = false)
{
    // toElement - the element mouse moved to
    var ev = {};
    if (isFromLinks)
    {
        ev.toElement = event.target;
    }
    else
    {
        ev.toElement = this._document.getElementById(event.data.toId);
    }
    this._displayer.showBalloon(this._document, mcafee_wa_globals.uid, this._config, this._engine, ev);
};

// isFromLinks - whether balloon is shown from link (true) or annotation icon (false)
mcafee_wa_eventhandler.prototype.hideBalloon = function(event, isFromLinks = false)
{
    // toElement - the element mouse moved to
    var ev = {};
    if (isFromLinks)
    {
        ev.toElement = event.relatedTarget;
    }
    else
    {
        ev.toElement = this._document.getElementById(event.data.toId);
    }
    this._displayer.hideBalloon(this._document, mcafee_wa_globals.uid, ev);
};
function mcafee_wa_annotationinserter()
{
    this._document  = null;
};

///The properties required for creating balloon are set to the div tag created for image.
///So that when user hovers over the image, using this detail the balloon can be displayed.
mcafee_wa_annotationinserter.prototype.setDivProperty = function (element, linkinfo)
{
	var linkStr      = mcafee_wa_stringhelper.convertObjectToString(linkinfo);
	element.setAttribute(mcafee_wa_constants.mcafee_wa_ann, linkStr);
};


mcafee_wa_annotationinserter.prototype.createStyle = function ()
{
    var mcstyle = "mc_style";

    var imageStyles  =  this._document.getElementById(mcstyle);
    if (null != imageStyles)
    {
        ///Tells that the images are already added to page. So no need to add again. This happens in case of new URI's being
        ///added such as the case of ajax calls in google.com etc.
        return;
    }

	mcafee_wa_scriptinjector.injectscript( this._document, mcafee_wa_scripts.showballoon + mcafee_wa_scripts.hideballoon );

    imageStyles = this._document.createElement("style");
    imageStyles.setAttribute("id", mcstyle);
    imageStyles.type = "text/css";

    var heads= this._document.getElementsByTagName('head');
    heads[0].appendChild(imageStyles);
    
    for (var ruleName in mcafee_wa_globals.annotationProperties.properties)
    {
        ( function( ruleName)
        {
            var property = mcafee_wa_globals.annotationProperties.properties[ruleName];
            mcafee_wa_resourcemanager.getImage(property.icon, function (imgSrc)
            {
                try
                {
                    if (imageStyles.innerHTML != '')
                    {
                        imageStyles.innerHTML += '\n';
                    }
                    imageStyles.innerHTML += ".mcafee_" + ruleName + "{background-image: url(" + imgSrc + ");";
                    imageStyles.innerHTML += " height:" + property.height + "px; width:" + property.width + "px ; display:inline-block }"
                }
                catch (exception)
                {
                    mcafee_wa_globals.logger.error(exception);
                }
            } );
        
        }) (ruleName );
    }
}

// Insert annotation for all searches except for bing secure search
mcafee_wa_annotationinserter.prototype.insertAnnotationImage = function (link, linkinfo, config)
{
	try
	{
	    var divAnnotation = this._document.createElement("div");
	    this.setDivProperty(divAnnotation, linkinfo);

	    var linkConfig = mcafee_wa_annotationhelper.getLinkConfig(linkinfo);
	    // var hrefurl = mcafee_wa_annotationhelper.getDossierURL(link.url, linkinfo, config);

	    var divImage = this._document.createElement("div");
	    mcafee_wa_globals.imageCounter++;
	    var imageid = mcafee_wa_globals.uid.toString() + '_' + mcafee_wa_globals.imageCounter.toString();
	    divImage.setAttribute("id", imageid);

	    divAnnotation.appendChild(divImage);
	    divImage.setAttribute("class", "mcafee_" + linkinfo.actualScore);

	    divImage.setAttribute("onmouseover", "javascript:wa_showballoon(event);");
	    divImage.setAttribute("onmouseout", "javascript:wa_hideballoon(event);");

	    if (config.features.highlite)
	    {
	        this.highlightLink(link, linkConfig.highlightColor);
	    }

	    if (linkConfig.filterLink)
	    {
	        linkConfig.disableLink = linkConfig.filterLink;
	    }

	    if (linkConfig.disableLink)
	    {
	        this.disableLink(link);
	    }

	    divAnnotation = link.node.parentNode.insertBefore(divAnnotation, link.node.nextSibling);

	    // set annotation image to inline ONLY if there is enought space to show image
	    var aParent = divAnnotation.parentNode;
	    var bForceInline = link.node.getAttribute("forceInline");
	    var delta = 100;
	    if (aParent.tagName != "LI" && bForceInline != "true")
	    {
	        if (aParent.tagName == "TD" || aParent.tagName == "SPAN")
	        {
	            aParent = aParent.parentNode;
	        }
	        delta = aParent.offsetWidth - link.node.offsetWidth;
	    }

	    var iconwdth = linkConfig.iconWidth * 2;
	    if (delta > iconwdth)
	    {
	        divAnnotation.style.cssText = mcafee_wa_constants.annDivDefaultStyle + mcafee_wa_constants.annDivInline;
	    }
	    else
	    {
	        divAnnotation.style.cssText = mcafee_wa_constants.annDivDefaultStyle + mcafee_wa_constants.annDivNonInline;
	    }
	}
	catch (e)
	{
	    mcafee_wa_globals.logger.error(e);
	}
};

// Insert annotation for bing secure search
mcafee_wa_annotationinserter.prototype.insertAnnotationIntoLink = function (link, linkinfo, config)
{
	try
	{
		// Only show red and yellow annotation balloons
	    if (linkinfo.actualScore == "WARN" || linkinfo.actualScore == "INFO")
	    {
	        var divAnnotation = link.node;
	        this.setDivProperty(divAnnotation, linkinfo);
	        link.node.addEventListener("mouseover", function(event)
	        {
	            mcafee_wa_globals.eventHandler.showBalloon(event, true);
	        });
	        link.node.addEventListener("mouseout", function(event)
	        {
	            mcafee_wa_globals.eventHandler.hideBalloon(event, true);
	        });
	    }
	}
	catch (e)
	{
	    mcafee_wa_globals.logger.error(e);
	}
};
			
mcafee_wa_annotationinserter.prototype.highlightLink = function( link, htmlColor )
{
	link.node.style.backgroundColor = htmlColor;
};

mcafee_wa_annotationinserter.prototype.disableLink = function (link, config)
{
	link.node.setAttribute("onmousedown", "return false;");
	link.node.target = "_self";
	
	mcafee_wa_resourcemanager.getResString('safe.yahooblockMessage', function( title) 
	{
	    link.node.setAttribute( 'title',title );
	} );
	

	link.node.style.cssText = "color:#808080;text-decoration:underline;cursor:pointer;display:inline-block;text-indent:0;";
	
	if(link.node && link.node.getElementsByTagName("A")[0])
	{
	    link.node.getElementsByTagName("A")[0].style.color="#808080";
	}
	
	if( config && config.features && config.features.highlite )
	{
		link.node.style.backgroundColor = "#F9E2E8";
	}
};

		
mcafee_wa_annotationinserter.prototype.annotatePage = function (amap, config, engine, links, document)
{
	try	
	{
	    
	    this._document = document;

	    var ballooncreator = new mcafee_wa_ballooncreator(this._document);
	    ballooncreator.createBalloon(document);
	    
	    this.createStyle();

	    if (null == mcafee_wa_globals.eventHandler)
	    {
	        mcafee_wa_globals.eventHandler = new mcafee_wa_eventhandler(document, config, engine);
	    }

		mcafee_wa_globals.logger.log("Annotating a total of " + links.length + " links in page " + this._document.location.href);

		for( var index = 0; index < links.length; ++index ) 
		{
		    var link        = links[index];
		    var linkInfo    = amap [link.url];

		    if ( "undefined" != typeof(linkInfo) && (null != linkInfo) )
		    {
		        if (mcafee_wa_globals.debugMode)
		        {
                    // pass selector info to the balloons
		            linkInfo.matchedSelector = link.matchedSelector;
		        }

		        var actualScore = mcafee_wa_annotationhelper.getActualScore(linkInfo);

		        if (null != mcafee_wa_globals.annotationEvents.onAnnotatingLink)
		        {
                    linkInfo.score = actualScore;
		            mcafee_wa_globals.annotationEvents.onAnnotatingLink(linkInfo, config);
		        }

                //If show icon is set to true OR if only hacker safe is set to false or link link is hacker safe then show.
                if (link.node && config.features.showIcons && (!config.features.showOnlyHackersafe || linkInfo.hackerSafe))
                {
                    mcafee_wa_annotationhelper.populateLinkInfo(linkInfo, link.url, config, actualScore);

                    if (('undefined' == typeof(engine.hideannotations)) || (false == engine.hideannotations))
                    {
                        if (engine.name == "bing" && mcafee_wa_globals.isBingSecureSearchEnabled)
                        {
                            this.insertAnnotationIntoLink(link, linkInfo, config);
                        }
                        else
                        {
                            this.insertAnnotationImage(link, linkInfo, config);
                        }
                    }
                    else
                    {
                        if (linkInfo.colour != 'green')
                        {
                            mcafee_wa_globals.eventHandler.registerEvents(link.node);
                            this.setDivProperty(link.node, linkInfo);
                        }
                    }

                }
                links[index].node = null;
		    }
		}
        
		if (null != mcafee_wa_globals.annotationEvents.onCompleteAnnotation)
		{
		    mcafee_wa_globals.annotationEvents.onCompleteAnnotation(this._document.location.href);
		}

	} 
	catch(e) 
	{
	    mcafee_wa_globals.logger.error(e);
	    return false;
	}
	return true;
};
function mcafee_wa_annotationengine(domdoc, engine)
{
    ///The current document that is being annotated.
    this._document       	= domdoc;
	this._engine            = engine;
};

mcafee_wa_annotationengine.prototype.matchURL = function (uri)
{
    for (var index = 0; index < this._engine.stre.length; ++index)
    {
        var stre = this._engine.stre[index];
        var matches = uri.match(stre);
        if (matches)
        {
            return matches;
        }
        
    }
    return null;
}
	
mcafee_wa_annotationengine.prototype.getSearchTerms= function( )
{
    var matches = this.matchURL(this._document.location.href);
	if (null != matches && matches.length > 1)
	{
	    var searchTerms = decodeURIComponent(matches[1].replace(/\+/g, " "));
	    return searchTerms;
	}
}
	
///function from timer that actually insert annotation to the links in the page.
mcafee_wa_annotationengine.prototype.annotateProc = function(json, links) 
{
    if (null == json || "undefined" == typeof (json))
    {
        mcafee_wa_globals.logger.error("The json response received from server for DSS Request is null");
        return;
    }

    var jsonRsp = null;

    if ( "string" == typeof (json))
    { 
        if (  json.length == 0)
        {
            mcafee_wa_globals.logger.error("Empty string received as DSS Response");
            return;
        }
        jsonRsp = JSON.parse(json);
    }
    else
    {
        jsonRsp = json;
    }


    if (null == jsonRsp.safeSearchResponse || null == jsonRsp.safeSearchResponse.annotationMap)
    {
        mcafee_wa_globals.logger.log( "JSON response is not having expected nodes it the JSON")
        return;
    }

    mcafee_wa_globals.logger.log(" JSON response received is good. Now going to add annotations for the links");

    var config  = jsonRsp.safeSearchResponse.config;
    var amap    = jsonRsp.safeSearchResponse.annotationMap;
	
	if( true == mcafee_wa_globals.onlyShowMcAfeeSecure )
	{
		config.features.showOnlyHackersafe=  true;
	}
	
	
    //Store the cache stats.
    if ('undefined' != typeof (jsonRsp.safeSearchResponse.stats))
    {
        mcafee_wa_globals.cacheStats.localCacheHits += jsonRsp.safeSearchResponse.stats.localCacheHits;
        mcafee_wa_globals.cacheStats.localCacheMiss += jsonRsp.safeSearchResponse.stats.localCacheMiss;
    }
    
	var annotationInserter = new mcafee_wa_annotationinserter();
	annotationInserter.annotatePage(amap,config, this._engine, links, this._document);
};

///Here first links that are not yet annonated are picked from the HTML document and then a DSSRequest is made to backend
///or any other local services to check the state of each of the URLs i.e. whether they are good or bad.
mcafee_wa_annotationengine.prototype.processPage = function ()
{
    var pThis = this;

    ///Notify the client that annotation is about to start off. This is done before starting annotation irrespective
    ///of whether there are links to annotate or not. However this is fired only for the supported search engines.
    if (null != mcafee_wa_globals.annotationEvents.onBeginAnnotation)
    {
        var searchTerms= this.getSearchTerms ();
        mcafee_wa_globals.annotationEvents.onBeginAnnotation(this._document.location.href, this._engine.name, searchTerms);
    }
	
    mcafee_wa_globals.logger.log("About to start harvesting links from the page " + this._document.location.href);

    ///Harvested links are passed to the callback in chunks or in toto as per the setting mentioned in coreProperties during initialization.
	mcafee_wa_linkharvester.harvestLinks(this._document, this._engine, function( reqURLs, links )
    {
        if (reqURLs.length > 0) //If there are URLs that have cache miss then alone make DSS request
        {
            mcafee_wa_globals.logger.log(reqURLs.length + " URLs are harvested from " + pThis._document.location.href + ". Going to make DSS Request" );

            mcafee_wa_globals.dssRequestor.post(escape(pThis._document.location.href), pThis._engine.sourcetype, pThis._engine.issecuresearch, reqURLs, function (resp)
            {
                mcafee_wa_timer.set(pThis._document,function ()
                {
                    mcafee_wa_globals.logger.log(" DSS Response received for page" + pThis._document.location.href);
                    pThis.annotateProc(resp, links);
                },0);
            });
        }
    });
};

// Engine Entry point. 
mcafee_wa_annotationengine.prototype.processUrl = function ()
{
	var pThis= this;
	
	mcafee_wa_timer.set(this._document, function ()
	{
	    pThis.processPage();
	},0);

};

mcafee_wa_annotationengine.prototype.stop = function ()
{
};



var mcafee_wa_coreengine = function () 
{
    var quickCheck = function (document)
    {
        var selectors='(';
        var map = new Map();
        var engines = mcafee_wa_searchengine.getEngines();
        for (var index = 0; index < engines.length; ++index)
        {
            if (!map.has(engines[index].name)) //Since engine names can be repeated due to there being same engines across browsers address the scenario.
            {
                selectors += engines[index].name;
                selectors += '|'
                map[engines[index].name] = true;
            }
        }
        selectors = selectors.substr(0, selectors.length - 1) + ')';

        mcafee_wa_globals.logger.log("Supported search engines: " + selectors);

        var basicCheck = "http(s)?:\/\/([a-z0-9\-\.]+\.)?" + selectors;

        if (!document || !document.location || !document.location.href || !document.location.href.match(basicCheck))
        {
            mcafee_wa_globals.logger.log("The url " + document.location.href + " does not match with any of the supported search engines");
            return false;
        }
        return true;
    };

    var annotateInternal = function (domdoc)
    {
        try
        {
            if ( !quickCheck(domdoc))
            {
                return false;
            }
            
            var engine = mcafee_wa_searchengine.getEngineForUrl(domdoc.location.href, mcafee_wa_globals.browserType)
            if (null == engine)
            {
                mcafee_wa_globals.logger.error("Failed to get engine for url " + domdoc.location.href);
                return false;
            }

            if (mcafee_wa_globals.activeURI != domdoc.location.href) //If URI of page changed then clear the selector map maintained.
            {
                mcafee_wa_globals.mapSelectors.clear();
                mcafee_wa_globals.activeURI = domdoc.location.href;
            }
           

            var annotationEngine = new mcafee_wa_annotationengine(domdoc, engine);
            annotationEngine.processUrl();
        }
        catch (e)
        {
            mcafee_wa_globals.logger.error(e);
            return false;
        }
        return true;
    };

    var initInternal= function(coreProps, fncallback)
    {

        if (null != coreProps.logger && 'undefined' != typeof (coreProps.logger))
        {
            mcafee_wa_globals.logger = coreProps.logger; //If caller has passed logger then use it.
        }
        else
        {
			mcafee_wa_globals.logger= new mcafee_wa_logger();
            if ('undefined' != typeof (coreProps.logType))
            {
                mcafee_wa_globals.logger.SetLogTypes( coreProps.logType ); //If caller has passed log type then use it.
            }
            
        }

        if (null == coreProps.dssRequestor)
        {
            mcafee_wa_globals.logger.error("DSS requestor has to be valid for coreengine to initialize");
            return false;
        }

        mcafee_wa_globals.logger.log("Initializing core engine");
 
        mcafee_wa_globals.resourceRequestor     = coreProps.resourceRequestor;
		mcafee_wa_globals.dssRequestor          = coreProps.dssRequestor;
		mcafee_wa_globals.resourceRootURI       = coreProps.resourceRootURI;
		mcafee_wa_globals.resourceRequestor     = coreProps.resourceRequestor ? coreProps.resourceRequestor : new mcafee_wa_resourcerequestor();
		mcafee_wa_globals.reputationReqCount    = coreProps.reputationReqCount;
		mcafee_wa_globals.balloonProperties     = coreProps.balloonProperties ? coreProps.balloonProperties : mcafee_wa_balloonproperties;
		mcafee_wa_globals.annotationProperties  = coreProps.annotationProperties ? coreProps.annotationProperties : mcafee_wa_annotationproperties;
		mcafee_wa_globals.annotationEvents      = coreProps.events      ;
		mcafee_wa_globals.debugMode             = coreProps.debugMode   ;
		mcafee_wa_globals.browserType           = coreProps.browserType;
		mcafee_wa_globals.binjectBalloon        = coreProps.binjectBalloon;
        mcafee_wa_globals.debugTitle            = coreProps.debugTitle;
	    mcafee_wa_searchengine.init(fncallback);
        return true;
    };

    var shutdownInternal = function ()
    {

    };

    var getEngines= function ()
    {
        return mcafee_wa_searchengine.getEngines();
    };

    var getAnnotationProperties= function ()
    {
        return mcafee_wa_globals.annotationProperties.properties;
    };

    var getBalloonProperties = function ()
    {
        return mcafee_wa_globals.balloonProperties.properties;
    };

    return {
        init                    : initInternal              ,
        annotate                : annotateInternal          ,
        shutdown                : shutdownInternal          ,
        getEngines              : getEngines                ,
        getAnnotationProperties : getAnnotationProperties   ,
        getBalloonProperties    : getBalloonProperties
    };
}();