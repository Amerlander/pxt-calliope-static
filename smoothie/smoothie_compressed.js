// MIT License:
//
// Copyright (c) 2010-2013, Joe Walnes
//               2013-2017, Drew Noakes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Smoothie Charts - http://smoothiecharts.org/
 * (c) 2010-2013, Joe Walnes
 *     2013-2017, Drew Noakes
 *
 * v1.0: Main charting library, by Joe Walnes
 * v1.1: Auto scaling of axis, by Neil Dunn
 * v1.2: fps (frames per second) option, by Mathias Petterson
 * v1.3: Fix for divide by zero, by Paul Nikitochkin
 * v1.4: Set minimum, top-scale padding, remove timeseries, add optional timer to reset bounds, by Kelley Reynolds
 * v1.5: Set default frames per second to 50... smoother.
 *       .start(), .stop() methods for conserving CPU, by Dmitry Vyal
 *       options.interpolation = 'bezier' or 'line', by Dmitry Vyal
 *       options.maxValue to fix scale, by Dmitry Vyal
 * v1.6: minValue/maxValue will always get converted to floats, by Przemek Matylla
 * v1.7: options.grid.fillStyle may be a transparent color, by Dmitry A. Shashkin
 *       Smooth rescaling, by Kostas Michalopoulos
 * v1.8: Set max length to customize number of live points in the dataset with options.maxDataSetLength, by Krishna Narni
 * v1.9: Display timestamps along the bottom, by Nick and Stev-io
 *       (https://groups.google.com/forum/?fromgroups#!topic/smoothie-charts/-Ywse8FCpKI%5B1-25%5D)
 *       Refactored by Krishna Narni, to support timestamp formatting function
 * v1.10: Switch to requestAnimationFrame, removed the now obsoleted options.fps, by Gergely Imreh
 * v1.11: options.grid.sharpLines option added, by @drewnoakes
 *        Addressed warning seen in Firefox when seriesOption.fillStyle undefined, by @drewnoakes
 * v1.12: Support for horizontalLines added, by @drewnoakes
 *        Support for yRangeFunction callback added, by @drewnoakes
 * v1.13: Fixed typo (#32), by @alnikitich
 * v1.14: Timer cleared when last TimeSeries removed (#23), by @davidgaleano
 *        Fixed diagonal line on chart at start/end of data stream, by @drewnoakes
 * v1.15: Support for npm package (#18), by @dominictarr
 *        Fixed broken removeTimeSeries function (#24) by @davidgaleano
 *        Minor performance and tidying, by @drewnoakes
 * v1.16: Bug fix introduced in v1.14 relating to timer creation/clearance (#23), by @drewnoakes
 *        TimeSeries.append now deals with out-of-order timestamps, and can merge duplicates, by @zacwitte (#12)
 *        Documentation and some local variable renaming for clarity, by @drewnoakes
 * v1.17: Allow control over font size (#10), by @drewnoakes
 *        Timestamp text won't overlap, by @drewnoakes
 * v1.18: Allow control of max/min label precision, by @drewnoakes
 *        Added 'borderVisible' chart option, by @drewnoakes
 *        Allow drawing series with fill but no stroke (line), by @drewnoakes
 * v1.19: Avoid unnecessary repaints, and fixed flicker in old browsers having multiple charts in document (#40), by @asbai
 * v1.20: Add SmoothieChart.getTimeSeriesOptions and SmoothieChart.bringToFront functions, by @drewnoakes
 * v1.21: Add 'step' interpolation mode, by @drewnoakes
 * v1.22: Add support for different pixel ratios. Also add optional y limit formatters, by @copacetic
 * v1.23: Fix bug introduced in v1.22 (#44), by @drewnoakes
 * v1.24: Fix bug introduced in v1.23, re-adding parseFloat to y-axis formatter defaults, by @siggy_sf
 * v1.25: Fix bug seen when adding a data point to TimeSeries which is older than the current data, by @Nking92
 *        Draw time labels on top of series, by @comolosabia
 *        Add TimeSeries.clear function, by @drewnoakes
 * v1.26: Add support for resizing on high device pixel ratio screens, by @copacetic
 * v1.27: Fix bug introduced in v1.26 for non whole number devicePixelRatio values, by @zmbush
 * v1.28: Add 'minValueScale' option, by @megawac
 *        Fix 'labelPos' for different size of 'minValueString' 'maxValueString', by @henryn
 * v1.29: Support responsive sizing, by @drewnoakes
 * v1.29.1: Include types in package, and make property optional, by @TrentHouliston
 * v1.30: Fix inverted logic in devicePixelRatio support, by @scanlime
 * v1.31: Support tooltips, by @Sly1024 and @drewnoakes
 * v1.32: Support frame rate limit, by @dpuyosa
 */!function(t){function e(t){this.options=s.extend({},e.defaultOptions,t),this.clear()}function i(t){this.options=s.extend({},i.defaultChartOptions,t),this.seriesSet=[],this.currentValueRange=1,this.currentVisMinValue=0,this.lastRenderTimeMillis=0,this.mousemove=this.mousemove.bind(this),this.mouseout=this.mouseout.bind(this)}var s={extend:function(){arguments[0]=arguments[0]||{};for(var t=1;t<arguments.length;t++)for(var e in arguments[t])arguments[t].hasOwnProperty(e)&&("object"==typeof arguments[t][e]?arguments[t][e]instanceof Array?arguments[0][e]=arguments[t][e]:arguments[0][e]=s.extend(arguments[0][e],arguments[t][e]):arguments[0][e]=arguments[t][e]);return arguments[0]},binarySearch:function(t,e){for(var i=0,s=t.length;s>i;){var a=i+s>>1;e<t[a][0]?s=a:i=a+1}return i}};e.defaultOptions={resetBoundsInterval:3e3,resetBounds:!0},e.prototype.clear=function(){this.data=[],this.maxValue=Number.NaN,this.minValue=Number.NaN},e.prototype.resetBounds=function(){if(this.data.length){this.maxValue=this.data[0][1],this.minValue=this.data[0][1];for(var t=1;t<this.data.length;t++){var e=this.data[t][1];e>this.maxValue&&(this.maxValue=e),e<this.minValue&&(this.minValue=e)}}else this.maxValue=Number.NaN,this.minValue=Number.NaN},e.prototype.append=function(t,e,i){for(var s=this.data.length-1;s>=0&&this.data[s][0]>t;)s--;-1===s?this.data.splice(0,0,[t,e]):this.data.length>0&&this.data[s][0]===t?i?(this.data[s][1]+=e,e=this.data[s][1]):this.data[s][1]=e:s<this.data.length-1?this.data.splice(s+1,0,[t,e]):this.data.push([t,e]),this.maxValue=isNaN(this.maxValue)?e:Math.max(this.maxValue,e),this.minValue=isNaN(this.minValue)?e:Math.min(this.minValue,e)},e.prototype.dropOldData=function(t,e){for(var i=0;this.data.length-i>=e&&this.data[i+1][0]<t;)i++;0!==i&&this.data.splice(0,i)},i.tooltipFormatter=function(t,e){for(var s=this.options.timestampFormatter||i.timeFormatter,a=[s(new Date(t))],o=0;o<e.length;++o)a.push('<span style="color:'+e[o].series.options.strokeStyle+'">'+this.options.yMaxFormatter(e[o].value,this.options.labels.precision)+"</span>");return a.join("<br>")},i.defaultChartOptions={millisPerPixel:20,enableDpiScaling:!0,yMinFormatter:function(t,e){return parseFloat(t).toFixed(e)},yMaxFormatter:function(t,e){return parseFloat(t).toFixed(e)},maxValueScale:1,minValueScale:1,interpolation:"bezier",scaleSmoothing:.125,maxDataSetLength:2,scrollBackwards:!1,grid:{fillStyle:"#000000",strokeStyle:"#777777",lineWidth:1,sharpLines:!1,millisPerLine:1e3,verticalSections:2,borderVisible:!0},labels:{fillStyle:"#ffffff",disabled:!1,fontSize:10,fontFamily:"monospace",precision:2},horizontalLines:[],tooltip:!1,tooltipLine:{lineWidth:1,strokeStyle:"#BBBBBB"},tooltipFormatter:i.tooltipFormatter,responsive:!1,limitFPS:0},i.AnimateCompatibility=function(){var t=function(t,e){var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(function(){t((new Date).getTime())},16)};return i.call(window,t,e)},e=function(t){var e=window.cancelAnimationFrame||function(t){clearTimeout(t)};return e.call(window,t)};return{requestAnimationFrame:t,cancelAnimationFrame:e}}(),i.defaultSeriesPresentationOptions={lineWidth:1,strokeStyle:"#ffffff"},i.prototype.addTimeSeries=function(t,e){this.seriesSet.push({timeSeries:t,options:s.extend({},i.defaultSeriesPresentationOptions,e)}),t.options.resetBounds&&t.options.resetBoundsInterval>0&&(t.resetBoundsTimerId=setInterval(function(){t.resetBounds()},t.options.resetBoundsInterval))},i.prototype.removeTimeSeries=function(t){for(var e=this.seriesSet.length,i=0;e>i;i++)if(this.seriesSet[i].timeSeries===t){this.seriesSet.splice(i,1);break}t.resetBoundsTimerId&&clearInterval(t.resetBoundsTimerId)},i.prototype.getTimeSeriesOptions=function(t){for(var e=this.seriesSet.length,i=0;e>i;i++)if(this.seriesSet[i].timeSeries===t)return this.seriesSet[i].options},i.prototype.bringToFront=function(t){for(var e=this.seriesSet.length,i=0;e>i;i++)if(this.seriesSet[i].timeSeries===t){var s=this.seriesSet.splice(i,1);this.seriesSet.push(s[0]);break}},i.prototype.streamTo=function(t,e){this.canvas=t,this.delay=e,this.start()},i.prototype.getTooltipEl=function(){var t=i.tooltipEl;return t||(t=i.tooltipEl=document.createElement("div"),t.className="smoothie-chart-tooltip",t.style.position="absolute",t.style.display="none",document.body.appendChild(t)),t},i.prototype.updateTooltip=function(){var t=this.getTooltipEl();if(!this.mouseover||!this.options.tooltip)return void(t.style.display="none");var e=this.lastRenderTimeMillis-(this.delay||0);e-=e%this.options.millisPerPixel;for(var i=this.options.scrollBackwards?e-this.mouseX*this.options.millisPerPixel:e-(this.canvas.offsetWidth-this.mouseX)*this.options.millisPerPixel,a=[],o=0;o<this.seriesSet.length;o++){var n=this.seriesSet[o].timeSeries,r=s.binarySearch(n.data,i);r>0&&r<n.data.length&&a.push({series:this.seriesSet[o],index:r,value:n.data[r][1]})}a.length?(t.innerHTML=this.options.tooltipFormatter.call(this,i,a),t.style.display="block"):t.style.display="none"},i.prototype.mousemove=function(t){this.mouseover=!0,this.mouseX=t.offsetX,this.mouseY=t.offsetY,this.mousePageX=t.pageX,this.mousePageY=t.pageY;var e=this.getTooltipEl();e.style.top=Math.round(this.mousePageY)+"px",e.style.left=Math.round(this.mousePageX)+"px",this.updateTooltip()},i.prototype.mouseout=function(){this.mouseover=!1,this.mouseX=this.mouseY=-1,i.tooltipEl&&(i.tooltipEl.style.display="none")},i.prototype.resize=function(){var t,e,i=this.options.enableDpiScaling&&window?window.devicePixelRatio:1;this.options.responsive?(t=this.canvas.offsetWidth,e=this.canvas.offsetHeight,t!==this.lastWidth&&(this.lastWidth=t,this.canvas.setAttribute("width",t.toString())),e!==this.lastHeight&&(this.lastHeight=e,this.canvas.setAttribute("height",e.toString()))):1!==i&&(t=parseInt(this.canvas.getAttribute("width")),e=parseInt(this.canvas.getAttribute("height")),this.originalWidth&&Math.floor(this.originalWidth*i)===t||(this.originalWidth=t,this.canvas.setAttribute("width",Math.floor(t*i).toString()),this.canvas.style.width=t+"px",this.canvas.getContext("2d").scale(i,i)),this.originalHeight&&Math.floor(this.originalHeight*i)===e||(this.originalHeight=e,this.canvas.setAttribute("height",Math.floor(e*i).toString()),this.canvas.style.height=e+"px",this.canvas.getContext("2d").scale(i,i)))},i.prototype.start=function(){if(!this.frame){this.canvas.addEventListener("mousemove",this.mousemove),this.canvas.addEventListener("mouseout",this.mouseout);var t=function(){this.frame=i.AnimateCompatibility.requestAnimationFrame(function(){this.render(),t()}.bind(this))}.bind(this);t()}},i.prototype.stop=function(){this.frame&&(i.AnimateCompatibility.cancelAnimationFrame(this.frame),delete this.frame,this.canvas.removeEventListener("mousemove",this.mousemove),this.canvas.removeEventListener("mouseout",this.mouseout))},i.prototype.updateValueRange=function(){for(var t=this.options,e=Number.NaN,i=Number.NaN,s=0;s<this.seriesSet.length;s++){var a=this.seriesSet[s].timeSeries;isNaN(a.maxValue)||(e=isNaN(e)?a.maxValue:Math.max(e,a.maxValue)),isNaN(a.minValue)||(i=isNaN(i)?a.minValue:Math.min(i,a.minValue))}if(null!=t.maxValue?e=t.maxValue:e*=t.maxValueScale,null!=t.minValue?i=t.minValue:i-=Math.abs(i*t.minValueScale-i),this.options.yRangeFunction){var o=this.options.yRangeFunction({min:i,max:e});i=o.min,e=o.max}if(!isNaN(e)&&!isNaN(i)){var n=e-i,r=n-this.currentValueRange,l=i-this.currentVisMinValue;this.isAnimatingScale=Math.abs(r)>.1||Math.abs(l)>.1,this.currentValueRange+=t.scaleSmoothing*r,this.currentVisMinValue+=t.scaleSmoothing*l}this.valueRange={min:i,max:e}},i.prototype.render=function(t,e){var i=(new Date).getTime();if(!(this.options.limitFPS>0&&i-this.lastRenderTimeMillis<1e3/this.options.limitFPS)){if(!this.isAnimatingScale){var s=Math.min(1e3/6,this.options.millisPerPixel);if(i-this.lastRenderTimeMillis<s)return}this.resize(),this.updateTooltip(),this.lastRenderTimeMillis=i,t=t||this.canvas,e=e||i-(this.delay||0),e-=e%this.options.millisPerPixel;var a=t.getContext("2d"),o=this.options,n={top:0,left:0,width:t.clientWidth,height:t.clientHeight},r=e-n.width*o.millisPerPixel,l=function(t){var e=t-this.currentVisMinValue;return 0===this.currentValueRange?n.height:n.height-Math.round(e/this.currentValueRange*n.height)}.bind(this),h=function(t){return o.scrollBackwards?Math.round((e-t)/o.millisPerPixel):Math.round(n.width-(e-t)/o.millisPerPixel)};if(this.updateValueRange(),a.font=o.labels.fontSize+"px "+o.labels.fontFamily,a.save(),a.translate(n.left,n.top),a.beginPath(),a.rect(0,0,n.width,n.height),a.clip(),a.save(),a.fillStyle=o.grid.fillStyle,a.clearRect(0,0,n.width,n.height),a.fillRect(0,0,n.width,n.height),a.restore(),a.save(),a.lineWidth=o.grid.lineWidth,a.strokeStyle=o.grid.strokeStyle,o.grid.millisPerLine>0){a.beginPath();for(var u=e-e%o.grid.millisPerLine;u>=r;u-=o.grid.millisPerLine){var m=h(u);o.grid.sharpLines&&(m-=.5),a.moveTo(m,0),a.lineTo(m,n.height)}a.stroke(),a.closePath()}for(var d=1;d<o.grid.verticalSections;d++){var p=Math.round(d*n.height/o.grid.verticalSections);o.grid.sharpLines&&(p-=.5),a.beginPath(),a.moveTo(0,p),a.lineTo(n.width,p),a.stroke(),a.closePath()}if(o.grid.borderVisible&&(a.beginPath(),a.strokeRect(0,0,n.width,n.height),a.closePath()),a.restore(),o.horizontalLines&&o.horizontalLines.length)for(var c=0;c<o.horizontalLines.length;c++){var f=o.horizontalLines[c],g=Math.round(l(f.value))-.5;a.strokeStyle=f.color||"#ffffff",a.lineWidth=f.lineWidth||1,a.beginPath(),a.moveTo(0,g),a.lineTo(n.width,g),a.stroke(),a.closePath()}for(var v=0;v<this.seriesSet.length;v++){a.save();var S=this.seriesSet[v].timeSeries,y=S.data,b=this.seriesSet[v].options;S.dropOldData(r,o.maxDataSetLength),a.lineWidth=b.lineWidth,a.strokeStyle=b.strokeStyle,a.beginPath();for(var x=0,w=0,T=0,P=0;P<y.length&&1!==y.length;P++){var V=h(y[P][0]),N=l(y[P][1]);if(0===P)x=V,a.moveTo(V,N);else switch(o.interpolation){case"linear":case"line":a.lineTo(V,N);break;case"bezier":default:a.bezierCurveTo(Math.round((w+V)/2),T,Math.round(w+V)/2,N,V,N);break;case"step":a.lineTo(V,T),a.lineTo(V,N)}w=V,T=N}y.length>1&&(b.fillStyle&&(a.lineTo(n.width+b.lineWidth+1,T),a.lineTo(n.width+b.lineWidth+1,n.height+b.lineWidth+1),a.lineTo(x,n.height+b.lineWidth),a.fillStyle=b.fillStyle,a.fill()),b.strokeStyle&&"none"!==b.strokeStyle&&a.stroke(),a.closePath()),a.restore()}if(o.tooltip&&this.mouseX>=0&&(a.lineWidth=o.tooltipLine.lineWidth,a.strokeStyle=o.tooltipLine.strokeStyle,a.beginPath(),a.moveTo(this.mouseX,0),a.lineTo(this.mouseX,n.height),a.closePath(),a.stroke(),this.updateTooltip()),!o.labels.disabled&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)){var M=o.yMaxFormatter(this.valueRange.max,o.labels.precision),F=o.yMinFormatter(this.valueRange.min,o.labels.precision),k=o.scrollBackwards?0:n.width-a.measureText(M).width-5,R=o.scrollBackwards?0:n.width-a.measureText(F).width-5;a.fillStyle=o.labels.fillStyle,a.fillText(M,k,o.labels.fontSize),a.fillText(F,R,n.height-2)}if(o.timestampFormatter&&o.grid.millisPerLine>0)for(var B=o.scrollBackwards?a.measureText(F).width:n.width-a.measureText(F).width+4,u=e-e%o.grid.millisPerLine;u>=r;u-=o.grid.millisPerLine){var m=h(u);if(!o.scrollBackwards&&B>m||o.scrollBackwards&&m>B){var L=new Date(u),W=o.timestampFormatter(L),A=a.measureText(W).width;B=o.scrollBackwards?m+A+2:m-A-2,a.fillStyle=o.labels.fillStyle,o.scrollBackwards?a.fillText(W,m,n.height-2):a.fillText(W,m-A,n.height-2)}}a.restore()}},i.timeFormatter=function(t){function e(t){return(10>t?"0":"")+t}return e(t.getHours())+":"+e(t.getMinutes())+":"+e(t.getSeconds())},t.TimeSeries=e,t.SmoothieChart=i}("undefined"==typeof exports?this:exports);