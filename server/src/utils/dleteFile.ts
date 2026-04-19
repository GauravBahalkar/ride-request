import fs from "fs";

export const deleteFile = (path: string) => {
  fs.unlink(path, () => {});
};
