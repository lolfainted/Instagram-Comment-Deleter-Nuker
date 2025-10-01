 Overview

Deletes your Instagram comment history safely.

Runs in your browser console — no installs required.

Processes 15 comments per batch with ~16s pauses between.

Keeps going until all comments are gone or you stop it manually.

Tested and working as of 9/30/25.

 Usage

Go to Instagram → More (bottom left) → Your Activity → Comments.

Press CTRL + SHIFT + I (Windows) or CMD + OPT + I (Mac) to open DevTools.

Switch to the Console tab.

Paste the script from insta-comment-deleter.js
.

Hit Enter.

The script will:

Enable selection mode

Select 15 comments at a time

Delete + confirm

Wait for Instagram to load more

Repeat until all comments are gone

 Manual Stop

If you want to stop it early, paste this into the console:

window.stop();

throw new Error("Stopped manually");

 Notes

Instagram may update its UI in the future, which could break this script.

If errors occur, increase the delay (pauseBetweenBatches) from 16000 to something larger.

Safe batch size is 15–20 max — deleting more per batch can cause errors.

 Disclaimer

This project is not affiliated with, endorsed by, or supported by Instagram.
Use at your own risk. Deleting your comments is permanent and cannot be undone.
