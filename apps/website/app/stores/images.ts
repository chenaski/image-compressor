import produce from 'immer';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { configClient } from '~/config.client';

export interface ImagesState {
  images: Record<string, { source: string; processed: string | null }>;
  setSourceImages: (images: { fileName: string; url: string }[]) => void;
  setProcessedImages: (images: { fileName: string }[]) => void;
  clear: () => void;
}

function getImageId(fileName: string) {
  return fileName.slice(0, fileName.lastIndexOf('.'));
}

export const useImages = create<ImagesState>()(
  devtools((set) => ({
    images: {},

    setSourceImages: (images) =>
      set(
        produce((state: ImagesState) => {
          images.forEach(({ fileName, url }) => {
            const id = getImageId(fileName);
            state.images[id] = {
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
            const id = getImageId(fileName);
            if (!state.images[id]) return;
            state.images[id].processed = `${configClient.apiHttpBaseUrl}/image/processed/${fileName}`;
          });
        })
      );
    },

    clear: () => {
      set({ images: {} });
    },
  }))
);
