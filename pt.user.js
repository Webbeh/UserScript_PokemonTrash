// ==UserScript==
// @name        Nouvelle interface de PokémonTrash
// @namespace   geeq.ch
// @license			MIT
// @author			Weby
// @copyright		copyright 2017, Weby (geeq.ch)
// @homepageURL	http://pokemontrash.com/club/
// @description Ce script permet de modifier drastiquement l'interface de PokémonTrash.
// @icon				http://www.plixup.com/pics_core3/14754800337245miaouss.png
// @include     http://pokemontrash.com/club/*
// @include     https://pokemontrash.com/club/*
// @include     http://www.pokemontrash.com/club/*
// @include     https://www.pokemontrash.com/club/*
// @version     2.0.1
// @updateURL   https://openuserjs.org/meta/Weby/Nouvelle_interface_de_PokémonTrash.meta.js
// @grant				GM.openInTab
// @noframes
// ==/UserScript==

/*
-----------------------------------------------------------------------------------------------------------------
Changelog :
-----------------------------------------------------------------------------------------------------------------
2.0.1 :
	Bumped version & changed update URL
------------------------------------------
2.0.0 :
	GreaseMonkey 4 support !
	Support for the new browser plugin API
------------------------------------------
1.2.5 :
	Added 2014 style selection
	Prevented options from working when selecting an old design
------------------------------------------
1.2.4 :
	Added 2015 style selection
------------------------------------------
1.2.3 :
	Background attachment fix
	Head image CSS fix
	Better CSS handling
------------------------------------------
1.2.2 :
	Added unread replies in categorized unread message, slightly fixed the "hide" button for categories
------------------------------------------
1.2.1 :
	Added categorized unread messages
------------------------------------------
1.2.0 : 
	Initial versioned changelog
-----------------------------------------------------------------------------------------------------------------
*/


var css_2014 = `
  .__wb_overlay {
    filter:alpha(opacity=60); /* IE */
    opacity: 0.6; /* Safari, Opera */
    -moz-opacity:0.6; /* FireFox */  
    opacity: 0.6;
    
    background-color: #000;
    position: fixed;
    width:100%;
    height:100%;
    top: 0px;
    left: 0px;
    padding: 0px !important;
    border: 0px !important;
    margin: 0px !important;
    border-radius: 0px !important;
    z-index: 2147483643 !important;
  }
  
  #__wb_record_overlay_div {
    cursor: wait !important;
  }
  
  #logo, .logo-mobile {
	display: none;
  }

  .__wb_record_content {
    opacity: 1.0;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: 0px !important;
    padding: 0px !important;

    background-color: #ffffff !important;
    border-radius: 8px;
    z-index: 2147483644 !important;
    box-shadow: 0 0 30px 5px #000;
    -moz-box-shadow: 0 0 30px 5px #000;    
    -webkit-box-shadow: 0 0 30px 5px #000;  
  }
    
  #__wb_record_content_loader {
    cursor: wait !important;
    padding-top: 30px !important;    
    margin-left: -287px !important;
    margin-top: -177px !important;    
    width: 574px !important;
    height: 355px !important;  
  }
  
  #__wb_record_content_done {
    margin-left: -427px !important;
    margin-top: -177px !important;      
    width: 855px !important;
    height: 355px !important;  
  }
  
  .__wb_record_content > * {
    margin: auto !important;
    display: block !important;

    text-align: center !important;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }
  
  .__wb_record_content > wb_h1 {
    font-size: 36px !important;
    color: #222 !important;
    margin: 0px 0px 0px 0px !important;
    padding: 0px !important;
    line-height: 2em;
    font-weight: normal !important;
    width: auto !important;
    height: auto !important;    
  }   
  
  .__wb_record_content > wb_p {
    font-size: 17px !important;
    color: #222 !important;    
    margin: 8px 0px 8px 0px !important;
    padding: 0px !important;
    line-height: 2em;
  }  
  
  .__wb_record_content > #_wb_logo  {
    margin-bottom: 10px !important;
  }
  
  .__wb_record_content > #_wb_spinner {
    margin-top: 30px !important;
    margin-bottom: 30px !important;    
  }
  
  .__wb_record_content > #_wb_curr_url {
    text-decoration: underline !important;
    font-weight: bold !important;
  }
  
  #__wb_record_content_done > #__wb_link {
    font-size: 20px !important;
    border: 1px !important;
    border-color: #aaa !important;
    border-style: solid !important;
    padding: 3px !important;
    text-align: center !important;
    width: 80% !important;
    height: auto !important;
  }
 
  #__wb_record_content_done > #__wb_link:focus {
    outline: 0px !important;
    border-color: #428bca !important;
  }
  
  /* DONATE */
  
  #__wb_record_content_done > #__wb_donate_close {
    font-size: 18px !important;
    width: auto !important;
    float: right;
    display: inline-block;
    margin: 0px !important;
    padding: 8px 8px 0px 0px !important;   
  }
  
  #__wb_donate_close > #__wb_record_done_close {
    cursor: pointer !important;
    display: inline-block;
    vertical-align: bottom !important;
  }
  
  #__wb_record_content_done > #__wb_donate_close a {
    color: #428bca !important;
  } 
  
  #__wb_record_content_done > #__wb_donate_close a:link {
    color: #428bca !important;
    text-decoration: none !important;
    margin-right: 16px !important;
  }
  
  #__wb_record_content_done > #__wb_donate_close a:visited {
    color: #428bca !important;
  } 
  
  #__wb_record_content_done > #__wb_donate_close a:hover {
    color: #00B1F7 !important;
  }

#wm-ipp {
  width:100%;
  min-height:65px;
  min-width:800px;
  left:0;
  top:0;
  padding:0;
  margin:0;
  border-radius:0;
  background-color:transparent;
  font-size:11px;
}
#wm-ipp * {
  font-family:Lucida Grande, Helvetica, Arial, sans-serif;
  font-size:inherit;
  line-height:1.2;
  width:auto;
  outline:none;
  float:none;
}
#wm-ipp div, #wm-ipp tr, #wm-ipp td, #wm-ipp a, #wm-ipp form {
  padding:0;
  margin:0;
  border:none;
  border-radius:inherit;
  background-color:transparent;
  background-image:none;
  z-index:2147483640;
}
#wm-ipp table {
  border:none;
  border-collapse:collapse;
  margin:0;
  padding:0;
  width:auto;
  font-size:inherit;
}
#wm-ipp form input {
  padding:1px;
  height:auto;
  display:inline;
  margin:0;
}
#wm-ipp form input[type=submit] {
  padding:0 8px;
  margin:1px 0 1px 5px;
  width:auto !important;
}
#wm-ipp a:hover{
  text-decoration:underline !important;
}
#wm-ipp #wm-ipp-inside {
  width:98% !important;
  min-width:780px;
  margin: 0 auto;
  border:5px solid #000;
  border-top:none;
  background-color:rgba(255,255,255,0.9);
  -moz-box-shadow:1px 1px 4px #333;
  -webkit-box-shadow:1px 1px 4px #333;
  box-shadow:1px 1px 4px #333;
  border-radius:0 0 8px 8px;
}
/* selectors are intentionally verbose to ensure priority */
#wm-ipp #wm-logo {
  padding:0 10px;
  vertical-align:middle;
  min-width:110px;
}
#wm-ipp td.c {
  vertical-align:top;
  width:100%;
}
#wm-ipp td.c td.u {
  padding: 3px 0;
  text-align:center;
}
#wm-ipp td.c td.n {
  padding-left:5px;
}
#wm-ipp td.c td.n a {
  text-decoration:none;
  color:#33f;
  font-weight:bold;
}
#wm-ipp td.c td.n td.b {
  padding-right:6px !important;
  text-align:right !important;
  overflow:visible;
  white-space:nowrap;
  color:#99a;
  vertical-align:middle;
}
#wm-ipp td.c td.n td.c {
  background:#000;
  color:#ff0;
  font-weight:bold;
  text-align:center;
}
#wm-ipp.hi td.c td.n td.c {
  color:#ec008c;
}
#wm-ipp td.c td.n td.f {
  padding-left:6px !important;
  text-align:left !important;
  overflow:visible;
  white-space:nowrap;
  color:#99a;
  vertical-align:middle;
}
#wm-ipp td.c td.n tr.m td {
  text-transform:uppercase;
  white-space:nowrap;
  padding:2px 0;
}
#wm-ipp td.c td.s {
  padding-right:5px;
  text-align:center;
  vertical-align:bottom;
}
#wm-ipp td.c td.s a.t {
  color:#33f;
  font-weight:bold;
  line-height: 1.8;
}
#wm-ipp td.c td.s div.r {
  color: #666;
  font-size:9px;
  white-space:nowrap;
}
#wm-ipp td.c td.k {
  vertical-align:bottom;
  padding-bottom:2px;
}
#wm-ipp td.c td.n tr.y td, #wm-ipp td.c td.s {
  padding-bottom:2px;
}

div#wm-ipp-sparkline {
  position:relative;/* for positioning markers */
  white-space:nowrap;
  background-color:#fff;
  cursor:pointer;
  border-right:1px solid #ccc;
  line-height:0.9;
}
#sparklineImgId {
  position:relative;
  z-index:9012;
}
#wm-ipp-sparkline div.yt {
  position:absolute;
  z-index:9010 !important;
  background-color:#ff0 !important;
}
#wm-ipp-sparkline div.mt {
  position:absolute;
  z-index:9011 !important;
  background-color:#ec008c !important;
}  
#wm-ipp td.r {
  position:relative;
  padding-left:65px;/* to push td.c to the left */
}
#wm-ipp td.r a {
  display:block;
  padding:0 15px 0 0;
  color:#33f;
  border:none;
  position:absolute;
  right:5px;
  background-color:transparent;
  background-repeat:no-repeat !important;
  background-position:100% 100% !important;
}
/* Spinner */
#__wb_spinningSquaresG{        
  position: relative;
  width: 240px;
  height: 20px;
  
 
  padding: 0px !important;
  margin: 30px 0px 30px 160px !important;
  border: 0px !important;
  border-radius: 0px !important;
}

.__wb_spinningSquaresG {
   
      
  margin: 0px !important;
  padding: 0px !important;
  border: 0px !important;
  border-radius: 0px !important;
    
position:absolute;
top:0;
background-color:#000000;
width:22px;
height:22px;
-moz-animation-name:bounce_spinningSquaresG;
-moz-animation-duration:1.9s;
-moz-animation-iteration-count:infinite;
-moz-animation-direction:linear;
-moz-transform:scale(.3);
-webkit-animation-name:bounce_spinningSquaresG;
-webkit-animation-duration:1.9s;
-webkit-animation-iteration-count:infinite;
-webkit-animation-direction:linear;
-webkit-transform:scale(.3);
-ms-animation-name:bounce_spinningSquaresG;
-ms-animation-duration:1.9s;
-ms-animation-iteration-count:infinite;
-ms-animation-direction:linear;
-ms-transform:scale(.3);
-o-animation-name:bounce_spinningSquaresG;
-o-animation-duration:1.9s;
-o-animation-iteration-count:infinite;
-o-animation-direction:linear;
-o-transform:scale(.3);
animation-name:bounce_spinningSquaresG;
animation-duration:1.9s;
animation-iteration-count:infinite;
animation-direction:linear;
transform:scale(.3);
}

#__wb_spinningSquaresG_1{
left:0;
-moz-animation-delay:0.76s;
-webkit-animation-delay:0.76s;
-ms-animation-delay:0.76s;
-o-animation-delay:0.76s;
animation-delay:0.76s;
}

#__wb_spinningSquaresG_2{
left:30px;
-moz-animation-delay:0.95s;
-webkit-animation-delay:0.95s;
-ms-animation-delay:0.95s;
-o-animation-delay:0.95s;
animation-delay:0.95s;
}

#__wb_spinningSquaresG_3{
left:60px;
-moz-animation-delay:1.14s;
-webkit-animation-delay:1.14s;
-ms-animation-delay:1.14s;
-o-animation-delay:1.14s;
animation-delay:1.14s;
}

#__wb_spinningSquaresG_4{
left:90px;
-moz-animation-delay:1.33s;
-webkit-animation-delay:1.33s;
-ms-animation-delay:1.33s;
-o-animation-delay:1.33s;
animation-delay:1.33s;
}

#__wb_spinningSquaresG_5{
left:120px;
-moz-animation-delay:1.52s;
-webkit-animation-delay:1.52s;
-ms-animation-delay:1.52s;
-o-animation-delay:1.52s;
animation-delay:1.52s;
}

#__wb_spinningSquaresG_6{
left:150px;
-moz-animation-delay:1.71s;
-webkit-animation-delay:1.71s;
-ms-animation-delay:1.71s;
-o-animation-delay:1.71s;
animation-delay:1.71s;
}

#__wb_spinningSquaresG_7{
left:180px;
-moz-animation-delay:1.9s;
-webkit-animation-delay:1.9s;
-ms-animation-delay:1.9s;
-o-animation-delay:1.9s;
animation-delay:1.9s;
}

#__wb_spinningSquaresG_8{
left:210px;
-moz-animation-delay:2.09s;
-webkit-animation-delay:2.09s;
-ms-animation-delay:2.09s;
-o-animation-delay:2.09s;
animation-delay:2.09s;
}

@-moz-keyframes bounce_spinningSquaresG{
0%{
-moz-transform:scale(1);
background-color:#000000;
}

100%{
-moz-transform:scale(.3) rotate(90deg);
background-color:#FFFFFF;
}

}

@-webkit-keyframes bounce_spinningSquaresG{
0%{
-webkit-transform:scale(1);
background-color:#000000;
}

100%{
-webkit-transform:scale(.3) rotate(90deg);
background-color:#FFFFFF;
}

}

@-ms-keyframes bounce_spinningSquaresG{
0%{
-ms-transform:scale(1);
background-color:#000000;
}

100%{
-ms-transform:scale(.3) rotate(90deg);
background-color:#FFFFFF;
}

}

@-o-keyframes bounce_spinningSquaresG{
0%{
-o-transform:scale(1);
background-color:#000000;
}

100%{
-o-transform:scale(.3) rotate(90deg);
background-color:#FFFFFF;
}

}

@keyframes bounce_spinningSquaresG{
0%{
transform:scale(1);
background-color:#000000;
}

100%{
transform:scale(.3) rotate(90deg);
background-color:#FFFFFF;
}

}



















/*
http://www.plixup.com/pics_core3/1476697468265forum_pokemon.jpg
http://www.plixup.com/pics_core3/14766975773191bg.png
*/



/*
     FILE ARCHIVED ON 17:36:51 Feb 12, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 9:11:57 Oct 17, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
header {
	background: url('http://www.plixup.com/pics_core3/1476697468265forum_pokemon.jpg') !important;
}
#nav-site, .menu-mobile
{
	display: none;
}
#header-bottom
{
	width: 970px;
}
#logo
{
	display: none;
}
.header-menu
{
	text-align: center;
}
#header-bottom
{
	padding-top: 0px !important;
}
.header-menu ul, .header-menu ul li
{
	padding: 0px !important;
	margin: 0px;
	margin-top: 7px;
}
.header-menu ul li a
{
	padding: 4px 10px;
	padding-right: 10px;
	margin: 0px;
	margin-left: -4px;
	color: white;
}
.header-menu ul:last-child li:first-of-type a
{
	padding-left: 50px;
	margin-left: 0px;
}
body{background:url(http://www.plixup.com/pics_core3/14766975773191bg.png) #181818;color:#555;font:13px Century Gothic, Apple Gothic, Arial, sans-serif;margin:0;padding:0}
img{border:none;max-width:815px}
a{color:#069;text-decoration:none}
a:visited{color:#336}
h1{color:#555;font-size:30px;font-weight:700;letter-spacing:-.05em;line-height:30px;text-shadow:2px 1px 0 #FFF;width:970px;margin:0 0 7px;padding:0}
h2{color:#333;display:block;font-size:16px;font-weight:700;text-transform:uppercase;text-shadow:2px 1px 0 #FFF;margin:7px auto;padding:0}
h3{font-size:16px;color:#C30;font-weight:700;margin:0;padding:0}
h4,h5,h6{color:#000;font-size:1em;margin:0;padding:0}
.smalltext,tr.smalltext th{font-size:.85em}
.middletext{font-size:.9em;line-height:1em}
.normaltext{font-size:1em;line-height:1.2em}
.largetext{font-size:1.4em}
.centertext{text-align:center;margin:0 auto}
.righttext{margin-left:auto;margin-right:0;text-align:right}
.lefttext{margin-left:0;margin-right:auto;text-align:left}
.double_height{line-height:2em}
.flow_hidden .windowbg,.flow_hidden .windowbg2{margin-top:2px}
.clear_left{clear:left}
ul.reset,ul.reset li{list-style:none;margin:0;padding:0}
#container{width:970px;background:url(http://www.plixup.com/pics_core3/14766975773191bg.png) #F5F5F5;border:2px solid #AAA;margin:0 auto;padding:33px 15px}
#options{width:100%;font-size:12px;display:block;color:#777;text-align:center;border-bottom:1px dashed #CCC;margin:0 auto 15px}
#options ul{margin:0;padding:0}
#options li{width:14%;opacity:0.6;list-style:none;display:inline-block;margin:0;padding:0 0 7px}
#options li:hover{opacity:1}
#options ul li ul{display:none;position:absolute;background:#F5F5F5;font-size:12px;z-index:3;border:1px dotted #CCC;border-top:1px dashed #CCC;margin:7px 0 0;padding:7px}
#options ul li ul li{color:#777;display:block;width:160px;text-align:left;list-style:none;border-top:1px dotted #CCC;opacity:1;margin:0;padding:3px 0}
#options span{font-size:8px}
#options .titre{width:inherit;background:url(http://www.pokemontrash.com/web/sprites.gif) no-repeat 0 -41px;color:#C30;font-size:14px;font-weight:700;border:0;list-style-position:inside;text-shadow:1px 1px 1px #FFF;text-transform:uppercase;margin:0 0 7px;padding:0 0 0 19px}
#content{width:100%;min-height:850px;margin:0 0 30px}
#shoutbox{width:600px;float:left;border-right:1px dotted #DDD;margin:0 15px 0 0;padding:0 15px 0 0}
#stats .total{font-size:16px;margin:0 0 15px}
#stats a,#stats a:visited{color:#555}
#header{background:#222;box-shadow:0 8px 6px -6px #555;color:#EEE;height:30px;text-shadow:1px 1px 1px #000;width:970px;margin:0 0 15px;padding:140px 0 0}
#header p{width:970px;height:30px;display:block;overflow:hidden;background:rgba(0,0,0,0.8);margin:0}
#header p a{width:141px;display:table-cell;font-size:13px;color:#FFF;text-shadow:1px 1px 1px #000;text-align:center;padding:7px 10px}
#header p a:hover{background:rgba(0,0,0,0.6);text-decoration:none}
#footer{background:#111;border-top:3px solid #C30;clear:both;color:#FFF;font-size:12px;font-weight:700;height:auto;text-align:center;width:100%;margin:0 auto;padding:10px 0}
#footer b{color:#FC0}
#top{width:100%;height:35px;position:fixed;z-index:3;top:0;overflow:visible}
#menu{width:1004px;color:#F5F5F5;font-size:15px;overflow:hidden;margin:0 auto}
#menu ul{width:1004px;height:35px;background:url(http://www.pokemontrash.com/web/bg.png) #181818 -1px 0;list-style:none outside none;margin:0;padding:0}
#menu ul li{display:inline;margin:0;padding:0}
#menu ul li:hover{background:#181818}
#menu .logo a{width:82px;height:52px;float:left;z-index:3;display:block;text-indent:-5678px;background:url(http://www.pokemontrash.com/web/pokemon-trash.png) no-repeat;margin:0 7px 0 0}
#menu .section{display:block;text-shadow:1px 1px 1px #000;font-size:8px;float:left;padding:7px 12px}
#menu .section a{font-size:17px;text-decoration:none;color:#F5F5F5}
#menu .search{float:left;position:relative;margin:0 11px 0 0}
#menu .search input{width:130px;height:22px;background-color:#F9F9F9;border:1px solid #DDD;border-radius:4px;color:#AAA;position:relative;margin:6px 0 0;padding:0 30px 0 5px}
#menu .search button{width:26px;height:21px;background:url(http://www.pokemontrash.com/web/sprites.gif) 7px -55px no-repeat;border:0;position:absolute;right:0;cursor:pointer;top:6px;z-index:1;margin:1px 0 0;padding:0}
#menu ul li ul{width:270px;height:inherit;display:none;background:#181818;position:absolute;top:35px;border:1px dotted #666;border-bottom:6px solid #666;margin:0 0 0 -15px;padding:0}
#menu ul li ul li{list-style-type:square;list-style-position:inside;display:list-item;color:#FC0;border-bottom:1px dotted #666;margin:0;padding:5px 15px}
#menu ul li ul li a{color:#F5F5F5;display:block;font-size:14px;text-decoration:none}
#menu ul li ul li:hover{background:#111}
#menu ul li ul li.title{font-size:14px;font-weight:700;text-transform:uppercase;background:#181818;border-bottom:1px solid #666;text-align:center;list-style-type:none;color:#F5F5F5;margin:0 0 3px;padding:7px 0}
#menu ul li ul .voirplus{list-style-type:none!important;margin:0;padding:7px 0}
#menu ul li ul .voirplus:before{content:"+ ";float:left;font-size:14px;color:#FC0;text-transform:uppercase;font-weight:700;margin:0 7px 0 15px}
#menu ul li ul .voirplus b{color:#FC0;text-transform:uppercase}
#une .guide{background-repeat:no-repeat;float:left;width:204px;margin:0 15px 15px 0;padding:0}
#une .guide img{height:130px;width:204px;margin:0;padding:0}
#une .guide a{color:#FC0;display:block;line-height:0.7;text-decoration:none}
#une .guide h3{background:#222;border-bottom:2px solid #222;color:#FC0;font-size:13px;overflow:hidden;margin:0;padding:7px 0}
.navigate_section{width:100%;display:block;margin:0 0 7px;padding:0 0 7px}
.navigate_section ul{display:inline;border-top:0 solid #e0e0e0;overflow:hidden;list-style:none;clear:both;width:100%;margin:0;padding:1em 0 .5em}
.navigate_section ul li{display:inline;font-size:13px;padding:0 .5em 0 0}
.navigate_section ul li a{white-space:pre;color:#333;padding:0 3px}
.dropmenu{margin:15px auto;padding:0}
.dropmenu li{height:25px;background:#F9F9F9;border:1px solid #EEE;list-style-type:none;font-size:11px;font-weight:700;display:inline;margin:0 3px;padding:3px 7px}
.pagesection{font-size:.9em;overflow:hidden;margin-bottom:1px;padding:.2em}
.classer{border-bottom:1px dashed #DDD;margin:4px 0 0;padding:0 0 4px}
.buttonlist li{list-style:none;float:left;margin:0;padding:0}
.buttonlist li a{display:block;font-size:11px;color:#666;border:1px solid #D9D9D9;border-radius:5px;background:#e8e8e8;margin-left:15px;text-transform:uppercase;font-weight:700;cursor:pointer;padding:4px 10px}
.buttonlist li a:hover{border:1px solid #AAA}
.buttonlist li a.active{background:#c30;color:#fff}
.align_top ul li a,.align_bottom ul li a{margin:0 12px 0 0}
#liste_messages{border:2px solid #DDD;background:#F5F5F5}
.post_wrapper{display:block;overflow:hidden;border-bottom:1px dotted #CCC;padding:15px}
.alternate{background:#EEE}
.signature{max-height:250px;overflow:auto;border-top:1px solid #ccc;line-height:1.4em;font-size:.85em;margin:15px 0 0;padding:15px 0 0}
.signature img{max-height:180px}
.poster{float:left;width:90px;text-align:center}
.postarea{display:block;margin:0 0 0 120px}
.poster h4{font-size:14px;margin:0}
.poster h4,.poster h4 a{color:#C30}
.poster ul ul{margin:.3em 1em 0 0;padding:0}
.poster ul ul li{display:inline}
.poster li.stars,.poster li.avatar,.poster li.blurb,li.postcount,li.im_icons ul{margin-top:.5em}
.poster li.avatar img{max-width:90px!important;max-height:150px!important;height:auto!important}
.poster li.warning{line-height:1.2em;padding-top:1em}
.poster li.warning a img{vertical-align:bottom;padding:0 .2em}
.post{border-top:1px dashed #C9C9C9;font-size:14px;overflow:hidden;margin:10px 0;padding:10px 0 0}
.inner{border-top:1px solid #ccc;margin:0 1em 0 0;padding:1em 1em 2px 0}
img.smiley{vertical-align:bottom}
#forumposts .reportlinks{margin-right:1.5em;text-align:right;clear:right}
#profil{width:180px;float:left;min-height:600px;font-size:12px;margin:15px 30px 15px 0}
#profil img{border:10px solid #FFF;box-shadow:0 0 15px #AAA;width:160px!important;height:auto!important;margin:0 0 15px}
.content{border:3px solid #ccc;margin:0;padding:.5em 1.2em}
.cat_bar{border:#bab9b9;padding-left:9px;overflow:hidden;margin-bottom:1px}
.title_bar{padding-left:9px;height:31px;overflow:hidden;margin-bottom:1px}
.table_grid{border-collapse:collapse;margin-top:.1em;width:100%}
.table_grid th{font-size:11px;text-align:left;border-bottom:1px dashed #DDD;margin:0 0 3px;padding:0 0 3px}
.table_grid td{border-bottom:1px dashed #ccc;padding:3px}
.table_list{width:100%;border-collapse:collapse}
.table_list tbody{border:2px solid #DDD;background:#EEE}
.table_list tbody td{border-bottom:1px solid #D3D3D3;padding:6px 3px}
.description{font-size:12px}
.alerte{display: block; background:url(http://www.pokemontrash.com/club/Themes/default/images/none.png) no-repeat 0 3px;vertical-align:top;height:31px;padding:3px 0 0!important}
.alerte2{width:25px;height:25px;display:block;text-indent:-9678px;background-image:url(http://www.pokemontrash.com/club/Themes/default/images/new.png);background-repeat:no-repeat}
.subject a,.subject a:visited{color:#333}
.epingle{background:#F5F5F5}
.stickybg2{background:url(http://www.pokemontrash.com/club/Themes/default/images/icons/quick_sticky.gif) no-repeat 0 5px;font-weight:700;padding:0 0 0 22px !important}
.lockedbg2{font-style:italic}
.locked_sticky2{background-image:url(http://www.pokemontrash.com/club/Themes/default/images/icons/quick_sticky_lock.gif);background-repeat:no-repeat;background-position:98% 4px}
a.collapse{margin:10px 0 0}
.children{width:440px;display:block;color:#555;border-top:1px dashed #CCC;font-size:11px;margin:3px 0 0;padding:2px 0 0}
.moderators{font-size:.8em}
.lastpost img{float:right;padding:4px}
img.new_posts{padding:0 .1em}
#quickReplyOptions form textarea{opacity:0.8;height:100px;width:968px;margin:5px 0 10px}
#postbuttons div.buttons{width:40%;float:right;padding:.5em}
#postbuttons div.middletext{width:60%}
#postbuttons span{display:block;text-align:right}
#postbuttons #pagelinks{padding-top:1em}
input,button,select,textarea{font:95%/115% verdana, Helvetica, sans-serif;color:#000;background:#fff;border:1px solid #7f9db9;padding:2px}
#content dd input,#content dd textarea,#content dd select{max-width:94%!important}
.button_submit,.button_reset{background:#BCF;border:1px solid #CCC;cursor:pointer;font-weight:400;border-radius:5px;padding:4px 10px}
.button_submit:hover,.button_reset:hover{border:1px solid #aaa;background:#cde7ff}
fieldset{border:1px solid #c4c4c4;margin:0 0 .5em;padding:1em}
fieldset legend{font-weight:700;color:#444}
#searchform,#simple_search p{margin:0;padding:.5em}
#simple_search,#simple_search p,#advanced_search{text-align:center!important;margin:0}
#search_error{font-style:italic;padding:.3em 1em}
#search_term_input{font-size:115%;margin:0 0 1em}
#searchform fieldset{text-align:left;border:none;padding:0}
#advanced_search dl#search_options{padding-top:1em;overflow:hidden;margin:0 auto}
#advanced_search dt{clear:both;float:left;text-align:right;width:20%;padding:.2em}
#advanced_search dd{width:75%;float:left;text-align:left;margin:0 0 0 .5em;padding:.2em}
blockquote.bbc_standard_quote,blockquote.bbc_alternate_quote{font-size:11px;color:#000;line-height:1.4em;background:url(http://www.pokemontrash.com/club/Themes/default/images/theme/quote.png) .1em .1em no-repeat;border-top:2px solid #99A;border-bottom:2px solid #99A;overflow:auto;margin:.1em 0 .3em;padding:1.1em 1.4em}
blockquote.bbc_standard_quote{background-color:#F9F9F9}
blockquote.bbc_alternate_quote{background-color:#e7eafc}
code.bbc_code{display:block;font-size:x-small;background:#eef;border-top:2px solid #999;border-bottom:2px solid #999;line-height:1.5em;overflow:auto;white-space:nowrap;max-height:24em;padding:3px 1em}
.codeheader,.quoteheader{color:#666;font-size:x-small;font-weight:700;padding:0 .3em}
.codeoperation{font-weight:400}
.bbc_link:link,.bbc_link:visited{border-bottom:1px solid #A8B6CF}
.bbc_link:hover{text-decoration:none;border-bottom:1px solid #346}
.bbc_size{line-height:1.4em}
.bbc_color a{color:inherit}
.bbc_img{border:0}
.bbc_table{font:inherit;color:inherit;border-spacing:2px;background:#88A6C0 url(http://www.pokemontrash.com/club/Themes/default/css/images/catbg.jpg) repeat-x}
.bbc_table td{font:inherit;color:inherit;vertical-align:top;background:#E9F0F6 url(http://www.pokemontrash.com/club/Themes/default/css/images/titlebg.jpg) repeat-x 0 -17px;padding:5px}
.bbc_list{text-align:left}
.help{cursor:help}
.meaction{color:red}
.highlight{font-weight:700;color:#ff7200!important;font-size:1.1em}
.highlight2{background-color:#D1E1EF;color:#000!important}
fieldset.spoiler{border:1px dashed gray}
fieldset.spoiler > legend{font-size:1.2em}
div.spoilerheader a{font-family:sans-serif;font-size:1.1em;font-weight:700}
div.spoilerheader input{background-color:#cececc;color:#3e3e33;font:.9em sans-serif}
div.spoilerbody{color:#0f0f0f;border:1px dotted gray;margin:1em;padding:1em}
fieldset.spoiler div.spoilerbody{border:0;padding:0}
dl.settings{overflow:auto;margin:0 0 10px;padding:0}
dl.settings dt{width:70%;float:left;margin:0 0 10px;padding:0}
dl.settings dt.settings_title{width:100%;float:none;font-weight:700;clear:both;margin:0 0 10px;padding:5px 0 0}
dl.settings dt.windowbg{width:98%;float:left;clear:both;margin:0 0 3px;padding:0 0 5px}
dl.settings dd{width:30%;float:right;overflow:auto;margin:0 0 3px;padding:0}
dl.settings img{margin:0 10px 0 0}
.login{width:540px;margin:0 auto}
.login dt,.login dd{width:44%;margin:0 0 .4em;padding:.1em}
.login dt{float:left;clear:both;text-align:right;font-weight:700}
.login dd{width:54%;float:right;text-align:left}
.login p{text-align:center}
.register_error{border:1px dashed red;margin:0 1ex 1ex;padding:5px}
dl.register_form{clear:right;margin:0}
dl.register_form dt{font-weight:400;float:left;clear:both;width:50%;margin:.5em 0 0}
dl.register_form dt strong{font-weight:700}
dl.register_form dd{float:left;width:49%;margin:.5em 0 0}
#confirm_buttons{text-align:center;padding:1em 0}
.coppa_contact{width:32ex;background-color:#fff;color:#000;margin-left:5ex;border:1px solid #000;padding:4px}
.valid_input{background-color:#f5fff0}
.invalid_input{background-color:#fff0f0}
.topic_table td blockquote,.topic_table td .quoteheader{margin:.5em}
.search_results_posts .buttons{padding:5px 1em 0 0}
.centertext #recaptcha_table{margin:0 auto!important}
.floatright,a.unreadlink,a.collapse,#postbuttons .buttonlist{float:right}
.floatleft,#forumposts .modified{float:left}
.flow_auto,.login dl{overflow:auto}
.flow_hidden,#moderationbuttons,.search_results_posts{overflow:hidden}
.clear,#searchform p.clear{clear:both}
.clear_right,#postbuttons span.lower{clear:right}
#options ul li:hover ul,#menu ul li:hover ul,dl.register_form dt span{display:block}
#options ul li ul li:hover,.bbc_u,.register_error span{text-decoration:underline}
.buttonlist ul,.poster h4,.poster ul,.table_list p,.table_grid p,form,select{margin:0;padding:0}
dl,dt{overflow:auto;margin:0;padding:0}


.sp-wrap {	
	border: 1px solid #ccc !important;
	border-radius: 6px !important;
	background-color: #e8e8e8 !important;
	margin: 0 auto 1em !important;
}

.sp-open {
	background: url(http://www.pokemontrash.com/club/Themes/default/images/spoiler/open.gif) no-repeat scroll left center transparent !important;
	padding-left: 14px !important;
	display: block;
}

.sp-closed {
	background: url(http://www.pokemontrash.com/club/Themes/default/images/spoiler/close.gif) no-repeat scroll left center transparent !important;
	padding-left: 14px !important;
	display: block;
}

.sp-head {
	cursor: pointer;
	color: #343434;
	font-size: 11px;
	line-height: 15px !important;
	margin-left: 6px !important;
	padding: 1px 14px 3px !important;
	width: 97% !important;
	min-height: 15px;
}
	
.sp-body {
	display: none;
	border-radius: 0 0 6px 6px !important;
	background: none repeat scroll 0 0 #f4f4f4 !important;
	border-top: 1px solid #ccc !important;
	line-height: 17px;
	padding: 3px 3px 3px 7px !important;
	font-size: 12px;
	color: #343434;
}
`;

var css_2015 = `
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700);
.menu-mobile
{
	display: none;
}
body {
    background: #E9E9E9 url(http://www.pokemontrash.com/web/bg-forum.jpg) no-repeat;
    background-attachment: fixed;
	background-size:cover;
    color: #1b2b3b;
    font: 100% 'Open Sans',Arial,sans-serif;
    margin: 0;
    padding: 0;
}

a {
    color: #069;
    text-decoration: none;
}

a img {
    border: none;
}

a:visited {
    color: #776694;
}

h1 {
    font-size: 2.3em;
    font-weight: 700;
    line-height: 1;
    letter-spacing: inherit;
    border-bottom: #f0f8ff;
    display: block;
    margin: 0;
    padding: 0 0 10px;
}

h1 a {
    color: #236;
}

h2 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat 0 -1167px;
    display: block;
    text-align: left;
    clear: both;
    line-height: 1;
    font-size: 1.4em;
    font-weight: 700;
    text-shadow: 2px 1px 0 #FFF;
    margin: 10px 0;
    padding: 0;
}

h2 a {
    font-weight: 100;
}

h3 {
    font-size: 14px;
    width: inherit;
    color: #069;
    display: block;
    font-weight: 700;
    margin: 0;
    padding: 0;
}

ul {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

#container {
    width: 100%;
    position: relative;
    margin: 40px 0 0;
    padding: 0;
}

#header {
    width: auto;
    max-width: 1100px;
    position: relative;
	background:none!important;
    padding: 0;
    margin: 0 auto;
}
#header #logo {
    width: 120px;
    height: 80px;
    display: block;
    background: url(http://www.pokemontrash.com/web/pokemontrash.png) no-repeat;
    text-indent: -5678px;
}
#header .header-menu{
    text-align: center;
    padding: 55px 0 7px 0;
    margin: 0 auto;
}

#header .header-membre{
    margin:0 30px 0 0;
}

#header ul {
    margin: 0 auto;
    width: 100%;
    display: inline;
}

#header li {
    display: inline-block;
    text-align: center;
    margin: 3px;
    background: rgba(0,0,0,0.6);
    border-radius: 3px;
}

#header li:hover {
    background: rgba(0,0,0,0.8);
}

#header li a {
    font-size: 11px;
    text-transform: uppercase;
    display: block;
    color: #FFF;
    text-shadow: 1px 1px 1px #000;
    padding: 7px 15px;
}

#main {
    width: auto;
    max-width: 1100px;
    background: #F8F8F8;
    display: block;
    position: relative;
    min-height: 1440px;
    border-radius: 7px;
    border: 1px solid #DCDCDC;
    margin: 0 auto;
}

#article {
    width: auto;
    vertical-align: top;
    line-height: 1.5;
    font-size: .9em;
    max-width: 100%;
    text-overflow: ellipsis;
    padding: 20px 30px 50px 30px;
    margin: 0;
}

#article a {
    color: #255369;
    text-decoration: none;
}

#article img {
    border: none;
    max-width: 100%;
    height: auto;
}

#article iframe {
    max-width: 100%;
}

#footer {
    color: #FFFFFF;
    text-shadow: -1px 0px 2px black;
    font-size: .8em;
    font-weight: 700;
    text-align: center;
    clear: both;
    margin: 0;
    padding: 20px 30px 55px;
}

#footer a,#footer strong {
    color: #FFF9D1;
    cursor: pointer;
}

    #sbar {
        width: 100%;
		max-width: 1100px;
		        text-align: center;
        background: #E9E9E9;
        border-top: 1px dotted #CCC;
        border-bottom: 1px dotted #CCC;
        padding: 10px 0;
        margin: 0 0 20px 0;
    
}

#sbar ul {
    width: 266px; 
    padding: 7px 0 5px 10px;
    margin: 0 auto;
}

#sbar li:nth-child(n+2) {
    list-style-type: none;
    padding: 7px 0;
    margin: 0 3px;
    border-radius: 3px;
    display: inline-block;
}

#sbar a {
    text-decoration: none;
    display: block;
    padding: 0 15px 0 35px;
    font-size: 12px;
    color: #FFF;
    font-weight: 700;
}

#sbar #sbar-menu {
    display: none;
}

#sbar-fb {
    background: #344b7b url(http://www.pokemontrash.com/web/navbar.png) no-repeat 2px -532px;
}

#sbar-twt {
    background: #009ad4 url(http://www.pokemontrash.com/web/navbar.png) no-repeat 2px -500px;
}

#sbar-gp {
    display: inline-block;
    height: 24px;
    width: 80px;
    vertical-align: middle;
}

#nav {
	display: none;
}

#nav:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 30px 0;
    border-color: #EAE9E9 transparent transparent;
    position: absolute;
    text-align: center;
    z-index: 4;
    left: 48.3%;
    top: 40px;
    margin: 0 auto;
}

#nav>ul {
    max-width: 1116px;
    position: relative;
    padding: 0 0 0 10px;
    margin: 0 auto;
}

#nav li {
    color: #0D3355;
    list-style: none;
    display: inline-block;
}

#nav .menu-titre>a {
    font-size: 12px;
    display: block;
    color: #0D3355;
    text-transform: uppercase;
    text-shadow: 0 0 1px #FFF;
    line-height: 14px;
    margin: 0;
    padding: 11px 30px 9px 25px;
}

#nav ul li .menu-titre a {
    padding: 2px 0 2px 25px;
}

#nav ul ul {
    width: 145px;
    height: 0;
    background: #EAE9E9;
    overflow: hidden;
    font-size: 12px;
    box-shadow: 0 4px 2px -2px #AAA;
    position: absolute;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    -ms-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    margin: 0 0 0 -10px;
    padding: 0 0 0 10px;
}

#container .mobile ul ul,#nav ul:hover ul {
    height: 340px;
}

#nav li:hover ul {
    background: #E5E5E5;
}

#nav li:hover a {
    color: #c30;
}

#nav li ul li {
    margin: 7px 0;
    display: block;
}

#nav li ul li a {
    display: block;
    color: #0D3355;
}

#nav .home a {
    width: 28px;
    height: 26px;
    display: block;
    cursor: pointer;
    text-indent: -5678px;
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat 0 0;
    padding: 5px 20px 5px 0;
}

#nav .menu1 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -39px;
}

#nav .menu2 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -69px;
}

#nav .menu3 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -100px;
}

#nav .menu4 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -141px;
}

#nav .menu5 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -173px;
}

#nav .menu6 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -207px;
}

#nav .menu7 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -239px;
}

#nav .menu8 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -271px;
}

#nav .menu9 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -320px;
}

#nav .menu10 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -293px;
}

#nav .menu11 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -6px -323px;
}

#nav .menu12 {
    background: url(http://www.pokemontrash.com/web/navbar.png) no-repeat -5px -357px;
}

#nav li.menu-plus {
    padding: 0 20px 0 0;
}

#nav li.menu-plus:before {
    content: '+';
    font-size: 16px;
    color: #0D3355;
}

#nav .search {
    min-width: 130px;
    width: calc(100% - 815px);
    height: 40px;
    background: #F1F1F1;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #DBDBDB;
    border-right: 1px solid #DBDBDB;
    margin: 0 0 0 30px;
    padding: 0;
}

#nav .search input {
    font-size: 12px;
    width: auto;
    color: #666;
    background: 0 0;
    position: relative;
    border-radius: 2px;
    outline: 0;
    border: 0;
    margin: 0;
    padding: 13px 0 12px 13px;
}

#nav .search button {
    background: none no-repeat;
    background-image: url(http://www.pokemontrash.com/web/navbar.png);
    background-position: -2px -399px;
    border: 0;
    position: absolute;
    top: 6px;
    right: 5px;
    cursor: pointer;
    margin: 2px 0 0;
    width: 20px;
    height: 20px;
    z-index: 3;
    padding: 0;
}

#nav .inscription {
    margin: 8px 0;
    cursor: pointer;
    border-radius: 4px;
    font-size: 11px;
    text-transform: uppercase;
    color: #0D3355;
    padding: 5px 10px;
}




.ad-sky {
    text-align: center;
    margin: 0 auto 20px auto;
}

.smalltext,tr.smalltext th {
    font-size: .8em;
}

.middletext {
    font-size: .9em;
    line-height: 1em;
}

.normaltext {
    font-size: 1em;
    line-height: 1.2em;
}

.largetext {
    font-size: 1.4em;
}

.centertext {
    text-align: center;
    margin: 0 auto;
}

.righttext {
    margin-left: auto;
    margin-right: 0;
    text-align: right;
}

.lefttext {
    margin-left: 0;
    margin-right: auto;
    text-align: left;
}

.double_height {
    line-height: 2em;
}

.flow_hidden .windowbg,.flow_hidden .windowbg2 {
    margin-top: 2px;
}

.clear_left {
    clear: left;
}

ul.reset,ul.reset li {
    list-style: none;
    margin: 0;
    padding: 0;
}

#stats {
    margin: 20px 0;
}

#stats .total {
    font-size: 16px;
    margin: 20px 0;
}

#stats a,#stats a:visited {
    color: #555;
}

.navigate_section {
    width: 100%;
    display: block;
    margin: 0 0 20px 0;
}

.navigate_section ul {
    display: inline;
    list-style: none;
}

.navigate_section ul li {
    display: inline;
    font-size: 13px;
}

.navigate_section ul li a {
    white-space: pre;
    color: #333;
    padding: 0 3px;
}

.dropmenu {
    margin: 15px auto;
    padding: 0;
}

.dropmenu li {
    height: 25px;
    background: #F9F9F9;
    border: 1px solid #EEE;
    list-style-type: none;
    font-size: 11px;
    font-weight: 700;
    display: inline;
    margin: 0 3px;
    padding: 3px 7px;
}

.pagesection {
    padding: 20px 0;
}

.classer {
    border-bottom: 1px dashed #DDD;
    margin: 4px 0 0;
    padding: 0 0 4px;
}

#moderationbuttons_strip {
    margin: 10px auto;
    float: none !important;
}

.buttonlist {
    margin: 0;
}

.buttonlist li {
    list-style: none !important;
    display: inline-block;
    vertical-align: middle;
    margin: 10px 0;
    padding: 0;
}

.buttonlist li a {
    display: block;
    font-size: 11px;
    color: #666;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    background: #e8e8e8;
    margin-left: 15px;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    padding: 9px 15px;
}

.buttonlist li a:hover {
    border: 1px solid #AAA;
}

.buttonlist li a.active {
    background: #c30;
    color: #fff !important;
}

.align_top ul li a,.align_bottom ul li a {
    margin: 0 12px 0 0;
}

#liste_messages {
    border: 2px solid #DDD;
    background: #F5F5F5;
}

.post_wrapper {
    display: block;
    overflow: hidden;
    border-bottom: 1px dotted #CCC;
    padding: 15px;
}

.alternate {
    background: #EEE;
}

.signature {
    max-height: 250px;
    overflow: hidden;
    border-top: 1px solid #ccc;
    line-height: 1.4em;
    font-size: .85em;
    margin: 15px 0 0;
    padding: 15px 0 0;
}

.signature:hover {
    overflow: auto;
}

.signature img {
    max-height: 180px;
}

.poster {
    float: left;
    width: 90px;
    text-align: center;
}

.postarea {
    display: block;
    margin: 0 0 0 120px;
}

.poster h4 {
    font-size: 14px;
    margin: 0;
}

.poster h4,.poster h4 a {
    color: #C30 !important;
}

.poster ul ul {
    margin: .3em 1em 0 0;
    padding: 0;
}

.poster ul ul li {
    display: inline;
}

.poster li.stars,.poster li.avatar,.poster li.blurb,li.postcount,li.im_icons ul {
    margin-top: .5em;
}

.poster li.avatar img {
    max-width: 100% !important;
}

.poster li.warning {
    line-height: 1.2em;
    padding-top: 1em;
}

.poster li.warning a img {
    vertical-align: bottom;
    padding: 0 .2em;
}

.post {
    border-top: 1px dashed #C9C9C9;
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    margin: 10px 0;
    padding: 10px 0 0;
}

.inner {
    border-top: 1px solid #ccc;
    margin: 0 1em 0 0;
    padding: 1em 1em 2px 0;
}

img.smiley {
    vertical-align: bottom;
}

#forumposts .reportlinks {
    margin-right: 1.5em;
    text-align: right;
    clear: right;
}

#profil {
    width: 180px;
    float: left;
    min-height: 600px;
    font-size: 12px;
    margin: 15px 30px 15px 0;
}

#profil img {
    border: 10px solid #FFF;
    box-shadow: 0 0 15px #AAA;
    width: 160px!important;
    height: auto!important;
    margin: 0 0 15px;
}

.content {
    border: 3px solid #ccc;
    margin: 0;
    padding: .5em 1.2em;
}

.cat_bar {
    border: #bab9b9;
    padding-left: 9px;
    overflow: hidden;
    margin-bottom: 1px;
}

.title_bar {
    padding-left: 9px;
    height: 31px;
    overflow: hidden;
    margin-bottom: 1px;
}

.table_grid {
    border-collapse: collapse;
    margin-top: .1em;
    width: 100%;
}

.table_grid th {
    font-size: 11px;
    font-weight: 100;
    text-transform: uppercase;
    text-align: left;
    border-bottom: 1px dashed #DDD;
    margin: 0 0 3px;
    padding: 0 0 4px;
}

.table_grid td {
    border-bottom: 1px dashed #ccc;
    padding: 7px 3px;
}

.table_list {
    width: 100%;
    border-collapse: collapse;
}

.table_list tbody {
    border: 2px solid #EAEAEA;
    background: #F1F1F1;
}

.table_list td {
    border-bottom: 1px solid  #E1E1E1;
    min-width: 40px;
    font-size: 13px;
    color: #666;
    vertical-align: top;
    position: relative;
    padding: 6px 3px;
}

.table_grid p, .table_list p {
    padding: 0;
    margin: 3px 0 6px 0;
}

.table_list td:nth-child(3) {
    text-align: center;
}

.table_list td:nth-child(4) {
    width: 25%;
}

.alerte {
    background: url(http://www.pokemontrash.com/club/Themes/default/images/none.png) no-repeat 0 3px;
    vertical-align: top;
     width: 25px;
    height: 25px;
    display: block;
    text-indent: -9678px;
    height: 31px;
    padding: 3px 0 0!important;
}

.alerte2 {
    width: 25px;
    height: 25px;
    display: block;
    text-indent: -9678px;
    background-image: url(http://www.pokemontrash.com/club/Themes/default/images/new.png);
    background-repeat: no-repeat;
}

.subject a,.subject a:visited {
    color: #333;
}

.epingle {
    background: #F5F5F5;
}

.stickybg2 {
    background: url(http://www.pokemontrash.com/club/Themes/default/images/icons/quick_sticky.gif) no-repeat 0 5px;
    font-weight: 700;
    padding-left: 22px !important;
}

.lockedbg2 {
    font-style: italic;
}

.locked_sticky2 {
    background-image: url(http://www.pokemontrash.com/club/Themes/default/images/icons/quick_sticky_lock.gif);
    background-repeat: no-repeat;
    background-position: 98% 4px;
}

a.collapse {
    float: none;
    bottom: 13px;
    right: 0;
    position: absolute;
}

.children {
    display: block;
    color: #555;
    border-top: 1px dashed #CCC;
    font-size: 11px;
    margin: 3px 0 0;
    padding: 5px 0 0;
}

.moderators {
    font-size: .8em;
}

.lastpost img {
    float: right;
    padding: 4px;
}

img.new_posts {
    padding: 0 .1em;
}

#quickReplyOptions form textarea {
    opacity: 0.8;
    height: 100px;
    width: 100%;
    margin: 5px 0 10px 0;
}

#postbuttons div.buttons {
    width: 40%;
    float: right;
    padding: .5em;
}

#postbuttons div.middletext {
    width: 60%;
}

#postbuttons span {
    display: block;
    text-align: right;
}

#postbuttons #pagelinks {
    padding-top: 1em;
}

input,button,select,textarea {
    font: 95%/115% verdana, Helvetica, sans-serif;
    color: #000;
    background: #fff;
    border: 1px solid #7f9db9;
    padding: 2px;
}

#content dd input,#content dd textarea,#content dd select {
    max-width: 94%!important;
}

.button_submit,.button_reset {
    background: #BCF;
    border: 1px solid #CCC;
    cursor: pointer;
    font-weight: 400;
    border-radius: 5px;
    padding: 4px 10px;
}

.button_submit:hover,.button_reset:hover {
    border: 1px solid #aaa;
    background: #cde7ff;
}

fieldset {
    border: 1px solid #c4c4c4;
    margin: 0 0 .5em;
    padding: 1em;
}

fieldset legend {
    font-weight: 700;
    color: #444;
}

#searchform,#simple_search p {
    margin: 0;
    padding: .5em;
}

#simple_search,#simple_search p,#advanced_search {
    text-align: center!important;
    margin: 0;
}

#search_error {
    font-style: italic;
    padding: .3em 1em;
}

#search_term_input {
    font-size: 115%;
    margin: 0 0 1em;
}

#searchform fieldset {
    text-align: left;
    border: none;
    padding: 0;
}

#advanced_search dl#search_options {
    padding-top: 1em;
    overflow: hidden;
    margin: 0 auto;
}

#advanced_search dt {
    clear: both;
    float: left;
    text-align: right;
    width: 20%;
    padding: .2em;
}

#advanced_search dd {
    width: 75%;
    float: left;
    text-align: left;
    margin: 0 0 0 .5em;
    padding: .2em;
}

blockquote.bbc_standard_quote,blockquote.bbc_alternate_quote {
    font-size: 11px;
    color: #000;
    line-height: 1.4em;
    background: url(http://www.pokemontrash.com/club/Themes/default/images/theme/quote.png) .1em .1em no-repeat;
    border-top: 2px solid #99A;
    border-bottom: 2px solid #99A;
    overflow: auto;
    margin: .1em 0 .3em;
    padding: 1.1em 1.4em;
}

blockquote.bbc_standard_quote {
    background-color: #F9F9F9;
}

blockquote.bbc_alternate_quote {
    background-color: #e7eafc;
}

code.bbc_code {
    display: block;
    font-size: x-small;
    background: #eef;
    border-top: 2px solid #999;
    border-bottom: 2px solid #999;
    line-height: 1.5em;
    overflow: auto;
    white-space: nowrap;
    max-height: 24em;
    padding: 3px 1em;
}

.codeheader,.quoteheader {
    color: #666;
    font-size: x-small;
    font-weight: 700;
    padding: 0 .3em;
}

.codeoperation {
    font-weight: 400;
}

.bbc_link:link,.bbc_link:visited {
    border-bottom: 1px solid #A8B6CF;
}

.bbc_link:hover {
    text-decoration: none;
    border-bottom: 1px solid #346;
}

.bbc_size {
    line-height: 1.4em;
}

.bbc_color a {
    color: inherit;
}

.bbc_img {
    border: 0;
}

.bbc_table {
    font: inherit;
    color: inherit;
    border-spacing: 2px;
    background: #88A6C0 url(http://www.pokemontrash.com/web/images/catbg.jpg) repeat-x;
}

.bbc_table td {
    font: inherit;
    color: inherit;
    vertical-align: top;
    background: #E9F0F6 url(http://www.pokemontrash.com/web/images/titlebg.jpg) repeat-x 0 -17px;
    padding: 5px;
}

.bbc_list {
    text-align: left;
}

.help {
    cursor: help;
}

.meaction {
    color: red;
}

.highlight {
    font-weight: 700;
    color: #ff7200!important;
    font-size: 1.1em;
}

.highlight2 {
    background-color: #D1E1EF;
    color: #000!important;
}

fieldset.spoiler {
    border: 1px dashed gray;
}

fieldset.spoiler > legend {
    font-size: 1.2em;
}

div.spoilerheader a {
    font-family: sans-serif;
    font-size: 1.1em;
    font-weight: 700;
}

div.spoilerheader input {
    background-color: #cececc;
    color: #3e3e33;
    font: .9em sans-serif;
}

div.spoilerbody {
    color: #0f0f0f;
    border: 1px dotted gray;
    margin: 1em;
    padding: 1em;
}

fieldset.spoiler div.spoilerbody {
    border: 0;
    padding: 0;
}

dl.settings {
    overflow: auto;
    margin: 0 0 10px;
    padding: 0;
}

dl.settings dt {
    width: 70%;
    float: left;
    margin: 0 0 10px;
    padding: 0;
}

dl.settings dt.settings_title {
    width: 100%;
    float: none;
    font-weight: 700;
    clear: both;
    margin: 0 0 10px;
    padding: 5px 0 0;
}

dl.settings dt.windowbg {
    width: 98%;
    float: left;
    clear: both;
    margin: 0 0 3px;
    padding: 0 0 5px;
}

dl.settings dd {
    width: 30%;
    float: right;
    overflow: auto;
    margin: 0 0 3px;
    padding: 0;
}

dl.settings img {
    margin: 0 10px 0 0;
}

.login {
    width: 540px;
    margin: 0 auto;
}

.login dt,.login dd {
    width: 44%;
    margin: 0 0 .4em;
    padding: .1em;
}

.login dt {
    float: left;
    clear: both;
    text-align: right;
    font-weight: 700;
}

.login dd {
    width: 54%;
    float: right;
    text-align: left;
}

.login p {
    text-align: center;
}

.register_error {
    border: 1px dashed red;
    margin: 0 1ex 1ex;
    padding: 5px;
}

dl.register_form {
    clear: right;
    margin: 0;
}

dl.register_form dt {
    font-weight: 400;
    float: left;
    clear: both;
    width: 50%;
    margin: .5em 0 0;
}

dl.register_form dt strong {
    font-weight: 700;
}

dl.register_form dd {
    float: left;
    width: 49%;
    margin: .5em 0 0;
}

#confirm_buttons {
    text-align: center;
    padding: 1em 0;
}

.coppa_contact {
    width: 32ex;
    background-color: #fff;
    color: #000;
    margin-left: 5ex;
    border: 1px solid #000;
    padding: 4px;
}

.valid_input {
    background-color: #f5fff0;
}

.invalid_input {
    background-color: #fff0f0;
}

.topic_table td blockquote,.topic_table td .quoteheader {
    margin: .5em;
}

.search_results_posts .buttons {
    padding: 5px 1em 0 0;
}

.centertext #recaptcha_table {
    margin: 0 auto!important;
}

.floatright,a.unreadlink,a.collapse,#postbuttons .buttonlist {
    float: right;
}

.floatleft,#forumposts .modified {
    float: left;
}

.flow_auto,.login dl {
    overflow: auto;
}

.flow_hidden,#moderationbuttons,.search_results_posts {
    overflow: hidden;
}

.clear,#searchform p.clear {
    clear: both;
}

.clear_right,#postbuttons span.lower {
    clear: right;
}

dl.register_form dt span {
    display: block;
}

.bbc_u,.register_error span {
    text-decoration: underline;
}

.buttonlist ul, .poster h4, .poster ul, .table_grid p, form, select {
    margin: 0;
    padding: 0;
}

dl,dt {
    overflow: auto;
    margin: 0;
    padding: 0;
}


	
	
#container .menu-trigger,#container .menu-trigger2 {
    display: none;
}

#container ::-webkit-scrollbar,#nav ::-webkit-scrollbar {
    width: 11px;
}

#container ::-webkit-scrollbar-track,#nav ::-webkit-scrollbar-track {
    background: #F1F1F1;
}

#container ::-webkit-scrollbar-thumb,#nav ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,.15);
    border: 2px solid #F1F1F1;
}

#nav {
    scrollbar-base-color: #CCC;
    scrollbar-3dlight-color: #F1F1F1;
    scrollbar-highlight-color: #F1F1F1;
    scrollbar-track-color: #F1F1F1;
    scrollbar-arrow-color: #CCC;
    scrollbar-shadow-color: #F1F1F1;
    scrollbar-dark-shadow-color: #F1F1F1;
}

@media screen and (max-width:960px) {
    body {
        background: none!important;
    }
    #container {
        margin: 0;
    }
	    #header {
    background: url(http://www.pokemontrash.com/web/forum.jpg) no-repeat!important;
background-position:bottom!important;	
    background-size: cover !important;}
    #header .header-menu {
    padding:30px 0 10px 0;
}
#header .header-membre{
    margin:0;
}

    #article {
        float: none;
        padding: 0;
        margin: 20px 10px!important;
        width: auto!important;
    }

    #main {
        margin-right: 0!important;
    }

    #header #logo {
        margin: 0 auto;
    }

    #header #titre {
        width: 100%;
        font-size: 26px;
        text-align: center;
        margin: 15px auto 0;
        padding: 0;
    }

    #mur {
        display: block;
        position: relative;
        top: 0;
        right: 0;
        padding: 0;
        margin: 0 auto;
    }

    #nav li,#nav ul {
        display: block;
        margin: 0;
    }

    #nav>ul {
        padding: 50px 0 20px 20px;
        width: 180px;
        height: 98%;
        height: calc(100% - 70px);
        position: absolute;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: auto;
    }

    #nav li ul {
        position: relative;
        height: auto;
        box-shadow: none;
    }

    #container .mobile ul ul,#nav ul:hover ul {
        height: auto;
    }

    #nav li:hover ul {
        background: #EAE9E9;
    }

    #nav .menu-titre {
        border-top: none;
    }

    #nav .menu-titre:hover a {
        color: inherit;
    }

    #nav .home a {
        margin: 0 auto;
        text-indent: 0;
        width: auto;
        font-weight: 700;
        color: #1E3460;
        padding: 5px 0 5px 38px;
    }

    #nav .search,#nav.mobile .search {
        top: 0;
        left: 0;
        width: 100%;
        position: absolute;
        border-left: 0;
        margin: 0;
    }

    #nav li.menu-plus:before {
        content: '';
    }

    body.menu-active #nav {
        left: 0;
    }

    #nav {
        width: 200px;
        height: 100%;
        position: fixed;
        border-radius: 0;
        padding: 0;
        left: -220px;
        -webkit-transition: all .5s ease-in-out;
        -moz-transition: all .5s ease-in-out;
        -o-transition: all .5s ease-in-out;
        -ms-transition: all .5s ease-in-out;
        transition: all .5s ease-in-out;
    }

    body.menu-active #nav {
        right: 0;
    }

    #container .menu-trigger {
        position: fixed;
        top: 10px;
        left: 10px;
        background: #dfe5eb url(http://www.pokemontrash.com/web/navbar.png) 2px -430px no-repeat;
        font-size: 10px;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 5px;
        padding: 10px 5px 10px 33px;
        display: block;
    }

    body.menu-active #container {
        position: fixed;
        left: 200px;
        top: 0;
        width: 100%;
        height: 100%;
    }

    body.menu-active #container .menu-trigger {
        left: 210px;
    }

    body.menu-active #container .menu-trigger2 {
        top: 55px;
    }
     #footer {
        background:#222;
    }
}

	

	


@media screen and (max-width:820px) {
    #haut .buttonlist {
        float: none;
        text-align: center;
    }
	
	.ad-sky {
    display:none;
}

    #haut p {
        font-size: 16px;
        text-align: center;
        padding: 0;
        margin: 10px 0 0 0;
    }

    .poster {
        width: 50px;
    }

    .poster h4 {
        font-size: 12px;
    }

    .postcount, .postgroup, .membergroup {
        display: none;
    }

    .postarea {
        margin: 0 0 0 70px;
    }

    .signature {
        display: none;
    }

    #left_admsection {
        float: none !important;
        margin: 0 auto;
    }

    #moderationbuttons_strip li a {
        font-size: 9px !important;
        padding: 5px;
    }

    .description,.moderators,.button_strip_add_poll, .topic_table th:nth-child(n+3), .topic_table td:nth-child(n+3):nth-child(-n+4),.table_list td:nth-child(3) {
        display: none !important;
    }

    .table_list td:nth-child(4) {
        width: 185px;
        font-size: 11px;
        padding: 0 0 0 10px;
    }
}	

`;

var config =
    {
      opacity: 0.8, //Opacity, between 0.0 and 1.0
      bgImg: "http://www.plixup.com/pics_core3/15102140169767e12487_wallpaper_197535.jpg",
      headImg: "http://www.plixup.com/pics_core3/14754428244372Untitled.png", // Eevolutions
      openInTabs: true,
      pmPopup: true,
      resizedMenu: true,
      searchButton: true,
      headerClickHome: true,
      newIntralink: true,
      fixSpoilers: true,
      fixResponsive: true,
      semiTransparent: true,
      bgPicture: true,
      headPicture: true,
      higherHeader: true,
      headPictureHeight: 168,
      hideLogo: false, // Mutually exclusive.
      moveLogo: true,  // Hiding takes precedence.
      hideNavbar: true,
      hideFooter: true,
      hideLogout: false, // Those two ones are mutually exclusive.
      moveLogout: true,  // If you set them both, hiding takes precedence.
      usernameHeight: true,
      largerAvatars: true,
      categorizedUnread: false,
      enableOldCss: true, //TODO: GM4.0 getResourceText replacement
      oldCss: "2014",
      drafts: false, // If yo udisable the templates/drafts, none of the following scripts will work.
    };


if(!window.localStorage)
{
	alert("Votre navigateur ne supporte pas les Userscripts de Weby...");
	return;
}





// Generic declarations used in a lot of stuff
var loggedIn=true;
var css="";
l=document.getElementById("header-bottom").getElementsByTagName("a");
for(i=0;i<l.length;i++)
{
	if(l[i].innerHTML=="Identifiez-vous")
	{
		loggedIn=false;
		break;
	}
}
function str_replace(text, orig, repl)
{
	pos=text.indexOf(orig);
	if(pos===-1)
		return text;
	text = text.replace(orig, repl);
	ret = text.substring(0,pos+repl.length);
	ret+=str_replace(text.substring(pos+repl.length), orig, repl);
	return ret;
}
var windowWidth = window.innerWidth;
posters = document.getElementsByClassName("poster");
recent = document.getElementById("recent");


// Cookie and storage functions
function createCookie(name, value, minutes) {
  var expires="";
  if(minutes) {
    var date = new Date();
    date.setTime(date.getTime() + (minutes*60*1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setStore(name, value) {
	localStorage[name]=value;
}
function getStore(name) {
	if(typeof(localStorage[name])!=="undefined")
		return localStorage[name];
	return null;
}
function getStoreKeys() {
	return Object.keys(localStorage);
}
// Parse settings from memory, if existing
function resetConfig() {
  setStore("config_PTConfig", JSON.stringify(config));
}
function saveConfig() {
  setStore("config_PTConfig",JSON.stringify(config));
}


c = getStore("config_PTConfig");
try
{
  c = JSON.parse(c)
} catch (e) {
  c=null;
  resetConfig();
}

if(c!=null)
{
    keysConfig = Object.keys(config);
    keysC = Object.keys(c);

    keysConfig.sort();
    keysC.sort();

    for(i=0;i<keysC.length;i++)
    {
        config[keysC[i]]=c[keysC[i]];
    }
} else resetConfig();

// Settings
function elementChange() {
  
}

if(getStore("config_PT_firsttime")===null)
{
  css+=`.first_time {
background-color: rgba(60,130,140,.8);
color: black;
border-radius: 10px;
padding: 15px;
position: fixed;
bottom: 20px;
right: 20px;
text-align: center;
}
	`
  a = document.createElement("div");
  a.className="first_time";
  a.innerHTML=`
  <p><strong>Félicitations !</strong></p>
  <p>Tu viens d'installer le script de Weby !</p>
  <p><i><a style="color: rgba(140,60,60,1); font-weight: bold;" href="/club/profile?interface">Si tu veux le configurer, c'est par ici !</a><br />
  <span style="font-size: 0.8em;">Tu peux aussi le faire depuis ton profil, à tout moment.</span></i></p>
  <p><a onclick="location.href=location.href" style="color: red;">Fermer ce message</a></p>
  `;
  document.body.appendChild(a);
  setStore("config_PT_firsttime", false);
}

if(location.href.match(/\/profile/) || location.href.match(/action=profile/))
{
	madm = document.getElementById("main_admsection");
	dm = madm.getElementsByClassName("dropmenu")[0];
	if(dm)
	{
		dm.innerHTML+='<li><a href="/club/profile/?area=interface">Modifications de l\'interface</a></li>';
	}
	if(location.href.match(/\/profile(.+)interface/) || location.href.match(/action=profile(.+)interface/))
	{
		while(madm.hasChildNodes())
			madm.removeChild(madm.lastChild);
		madm.appendChild(dm);
    
    c = "checked";
    u = "";
    
		var html = `
		<fieldset><legend>Nouvelles fonctionnalités</legend>
		<label><input type="checkbox" name="openInTabs"/>Tout ouvrir dans les onglets</label><br />
		<label><input type="checkbox" name="pmPopup"/>Popup lors de nouveaux messages privés</label><br />
		<label><input type="checkbox" name="searchButton"/>Afficher le bouton de recherche dans le menu</label><br />
		<label><input type="checkbox" name="headerClickHome"/>Cliquer sur le logo ramène au site principal</label><br />
		<label><input type="checkbox" name="categorizedUnread"/>"Messages non lus" par catégorie</label>
		</fieldset>
		<fieldset><legend>Système de brouillons<span class="pinfo">Actuellement non implémenté</span></legend>
		<span style="font-style: italic; color: rgba(155,0,0,.8);">Désactiver cette option désactivera automatiquement tous les scripts qui en dépendent.</span><br />
		<label><input type="checkbox" disabled="disabled" name="drafts"/>Activer le système de brouillons et modèles</label>
		</fieldset>
		<fieldset><legend>Améliorations de fonctionnalités existantes</legend>
		<label><input type="checkbox" name="newIntralink"/>Affichage correct de l'intralien "Nouveaux messages"</label><br />
		<label><input type="checkbox" name="fixSpoilers"/>Réimplémentation correcte des spoilers</label><br />
		</fieldset>
		<fieldset><legend>Modifications du design</legend>
		<label><input type="checkbox" name="fixResponsive"/>Corriger les problèmes du responsive design</label><br />
		<label><input type="checkbox" name="resizedMenu"/>Dimensionner le menu dynamiquement</label><br />
    <label><input type="checkbox" name="usernameHeight"/>Rendre les noms d'utilisateur plus lisibles</label><br />
    <label><input type="checkbox" name="largerAvatars"/>Agrandir légèrement les avatars</label><br />
    <label><input type="checkbox" name="hideNavbar"/>Cacher la barre de navigation (grosse barre rouge au sommet)</label><br />
    <label><input type="checkbox" name="hideFooter"/>Cacher le footer</label><br />
    </fieldset><fieldset>
    <legend>Arrière-plans</legend>
    <table class="tamaman">
    <tr><td style="width: 50%;"><label><input type="checkbox" name="semiTransparent"/>Site semi-transparent. Opacité (0.0 à 1.0 compris) :</label></td><td style="width: 50%;">
		<input style="width: 50px; text-align: center;" maxlength="4" type="text" name="opacity" value="`+config.opacity+`"/></td></tr>
    <tr><td><label><input type="checkbox" name="bgPicture"/> Image d'arrière-plan personnalisée</label></td><td><input style="width: 100%" type="text" name="bgImg" value="`+config.bgImg+`"/> </td></tr>
    <tr><td><label><input type="checkbox" name="headPicture"/> Image d'en-tête personnalisée</label></td><td><input style="width: 100%;" type="text" name="headImg" value="`+config.headImg+`"/></td></tr>
    <tr><td><label><input type="checkbox" name="higherHeader"/>Hauteur affichée de l'image</label></td><td><input style="width: 50px; text-align: center;" type="text" name="headPictureHeight" value"`+config.headPictureHeight+`"/> px</td></tr>
    </table>

		
		
    </fieldset>
    <fieldset>
    <legend>Bouton de déconnexion <span class="pinfo">Choisissez l'une ou l'autre des options. Si vous choisissez les deux, la première fait foi.</span></legend>
    <label><input type="checkbox" name="hideLogout"/>Cacher le bouton de déconnexion</label><br />
    <label><input type="checkbox" name="moveLogout"/>Déplacer le bouton de déconnexion à droite</label><br />
    </fieldset>
    <fieldset>
    <legend>Logo PokémonTrash <span class="pinfo">Choisissez l'une ou l'autre des options. Si vous choisissez les deux, la première fait foi.</span></legend>
    <label><input type="checkbox" name="hideLogo"/>Cacher le logo PokémonTrash de la topbar</label><br />
    <label><input type="checkbox" name="moveLogo"/>Déplacer le logo PokémonTrash à un meilleur endroit dans la topbar</label><br />
    </fieldset>
    <fieldset>
    <legend>Voyage dans le temps</legend>
    <label><input type="checkbox" name="enableOldCss" />Activer le thème choisi ci-dessous. Ceci aura pour effet de désactiver les scripts modifiant l'interface actuelle automatiquement, puisque ceux-ci seront totalement inutiles...</label><br />
    <table class="tamaman">
    <tr><td style="min-width: 6%"><input type="radio" name="oldCss" id="css_2015" value="2015" /></td><td><label for="css_2015"><img src="http://www.plixup.com/pics_core3/147669660029192016_10_17_10_37_46_1920x1080_HP.png" /></label></td><td><label for="css_2015">Style de 2015</label></td></tr>
    <tr><td><input type="radio" name="oldCss" id="css_2014" value="2014" /></td><td><label for="css_2014"><img src="http://www.plixup.com/pics_core3/147669664675202016_10_17_11_27_51_1920x1080_HP_2014.png" /></label></td><td><label for="css_2014">Style de 2014</label></td></tr>
    </table>
    </fieldset>
    <fieldset>
    <legend>Remettre les paramètres par défaut</legend>
    <button id="config_reset">Reset la config</button>
    </fieldset>
		`;
		madm.innerHTML+=html;
    css+=`
    .tamaman {
	width: 100%;
    }
    .tamaman td {
        border: 0px !important;
    }
    fieldset {
       padding: 0px 16px 10px 16px;
       margin-bottom: 20px;
    }
    .pinfo{
        font-weight: normal;
        padding: 0px;
        margin: 0px;
        margin-left: 10px;
        margin-bottom: 4px;
        font-size: 12px;
        font-style: italic;
    }
    .greenBG {
        background-color: rgba(0,255,0,.5) !important;
    }`;
    
    document.getElementById("config_reset").addEventListener("click",function(){
      if(confirm("Êtes-vous sûr de bien vouloir remettre la configuration à zéro ?"))
         {
           setStore("config_PTConfig", JSON.stringify(config))
            alert("Configuration remise à zéro !"); 
           
         }});
    inputs = document.getElementsByTagName("input");
    checkboxes=[];
    for(i=0;i<inputs.length;i++)
    {
      name = inputs[i].name;
      val = config[name];
      if(val!==null && val!=="")
      {
	if(inputs[i].type=="radio")
	{
		inputs[i].addEventListener("click", function() {
			n = this.name;
			config[n] = this.value;
			p = this.parentNode.parentNode;
			p.className+="greenBG";
			setTimeout(function() {p.className=str_replace(p.className,"greenBG","");},500);
			saveConfig();
		});
		if(val==inputs[i].value)
		{
			inputs[i].checked="checked";
		}
	}
	else
	{
              inputs[i].addEventListener("change",function() {
              n = this.name;
              if(this.type=="checkbox")
                v = this.checked;
              else
                v = this.value;
              config[n]=v;
              p = this.parentNode;
              p.className+="greenBG";
              setTimeout(function() {p.className=str_replace(p.className,"greenBG","");},500);
              saveConfig();
        });
        if(inputs[i].type=="checkbox")
          {
            if(val)
              inputs[i].checked="checked";
          }
        else
          {
            inputs[i].value=val;
          }
      	}
      }
    }
	}
}

// Event to run on window resize
window.onresize = function() 
{
  if(windowWidth!=window.innerWidth)
    {
      windowWidth = window.innerWidth;
      
      // Re-resize avatars
      usernameReadable(windowWidth);

      // Dynamically rename menus to correct the length
      renameMenus();
    }
};

if(config.enableOldCss)
{
    // Remove current stylesheets to apply old ones
    links = document.getElementsByTagName("link");
    for(i=0;i<links.length;i++)
    {
    	if(links[i].href.match(/fora\.css/) || links[i].href.match(/site2\.css/))
    	{
    		links[i].parentNode.removeChild(links[i]);
    	}
    }
  //TODO
  //css_old = GM.getResourceText("res_css_"+config.oldCss);    
  if(config.oldCss=="2014")
    css_old=css_2014;
  else
    css_old=css_2015;
	
  var ccc = document.createElement("style");
	ccc.type="text/css";
	ccc.innerHTML= css_old;
	document.body.appendChild(ccc);
    //GM.addStyle(css_old);
}


// Allows the user to click on the header to go to the website
if(config.headerClickHome)
{
	css+=`
	header
	{ 
		z-index: 10; 
	} 
	#header-bottom: 
	{ 
		z-index: 5; 
	} 
	#logo 
	{ 
		z-index: 20; 
	} 
	}`;
	document.getElementById("logo").addEventListener('click',function() { location.href="//pokemontrash.com/" },false);
}


// Make the "new" intralink useful
if(config.newIntralink)
{
    css += `                           
    #new                                  
    {                                     
      padding-left: 25px;                 
      color: #A0A0A0;                     
      font-size: 0.8em;                   
      font-style: italic;                 
      width: auto;                        
      height: auto;                       
      background-color: transparent;      
    }					  
    #new:after				  
    {					  
      content: \"À partir de ce point, vous n'avez pas encore lu les messages qui suivent.\";	
    }`; 

}



// Hide navbar
if(config.hideNavbar && !config.enableOldCss) 
{
  document.getElementById("nav").style.display="none";
  document.getElementById("mobile").style.display="none";
  document.body.style.paddingTop="0px";
}
// Hide footer
if(config.hideFooter && !config.enableOldCss)
{
  document.getElementById("footer").style.display="none";
}

// Hide the logo
if(config.hideLogo)
{
  css += `		
  a#logo 
  { 
	background: none; 
  }`;
}
else if (config.moveLogo)
{
  css += `
	.logo-mobile 
	{ 
		display: block !important;
	} 
	a#logo 
	{ 
		background-position: 15px 25px;
		z-index: 50; 
		width: 200px; 
		height: 150px; 
	}`;
}



// Change line height of username
if(config.usernameHeight && !config.enableOldCss)
{
  for(i = 0;i<posters.length;i++)
  {
    a = posters[i].getElementsByTagName("a")[0];
    
    a.style.lineHeight="12px";
    a.parentNode.parentNode.getElementsByTagName("ul")[0].style.marginTop="20px";
  }
}

// Make avatars larger
function usernameReadable(width)
{
  if(config.largerAvatars && !config.enableOldCss)
  {
    for(i=0;i<posters.length;i++)
    {
      if(width>1060)
      {
        var w = "130px";
        var ml = "-20px";
	var mt = "8px";
        var as = "14px";
      }
      else
      {
        var w = "70px";
        var ml = "-8px";
	var mt = "9px";
        var as = "10px";
      }

      posters[i].getElementsByTagName("a")[0].style.fontSize=as;
      posters[i].style.width=w;
      posters[i].style.marginTop=mt;
      posters[i].style.marginLeft=ml;
      if(posters[i].getElementsByClassName("avatar").length>0)
      {
        posters[i].getElementsByClassName("avatar")[0].style.width=w;
        posters[i].getElementsByClassName("avatar")[1].style.width=w;
      }
    }
  }
}
usernameReadable(windowWidth);


// Background image
if(config.bgPicture)
{
	css += `
	body {
		background: url('`+(config.bgImg)+`') fixed no-repeat 0px 0px;
		background-position: bottom;
	}`;
}
// Change header picture
if(config.headPicture)
{
	css+=`
	header{
		background-image: url('`+(config.headImg)+`') !important;
	}`;
}


// Semi-transparent forum background
if(config.semiTransparent)
{
  css += `
  #main thead 
  { 
	background-color: rgba(200,225,255,.7);	 
  } 
  #pokemon 
  { 
	background-color: rgba(255,255,255,"+config.opacity+"); 
  } 
  .buttonlist li a.active 
  { 
	background-color: rgba(180,215,255,.9) !important; 
	color: #06C !important; 
  } 
  .buttonlist li a 
  { 
	padding: 3px 8px;
  }`;
  tables = document.getElementsByTagName("td");
  for(i = 0;i < tables.length; i++)
  {
    tables[i].style.borderBottom="1px solid rgba(0,0,0,.3)";
    pn = tables[i].parentNode.parentNode;
    if(pn.nodeName=="TBODY")
      pn.style.backgroundColor="rgba(245,245,245,0)";
  }
  pin = document.getElementsByClassName("epingle");
  for(i=0;i<pin.length;i++)
  {
    pin[i].style.backgroundColor="rgba(220,235,255,.4)";
    links = pin[i].getElementsByTagName("a");
    for(j=0;j<links.length;j++)
    {
      links[j].style.fontVariant="small-caps";
      links[j].style.color="#0AC";
    }
  }
  
  msglist = document.getElementById("liste_messages");
  if(msglist!==null)
  {
    msglist.style.backgroundColor="rgba(245,245,245,0)";
    posts = msglist.getElementsByClassName("post_wrapper");
    for(i=0;i<posts.length;i++)
    {
      posts[i].style.borderBottom="1px solid rgba(0,0,0,.5)";
    }
    altern = msglist.getElementsByClassName("alternate");
    for(i=0;i<altern.length;i++)
    {
      altern[i].style.backgroundColor="rgba(220,235,255,.4)"; 
    }
  }
}

// Move / Hide logout button
if(config.hideLogout && config.moveLogout)
  config.moveLogout=false;

if(config.hideLogout || config.moveLogout)
{
  lis = document.getElementById("header-bottom").getElementsByTagName("li");
  var t;
  for(z = 0 ; z<lis.length;z++)
  {
    a = lis[z].getElementsByTagName("a")[0];
    if(a.innerHTML=="Déconnexion")
    {
      lis[z].style.display="none";
      t = lis[z].innerHTML;
    }
  }
  
  if(config.moveLogout && loggedIn)
  {
    lis[0].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML+="<li>"+t+"</li>";
 //   document.getElementById("header-bottom").
  }
  

}

// Better sized menu elements
if(config.resizedMenu && !config.enableOldCss) 
{
  css += `
  #main
  {
    padding-top: 10px;
  }
  #header-bottom
  {
    text-align: center;
    padding-top: 150px;
    bottom: -36px;
  }
  #header-bottom ul li a
  {
    padding: 5px;
    margin: 0px;
  }
  .suivisnonlus a
  {
    background-color: rgba(104,10,38,.65) !important;
  }
  .suivis
  {
    margin-left: 100px !important;
  }
`;

  headLi = document.getElementById("header-bottom").getElementsByTagName("li");
  for(i = 0; i<headLi.length;i++)
  {
    a = headLi[i].getElementsByTagName("a")[0].innerHTML;
    if(a=="Messages suivis")
	headLi[i].className+=" suivis";
    if(a=="Messages non lus" || a=="Messages suivis")
	headLi[i].className+=" suivisnonlus";
  }
  ptf = document.getElementById("main").getElementsByClassName("navigate_section")[0].getElementsByTagName("span")[0];
  ptf.innerHTML=str_replace(ptf.innerHTML,"Forum Pokemon Trash", "");
}

// Fixes the responsive design quirks
if(config.fixResponsive && !config.enableOldCss) 
{
  if(recent!==null)
  {
	th = recent.getElementsByTagName("th");
        for(i=0;i<th.length;i++)
        {
                if(i>1)
                {       
                        th[i].style.width="0px";
                        th[i].style.display="none";
                }
        }
  }
  css += `
@media screen and (max-width:1060px) {
  .poster img.avatar {
    margin: 0px;
    padding: 0px;
    top: 0px;
    border-radius: 5% !important;
  }
  ul.reset
  {
    margin-top: 0px !important;
    border-radius: 0px !important;
  }
  .post {
    margin-top: 2px;
    padding-top: 2px;
  }
  .poster {
    width: auto !important;
    margin-top: 2px !important;
  }
  .post_wrapper {
    padding-top: 2px;
    padding-bottom: 2px;
  }
}`;
}

function renameMenus()
{
	if(config.fixResponsive && !config.enableOldCss)
	{
		headLi = document.getElementById("header-bottom").getElementsByTagName("li");
		for(i = 0; i<headLi.length; i++)
		{
			
			b = headLi[i].getElementsByTagName("a")[0];
			a = b.innerHTML;
			if(windowWidth>1060)
			{
				b.innerHTML=str_replace(a, "MP", "Messagerie");
				if(a=="Suivis")
					b.innerHTML="Messages suivis";
				if(a=="Non lus")
					b.innerHTML="Messages non lus";
				if(a=="⏏")
					b.innerHTML="Déconnexion";
				if(a=="Home")
					b.innerHTML="Accueil";
			}
			else
			{
				b.innerHTML=str_replace(a, "Messagerie", "MP");
				if(a=="Messages suivis")
					b.innerHTML="Suivis";
				if(a=="Messages non lus")
					b.innerHTML="Non lus";
				if(a=="Déconnexion")
					b.innerHTML="⏏";
				if(a=="Accueil")
					b.innerHTML="Home";
			}
		}	
	}
}
renameMenus();
// Open unread/followed messages in new tabs
if(config.openInTabs && location.href.match(/\/unread/) && recent!==null)
{
  function allintabs() {
	for(tabsL = 0;tabsL<newtabs.length;tabsL++)
	{
		//GM.openInTab(newtabs[tabsL]);
	}
  }

  if(recent.getElementsByTagName("table")[0])
  {

	var newtabs=[];
	var nodeact = recent.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var realKids = 0;
	var i = 0;
	var kids = nodeact.childNodes.length;

	while (i<kids) {
		if(nodeact.childNodes[i].nodeType!=3)
		{
			realKids++;
		}
		i++;
	}

	realKids--;
	for(i=1;i<=realKids;i++)
	{
		actNode = nodeact.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
		newtabs.push(actNode.getElementsByTagName("a")[0].href);
	}
	text = '<li><a class="active" href="#" id="opentabs"><span class="last">Ouvrir tout dans des onglets</span></a></li>';
	recent.getElementsByTagName("ul")[0].innerHTML+=text;
	document.getElementById("readbuttons").getElementsByTagName("ul")[0].innerHTML+=str_replace(text,"opentabs","opentabs2");
	document.getElementById("opentabs2").addEventListener('click',allintabs,false);
	document.getElementById("opentabs").addEventListener('click',allintabs,false);
  }
}

// Fixes the spoilers

if(config.fixSpoilers)
{
  function toggleSpoiler() {
    spoilersBody = document.getElementsByClassName("spoiler-body");
    id = this.id;
    id = str_replace(id,"spoiler_","");

    classes = spoilersBody[id].className;
    folded = classes.match(/folded/);

    if(folded)
      classes = str_replace(classes,"folded","opened");
    else
      classes = str_replace(classes,"opened","folded");

    spoilersBody[id].className=classes;
  }
  
   // Rename spoilers so they don't get the fuckingly ridiculously idiotic script from Laurent
  
   while(document.getElementsByClassName("sp-head").length!=0)
   {
     document.getElementsByClassName("sp-head")[0].className=str_replace(document.getElementsByClassName("sp-head")[0].className,"sp-head","spoiler-head");
     document.getElementsByClassName("sp-body")[0].className=str_replace(document.getElementsByClassName("sp-body")[0].className,"sp-body","spoiler-body");
   }
  
	var spoilers = document.getElementsByClassName("spoiler-head");
  

	css += `
  div.sp-wrap
  {
    background-color: transparent;
    border: 0px;
  }
	div.spoiler-head:before
	{ 
		font-weight: bold; 
		font-variant: small-caps; 
		content: \"Spoil: \"; 
	} 
	div.spoiler-head:hover
	{ 
		background-color: rgba(220,235,255,.4); 
	} 
	div.spoiler-head 
	{ 
		border: 1px dashed rgba(0,0,0,.3); 
		border-bottom: 1px solid rgba(0,0,0,.5); 
		padding: 3px; 
    margin: 0px !important;
	}
	div.folded 
	{ 
		display: none !important;
	} 
	div.opened 
	{ 
		border: 1px solid rgba(0,0,0,.5);
		padding: 5px; 
		border-radius: 0px 0px 5px 5px; 
		border-top: 0px; 
		display: block;
	} 
	`;	

	for(i = 0; i<spoilers.length; i++)
	{
		spoilers[i].id="spoiler_"+i;
		spoilers[i].addEventListener('click',toggleSpoiler,false);			
	}
    
}

// Readds a search button in the main menu
if(config.searchButton)
{	
	var text = "/club/search?advanced";
	var nav = document.getElementById("header").getElementsByTagName("div")[1].getElementsByTagName("ul")[0];
	if(nav!==null)
		nav.innerHTML+='<li><a href="'+text+'">Recherche</a></li>';
}

if(config.pmPopup)
{
	list = document.getElementById("header-bottom").getElementsByTagName("ul")[0].getElementsByTagName("li");
	for(i = 0; i<list.length; i++)
	{
		a=list[i].getElementsByTagName("a")[0];
		if(a.innerHTML.match(/Messagerie/) || a.innerHTML.match(/MP/))
		{	
			amount = str_replace(a.innerHTML,"MP", "Messagerie");
			amount = str_replace(str_replace(amount,"</strong>]",""),"Messagerie [<strong>","");
			if(amount!=="Messagerie")
			{
				if(getStore("state_PMwarned")=="false" || getStore("state_PMwarned")===null)
				{
					setStore("state_PMwarned",true);
					x = amount>1?"x":"";
					s = amount>1?"s":"";
					if(confirm("Vous avez reçu "+amount+" nouveau"+x+" message"+s+" privé"+s+" !\n\nAccéder aux messages privés maintenant ?"))
					{
						setStore("state_PMwarned",false);
						GM.openInTab("/club/pm/");
					}
				}
			}
			else
			{
				setStore("state_PMwarned",false);
			}
			break;
		}
	}
}

// Header height
if(config.higherHeader && !config.enableOldCss)
{
	css += `
	header {
		height: `+config.headPictureHeight+`px !important;
	}
	`;
}

// Categorized unread
if(config.categorizedUnread)
{
	theads = document.getElementsByTagName("thead");
	for(i = 0; i<theads.length; i++)
	{
		id = theads[i].id;
		if(id.startsWith("category_"))
		{
			iden = id.substring(9);	
			theads[i].getElementsByTagName("td")[0].innerHTML+='<div class="nonluscat"><a href="/club/index.php?action=unread;c='+iden+'">Non lus</a> - <a href="/club/index.php?action=unreadreplies;c='+iden+'">Suivis</a></div>';
		}
	}
	css += `
	div.nonluscat
	{
		position: absolute;
		right: 30px;	
		bottom: 9px;
		font-size: 12px;
		font-style: italic;
	}
	table.table_list a.collapse
	{
		bottom: 18px;	
		right: 5px;
	}
	`;
}

// Add the stylesheet :)
var ccc = document.createElement("style");
ccc.type="text/css";
ccc.innerHTML= css;
document.body.appendChild(ccc);

//GM.addStyle(css);

// Templates and drafts !
if(!config.templates) return;

//Weby, 2017

