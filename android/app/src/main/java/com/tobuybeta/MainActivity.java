package com.tobuybeta;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ToBuyBeta";
  }

//  @Override
//  protected ReactActivityDelegate createReactActivityDelegate() {
//      return new ReactNativeActivityDelegate(this, getMainComponentName());
//  }

  //  @Override
//  public void onNewIntent(Intent intent) {
//    super.onNewIntent(intent);
//  }

  // ===
//  @Override
//  protected void onCreate(Bundle savedInstanceState) {
//    super.onCreate(savedInstanceState);
//
//    Toast.makeText(this, "IN_MAIN_ACTIVITY", Toast.LENGTH_SHORT).show();
//
////    ArrayList<String> voiceResults = this.getIntent().getExtras().getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
//  }
  // ===
}
