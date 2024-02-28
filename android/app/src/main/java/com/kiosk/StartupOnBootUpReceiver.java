package com.kiosk;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class StartupOnBootUpReceiver  extends BroadcastReceiver {
    private static final String TAG = "BootReceiver";
    @Override
    public void onReceive(Context context, Intent intent) {
        if(Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())){
            Log.d(TAG, "Boot completed. Starting MainActivity...");
            Intent activityIntent=new Intent(context,MainActivity.class);
            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(activityIntent);
        }else {
            Log.d(TAG, "Received unexpected broadcast: " + intent.getAction());
        }
    }
}
