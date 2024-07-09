import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { get } from 'http';
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const VIDEO_DIR = 'D:\\movies';
const { Tmdb } = require('tmdb');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tmdb = new Tmdb(process.env.TMDB_API_KEY ? process.env.TMDB_API_KEY : '5f8e1bf6521eede02d379cb668086991');

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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(5000);

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
        movies.push(filePath.replace(VIDEO_DIR + '/', ''));
        getVideoMetadata(filePath)
          .then(async (metadata) => {
            const title = metadata.title.slice(0, metadata.title.indexOf('.'));
            var a = await tmdb.get('search/movie', {
              query: title.slice(0, 20),
            });

            console.log('a', a?.results?.[0])

            await prisma.movie.upsert({
              where: {
                imdbId: a?.results?.[0]?.id,
              },
              update: {
                backdropPath: a?.results?.[0]?.backdropPath,
                genreIds: a?.results?.[0]?.genreIds,
                imdbId: a?.results?.[0]?.id,
                originalLanguage: a?.results?.[0]?.originalLanguage,
                originalTitle: a?.results?.[0]?.originalTitle,
                overview: a?.results?.[0]?.overview,
                popularity: a?.results?.[0]?.popularity,
                posterPath: a?.results?.[0]?.posterPath,
                releaseDate: a?.results?.[0]?.releaseDate,
                title: a?.results?.[0]?.title,
                video: a?.results?.[0]?.video,
                voteAverage: a?.results?.[0]?.voteAverage,
                voteCount: a?.results?.[0]?.voteCount,
                videoPath: filePath,
              },
              create: {
                backdropPath: a?.results?.[0]?.backdropPath,
                genreIds: a?.results?.[0]?.genreIds,
                imdbId: a?.results?.[0]?.id,
                originalLanguage: a?.results?.[0]?.originalLanguage,
                originalTitle: a?.results?.[0]?.originalTitle,
                overview: a?.results?.[0]?.overview,
                popularity: a?.results?.[0]?.popularity,
                posterPath: a?.results?.[0]?.posterPath,
                releaseDate: a?.results?.[0]?.releaseDate,
                title: a?.results?.[0]?.title,
                video: a?.results?.[0]?.video,
                voteAverage: a?.results?.[0]?.voteAverage,
                voteCount: a?.results?.[0]?.voteCount,
                videoPath: filePath,
              },
            });
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

  getMovies(VIDEO_DIR)
}
bootstrap();
