package com.facerecognition;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactInstanceManager;

import android.os.Bundle;

public class MainActivity extends ReactActivity {
  private ReactInstanceManager mReactInstanceManager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FaceRecognition";
    }
    @Override
        public void onBackPressed() {
          if (mReactInstanceManager != null) {
              mReactInstanceManager.onBackPressed();
          } else {
              super.onBackPressed();
          }
        }

}
