import TIM from '../../TUICallKit/lib/tim-wx-sdk';
import { genTestUserSig }  from '../../TUICallKit/debug/GenerateTestUserSig';
import TIMUploadPlugin from '../../TUICallKit/lib/tim-upload-plugin';
 Page({
    data: {
        config: {
            userID: 'zero', //User ID
            SDKAPPID: 0 , // Your SDKAppID
            SECRETKEY: 'xxx', // Your secretKey
            EXPIRETIME: 604800,
        }
    },
    onLoad(option) {
        let defConfig = Object.assign({}, this.data.config)
        defConfig.userID = option.userId
        this.setData({
          config: defConfig
        })
        const userSig = genTestUserSig(this.data.config).userSig;
        wx.$TUIKit = TIM.create({
            SDKAppID: this.data.config.SDKAPPID
        });
        wx.$chat_SDKAppID = this.data.config.SDKAPPID;
        wx.$chat_userID = this.data.config.userID;
        wx.$chat_userSig = userSig;
        wx.$TUIKitTIM = TIM;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });            
        wx.$TUIKit.login({
            userID: this.data.config.userID,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    logout(callback) {
        let promise = wx.$TUIKit.logout();
        promise.then(function(imResponse){
            console.log('logout success');
            callback();
        }).catch(function(error) {
            console.warn('登出失败：', error);
        })
    },
    onUnload() {
        wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    logoutEvent(e) {
        this.logout(()=>{
            wx.redirectTo({
                url: `/pages/login/index`,
                success: () => {
                    wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
                },
                fail: (error) => {
                    console.warn("登出失败：", error)
                }
            })
        })
    },
    onSDKReady() {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    } 
});