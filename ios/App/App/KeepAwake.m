#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(KeepAwake, "KeepAwake",
           CAP_PLUGIN_METHOD(keepAwake, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(allowSleep, CAPPluginReturnPromise);
           )
