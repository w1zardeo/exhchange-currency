package com.todoreact

import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen 
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // your code here
    }

    override fun getMainComponentName(): String? {
        return "ToDoReact"
    }
}
