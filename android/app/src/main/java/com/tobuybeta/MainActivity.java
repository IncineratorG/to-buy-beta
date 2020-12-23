package com.tobuybeta;

import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

import java.util.ArrayList;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ToBuyBeta";
  }

  // ===

//  @Override
//  protected void onCreate(Bundle savedInstanceState) {
//    super.onCreate(savedInstanceState);
//
//    Toast.makeText(this, "IN_RESULTS_ACTIVITY", Toast.LENGTH_SHORT).show();
//
////    ArrayList<String> voiceResults = this.getIntent().getExtras().getStringArrayList(RecognizerIntent.EXTRA_RESULTS);
//  }

  // ===
}
