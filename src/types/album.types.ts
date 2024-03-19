import { Album } from "@prisma/client";

export type AlbumId = Pick<Album, "id">;

export type createAlbum = Omit<Album, "id">;

export type UpdateAlbum = Partial<createAlbum>;