import * as fs from 'fs';

/**
 * 判断是否为文件
 * @param {*} sourcePath
 * @returns
 */
export const getStatsType = (sourcePath: string) => {
  const stats = fs.statSync(sourcePath);
  return {
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory()
  };
};