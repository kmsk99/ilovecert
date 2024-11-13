export const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const optimizeImage = async (file: File): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 1MB limit');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;

        const { width, height } = calculateDimensions(
          img.width,
          img.height,
          MAX_WIDTH,
          MAX_HEIGHT,
        );

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(optimizedBase64);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const calculateDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) => {
  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }
  return { width, height };
};
