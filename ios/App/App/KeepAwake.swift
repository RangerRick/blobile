import Foundation
import Capacitor

@objc(KeepAwake)
public class KeepAwake: CAPPlugin {

    @objc func keepAwake(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if(!UIApplication.shared.isIdleTimerDisabled) {
                UIApplication.shared.isIdleTimerDisabled = true
            }
            call.resolve()
        }
    }

    @objc func allowSleep(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if(UIApplication.shared.isIdleTimerDisabled) {
                UIApplication.shared.isIdleTimerDisabled = false
            }
            call.resolve()
        }
    }
}
