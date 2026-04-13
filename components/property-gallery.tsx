"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openGallery = (index: number) => {
    setSelectedImage(index)
  }

  const closeGallery = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[400px] rounded-xl overflow-hidden">
        <div
          className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => openGallery(0)}
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt={`${title} - Image 1`}
            className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all"
          />
        </div>

        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer group hidden md:block"
            onClick={() => openGallery(index + 1)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 2}`}
              className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold">+{images.length - 5} photos</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="mt-4 bg-card" onClick={() => openGallery(0)}>
        <Grid3x3 className="h-4 w-4 mr-2" />
        Voir toutes les photos
      </Button>

      <Dialog open={selectedImage !== null} onOpenChange={closeGallery}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {selectedImage !== null && (
              <>
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`${title} - Image ${selectedImage + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
