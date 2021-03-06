package com.geomeetapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNGooglePlacePickerPackage;
import io.radar.react.RNRadarPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.magus.fblogin.FacebookLoginPackage;
import io.radar.sdk.Radar;
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGooglePlacePickerPackage(),
          new RNRadarPackage(),
          new VectorIconsPackage(),
          new ReactNativeRestartPackage(),
          new FacebookLoginPackage(),
          new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    Radar.initialize("prj_test_pk_b902525b61d54d4fd7c0afe720cb497c4e9830ec");
    SoLoader.init(this, /* native exopackage */ false);
  }
}
