import { Injectable } from '@nestjs/common';
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const VIDEO_DIR = 'D:\\movies';
const { Tmdb } = require('tmdb');

const tmdb = new Tmdb(process.env.TMDB_API_KEY);

const getVideoMetadata = (
  videoPath: string,
): Promise<{ title: string; duration: number }> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err: any, metadata: any) => {
      if (err) {
        reject(err);
      } else {
        const { format } = metadata;
        const title = path.basename(videoPath);
        const duration = format.duration;
        resolve({ title, duration });
      }
    });
  });
};

@Injectable()
export class MoviesService {
  private readonly movies: string[] = [];

  findAll(): string[] {
    const getMovies = (dir: string) => {
      const movies: string[] = [];
      const folders: string[] = [];

      const files = fs.readdirSync(dir);
      files.forEach((file: any) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          folders.push(filePath);
        } else if (file.endsWith('.mp4') || file.endsWith('.mkv')) {
          // Include .mkv files
          movies.push(filePath.replace(VIDEO_DIR + '/', ''));
          getVideoMetadata(filePath)
            .then((metadata) => {
              console.log(
                `Title: ${metadata.title}, Duration: ${metadata.duration}s`,
              );
            })
            .catch((err) => {
              console.error('Error retrieving video metadata:', err);
            });
        }
      });

      folders.forEach((folder) => {
        movies.push(...getMovies(folder));
      });

      return movies;
    };

    const movies = getMovies(VIDEO_DIR);
    return movies;
  }
}
