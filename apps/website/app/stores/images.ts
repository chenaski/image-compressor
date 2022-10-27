import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { configClient } from '~/config.client';

export interface ImagesState {
  images: Record<string, { source: string; processed: string | null }>;
  setSourceImages: (images: { fileName: string; url: string }[]) => void;
  setProcessedImages: (images: { fileName: string }[]) => void;
}

export const useImages = create<ImagesState>()(
  devtools((set) => ({
    images: {},

    setSourceImages: (images) =>
      set(
        produce((state: ImagesState) => {
          images.forEach(({ fileName, url }) => {
            state.images[fileName] = {
              source: url || `${configClient.apiHttpBaseUrl}/image/source/${fileName}`,
              processed: null,
            };
          });
        })
      ),

    setProcessedImages: (images) => {
      set(
        produce((state: ImagesState) => {
          images.forEach(({ fileName }) => {
            if (!state.images[fileName]) return;
            state.images[fileName].processed = `${configClient.apiHttpBaseUrl}/image/processed/${fileName}`;
          });
        })
      );
    },
  }))
);
