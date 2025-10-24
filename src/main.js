import './style.css'

// Wait for UMD scripts to load before initializing editor
function waitForScripts() {
  return new Promise((resolve) => {
    const checkScripts = () => {
      if (window.CKEDITOR && window['@wiris/mathtype-ckeditor5']) {
        patchMathTypeForMultiroot();
        resolve();
      } else {
        setTimeout(checkScripts, 100);
      }
    };
    checkScripts();
  });
}

// Patch MathType plugin to work with CKEditor 5 Multiroot
function patchMathTypeForMultiroot() {
  const mathTypeModule = window['@wiris/mathtype-ckeditor5'];
  const OriginalMathType = mathTypeModule.default || mathTypeModule;
  
  // Create patched version that fixes sourceElement compatibility issue
  // MathType expects editor.sourceElement but Multiroot has editor.sourceElements
  class PatchedMathType extends OriginalMathType {
    static get pluginName() {
      return OriginalMathType.pluginName;
    }
    
    static get requires() {
      return OriginalMathType.requires;
    }
    
    init() {
      // Fix: Set sourceElement before MathType initialization
      if (this.editor.sourceElements && !this.editor.sourceElement) {
        this.editor.sourceElement = this.editor.sourceElements.header || 
                                    this.editor.sourceElements.content || 
                                    Object.values(this.editor.sourceElements)[0];
      }
      
      return super.init();
    }
    
    _addIntegration() {
      // Fix: Ensure sourceElement exists for integration setup
      if (this.editor.sourceElements && !this.editor.sourceElement) {
        this.editor.sourceElement = this.editor.sourceElements.header || 
                                    this.editor.sourceElements.content || 
                                    Object.values(this.editor.sourceElements)[0];
      }
      
      return super._addIntegration();
    }
  }
  
  // Replace original MathType with patched version
  window.MathType = PatchedMathType;

}

// Initialize CKEditor 5 Multiroot with MathType integration
async function initializeEditor() {
  const { 
    MultiRootEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    List,
    Link,
    Undo,
    BlockQuote,
    Table,
    Indent,
    Widget
  } = window.CKEDITOR;
  
  const MathTypePlugin = window.MathType;
  
  try {
    // Create multiroot editor with four editable areas
    const editor = await MultiRootEditor.create({
      header: document.querySelector('#header'),
      content: document.querySelector('#content'), 
      sidebar: document.querySelector('#sidebar'),
      footer: document.querySelector('#footer')
    }, {
      licenseKey: 'YOUR_LICENSE_KEY_HERE', // Replace with your actual license key
      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Heading,
        List,
        Link,
        Undo,
        BlockQuote,
        Table,
        Indent,
        Widget,
        MathTypePlugin
      ],
      toolbar: {
        items: [
          'heading', '|',
          'bold', 'italic', 'link', '|',
          'bulletedList', 'numberedList', '|',
          'outdent', 'indent', '|',
          'blockQuote', 'insertTable', '|',
          'undo', 'redo', '|',
          'MathType', 'ChemType'
        ]
      },
      language: 'en',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
      },
      mathTypeParameters: {
        editorParameters: { language: 'en' }
      }
    });
    
    // Attach shared toolbar to dedicated container
    document.querySelector('#toolbar').appendChild(editor.ui.view.toolbar.element);
    
  } catch (error) {
    console.error('Error initializing CKEditor:', error);
  }
}

// Start initialization when scripts are loaded
waitForScripts().then(initializeEditor);