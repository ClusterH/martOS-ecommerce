import { AngularEditorConfig } from '@kolkov/angular-editor';

export const EDITOR_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '220px',
  maxHeight: 'auto',
  width: '100%',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'strikeThrough',
      'subscript',
      'superscript',
      'heading',
      'fontName'
    ],
    [
      'fontSize',
      'backgroundColor',
      'customClasses',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
    ]
  ]
};
