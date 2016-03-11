package com.jasaraharjamobileapp;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.AirMaps.AirPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.imagepicker.ImagePickerPackage;
import android.content.Intent;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.remobile.splashscreen.*;
import com.learnium.RNDeviceInfo.*;
import com.syarul.rnlocation.RNLocation;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.answers.Answers;
import io.fabric.sdk.android.Fabric;
import com.smixx.fabric.FabricPackage;

import android.os.Bundle;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private ImagePickerPackage mImagePicker;
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JasaRaharjaMobileApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      mImagePicker = new ImagePickerPackage(this);
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);


      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new VectorIconsPackage(),
        new ReactMaterialKitPackage(),
        new ReactNativeLocalizationPackage(),
        new RCTCameraPackage(),
        new AirPackage(),
        new RNDeviceInfo(),
        new RNLocation(),
        new RCTSplashScreenPackage(this),
        new FabricPackage(this),
        mImagePicker,
        mReactNativePushNotificationPackage
      );
    }

    @Override
   public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
       super.onActivityResult(requestCode, resultCode, data);
       mImagePicker.handleActivityResult(requestCode, resultCode, data);
   }

   // Add onNewIntent
    @Override
    protected void onNewIntent (Intent intent) {
      super.onNewIntent(intent);
      mReactNativePushNotificationPackage.newIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
        Fabric.with(this, new Answers());

        //debuggable
        //Fabric fabric = new Fabric.Builder(this).debuggable(true).kits(new Answers()).build();
        //Fabric.with(fabric);
        //throw new RuntimeException("This is a crash");
    }
}
