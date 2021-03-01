export const AFU_CONFIG = {
  multiple: true,
  formatsAllowed: '.jpg,.png',
  maxSize: '1',
  uploadAPI: {
    url: 'https://example-file-upload-api',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      // Authorization: `Bearer ${token}`
    },
    params: {
      page: '1'
    },
    responseType: 'blob',
  },
  theme: 'dragNDrop',
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  fileNameIndex: true,
  replaceTexts: {
    selectFileBtn: 'Add Images',
    // uploadBtn: 'Upload',
    dragNDropBox: 'Drag N Drop',
    afterUploadMsg_success: 'Successfully Uploaded!',
    afterUploadMsg_error: 'Upload Failed!',
    sizeLimit: 'Size Limit'
  }
};
