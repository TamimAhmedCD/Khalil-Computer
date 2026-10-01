"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import getCroppedImg from "@/lib/cropImage";

export default function ImageCropModal({
  open,
  onClose,
  imageSrc,
  onCropComplete
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      setIsProcessing(true);
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0
      );

      // Convert blob to File
      const croppedFile = new File(
        [croppedImageBlob],
        "student-photo.jpg",
        { type: "image/jpeg" }
      );

      // Create preview URL
      const previewUrl = URL.createObjectURL(croppedImageBlob);

      onCropComplete(croppedFile, previewUrl);
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Crop Student Photo</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Adjust the photo to passport size (3:4 aspect ratio)
          </p>
        </DialogHeader>

        {/* Cropper Area */}
        <div className="relative w-full h-[400px] bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
            cropShape="rect"
            showGrid={true}
            objectFit="vertical-cover"
            restrictPosition={false}
          />
        </div>

        {/* Zoom Controls */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center gap-4">
            <ZoomOut className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(values) => setZoom(values[0])}
              className="flex-1"
            />
            <ZoomIn className="w-5 h-5 text-gray-500 flex-shrink-0" />
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Use the slider or mouse wheel to zoom in/out
          </p>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCrop}
            disabled={isProcessing}
            className="bg-primary-700 hover:bg-primary-600"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Save & Use Photo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
