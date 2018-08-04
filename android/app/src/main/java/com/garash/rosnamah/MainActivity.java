package com.garash.rosnamah;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.widget.ImageView;
import org.devio.rn.splashscreen.SplashScreen;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends ReactActivity {
	@Override
    protected void onCreate(Bundle savedInstanceState) {
		SplashScreen.show(this);
        super.onCreate(savedInstanceState);

		MobileAds.initialize(this, "ca-app-pub-3940256099942544~3347511713");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Rosnamah";
    }
}
