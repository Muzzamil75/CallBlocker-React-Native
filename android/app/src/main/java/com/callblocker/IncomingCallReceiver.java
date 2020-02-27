package com.callblocker;

import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telecom.TelecomManager;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeArray;


public class IncomingCallReceiver extends BroadcastReceiver {
    private Context mContext;

    @Override
    public void onReceive(Context context, Intent intent) {
        mContext = context;

        try {
            String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
            String number = intent.getExtras().getString(TelephonyManager.EXTRA_INCOMING_NUMBER);
            Log.v("nice", number);
            checkBlockedNumber(number);
            // if (state.equalsIgnoreCase(TelephonyManager.EXTRA_STATE_RINGING)) {
            // }
            // if (state.equalsIgnoreCase(TelephonyManager.EXTRA_STATE_OFFHOOK)) {
            //     Toast.makeText(context, "Answered " + number, Toast.LENGTH_SHORT).show();
            // }
            // if (state.equalsIgnoreCase(TelephonyManager.EXTRA_STATE_IDLE)) {
            //     Toast.makeText(context, "Idle " + number, Toast.LENGTH_SHORT).show();
            // }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void checkBlockedNumber(String number){
        Intent service = new Intent(mContext, MyTaskService.class);
        Bundle bundle = new Bundle();

        bundle.putString("number", number);
        service.putExtras(bundle);
        mContext.startService(service);
        HeadlessJsTaskService.acquireWakeLockNow(mContext);
      //  endCall();
    }



  public void endCall() {
       TelecomManager tm = null;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                tm = (TelecomManager) mContext.getSystemService(Context.TELECOM_SERVICE);
            }
            if (tm != null) {
                Log.v("value: ", "a");
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                    Log.v("value: ", "insideeee");
                    if (ContextCompat.checkSelfPermission(mContext, Manifest.permission.ANSWER_PHONE_CALLS)
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

  


    private void permission() {
        if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) mContext,
                Manifest.permission.ANSWER_PHONE_CALLS)) {
            // Show an explanation to the user *asynchronously* -- don't block
            // this thread waiting for the user's response! After the user
            // sees the explanation, try again to request the permission.
        } else {
            // No explanation needed; request the permission
            ActivityCompat.requestPermissions((Activity) mContext,
                    new String[]{Manifest.permission.ANSWER_PHONE_CALLS},
                    11);

            // MY_PERMISSIONS_REQUEST_READ_CONTACTS is an
            // app-defined int constant. The callback method gets the
            // result of the request.
        }
    }


}