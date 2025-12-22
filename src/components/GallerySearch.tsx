import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getThreadByUserId } from "@/services/threads/api";
import type { ThreadType } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useParams } from "react-router-dom";

function GallerySearch() {
  const { id } = useParams();
  const [threads, setThreads] = useState<ThreadType[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const result = await getThreadByUserId(parseFloat(id!));
      setThreads(result);
      console.log(result);
    };
    fetchGallery();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-0.5">
        {threads.map((i, index) => {
          if (i.image) {
            return (
              <div className="relative aspect-square">
                <Dialog>
                  <DialogTrigger asChild>
                    {(i.image && i.media_type === "image" && (
                      <img
                        src={i.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )) ||
                      (i.image && i.media_type === "video" && (
                        <video
                          src={i.image}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ))}
                  </DialogTrigger>
                  <DialogContent className=" border-0">
                    <Carousel opts={{ startIndex: index }}>
                      <CarouselContent>
                        {threads.map((t) => (
                          <CarouselItem
                            key={t.id}
                            className="w-full h-full flex items-center justify-center">
                            {t.image && t.media_type === "image" && (
                              <img
                                src={t.image}
                                alt=""
                                className="max-w-full max-h-full object-contain"
                              />
                            )}
                            {t.image && t.media_type === "video" && (
                              <video
                                controls
                                src={t.image}
                                className="w-full min-h-screen min-w-full"
                              />
                            )}
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </DialogContent>
                </Dialog>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default GallerySearch;
