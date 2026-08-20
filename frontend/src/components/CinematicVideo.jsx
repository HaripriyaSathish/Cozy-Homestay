import { motion } from "framer-motion";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

export function CinematicVideo({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const src = video?.video_file || video?.video_url;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <section className="bg-beige/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[2rem] border-2 border-gold/30 shadow-2xl">
            <div className="relative aspect-video w-full bg-forest">
              {src ? (
                <video
                  ref={videoRef}
                  src={src}
                  poster={video?.poster_image || undefined}
                  muted={muted}
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  onClick={togglePlay}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#18231E,#2c3a30)]">
                  <p className="px-6 text-center text-cream/50">Upload a short property video via Django Admin to feature it here.</p>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              <div className="absolute inset-x-0 top-8 text-center">
                <h3 className="font-display text-3xl text-white sm:text-4xl">{video?.title || "A Glimpse of Your Next Escape."}</h3>
              </div>

              {src && (
                <>
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass text-white"
                  >
                    {playing ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
                  </motion.button>

                  <div className="absolute bottom-5 right-5 flex gap-3">
                    <button onClick={toggleMute} className="flex h-10 w-10 items-center justify-center rounded-full glass text-white">
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button onClick={goFullscreen} className="flex h-10 w-10 items-center justify-center rounded-full glass text-white">
                      <Maximize size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
