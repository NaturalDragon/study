import EXIF from "exif-js";

// 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
const testAutoOrientationImageURL =
  "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA" +
  "AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA" +
  "QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE" +
  "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x" +
  "ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA" +
  "AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==";
let isImageAutomaticRotation;

const detectImageAutomaticRotation = () => {
  return new Promise((resolve) => {
    if (isImageAutomaticRotation === undefined) {
      const img = new Image();

      img.onload = () => {
        // 如果图片变成 1x2，说明浏览器对图片进行了回正
        isImageAutomaticRotation = img.width === 1 && img.height === 2;

        resolve(isImageAutomaticRotation);
      };

      img.src = testAutoOrientationImageURL;
    } else {
      resolve(isImageAutomaticRotation);
    }
  });
};

const getPhotoOrientation = (img) => {
  return new Promise((reslove, reject) => {
    EXIF.getData(img, async function () {
      const orient = EXIF.getTag(this, "Orientation");
      reslove(orient);
    });
  });
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const getCompressBase64 = (file) => {
  return new Promise(async (resolve, reject) => {
    const isAutoRotation = await detectImageAutomaticRotation();
    const reader = new FileReader();
    const image = new Image();
    reader.readAsDataURL(file);
    reader.onload = function () {
      image.src = reader.result;
    };
    const Orientation = await getPhotoOrientation(file);

    image.onload = function () {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      let originWidth = this.width;
      let originHeight = this.height;

      // 控制上传图片的宽高
      if (originWidth > originHeight && originHeight > 1280) {
        originWidth = 1280;
        originHeight = Math.ceil((1280 * this.height) / this.width);
      } else if (originWidth < originHeight && originWidth > 1280) {
        originWidth = Math.ceil((1280 * this.width) / this.height);
        originHeight = 1280;
      }

      canvas.width = originWidth;
      canvas.height = originHeight;

      if (Orientation && Orientation !== 1 && !isAutoRotation) {
        switch (Orientation) {
          case 6: // 旋转90度
            canvas.width = originHeight;
            canvas.height = originWidth;
            context.rotate(Math.PI / 2);
            // (0,-originHeight) 从旋转原理图那里获得的起始点
            context.drawImage(
              this,
              0,
              -originHeight,
              originWidth,
              originHeight
            );
            break;

          case 3: // 旋转180度
            context.rotate(Math.PI);
            context.drawImage(
              this,
              -originWidth,
              -originHeight,
              originWidth,
              originHeight
            );
            break;

          case 8: // 旋转-90度
            canvas.width = originHeight;
            canvas.height = originWidth;
            context.rotate((3 * Math.PI) / 2);
            context.drawImage(this, -originWidth, 0, originWidth, originHeight);
            break;

          default:
            break;
        }
      } else {
        context.drawImage(this, 0, 0, originWidth, originHeight);
      }
      let ndata = canvas.toDataURL(
        "image/jpeg",
        window.AppSetting.imageQuality
      );
      resolve(ndata);
    };
    reader.onerror = (error) => reject(error);
  });
};

function dataURLtoBlob(dataUrl) {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

function getFormData(fileSource) {
  let formData = new FormData();
  formData.append("files", fileSource);
  formData.append("DocumentType", "1");
  formData.append("Source", "发票助手");
  formData.append("DocumentName", "发票助手");
  formData.append("PublishKey", "a19b3316-4708-4bc9-860a-2cc3945e3e89");
  return formData;
}

export default {
  getBase64,
  getCompressBase64,
  dataURLtoBlob,
  getFormData,
};
