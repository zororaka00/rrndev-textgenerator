package xyz.rrndev.textgenerator.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.startapp.sdk.adsbase.StartAppSDK;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    StartAppSDK.setUserConsent(this, "pas", System.currentTimeMillis(), true);
  }
}
