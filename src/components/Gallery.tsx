import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getThreadByUser } from "@/services/threads/api";
import type { ThreadType } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

function Gallery() {
  const [threads, setThreads] = useState<ThreadType[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const result = await getThreadByUser();
      setThreads(result);
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
                    <img
                      src={i.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </DialogTrigger>
                  <DialogContent className=" border-0">
                    <Carousel opts={{ startIndex: index }}>
                      <CarouselContent>
                        {threads.map((t) => (
                          <CarouselItem
                            key={t.id}
                            className="w-full h-full flex items-center justify-center">
                            <img
                              src={t.image}
                              alt=""
                              className="max-w-full max-h-full object-contain"
                            />
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

export default Gallery;
