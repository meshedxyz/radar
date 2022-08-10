# Radar by Meshed Labs

## What is Radar?

Radar scans your transactions before you sign them, stopping phishing and scams from stealing your assets. Alongside your wallet, Radar pops up with a tailored risk score for your pending signature request so you can make an informed decision.

## Building the extension

-- install node modules """npm install"""

-- run local extension """npm run dev"""

-- production build """npm run build"""

## Contributing

Please reach out over socials which can be found at <a href="https://getradar.xyz">getradar.xyz</a>. We would love to hear your feedback and ideas!

## Directory

### background

Service worker manages requests for data and extension popups.

### constants

A bunch of types and constant values used throughout the extension.

### content script

The content script injects our attach script and manages messages to and from the background script.

The attach script listens to requests on the wallet injected window.ethereum object.

### static

Holds unchanging values to be passed directly by the build unmodified.

### styles

CSS and tailwind for extension styling.

### ui

The extension UI written in react.

## Links

<a href="https://getradar.xyz">https://getradar.xyz</a>

<a href="https://chrome.google.com/webstore/detail/radar-by-meshed-labs/mbmioghlhekbafemoehfamdlioalccbe?authuser=1&hl=en-GB">Chrome Store Extension</a>
