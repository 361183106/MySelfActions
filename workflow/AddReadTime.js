/*

 @𝐃𝐃 𝐃𝐃   感谢红鲤鱼大佬
//++++++++++++++++++++++++++++++++-




*/











const DD ='企鹅读书小程序';

const $ = new Env(DD);


const logs=0;//0关闭日志,1开启日志,建议关闭

const log=0;//0关闭系统日志,1开启系统日志,和系统通知不要一起打开,关闭系统通知就要打开,系统日志

const noNolog=0;//1关闭系统通知,0打开系统通知.



console.log(`\n============ 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})}  =============\n`)


!(async () => {
  if (typeof $request != "undefined") {
    await qedssign()
  } else {
    await initSign()
    await bookShelfInitSign()
    await fromGuidSign()
    await addReadSign()
    await secondsSign()
    await seconds1Sign()
    await seconds2Sign()
    await Msg()
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())






function fromGuidSign() {
  return new Promise((resolve) => {
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.fromGuid = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}



function addReadSign() {
  return new Promise((resolve) => {
      let Url = {
        url :  $.getdata('addReadTimesignurl'),
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.addRead = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}






function bookShelfInitSign() {
  return new Promise((resolve) => {
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/v1/bookShelfInit",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.bookShelfInit = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}




function initSign() {
  return new Promise((resolve) => {
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/user/init",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.init = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function secondsSign() {
  return new Promise((resolve) => {
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=30",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.seconds = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function seconds1Sign(timeout=5000) {
  return new Promise((resolve) => {
   setTimeout( ()=>{
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=300",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.secondss = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
   },timeout)
  })
}


function seconds2Sign(timeout=5000) {
  return new Promise((resolve) => {
   setTimeout( ()=>{
      let Url = {
        url :  "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=1800",
        headers : JSON.parse($.getdata('pageheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.secondsss = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
   },timeout)
  })
}



function Msg() {
  let dd = ""

if ($.init.code == 0) 
dd +="【账户信息昵称】"+$.init.data.user.nickName+"\n";



if ($.bookShelfInit.code == 0)
dd+="【时长累计查询】"+"本周累计阅读"+$.bookShelfInit.data.readTime+"分钟\n";


if ($.seconds.data.amount >0)
dd+="【阅读30秒奖励】"+"✅获得"+$.seconds.data.amount+"💰金币\n";


if ($.secondss.data.amount>0)
dd+="【阅读5分钟奖励】"+"✅获得"+$.secondss.data.amount+"💰金币\n";



if ($.secondsss.data.amount >0)
dd+="【阅读30分钟奖励】"+"✅获得"+$.secondss.data.amount+"💰金币\n";






if(log==1)console.log(dd)

 if(noNolog==0)$.msg($.name,"",dd)
}



function qedssign() {
  if ($request.url.indexOf("clock_in/page") > -1) {
    const pageSignurl = $request.url
    if (pageSignurl) $.setdata($request.url,'pagesignurl')
    $.log(
`[${$.name}]获取pageSignurl成功✔,pageSignurl: ${pageSignurl}`
    );

   const pageHeader = JSON.stringify($request.headers);
if (pageHeader) $.setdata(pageHeader,'pageheader')
    $.log(
`[${$.name}]获取pageHeader成功✔,pageHeader: ${pageHeader}`
    );  
    $.msg($.name,"","[获取签到数据]成功✔")}

else
if ($request.url.indexOf("addReadTimeWithBid?") > -1) {

const addReadTimesignurl = $request.url
    if (addReadTimesignurl) $.setdata($request.url,'addReadTimesignurl');
    $.log(
`[${$.name}]获取addReadTimeurl成功✔,addReadTimeurl: ${addReadTimeurl}`
    );
    $.msg($.name,"","[获取时长数据]成功✔")}

}
































function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
