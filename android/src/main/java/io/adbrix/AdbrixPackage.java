package io.adbrix;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class AdbrixPackage implements ReactPackage {

    public ReactApplicationContextListener listener;

    public AdbrixPackage(ReactApplicationContextListener listener) {
      this.listener = listener;
    }

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new AdbrixModule(reactContext));
        if(listener != null){
          listener.onReceive(reactContext);
        }
        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        if(listener != null){
          listener.onReceive(reactContext);
        }
        return Collections.emptyList();
    }

    public interface ReactApplicationContextListener {
        void onReceive(ReactApplicationContext ReactApplicationContext);
    }
}
