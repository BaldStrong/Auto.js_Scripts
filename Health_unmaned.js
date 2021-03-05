function health(){
    device.wakeUpIfNeeded(); //如果屏幕没有点亮，则唤醒设备。

    //解锁屏幕
    setScreenMetrics(1080, 2340)
    sleep(2000)
    swipe(500,1900,500,10,320)
    sleep(4000)

    //判断是否已经启动了企业微信
    if(!textContains("工作台").exists()){
        toastLog("开始启动企业微信")
        // 启动企业微信
        app.launch("com.tencent.wework");
    
        //暂停5秒,等在启动完成
        while(!textContains("工作台").exists()){
        //等待启动完成
        };
        toastLog("企业微信启动成功")
    }

    sleep(500);
    click("工作台");
    sleep(500);
    click("疫情防控信息采集平台");
    while(!textContains("健康上报").exists()){
        sleep(100);
    };
    click("健康上报");

    //重复填报出出现确认按钮，确认
    var queren = textContains("确认").findOne();
    if(textContains("确认").exists())
        queren.click();

    // while(!textContains("确认").exists()){
    //     // toastLog("加载疫情防控信息采集平台")
    //     sleep(500);
    // };
    // toastLog("确认")
    // click("确认");

    while(!textContains("成功获取到位置").exists()){
        sleep(500);
    };
    click("签到");
    sleep(5000);

    var wendu = textContains("37.2").findOnce();
    if(!wendu.checked())
        wendu.click();

    sleep(100);
    var zhengchang = textContains("正常").findOnce();
    if(!zhengchang.checked())
        zhengchang.click();

    click("已知晓");
    click("无");
    var a = textContains("本人同意以上").findOnce();
    if(!a.checked())
        a.click();

    var b = textContains("上述信息是我本人填写").findOnce();
    if(!b.checked())
        b.click();
    sleep(1000);
    click("提交",1);
    sleep(1000);
    click("确认");

    sleep(1500)
    launchApp("Auto.js")
}
 
toast("开始运行脚本");
engines.execScript("health", "health();\n" + health.toString(),{
    loopTimes: 1,
    interval: 300
});