import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  [key: string]: string[];
};

interface DirectoryEntry {
  name: string;
  path: string;
  type: string;
  children?: DirectoryEntry[];
}

interface FileEntry {
  name: string;
  path: string;
}

const BASE_PATH = `D:\\Simplify #4`;

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mkv",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".m4v",
  ".3gp",
  ".ogv",
  ".mpg",
  ".mpeg",
  ".m2v",
  ".mpg2",
  ".mpg4",
  ".divx",
  ".rm",
  ".rmvb",
  ".asf",
  ".ts",
  ".mts",
  ".m2ts",
  ".vob",
  ".ogm",
  ".dat",
  ".swf",
  // Add more extensions as needed
];

// async function scanDirectory(directoryPath: string): Promise<FileEntry[]> {
//   try {
//     const entries = await fs.promises.readdir(directoryPath);
//     const fileEntries: FileEntry[] = [];

//     for (const entry of entries) {
//       const entryPath = path.join(directoryPath, entry);
//       const stats = await fs.promises.stat(entryPath);

//       if (stats.isFile()) {
//         const fileExtension = path.extname(entry).toLowerCase();
//         if (VIDEO_EXTENSIONS.includes(fileExtension)) {
//           fileEntries.push({
//             name: entry,
//             path: entryPath,
//           });
//         }
//       } else if (stats.isDirectory()) {
//         const subdirectoryFiles = await scanDirectory(entryPath);
//         fileEntries.push(...subdirectoryFiles);
//       }
//     }

//     return fileEntries;
//   } catch (error) {
//     // console.error(`Error scanning directory ${directoryPath}: ${error.message}`);
//     throw error;
//   }
// }

const isFile = async (filePath: string): Promise<boolean> => {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.isFile();
  } catch (error) {
    // console.error(`Error checking file ${filePath}: ${error.message}`);
    return false;
  }
};

async function scanDirectory(directoryPath: string): Promise<DirectoryEntry> {
  try {
    const entries = await fs.promises.readdir(directoryPath);

    const result: DirectoryEntry = {
      name: path.basename(directoryPath),
      path: directoryPath,
      type: 'directory', // Assuming it's a directory by default
      children: [],
    };

    for (const entry of entries) {
      const entryPath = path.join(directoryPath, entry);
      const stats = await fs.promises.stat(entryPath);
      console.log("stats", stats)
      if (stats.isFile()) {
        result?.children?.push({
          name: entry,
          path: entryPath,
          type: 'file',
        });
      } else if (stats.isDirectory()) {
        const subdirectory = await scanDirectory(entryPath);
        result?.children?.push(subdirectory);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error scanning directory ${directoryPath}: ${error}`);
    throw error;
  }
}

// const isFile = async (filePath: string): Promise<boolean> => {
//   try {
//     const stats = await fs.promises.stat(filePath);
//     return stats.isFile();
//   } catch (error) {
//     console.error(`Error checking file ${filePath}: ${error.message}`);
//     return false;
//   }
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const fileContent = await fs.promises.readdir(process.cwd() + "\\public\\data");

    const dirPaths: any = [];
    const filePaths: string[] = [];

    for (const item of fileContent) {
      // console.log(item)
      const fullPath = path.join(BASE_PATH, item);
      const isFileResult = await isFile(fullPath);

      if (isFileResult) {
        filePaths.push(fullPath);
      } else {
        dirPaths.push({
          path: fullPath,
          name: fullPath
        });
      }
    }

    const tree = await scanDirectory(process.cwd() + "\\public\\data");
    // console.log(JSON.stringify(tree, null, 2));

    res.status(200).json({ dirPaths, filePaths, tree });
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
