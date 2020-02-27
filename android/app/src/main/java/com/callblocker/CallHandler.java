// CallHandler.java

package com.callblocker;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telecom.TelecomManager;
import android.util.Log;
import android.widget.Toast;
import android.content.Context;
import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class CallHandler extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    @Override
    public String getName() {
        return "CallHandler";
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    CallHandler(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void endCall() {
       TelecomManager tm = null;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                tm = (TelecomManager) getReactApplicationContext().getSystemService(Context.TELECOM_SERVICE);
            }
            if (tm != null) {
                Log.v("value: ", "a");
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                    Log.v("value: ", "insideeee");
                    if (ContextCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ANSWER_PHONE_CALLS)
                            != PackageManager.PERMISSION_GRANTED) {
                        Log.v("value: ", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                        // Permission is not granted
                        //permission();
                    } else {
                        tm.endCall();
                    }
                }
                // success == true if call was terminated.
            }
  }
}