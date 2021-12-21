# -*- coding: utf-8 -*-
"""
-------------------------------------------------
   File Name：     weibovisitor
   Description :
   Author :       zm.z
   date：          2020/6/18
-------------------------------------------------
   Change Activity:
                   2020/6/18:
-------------------------------------------------
"""
import json
import random
import re
import urllib.parse

__author__ = 'zm.z'

import requests

headers = {
'Host': 'passport.weibo.com',
'Referer': 'https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2F&domain=.weibo.com&sudaref=https%3A%2F%2Fpassport.weibo.com%2Fvisitor%2Fvisitor%3Fentry%3Dminiblog%26a%3Denter%26url%3Dhttps%253A%252F%252Fweibo.com%252F%26domain%3D.weibo.com%26ua%3Dphp-sso_sdk_client-0.6.36%26_rand%3D1592492149.9741&ua=php-sso_sdk_client-0.6.36&_rand=1592492174.4451',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
# 'Cookie':'SRT=D.QqHBTrsnWGVuAdMZ4GYpAPSTUbyqR3YGi3EYNdYzId9uRPbkROHBUZWsNcYi54yfTDX3S-kHVPidWQMCM8sRO%21HjidYjTOSlOF9-QrujS%21P6ScrqRc4nPrY-%2AB.vAflW-P9Rc0lR-ykRDvnJqiQVbiRVPBtS%21r3JeWQVqbgVdWiMZ4siOzu4DbmKPWFMdWuI%21EHJsYpAeYoi-ueVeBc54Joi49nPeip4ru3SsiYNdimA4b1QqJuMcSsSmuPiQWeKEE%21RsbdVdi-Qn77; SRF=1592492851'
}
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36'
url = 'https://passport.weibo.com/visitor/visitor?a=restore&cb=restore_back&from=weibo&_rand=0.033801853642762'

def create_cookie(cookie=None):
    b = random.choice(("83,0,4103,106", "72.0.3626.121", "71.0.3578.98"))
    p = random.choice(("Portable Document Format::internal-pdf-viewer::Chrome PDF Plugin", "internal-nacl-plugin::Native Client", "undefine"))
    headers['User-Agent'] = user_agent % b
    url2 = 'https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2F&domain=.weibo.com&sudaref=https%3A%2F%2Fpassport.weibo.com%2Fvisitor%2Fvisitor%3Fentry%3Dminiblog%26a%3Denter%26url%3Dhttps%253A%252F%252Fweibo.com%252F%26domain%3D.weibo.com%26ua%3Dphp-sso_sdk_client-0.6.36%26_rand%3D1592492149.9741&ua=php-sso_sdk_client-0.6.36&_rand=1592492174.4451'
    url3 = 'https://login.sina.com.cn/visitor/visitor?a=crossdomain&cb=return_back&s=%(s)s&sp=%(sp)s&from=weibo&_rand=0.4969177856179352'
    url4 = "https://passport.weibo.com/visitor/genvisitor"
    form4 = {
        'fp': '{"os":"1","browser":"Chrome%s","fonts":"undefined","screenInfo":"1536*864*24","plugins":"%s"}' % (b, p),
        'cb': 'gen_callback',
    }

    url5 = 'https://passport.weibo.com/visitor/visitor?a=incarnate&t=%(tid)s&w=2&c=095&gc=&cb=cross_domain&from=weibo&_rand=0.592349827746740'

    sess = requests.Session()
    # sess.get(url='https://weibo.com/', headers=headers)
    sess.get(url=url, headers=headers)
    tid = sess.post(url=url4, data=form4)
    tid = re.sub(".+\(|\).+", "", tid.text)
    tid_json = json.loads(tid)
    # print(tid_json)
    # print(url5 % tid_json['data'])
    tid_json['data']['tid'] = urllib.parse.quote(tid_json['data']['tid'])
    r = sess.get(url=url5 % tid_json['data'], headers={"cookie": "tid=" + tid_json['data']['tid'] + '__095'})
    r = re.sub(".+\(|\).+", "", r.text)
    r_json = json.loads(r)
    r_data = r_json['data']
    sess.get(url=url3 % {'s': r_data['sub'], 'sp':r_data['subp']})
    sess.get(url=url2, headers=headers)
    # sess.get(url=url3)
    sess.get(url='https://passport.weibo.com/js/visitor/mini_original.js?v=20161116')
    req = sess.get(url=url, headers=headers)
    # r1 = sess.get(url='https://weibo.com/')
    # print(r1.url)
    # r2 = sess.get(url=r1.url)
    # sess.get(url='https://passport.weibo.com/js/visitor/mini_original.js?v=20161116')
    #
    # r3 = sess.get(url='https://passport.weibo.com/js/visitor/mini_original.js?v=20161116')
    #
    # sess.get(url=url)
    s = ''
    for k, v in sess.cookies.get_dict().items():
        s += '%s=%s; ' % (k, v)
    # print(s)
    # print(sess.cookies.get_dict())
    return s.strip()

print(create_cookie())
