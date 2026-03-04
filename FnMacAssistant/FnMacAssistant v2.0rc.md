## FnMacAssistant v2.0 Release Candidate

### New tab: Home
Inspired by nugget's home tab. This new tab contains:
- Banner with app name and links to the discord and github.
- Expandable get started miniguide, with links to readme for more in-depth guide.
- Support development tab, with my creator code for those who would like to help me mantain this project.
- App credits, for those who have significantly provided to the app (tweak, fort-dl, update assistant, etc.)

Also added option to change startup tab, so the app will automatically open on the selected section.

### Bug fixes and other small updates
- Updated FAQ to mention the Update Assistant
- Added startup tab selector to settings
- Update assistant now fully downloads files to temp dir first, so that it won't touch the container until it installs. 
- Modified Update assistant's Fortnite detection. Now it won't block you from opening Fortnite, but will ask you to close the app before installing.
- Implemented custom temp dir system with selector in settings.
- Added warning for when permissions are required.
- 'X' button now fully closes the app.
- Fixed glitch where FAQ cards will collapse seconds after being opened.
- Updated Sparkle to v1.9.0