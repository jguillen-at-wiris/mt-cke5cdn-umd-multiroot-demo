# CKEditor 5 Multi-root UMD + MathType Demo

## Introduction

This demo project demonstrates how to integrate MathType with CKEditor 5 Multi-root
using local UMD (Universal Module Definition) files in a vanilla JavaScript application. This
implementation showcases the seamless integration between the MathType plugin
and CKEditor 5 Multi-root loaded from local UMD bundles, providing a practical example for
developers who want to use MathType with CKEditor 5 Multi-root in a web environment
without external CDN dependencies.

## Project Structure

```
mt-cke5multiroot-demo/
├── src/
│   ├── ckeditor/
│   │   ├── ckeditor5.umd.js        # CKEditor 5 UMD bundle
│   │   └── ckeditor5.css           # CKEditor 5 CSS styles
│   ├── mathtype/
│   │   ├── index.umd.js            # MathType plugin UMD bundle
│   │   └── index.css               # MathType CSS styles
│   ├── main.js                     # Main application logic with CKEditor initialization
│   └── style.css                   # Application styling
├── index.html                      # Main HTML file with script includes
├── package.json                    # Project dependencies and scripts
└── README.md                       # This file
```

## Prerequisites

• Node.js (version 18 or higher)
• npm or yarn package manager
• A valid CKEditor 5 license key (development license included in demo)

## Get the Scripts

This demo requires local UMD and CSS files for both CKEditor 5 and MathType. You
can obtain these files from the following sources:

### CKEditor 5 Files

Download the CKEditor 5 UMD bundle and CSS from the official CDN:

• JavaScript: [https://cdn.ckeditor.com/ckeditor5/46.0.0/ckeditor5.umd.js](https://cdn.ckeditor.com/ckeditor5/46.0.0/ckeditor5.umd.js)
• CSS: [https://cdn.ckeditor.com/ckeditor5/46.0.0/ckeditor5.css](https://cdn.ckeditor.com/ckeditor5/46.0.0/ckeditor5.css)

Place these files in the `src/ckeditor/` directory.

### MathType Files

First, install the MathType plugin via npm:

```bash
npm install @wiris/mathtype-ckeditor5
```

Then copy the UMD files from the node_modules directory:

• JavaScript: `node_modules/@wiris/mathtype-ckeditor5/dist/browser/index.umd.js`
• CSS: `node_modules/@wiris/mathtype-ckeditor5/dist/browser/index.css`

Place these files in the `src/mathtype/` directory.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the required development dependencies and tools.

### 2. Configure License Key

**Important:** The demo includes a development license key that works for localhost and local
development. For production use, you must replace it with your actual CKEditor 5
license key.

Open `src/main.js` and locate the `licenseKey` property in the editor configuration:

```javascript
const editor = await MultiRootEditor.create({
  // ... editor roots
}, {
  licenseKey: 'YOUR_LICENSE_KEY_HERE', // Replace with your actual license key
  // ... other configuration
});
```

Replace `'YOUR_LICENSE_KEY_HERE'` with your actual CKEditor 5 license key.

### 3. Configure MathType Services (Optional for Local Deployments)

**Note:** By default, this demo uses WIRIS cloud services for mathematical formula
rendering, which works out of the box. However, if you need to use a local MathType
Editor services deployment, you can configure its service provider properties.

Open `src/main.js` and locate the `mathTypeParameters` configuration. Uncomment and configure the `serviceProviderProperties`:

```javascript
mathTypeParameters: {
  editorParameters: {
    language: 'en'
  },
  serviceProviderProperties: {
    URI: '/pluginwiris_engine/app/configurationjs',  // Your local services URI
    server: 'java'
  }
}
```

**Important:** Only configure this if you have a local MathType Editor services installation.
For most use cases, the default cloud services configuration is sufficient.

### 4. Start Development Environment

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173` (or another available port). The server will automatically reload when you make
changes to the code.

## How It Works

1. **Local UMD Loading:** The application loads CKEditor 5 and MathType from local UMD files located in `src/ckeditor/` and `src/mathtype/` directories
2. **CSS Integration:** Both CKEditor 5 and MathType CSS files are loaded locally to ensure proper styling
3. **Multi-root Integration:** The application initializes CKEditor 5 Multi-root with four editable areas (header, content, sidebar, footer)
4. **MathType Compatibility Patch:** A custom patch resolves the sourceElement compatibility issue between MathType and Multi-root editors
5. **MathType Integration:** The MathType plugin is loaded as a local UMD module and patched for Multi-root compatibility
6. **Cloud Services:** MathType connects to WIRIS cloud services for mathematical formula rendering (no local server required). For local deployments, the service provider properties can be configured to point to your local MathType Editor services installation
7. **CKEditor Configuration:** The editor is configured with essential plugins including MathType and ChemType functionality

## Troubleshooting

### Common Issues

1. **License Key Error:** Ensure you've replaced the placeholder license key with your actual CKEditor 5 license
2. **Scripts Not Loading:** Check that the UMD files exist in `src/ckeditor/` and `src/mathtype/` directories
3. **Styling Issues:** Verify that both `ckeditor5.css` and `mathtype/index.css` files are present and loading
4. **Port Conflicts:** Use `npm run dev -- --port 3000` to run on a different port if 5173 is occupied
5. **MathType Unexpected Error:** This usually indicates the sourceElement compatibility issue. Ensure the MathType patch is properly applied in `src/main.js`

### Development Tips

• Open browser developer tools to check for console errors
• Verify that scripts are loading properly in the Network tab
• Check that global variables `window.CKEDITOR` and `window['@wiris/mathtype-ckeditor5']` are available
• Test MathType functionality by clicking the MathType and ChemType buttons in the toolbar

## Browser Support

This demo supports all modern browsers that are compatible with:

• CKEditor 5
• MathType Web
• ES6+ JavaScript features

## License

This demo project is for demonstration purposes. Please ensure you have
appropriate licenses for:

• **CKEditor 5:** Commercial license required for production use
• **MathType:** License required for MathType integration

## Support

For issues related to:

• **CKEditor 5:** Visit [CKEditor 5 Documentation](https://ckeditor.com/docs/ckeditor5/)
• **MathType:** Visit [MathType Documentation](https://docs.wiris.com/mathtype/en/)
• **Vite:** Visit [Vite Documentation](https://vitejs.dev/)

You can also contact the WIRIS Technical Support Team at [support@wiris.com](mailto:support@wiris.com)